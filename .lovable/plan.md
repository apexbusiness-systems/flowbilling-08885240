

## Plan: Connect Role-Based Widgets to Live Supabase Data

### Problem
All widget values are hardcoded (e.g., "12" pending approvals, "24" validation rules, "156" invoices, "67%" budget). They need to query real Supabase data.

### Approach

**Create a custom hook `useDashboardStats`** that fetches all widget data in parallel from Supabase, then pass the results into each widget section.

#### Data sources (all tables already exist with RLS):

| Widget | Query |
|--------|-------|
| Pending Approvals | `approvals` where `approval_status = 'pending'`, count |
| Validation Rules | `validation_rules` where `is_active = true`, count |
| Processing Errors | `invoices` where `status = 'rejected'`, count |
| Country Packs | Static for now (no country_packs table) |
| Recent Invoices (this month) | `invoices` with `created_at >= start of month`, count |
| Budget Utilization | `afes` sum of `spent_amount` / sum of `budget_amount` * 100 |
| User count (admin) | `user_roles`, count (admin-only RLS already exists) |
| Security Events (admin) | `security_events`, recent count |

#### Implementation steps:

1. **Create `src/hooks/useDashboardStats.tsx`** - a single hook that runs parallel Supabase queries for all stats. Uses `useAuth` to only fetch role-appropriate data. Returns `{ pendingApprovals, activeRules, processingErrors, monthlyInvoices, budgetUtilization, loading }`.

2. **Update `RoleBasedWidgets.tsx`** - call `useDashboardStats()` at the top level and pass values down to `AdminWidgets`, `OperatorWidgets`, and `ViewerWidgets` via props instead of hardcoded numbers. Add loading skeletons.

3. **No database changes needed** - all tables and RLS policies already exist.

### Technical details

- Queries use `.select('*', { count: 'exact', head: true })` for count-only queries to minimize data transfer.
- Budget utilization: fetch all AFEs, compute `sum(spent) / sum(budget) * 100` client-side (row count is small).
- Monthly invoices filter: `created_at.gte.${startOfMonth}` using `date-fns`.
- Loading state: show `Skeleton` components while data loads.
- Error handling: fallback to 0 / "N/A" on query failure, no toast spam.

---

### Vercel Environment Variables

For your Vercel deployment, you need these environment variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_SUPABASE_URL` | `https://ullqluvzkgnwwqijhvjr.supabase.co` | Public, safe to set |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your anon key (starts with `eyJ...`) | Public anon key |
| `VITE_SUPABASE_PROJECT_ID` | `ullqluvzkgnwwqijhvjr` | Optional, used by some helpers |

That is **all** you need for Vercel. The client code hardcodes these values in `src/integrations/supabase/client.ts`, so technically the VITE_ vars are redundant in this codebase -- but setting them ensures any code path that reads `import.meta.env.VITE_SUPABASE_URL` also works.

**Do NOT set** `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, or any other secret in Vercel -- those belong only in Supabase Edge Function secrets (already configured).

