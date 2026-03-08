import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { startOfMonth, formatISO } from 'date-fns';

export interface DashboardStats {
  pendingApprovals: number;
  activeRules: number;
  processingErrors: number;
  monthlyInvoices: number;
  budgetUtilization: number;
  loading: boolean;
}

export const useDashboardStats = (): DashboardStats => {
  const { user, hasRole } = useAuth();
  const [stats, setStats] = useState<Omit<DashboardStats, 'loading'>>({
    pendingApprovals: 0,
    activeRules: 0,
    processingErrors: 0,
    monthlyInvoices: 0,
    budgetUtilization: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchStats = async () => {
      setLoading(true);

      const monthStart = formatISO(startOfMonth(new Date()), { representation: 'date' });

      const queries = await Promise.allSettled([
        // 0: Pending approvals count
        supabase
          .from('approvals')
          .select('*', { count: 'exact', head: true })
          .eq('approval_status', 'pending'),

        // 1: Active validation rules count
        supabase
          .from('validation_rules')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true),

        // 2: Processing errors (rejected invoices)
        supabase
          .from('invoices')
          .select('*', { count: 'exact', head: true })
          .in('status', ['rejected', 'failed', 'duplicate_suspected']),

        // 3: Monthly invoices
        supabase
          .from('invoices')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', monthStart),

        // 4: AFE budget data
        supabase
          .from('afes')
          .select('spent_amount, budget_amount')
          .eq('status', 'active'),
      ]);

      if (cancelled) return;

      const getCount = (idx: number): number => {
        const result = queries[idx];
        if (result.status === 'fulfilled' && !result.value.error) {
          return result.value.count ?? 0;
        }
        return 0;
      };

      // Calculate budget utilization from AFE data
      let budgetUtil = 0;
      const afeResult = queries[4];
      if (afeResult.status === 'fulfilled' && !afeResult.value.error && afeResult.value.data) {
        const afes = afeResult.value.data as Array<{ spent_amount: number; budget_amount: number }>;
        const totalBudget = afes.reduce((sum, a) => sum + Number(a.budget_amount), 0);
        const totalSpent = afes.reduce((sum, a) => sum + Number(a.spent_amount), 0);
        budgetUtil = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
      }

      setStats({
        pendingApprovals: getCount(0),
        activeRules: getCount(1),
        processingErrors: getCount(2),
        monthlyInvoices: getCount(3),
        budgetUtilization: budgetUtil,
      });
      setLoading(false);
    };

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return { ...stats, loading };
};
