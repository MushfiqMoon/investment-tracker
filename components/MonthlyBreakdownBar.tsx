'use client';

import { formatCurrency } from '@/lib/format';

interface MonthlyBreakdownBarProps {
  husbandTotal: number;
  wifeTotal: number;
  total: number;
}

export default function MonthlyBreakdownBar({
  husbandTotal,
  wifeTotal,
  total,
}: MonthlyBreakdownBarProps) {
  const husbandPercent = total > 0 ? (husbandTotal / total) * 100 : 0;
  const wifePercent = total > 0 ? (wifeTotal / total) * 100 : 0;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-xl">
      <p className="mb-4 text-base font-bold text-gray-900 dark:text-white">
        Monthly breakdown
      </p>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-medium text-blue-600 dark:text-blue-400">Moon</span>
            <span className="text-gray-700 dark:text-gray-300">{formatCurrency(husbandTotal)}</span>
          </div>
          <div className="h-6 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: `${husbandPercent}%` }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-medium text-purple-600 dark:text-purple-400">Lovely</span>
            <span className="text-gray-700 dark:text-gray-300">{formatCurrency(wifeTotal)}</span>
          </div>
          <div className="h-6 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${wifePercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
