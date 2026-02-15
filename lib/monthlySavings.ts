import { supabase } from './supabase';
import { getUsers } from './investments';

export interface MonthlySavingsRow {
  id: string;
  user_id: string;
  year: number;
  month: number;
  amount: number;
  goal_amount: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  role?: string;
  name?: string;
}

export interface MonthlyStats {
  total: number;
  husbandTotal: number;
  wifeTotal: number;
  husbandPercentage: number;
  wifePercentage: number;
}

export interface MonthComparison {
  thisMonth: number;
  lastMonth: number;
  changePercent: number;
}

export async function getMonthlySavings(
  year: number,
  month: number
): Promise<MonthlySavingsRow[]> {
  try {
    const { data, error } = await supabase
      .from('monthly_savings')
      .select('*, users(role, name)')
      .eq('year', year)
      .eq('month', month);

    if (error) {
      console.warn('Join failed, fetching without join:', error.message);
    }

    const fallbackData = error
      ? await supabase.from('monthly_savings').select('*').eq('year', year).eq('month', month)
      : { data, error: null };
    const rowsToUse = fallbackData.error ? [] : (fallbackData.data || data || []);

    const rawRows = (rowsToUse || []) as Array<{
      id: string;
      user_id: string;
      year: number;
      month: number;
      amount: number;
      goal_amount: number;
      notes?: string;
      created_at?: string;
      updated_at?: string;
      users?: { role: string; name: string } | null;
    }>;

    const hasJoin = rawRows.some((r) => r.users != null);
    if (hasJoin) {
      return rawRows.map((r) => ({
        id: r.id,
        user_id: r.user_id,
        year: r.year,
        month: r.month,
        amount: Number(r.amount),
        goal_amount: Number(r.goal_amount),
        notes: r.notes ?? undefined,
        created_at: r.created_at,
        updated_at: r.updated_at,
        role: r.users?.role,
        name: r.users?.name,
      }));
    }

    const users = await getUsers();
    const userMap = new Map(users.map((u) => [u.id, u]));
    return rawRows.map((r) => {
      const u = userMap.get(r.user_id);
      return {
        id: r.id,
        user_id: r.user_id,
        year: r.year,
        month: r.month,
        amount: Number(r.amount),
        goal_amount: Number(r.goal_amount),
        notes: r.notes ?? undefined,
        created_at: r.created_at,
        updated_at: r.updated_at,
        role: u?.role,
        name: u?.name,
      };
    });
  } catch (error) {
    console.error('Error in getMonthlySavings:', error);
    return [];
  }
}

export interface MonthAggregate {
  month: number;
  year?: number;
  total: number;
  goal: number;
  husbandTotal: number;
  wifeTotal: number;
}

export async function getMonthlySavingsByYear(
  year: number
): Promise<MonthlySavingsRow[]> {
  try {
    const { data, error } = await supabase
      .from('monthly_savings')
      .select('*, users(role, name)')
      .eq('year', year)
      .order('month', { ascending: true });

    if (error) {
      console.warn('Join failed, fetching without join:', error.message);
    }

    const fallbackData = error
      ? await supabase.from('monthly_savings').select('*').eq('year', year).order('month', { ascending: true })
      : { data, error: null };
    const rowsToUse = fallbackData.error ? [] : (fallbackData.data || data || []);

    const rawRows = (rowsToUse || []) as Array<{
      id: string;
      user_id: string;
      year: number;
      month: number;
      amount: number;
      goal_amount: number;
      notes?: string;
      created_at?: string;
      updated_at?: string;
      users?: { role: string; name: string } | null;
    }>;

    const hasJoin = rawRows.some((r) => r.users != null);
    if (hasJoin) {
      return rawRows.map((r) => ({
        id: r.id,
        user_id: r.user_id,
        year: r.year,
        month: r.month,
        amount: Number(r.amount),
        goal_amount: Number(r.goal_amount),
        notes: r.notes ?? undefined,
        created_at: r.created_at,
        updated_at: r.updated_at,
        role: r.users?.role,
        name: r.users?.name,
      }));
    }

    const users = await getUsers();
    const userMap = new Map(users.map((u) => [u.id, u]));
    return rawRows.map((r) => {
      const u = userMap.get(r.user_id);
      return {
        id: r.id,
        user_id: r.user_id,
        year: r.year,
        month: r.month,
        amount: Number(r.amount),
        goal_amount: Number(r.goal_amount),
        notes: r.notes ?? undefined,
        created_at: r.created_at,
        updated_at: r.updated_at,
        role: u?.role,
        name: u?.name,
      };
    });
  } catch (error) {
    console.error('Error in getMonthlySavingsByYear:', error);
    return [];
  }
}

