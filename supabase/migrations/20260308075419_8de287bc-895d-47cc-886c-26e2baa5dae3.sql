
-- ============================================================
-- Fix ALL RLS policies: RESTRICTIVE → PERMISSIVE
-- Drop each policy and recreate with identical logic but PERMISSIVE
-- ============================================================

-- ==================== activities ====================
DROP POLICY IF EXISTS "Users can create own activities" ON public.activities;
DROP POLICY IF EXISTS "Users can view own activities" ON public.activities;
CREATE POLICY "Users can create own activities" ON public.activities FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own activities" ON public.activities FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== afes ====================
DROP POLICY IF EXISTS "Users can create own AFEs" ON public.afes;
DROP POLICY IF EXISTS "Users can delete own AFEs" ON public.afes;
DROP POLICY IF EXISTS "Users can update own AFEs" ON public.afes;
DROP POLICY IF EXISTS "Users can view own AFEs" ON public.afes;
CREATE POLICY "Users can create own AFEs" ON public.afes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own AFEs" ON public.afes FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own AFEs" ON public.afes FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own AFEs" ON public.afes FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== approvals ====================
DROP POLICY IF EXISTS "Users can create own approvals" ON public.approvals;
DROP POLICY IF EXISTS "Users can update own approvals" ON public.approvals;
DROP POLICY IF EXISTS "Users can view own approvals" ON public.approvals;
CREATE POLICY "Users can create own approvals" ON public.approvals FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own approvals" ON public.approvals FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own approvals" ON public.approvals FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== article_feedback ====================
DROP POLICY IF EXISTS "Admins can view all feedback" ON public.article_feedback;
DROP POLICY IF EXISTS "Users can create own feedback" ON public.article_feedback;
DROP POLICY IF EXISTS "Users can update own feedback" ON public.article_feedback;
DROP POLICY IF EXISTS "Users can view own feedback" ON public.article_feedback;
CREATE POLICY "Admins can view all feedback" ON public.article_feedback FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create own feedback" ON public.article_feedback FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own feedback" ON public.article_feedback FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own feedback" ON public.article_feedback FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== budget_alert_logs ====================
DROP POLICY IF EXISTS "Users can create own alert logs" ON public.budget_alert_logs;
DROP POLICY IF EXISTS "Users can view own alert logs" ON public.budget_alert_logs;
CREATE POLICY "Users can create own alert logs" ON public.budget_alert_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own alert logs" ON public.budget_alert_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== budget_alert_rules ====================
DROP POLICY IF EXISTS "Users can create own alert rules" ON public.budget_alert_rules;
DROP POLICY IF EXISTS "Users can delete own alert rules" ON public.budget_alert_rules;
DROP POLICY IF EXISTS "Users can update own alert rules" ON public.budget_alert_rules;
DROP POLICY IF EXISTS "Users can view own alert rules" ON public.budget_alert_rules;
CREATE POLICY "Users can create own alert rules" ON public.budget_alert_rules FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own alert rules" ON public.budget_alert_rules FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own alert rules" ON public.budget_alert_rules FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own alert rules" ON public.budget_alert_rules FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== compliance_records ====================
DROP POLICY IF EXISTS "Users can create own compliance records" ON public.compliance_records;
DROP POLICY IF EXISTS "Users can delete their own compliance records" ON public.compliance_records;
DROP POLICY IF EXISTS "Users can update own compliance records" ON public.compliance_records;
DROP POLICY IF EXISTS "Users can view own compliance records" ON public.compliance_records;
CREATE POLICY "Users can create own compliance records" ON public.compliance_records FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own compliance records" ON public.compliance_records FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own compliance records" ON public.compliance_records FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own compliance records" ON public.compliance_records FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== csp_violations ====================
DROP POLICY IF EXISTS "Admins can view all CSP violations" ON public.csp_violations;
DROP POLICY IF EXISTS "Allow anonymous CSP violation reports" ON public.csp_violations;
CREATE POLICY "Admins can view all CSP violations" ON public.csp_violations FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Allow anonymous CSP violation reports" ON public.csp_violations FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ==================== exceptions ====================
DROP POLICY IF EXISTS "Users can create own exceptions" ON public.exceptions;
DROP POLICY IF EXISTS "Users can delete their own exceptions" ON public.exceptions;
DROP POLICY IF EXISTS "Users can update own exceptions" ON public.exceptions;
DROP POLICY IF EXISTS "Users can view own exceptions" ON public.exceptions;
CREATE POLICY "Users can create own exceptions" ON public.exceptions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own exceptions" ON public.exceptions FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own exceptions" ON public.exceptions FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own exceptions" ON public.exceptions FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== field_tickets ====================
DROP POLICY IF EXISTS "Users can create own field tickets" ON public.field_tickets;
DROP POLICY IF EXISTS "Users can delete own field tickets" ON public.field_tickets;
DROP POLICY IF EXISTS "Users can update own field tickets" ON public.field_tickets;
DROP POLICY IF EXISTS "Users can view own field tickets" ON public.field_tickets;
CREATE POLICY "Users can create own field tickets" ON public.field_tickets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own field tickets" ON public.field_tickets FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own field tickets" ON public.field_tickets FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own field tickets" ON public.field_tickets FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== flowbills_compliance_receipts ====================
DROP POLICY IF EXISTS "Service role only access" ON public.flowbills_compliance_receipts;
CREATE POLICY "Service role only access" ON public.flowbills_compliance_receipts FOR ALL USING (false) WITH CHECK (false);

