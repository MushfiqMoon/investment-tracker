'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MonthComparisonCardProps {
  thisMonth: number;
  lastMonth: number;
  changePercent: number;
}

export default function MonthComparisonCard({
  thisMonth,
  lastMonth,
  changePercent,
}: MonthComparisonCardProps) {
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const isPositive = changePercent > 0;
  const isNegative = changePercent < 0;
  const isZero = changePercent === 0;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-xl">
      <p className="mb-4 text-base font-bold text-gray-900 dark:text-white">
        This month vs last month
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">{formatCurrency(thisMonth)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Last month</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">{formatCurrency(lastMonth)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Change</p>
          <p
            className={`inline-flex items-center gap-1 text-xl font-semibold ${
              isPositive ? 'text-green-600 dark:text-green-400' : isNegative ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {isPositive && <TrendingUp className="h-5 w-5" />}
            {isNegative && <TrendingDown className="h-5 w-5" />}
            {isZero && <Minus className="h-5 w-5" />}
            {changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
