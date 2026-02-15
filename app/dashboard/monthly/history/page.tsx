'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUserSession } from '@/lib/auth';
import {
  getMonthlySavingsByYear,
  aggregateByMonth,
  type MonthAggregate,
} from '@/lib/monthlySavings';
import { formatCurrency } from '@/lib/format';
import { MONTH_NAMES } from '@/lib/constants';
import PageLoader from '@/components/PageLoader';
import { ArrowLeft } from 'lucide-react';

export default function MonthlyHistoryPage() {
  const [selectedYear, setSelectedYear] = useState(() => new Date().getFullYear());
  const [aggregates, setAggregates] = useState<MonthAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const rows = await getMonthlySavingsByYear(selectedYear);
      setAggregates(aggregateByMonth(rows, selectedYear));
    } catch (error) {
      console.error('Error loading monthly history:', error);
      setAggregates([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    const user = getUserSession();
    if (!user) {
      router.push('/login');
      return;
    }
    loadHistory();
  }, [router, loadHistory]);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i);

  if (isLoading && aggregates.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900 animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/monthly"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Monthly
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Monthly savings history
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="year-select" className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Year:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

      {/* Month cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
          {aggregates.map((agg, i) => {
            const progressPercent =
              agg.goal > 0 ? Math.min(100, (agg.total / agg.goal) * 100) : 0;
            const hasData = agg.total > 0 || agg.goal > 0;
            const monthName = MONTH_NAMES[agg.month - 1];

            return (
              <div
                key={agg.month}
                className="rounded-lg bg-white p-5 shadow-md dark:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20"
                style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
              >
                <p className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                  {monthName} {selectedYear}
                </p>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {formatCurrency(agg.total)} of {formatCurrency(agg.goal)}
                  </span>
                  {agg.goal > 0 && (
                    <span className="font-medium text-gray-900 dark:text-white">
                      {progressPercent.toFixed(0)}%
                    </span>
                  )}
                </div>
                <div className="mb-3 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      hasData ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    style={{ width: `${agg.goal > 0 ? progressPercent : 0}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Moon: {formatCurrency(agg.husbandTotal)} · Lovely: {formatCurrency(agg.wifeTotal)}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
