

## Plan: Real-Time Subscriptions + Critical RLS Fix

### Status of Previous Work
The `useDashboardStats` hook and `RoleBasedWidgets` updates are **already implemented** and live. No changes needed there.

### Two Remaining Tasks

---

### 1. Add Real-Time Subscriptions to `useDashboardStats`

Add Supabase Realtime channel subscriptions so the dashboard auto-refreshes when data changes in `invoices`, `approvals`, `afes`, or `validation_rules`.

**File**: `src/hooks/useDashboardStats.tsx`

- Subscribe to a Realtime channel listening for `postgres_changes` on the four tables
- On any INSERT/UPDATE/DELETE event, re-run `fetchStats()`
- Clean up the channel subscription in the useEffect return
- Extract `fetchStats` so it can be called both on mount and on realtime events

---

### 2. Fix Critical RLS Policy Issue (ALL 98 policies are RESTRICTIVE)

The security scan found a **critical error**: every single RLS policy in the database is `RESTRICTIVE` instead of `PERMISSIVE`. In PostgreSQL, RESTRICTIVE policies only narrow access -- they cannot grant it. Without at least one PERMISSIVE policy per table, **no data is accessible through the API at all**.

This explains why dashboard stats may return 0 for everything despite data existing.

**Fix**: Run a migration that drops and recreates all policies as PERMISSIVE. The scan identified these specific issues:

| Finding | Severity | Fix |
|---------|----------|-----|
| All 98 RLS policies are RESTRICTIVE | **Error** | Recreate as PERMISSIVE |
| Leads table PII unprotected | **Error** | Ensure PERMISSIVE admin-only SELECT + anonymous INSERT |
| user_roles conflicting RESTRICTIVE policies | **Warn** | Separate PERMISSIVE policies for admin (all rows) vs user (own row) |
| 3x "always true" INSERT policies | **Warn** | Intentional for CSP reports, security events, leads -- acceptable |
| Leaked password protection disabled | **Warn** | Enable in Supabase Auth settings (not a code change) |

**Migration approach**: For each table, `ALTER POLICY ... USING ... WITH CHECK ...` won't change RESTRICTIVE to PERMISSIVE (PostgreSQL limitation). Must `DROP POLICY` + `CREATE POLICY` for each affected policy. Will handle all 32 tables in a single migration.

The migration will cover all tables: `activities`, `afes`, `approvals`, `article_feedback`, `budget_alert_logs`, `budget_alert_rules`, `compliance_records`, `csp_violations`, `exceptions`, `field_tickets`, `flowbills_compliance_receipts`, `integration_status`, `invoice_documents`, `invoice_extractions`, `invoice_line_items`, `invoices`, `lead_submissions`, `leads`, `notification_preferences`, `notifications`, `performance_metrics`, `profiles`, `rate_limits`, `review_queue`, `security_events`, `slo_violations`, `system_health_metrics`, `user_roles`, `uwis`, `validation_rules`, `workflow_instances`, `workflows`.

### Summary of Changes

1. **`src/hooks/useDashboardStats.tsx`** -- Add Supabase Realtime subscriptions for auto-refresh
2. **SQL Migration** -- Recreate all 98 RLS policies as PERMISSIVE (critical security fix)