export function aggregateByMonth(
  rows: MonthlySavingsRow[],
  year?: number
): MonthAggregate[] {
  const byMonth = new Map<number, { total: number; goal: number; husbandTotal: number; wifeTotal: number }>();
  for (let m = 1; m <= 12; m++) {
    byMonth.set(m, { total: 0, goal: 0, husbandTotal: 0, wifeTotal: 0 });
  }
  for (const r of rows) {
    const agg = byMonth.get(r.month)!;
    agg.total += Number(r.amount);
    agg.goal += Number(r.goal_amount);
    if (r.role === 'Husband') agg.husbandTotal += Number(r.amount);
    if (r.role === 'Wife') agg.wifeTotal += Number(r.amount);
    byMonth.set(r.month, agg);
  }
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const agg = byMonth.get(month)!;
    return {
      month,
      ...(year != null ? { year } : {}),
      total: agg.total,
      goal: agg.goal,
      husbandTotal: agg.husbandTotal,
      wifeTotal: agg.wifeTotal,
    };
  });
}

export function getMonthlyStatsFromRows(rows: MonthlySavingsRow[]): MonthlyStats {
  const husbandTotal = rows
    .filter((r) => r.role === 'Husband')
    .reduce((sum, r) => sum + r.amount, 0);
  const wifeTotal = rows
    .filter((r) => r.role === 'Wife')
    .reduce((sum, r) => sum + r.amount, 0);
  const total = husbandTotal + wifeTotal;
  const husbandPercentage = total > 0 ? (husbandTotal / total) * 100 : 0;
  const wifePercentage = total > 0 ? (wifeTotal / total) * 100 : 0;

  return {
    total,
    husbandTotal,
    wifeTotal,
    husbandPercentage,
    wifePercentage,
  };
}

export async function getMonthComparisonFromSavings(
  year: number,
  month: number
): Promise<MonthComparison> {
  const thisRows = await getMonthlySavings(year, month);
  let prevYear = year;
  let prevMonth = month - 1;
  if (prevMonth < 1) {
    prevMonth = 12;
    prevYear = year - 1;
  }
  const lastRows = await getMonthlySavings(prevYear, prevMonth);

  const thisMonth = thisRows.reduce((sum, r) => sum + r.amount, 0);
  const lastMonth = lastRows.reduce((sum, r) => sum + r.amount, 0);
  const changePercent =
    lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : thisMonth > 0 ? 100 : 0;

  return { thisMonth, lastMonth, changePercent };
}

export async function upsertMonthlySavings(
  userId: string,
  year: number,
  month: number,
  amount: number,
  goalAmount: number = 0,
  notes?: string
): Promise<MonthlySavingsRow | null> {
  try {
    const { data, error } = await supabase
      .from('monthly_savings')
      .upsert(
        {
          user_id: userId,
          year,
          month,
          amount: Math.max(0, amount),
          goal_amount: Math.max(0, goalAmount),
          notes: notes ?? null,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,year,month',
        }
      )
      .select()
      .single();

    if (error) {
      console.error('Error upserting monthly savings:', error);
      throw error;
    }

    return data as MonthlySavingsRow;
  } catch (error) {
    console.error('Error in upsertMonthlySavings:', error);
    throw error;
  }
}