-- ==================== integration_status ====================
DROP POLICY IF EXISTS "Users can create own integration status" ON public.integration_status;
DROP POLICY IF EXISTS "Users can delete their own integrations" ON public.integration_status;
DROP POLICY IF EXISTS "Users can update own integration status" ON public.integration_status;
DROP POLICY IF EXISTS "Users can view own integration status" ON public.integration_status;
CREATE POLICY "Users can create own integration status" ON public.integration_status FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own integrations" ON public.integration_status FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own integration status" ON public.integration_status FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own integration status" ON public.integration_status FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== invoice_documents ====================
DROP POLICY IF EXISTS "Operators can create invoice documents" ON public.invoice_documents;
DROP POLICY IF EXISTS "Operators can delete invoice documents" ON public.invoice_documents;
DROP POLICY IF EXISTS "Operators can update invoice documents" ON public.invoice_documents;
DROP POLICY IF EXISTS "Users can view invoice documents they have access to" ON public.invoice_documents;
CREATE POLICY "Operators can create invoice documents" ON public.invoice_documents FOR INSERT TO authenticated WITH CHECK (
  (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = ANY(ARRAY['admin'::app_role, 'operator'::app_role])))
  AND (EXISTS (SELECT 1 FROM invoices WHERE invoices.id = invoice_documents.invoice_id AND invoices.user_id = auth.uid()))
);
CREATE POLICY "Operators can delete invoice documents" ON public.invoice_documents FOR DELETE TO authenticated USING (
  (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = ANY(ARRAY['admin'::app_role, 'operator'::app_role])))
  AND (EXISTS (SELECT 1 FROM invoices WHERE invoices.id = invoice_documents.invoice_id AND invoices.user_id = auth.uid()))
);
CREATE POLICY "Operators can update invoice documents" ON public.invoice_documents FOR UPDATE TO authenticated USING (
  (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = ANY(ARRAY['admin'::app_role, 'operator'::app_role])))
  AND (EXISTS (SELECT 1 FROM invoices WHERE invoices.id = invoice_documents.invoice_id AND invoices.user_id = auth.uid()))
);
CREATE POLICY "Users can view invoice documents they have access to" ON public.invoice_documents FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM invoices WHERE invoices.id = invoice_documents.invoice_id AND invoices.user_id = auth.uid())
);

-- ==================== invoice_extractions ====================
DROP POLICY IF EXISTS "Users can create own invoice extractions" ON public.invoice_extractions;
DROP POLICY IF EXISTS "Users can delete own invoice extractions" ON public.invoice_extractions;
DROP POLICY IF EXISTS "Users can update own invoice extractions" ON public.invoice_extractions;
DROP POLICY IF EXISTS "Users can view own invoice extractions" ON public.invoice_extractions;
CREATE POLICY "Users can create own invoice extractions" ON public.invoice_extractions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own invoice extractions" ON public.invoice_extractions FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own invoice extractions" ON public.invoice_extractions FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own invoice extractions" ON public.invoice_extractions FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== invoice_line_items ====================
DROP POLICY IF EXISTS "Users can create own invoice line items" ON public.invoice_line_items;
DROP POLICY IF EXISTS "Users can delete own invoice line items" ON public.invoice_line_items;
DROP POLICY IF EXISTS "Users can update own invoice line items" ON public.invoice_line_items;
DROP POLICY IF EXISTS "Users can view own invoice line items" ON public.invoice_line_items;
CREATE POLICY "Users can create own invoice line items" ON public.invoice_line_items FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own invoice line items" ON public.invoice_line_items FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own invoice line items" ON public.invoice_line_items FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own invoice line items" ON public.invoice_line_items FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== invoices ====================
DROP POLICY IF EXISTS "Users can create own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can delete own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can update own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can view own invoices" ON public.invoices;
CREATE POLICY "Users can create own invoices" ON public.invoices FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own invoices" ON public.invoices FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own invoices" ON public.invoices FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own invoices" ON public.invoices FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== lead_submissions ====================
DROP POLICY IF EXISTS "Admins can view lead submissions" ON public.lead_submissions;
CREATE POLICY "Admins can view lead submissions" ON public.lead_submissions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role)
);

