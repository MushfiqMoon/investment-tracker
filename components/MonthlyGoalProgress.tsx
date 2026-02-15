'use client';

import Link from 'next/link';
import { Target, ChevronRight } from 'lucide-react';

interface MonthlyGoalProgressProps {
  current: number;
  goal: number;
  historyHref?: string;
}

export default function MonthlyGoalProgress({
  current,
  goal,
  historyHref = '/dashboard/monthly/history',
}: MonthlyGoalProgressProps) {
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const progressPercent = goal > 0 ? Math.min(100, (current / goal) * 100) : 0;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Monthly goal
        </p>
        <Link
          href={historyHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all months
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {goal === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Set goals in the form below</p>
      ) : (
        <>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{formatCurrency(current)} of {formatCurrency(goal)}</span>
            <span className="font-medium text-gray-900 dark:text-white">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
