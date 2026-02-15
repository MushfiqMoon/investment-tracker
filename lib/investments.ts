import { supabase } from './supabase';

export interface Investment {
  id: string;
  user_id: string;
  investor: 'Husband' | 'Wife';
  investorName?: string;
  amount: number;
  date: string;
  notes?: string;
  created_at?: string;
}

export interface InvestmentStats {
  total: number;
  husbandTotal: number;
  wifeTotal: number;
  husbandPercentage: number;
  wifePercentage: number;
}

export interface User {
  id: string;
  role: string;
  name: string;
}

export async function getUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, role, name');

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUsers:', error);
    return [];
  }
}

function normalizeId(id: string): string {
  return String(id ?? '').trim().toLowerCase();
}

export async function getInvestments(): Promise<Investment[]> {
  try {
    // Try join first; fall back to separate fetch if join fails
    const { data: rawData, error } = await supabase
      .from('investments')
      .select('*, users(role, name)')
      .order('date', { ascending: false });

    if (error) {
      console.warn('Join failed, using separate fetch:', error.message);
    }

    const rows = (rawData || []) as Array<{
      id: string;
      user_id: string;
      amount: number;
      date: string;
      notes?: string;
      created_at?: string;
      users?: { role: string; name: string } | null;
    }>;

    if (rows.length === 0) return [];

    const hasJoinData = rows.some((r) => r.users != null);

    if (hasJoinData) {
      return rows.map((row) => ({
        id: row.id,
        user_id: row.user_id,
        investor: (row.users?.role ?? 'Husband') as 'Husband' | 'Wife',
        investorName: row.users?.name,
        amount: row.amount,
        date: row.date,
        notes: row.notes ?? undefined,
        created_at: row.created_at,
      }));
    }

    // Fallback: fetch users separately and map by user_id
    const users = await getUsers();
    const userMapById = new Map(users.map((u) => [u.id, u]));
    const userMapByNormalizedId = new Map(users.map((u) => [normalizeId(u.id), u]));

    return rows.map((row) => {
      const user =
        userMapById.get(row.user_id) ??
        userMapByNormalizedId.get(normalizeId(row.user_id)) ??
        [...users].find((u) => normalizeId(u.id) === normalizeId(row.user_id));
      return {
        id: row.id,
        user_id: row.user_id,
        investor: (user?.role ?? 'Husband') as 'Husband' | 'Wife',
        investorName: user?.name,
        amount: row.amount,
        date: row.date,
        notes: row.notes ?? undefined,
        created_at: row.created_at,
      };
    });
  } catch (error) {
    console.error('Error in getInvestments:', error);
    return [];
  }
}

export async function addInvestment(
  investor: 'Husband' | 'Wife',
  amount: number,
  date: string,
  notes?: string
): Promise<Investment | null> {
  try {
    const users = await getUsers();
    const user = users.find((u) => u.role === investor);
    if (!user) {
      throw new Error(`No user found with role: ${investor}`);
    }

    const { data, error } = await supabase
      .from('investments')
      .insert([
        {
          user_id: user.id,
          amount,
          date,
          notes: notes || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding investment:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      throw error;
    }

    const row = data as { id: string; user_id: string; amount: number; date: string; notes?: string; created_at?: string };
    return {
      id: row.id,
      user_id: row.user_id,
      investor,
      investorName: user.name,
      amount: row.amount,
      date: row.date,
      notes: row.notes ?? undefined,
      created_at: row.created_at,
    };
  } catch (error) {
    console.error('Error in addInvestment:', error);
    const message =
      error instanceof Error
        ? error.message
        : typeof (error as { message?: string })?.message === 'string'
          ? (error as { message: string }).message
          : String(error);
    throw new Error(message);
  }
}

export async function deleteInvestment(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('investments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting investment:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteInvestment:', error);
    return false;
  }
}

export interface MonthlyStats {
  total: number;
  husbandTotal: number;
  wifeTotal: number;
  husbandPercentage: number;
  wifePercentage: number;
}

export function getMonthlyStats(
  investments: Investment[],
  year: number,
  month: number
): MonthlyStats {
  const filtered = investments.filter((inv) => {
    const d = new Date(inv.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
  return calculateStats(filtered);
}

export interface MonthComparison {
  thisMonth: number;
  lastMonth: number;
  changePercent: number;
}

export function getMonthComparison(
  investments: Investment[],
  year: number,
  month: number
): MonthComparison {
  const thisStats = getMonthlyStats(investments, year, month);
  let prevYear = year;
  let prevMonth = month - 1;
  if (prevMonth < 1) {
    prevMonth = 12;
    prevYear = year - 1;
  }
  const lastStats = getMonthlyStats(investments, prevYear, prevMonth);

  const thisMonth = thisStats.total;
  const lastMonth = lastStats.total;
  const changePercent =
    lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : (thisMonth > 0 ? 100 : 0);

  return { thisMonth, lastMonth, changePercent };
}

export function calculateStats(investments: Investment[]): InvestmentStats {
  const total = investments.reduce((acc, curr) => acc + curr.amount, 0);
  const husbandTotal = investments
    .filter((inv) => inv.investor === 'Husband')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const wifeTotal = investments
    .filter((inv) => inv.investor === 'Wife')
    .reduce((acc, curr) => acc + curr.amount, 0);

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

// Test database connection and table structure
export async function testDatabaseConnection(): Promise<{ success: boolean; error?: string; details?: unknown }> {
  try {
    const { error } = await supabase
      .from('investments')
      .select('*')
      .limit(1);

    if (error) {
      return {
        success: false,
        error: error.message,
        details: {
          code: error.code,
          details: error.details,
          hint: error.hint,
        },
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error,
    };
  }
}
