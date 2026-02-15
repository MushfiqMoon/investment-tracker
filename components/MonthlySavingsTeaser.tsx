'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getMonthlySavings, getMonthlyStatsFromRows } from '@/lib/monthlySavings';
import { ChevronRight } from 'lucide-react';

export default function MonthlySavingsTeaser() {
  const [stats, setStats] = useState({ total: 0, husbandTotal: 0, wifeTotal: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const now = new Date();
      try {
        const rows = await getMonthlySavings(now.getFullYear(), now.getMonth() + 1);
        setStats(getMonthlyStatsFromRows(rows));
      } catch (error) {
        console.error('Error loading monthly savings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <Link
      href="/dashboard/monthly"
      className="block rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-green-500/20 dark:hover:shadow-green-400/20"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-bold text-green-600 dark:text-green-400">
            This month saved
          </p>
          {isLoading ? (
            <p className="mt-2 text-2xl font-bold text-gray-500 dark:text-gray-400">Loading...</p>
          ) : (
            <>
              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats.total)}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Moon: {formatCurrency(stats.husbandTotal)} · Lovely: {formatCurrency(stats.wifeTotal)}
              </p>
            </>
          )}
        </div>
        <span className="flex w-full items-center justify-center gap-1 rounded-lg border border-green-200 bg-green-50 py-2.5 font-medium text-green-700 transition-colors hover:bg-green-100 dark:border-green-700 dark:bg-green-950/40 dark:text-green-400 dark:hover:bg-green-900/50 sm:w-auto sm:inline-flex sm:border-0 sm:bg-transparent px-2 sm:py-0 dark:sm:bg-transparent">
          View Monthly Savings
          <ChevronRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
