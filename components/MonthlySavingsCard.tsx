'use client';

import { MonthlyStats } from '@/lib/investments';
import { Coins } from 'lucide-react';

interface MonthlySavingsCardProps {
  stats: MonthlyStats;
}

export default function MonthlySavingsCard({ stats }: MonthlySavingsCardProps) {
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-green-500/20 dark:hover:shadow-green-400/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
            Total saved this month
          </p>
          <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {formatCurrency(stats.total)}
          </p>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Moon: {formatCurrency(stats.husbandTotal)} ({stats.total > 0 ? stats.husbandPercentage.toFixed(1) : '0'}%) · Lovely: {formatCurrency(stats.wifeTotal)} ({stats.total > 0 ? stats.wifePercentage.toFixed(1) : '0'}%)
          </p>
        </div>
        <div className="rounded-full bg-green-100 p-4 dark:bg-green-900 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-green-200 dark:hover:bg-green-800">
          <Coins className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
      </div>
    </div>
  );
}
