import { supabase } from './supabase';

export interface Investment {
  id: string;
  investor: 'Husband' | 'Wife';
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

export async function getInvestments(): Promise<Investment[]> {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching investments:', error);
      throw error;
    }

    return data || [];
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
    const { data, error } = await supabase
      .from('investments')
      .insert([
        {
          investor,
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

    return data;
  } catch (error) {
    console.error('Error in addInvestment:', error);
    // Re-throw so the UI can show the real message (Supabase errors may not be Error instances)
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
    // Try to fetch investments to test connection
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
