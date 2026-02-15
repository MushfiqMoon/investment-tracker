/**
 * @deprecated Goals now come from monthly_savings table via lib/monthlySavings.ts
 * Kept for backwards compatibility only.
 */

const GOAL_KEY = 'investment_monthly_goal';

export function getMonthlyGoal(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const v = localStorage.getItem(GOAL_KEY);
    const n = v ? parseFloat(v) : 0;
    return isNaN(n) || n < 0 ? 0 : n;
  } catch {
    return 0;
  }
}

export function setMonthlyGoal(amount: number): void {
  if (typeof window === 'undefined') return;
  try {
    const n = Math.max(0, amount);
    localStorage.setItem(GOAL_KEY, String(n));
  } catch {
    // ignore
  }
}
