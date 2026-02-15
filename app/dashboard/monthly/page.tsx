'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUserSession, clearUserSession } from '@/lib/auth';
import { getUsers } from '@/lib/investments';
import {
  getMonthlySavings,
  getMonthlyStatsFromRows,
  getMonthComparisonFromSavings,
  upsertMonthlySavings,
  type MonthlySavingsRow,
} from '@/lib/monthlySavings';
import MonthSelector from '@/components/MonthSelector';
import MonthlySavingsCard from '@/components/MonthlySavingsCard';
import MonthlyGoalProgress from '@/components/MonthlyGoalProgress';
import MonthComparisonCard from '@/components/MonthComparisonCard';
import MonthlyBreakdownBar from '@/components/MonthlyBreakdownBar';
import MonthlySavingsForm from '@/components/MonthlySavingsForm';
import PageLoader from '@/components/PageLoader';
import { ArrowLeft, LogOut } from 'lucide-react';

export default function MonthlySavingsPage() {
  const [currentUser, setCurrentUser] = useState<'Husband' | 'Wife' | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlySavingsRow[]>([]);
  const [users, setUsers] = useState<{ id: string; role: string; name: string }[]>([]);
  const [comparison, setComparison] = useState({ thisMonth: 0, lastMonth: 0, changePercent: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(() => new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth() + 1);
  const router = useRouter();

  const loadMonthlySavings = useCallback(async () => {
    try {
      setIsLoading(true);
      const [data, comp] = await Promise.all([
        getMonthlySavings(selectedYear, selectedMonth),
        getMonthComparisonFromSavings(selectedYear, selectedMonth),
      ]);
      setMonthlyData(data);
      setComparison(comp);
    } catch (error) {
      console.error('Error loading monthly savings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    const user = getUserSession();
    if (!user) {
      router.push('/login');
      return;
    }
    setCurrentUser(user);
    getUsers().then(setUsers);
  }, [router]);

  useEffect(() => {
    const user = getUserSession();
    if (!user) return;
    loadMonthlySavings();
  }, [loadMonthlySavings]);

  const handleSaveMonthlySavings = async (
    role: 'Husband' | 'Wife',
    amount: number,
    goal: number
  ) => {
    const user = users.find((u) => u.role === role);
    if (!user) {
      alert('Could not find user.');
      return;
    }
    try {
      await upsertMonthlySavings(user.id, selectedYear, selectedMonth, amount, goal);
      await loadMonthlySavings();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save. Please try again.');
    }
  };

  const handleLogout = () => {
    clearUserSession();
    router.push('/login');
  };

  const stats = getMonthlyStatsFromRows(monthlyData);
  const goal = monthlyData.reduce((sum, r) => sum + r.goal_amount, 0);

  if (isLoading && monthlyData.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900 animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Monthly Savings
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md border-2 border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-600 hover:text-white dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-400 dark:hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
      </div>

      {/* Month Selector */}
      <div className="mb-6">
          <MonthSelector
            year={selectedYear}
            month={selectedMonth}
            onChange={(y, m) => {
              setSelectedYear(y);
              setSelectedMonth(m);
            }}
          />
      </div>

      {/* Content */}
      <div className="space-y-6">
          <MonthlySavingsCard stats={stats} />

          <MonthlyGoalProgress
            current={stats.total}
            goal={goal}
            historyHref="/dashboard/monthly/history"
          />

          <MonthComparisonCard
            thisMonth={comparison.thisMonth}
            lastMonth={comparison.lastMonth}
            changePercent={comparison.changePercent}
          />

          <MonthlyBreakdownBar
            husbandTotal={stats.husbandTotal}
            wifeTotal={stats.wifeTotal}
            total={stats.total}
          />

          <MonthlySavingsForm
            monthlyData={monthlyData}
            users={users}
            year={selectedYear}
            month={selectedMonth}
            currentUserRole={currentUser}
            onSave={handleSaveMonthlySavings}
            isLoading={isLoading}
          />
      </div>

      {stats.total === 0 && monthlyData.length === 0 && (
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          No savings recorded for this month. Use the form above to add.
        </p>
      )}
    </div>
  );
}
