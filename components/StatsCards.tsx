'use client';

import { InvestmentStats } from '@/lib/investments';
import { Coins } from 'lucide-react';

import Image from 'next/image';

interface StatsCardsProps {
  stats: InvestmentStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Investment
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(stats.total)}
            </p>
          </div>
          <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
            <Coins className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Moons Total
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(stats.husbandTotal)}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {stats.husbandPercentage.toFixed(1)}%
            </p>
          </div>
          <div className="relative h-12 w-12 overflow-hidden rounded-md bg-green-100 dark:bg-green-900">
            <Image
              src="/moon.jpg"
              alt="Moon Profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Lovelys Total
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(stats.wifeTotal)}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {stats.wifePercentage.toFixed(1)}%
            </p>
          </div>
          <div className="relative h-12 w-12 overflow-hidden rounded-md bg-purple-100 dark:bg-purple-900">
            <Image
              src="/lovely.jpg"
              alt="Lovely Profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
