'use client';

import { useState, useEffect } from 'react';
import type { MonthlySavingsRow } from '@/lib/monthlySavings';
import type { User } from '@/lib/investments';
import type { UserRole } from '@/lib/auth';

interface MonthlySavingsFormProps {
  monthlyData: MonthlySavingsRow[];
  users: User[];
  year: number;
  month: number;
  currentUserRole: UserRole;
  onSave: (role: 'Husband' | 'Wife', amount: number, goal: number) => Promise<void>;
  isLoading?: boolean;
}

export default function MonthlySavingsForm({
  monthlyData,
  users,
  year,
  month,
  currentUserRole,
  onSave,
  isLoading,
}: MonthlySavingsFormProps) {
  const husband = users.find((u) => u.role === 'Husband');
  const wife = users.find((u) => u.role === 'Wife');
  const husbandRow = monthlyData.find((r) => r.role === 'Husband');
  const wifeRow = monthlyData.find((r) => r.role === 'Wife');

  const [moonAmount, setMoonAmount] = useState('');
  const [moonGoal, setMoonGoal] = useState('');
  const [lovelyAmount, setLovelyAmount] = useState('');
  const [lovelyGoal, setLovelyGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMoonAmount(husbandRow ? String(husbandRow.amount) : '');
    setMoonGoal(husbandRow ? String(husbandRow.goal_amount) : '');
    setLovelyAmount(wifeRow ? String(wifeRow.amount) : '');
    setLovelyGoal(wifeRow ? String(wifeRow.goal_amount) : '');
  }, [husbandRow, wifeRow, year, month]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserRole) return;

    const amount =
      currentUserRole === 'Husband' ? parseFloat(moonAmount) || 0 : parseFloat(lovelyAmount) || 0;
    const goal =
      currentUserRole === 'Husband' ? parseFloat(moonGoal) || 0 : parseFloat(lovelyGoal) || 0;

    setIsSubmitting(true);
    try {
      await onSave(currentUserRole, amount, goal);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUserRole) return null;
  if (currentUserRole === 'Husband' && !husband) return null;
  if (currentUserRole === 'Wife' && !wife) return null;

  const showMoon = currentUserRole === 'Husband';
  const showLovely = currentUserRole === 'Wife';

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 transition-all duration-300 ease-in-out">
      <h3 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
        Add or update monthly savings
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {showMoon && (
            <div className="space-y-3 rounded-lg border border-gray-200 p-4 dark:border-gray-600">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Moon</p>
              <div>
                <label htmlFor="moon-amount" className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                  Amount saved
                </label>
                <input
                  id="moon-amount"
                  type="number"
                  min="0"
                  step="1"
                  value={moonAmount}
                  onChange={(e) => setMoonAmount(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="moon-goal" className="mb-1 block text-sm text-gray-600 dark:text-gray-400">Goal</label>
                <input
                  id="moon-goal"
                  type="number"
                  min="0"
                  step="1"
                  value={moonGoal}
                  onChange={(e) => setMoonGoal(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}
          {showLovely && (
            <div className="space-y-3 rounded-lg border border-gray-200 p-4 dark:border-gray-600">
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Lovely</p>
              <div>
                <label htmlFor="lovely-amount" className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                  Amount saved
                </label>
                <input
                  id="lovely-amount"
                  type="number"
                  min="0"
                  step="1"
                  value={lovelyAmount}
                  onChange={(e) => setLovelyAmount(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="lovely-goal" className="mb-1 block text-sm text-gray-600 dark:text-gray-400">Goal</label>
                <input
                  id="lovely-goal"
                  type="number"
                  min="0"
                  step="1"
                  value={lovelyGoal}
                  onChange={(e) => setLovelyGoal(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
