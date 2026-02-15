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
      <div className="flex items-center justify-between">
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
        <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
          View Monthly Savings
          <ChevronRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