-- ==================== leads ====================
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous lead capture" ON public.leads;
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all leads" ON public.leads FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Allow anonymous lead capture" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ==================== notification_preferences ====================
DROP POLICY IF EXISTS "Users can insert own preferences" ON public.notification_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON public.notification_preferences;
DROP POLICY IF EXISTS "Users can view own preferences" ON public.notification_preferences;
CREATE POLICY "Users can insert own preferences" ON public.notification_preferences FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON public.notification_preferences FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own preferences" ON public.notification_preferences FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== notifications ====================
DROP POLICY IF EXISTS "Admins can create notifications" ON public.notifications;
DROP POLICY IF EXISTS "Admins can delete notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Admins can create notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role)
);
CREATE POLICY "Admins can delete notifications" ON public.notifications FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role)
);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== performance_metrics ====================
DROP POLICY IF EXISTS "Admins and operators can view metrics" ON public.performance_metrics;
CREATE POLICY "Admins and operators can view metrics" ON public.performance_metrics FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = ANY(ARRAY['admin'::app_role, 'operator'::app_role]))
);

-- ==================== profiles ====================
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== rate_limits ====================
DROP POLICY IF EXISTS "Admins can view all rate limits" ON public.rate_limits;
CREATE POLICY "Admins can view all rate limits" ON public.rate_limits FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role)
);

-- ==================== review_queue ====================
DROP POLICY IF EXISTS "Users can create own review queue items" ON public.review_queue;
DROP POLICY IF EXISTS "Users can update own review queue items" ON public.review_queue;
DROP POLICY IF EXISTS "Users can view own review queue items" ON public.review_queue;
CREATE POLICY "Users can create own review queue items" ON public.review_queue FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own review queue items" ON public.review_queue FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own review queue items" ON public.review_queue FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== security_events ====================
DROP POLICY IF EXISTS "Admins can view all security events" ON public.security_events;
DROP POLICY IF EXISTS "System can insert security events" ON public.security_events;
CREATE POLICY "Admins can view all security events" ON public.security_events FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "System can insert security events" ON public.security_events FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ==================== slo_violations ====================
DROP POLICY IF EXISTS "Admins and operators can view SLO violations" ON public.slo_violations;
CREATE POLICY "Admins and operators can view SLO violations" ON public.slo_violations FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = ANY(ARRAY['admin'::app_role, 'operator'::app_role]))
);

-- ==================== system_health_metrics ====================
DROP POLICY IF EXISTS "Only admins can insert system health metrics" ON public.system_health_metrics;
DROP POLICY IF EXISTS "Only admins can view system health metrics" ON public.system_health_metrics;
CREATE POLICY "Only admins can insert system health metrics" ON public.system_health_metrics FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Only admins can view system health metrics" ON public.system_health_metrics FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- ==================== user_roles ====================
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Admins can manage all user roles" ON public.user_roles FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== uwis ====================
DROP POLICY IF EXISTS "Users can create own UWIs" ON public.uwis;
DROP POLICY IF EXISTS "Users can delete own UWIs" ON public.uwis;
DROP POLICY IF EXISTS "Users can update own UWIs" ON public.uwis;
DROP POLICY IF EXISTS "Users can view own UWIs" ON public.uwis;
CREATE POLICY "Users can create own UWIs" ON public.uwis FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own UWIs" ON public.uwis FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own UWIs" ON public.uwis FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own UWIs" ON public.uwis FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== validation_rules ====================
DROP POLICY IF EXISTS "Users can create own validation rules" ON public.validation_rules;
DROP POLICY IF EXISTS "Users can delete own validation rules" ON public.validation_rules;
DROP POLICY IF EXISTS "Users can delete their own validation rules" ON public.validation_rules;
DROP POLICY IF EXISTS "Users can update own validation rules" ON public.validation_rules;
DROP POLICY IF EXISTS "Users can view own validation rules" ON public.validation_rules;
CREATE POLICY "Users can create own validation rules" ON public.validation_rules FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own validation rules" ON public.validation_rules FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own validation rules" ON public.validation_rules FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own validation rules" ON public.validation_rules FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== workflow_instances ====================
DROP POLICY IF EXISTS "Users can create own workflow instances" ON public.workflow_instances;
DROP POLICY IF EXISTS "Users can delete their own workflow instances" ON public.workflow_instances;
DROP POLICY IF EXISTS "Users can update own workflow instances" ON public.workflow_instances;
DROP POLICY IF EXISTS "Users can view own workflow instances" ON public.workflow_instances;
CREATE POLICY "Users can create own workflow instances" ON public.workflow_instances FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own workflow instances" ON public.workflow_instances FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own workflow instances" ON public.workflow_instances FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own workflow instances" ON public.workflow_instances FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ==================== workflows ====================
DROP POLICY IF EXISTS "Users can create own workflows" ON public.workflows;
DROP POLICY IF EXISTS "Users can delete their own workflows" ON public.workflows;
DROP POLICY IF EXISTS "Users can update own workflows" ON public.workflows;
DROP POLICY IF EXISTS "Users can view own workflows" ON public.workflows;
CREATE POLICY "Users can create own workflows" ON public.workflows FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own workflows" ON public.workflows FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own workflows" ON public.workflows FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own workflows" ON public.workflows FOR SELECT TO authenticated USING (auth.uid() = user_id);
