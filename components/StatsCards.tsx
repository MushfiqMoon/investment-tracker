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
      <div className="group rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 min-h-[180px] transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-green-500/20 dark:hover:shadow-green-400/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
              Total Investment
            </p>
            <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              {formatCurrency(stats.total)}
            </p>
          </div>
          <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 group-hover:shadow-lg">
            <Coins className="h-10 w-10 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:rotate-12" />
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 min-h-[180px] transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform">
          <Image
            src="/moon.jpg"
            alt="Moon Background"
            fill
            className="object-cover transition-transform duration-700 ease-out will-change-transform"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/80 transition-all duration-300 ease-in-out group-hover:bg-black/30 dark:group-hover:bg-black/70"></div>
        {/* Content */}
        <div className="relative z-20 flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-blue-400 transition-colors duration-300">
              Moons Total
            </p>
            <p className="mt-4 text-4xl font-bold text-white transition-colors duration-300">
              {formatCurrency(stats.husbandTotal)}
            </p>
            <p className="mt-2 text-sm text-gray-200 transition-colors duration-300">
              {stats.total > 0 ? ((stats.husbandTotal / stats.total) * 100).toFixed(1) : '0.0'}%
            </p>
          </div>
          <div className="relative h-25 w-20 overflow-hidden rounded-md bg-green-100 dark:bg-green-900 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-400/50">
            <Image
              src="/moon.jpg"
              alt="Moon Profile"
              width={80}
              height={100}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 min-h-[180px] transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 transition-transform duration-500 ease-in-out group-hover:scale-110">
          <Image
            src="/love.jpg"
            alt="Lovely Background"
            fill
            className="object-cover transition-transform duration-500 ease-in-out"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/40 dark:bg-black/80 transition-all duration-300 ease-in-out group-hover:bg-black/30 dark:group-hover:bg-black/70"></div>
        {/* Content */}
        <div className="relative z-20 flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-purple-400 transition-colors duration-300">
              Lovelys Total
            </p>
            <p className="mt-4 text-4xl font-bold text-white transition-colors duration-300">
              {formatCurrency(stats.wifeTotal)}
            </p>
            <p className="mt-2 text-sm text-gray-200 transition-colors duration-300">
              {stats.total > 0 ? ((stats.wifeTotal / stats.total) * 100).toFixed(1) : '0.0'}%
            </p>
          </div>
          <div className="relative h-25 w-20 overflow-hidden rounded-md bg-purple-100 dark:bg-purple-900 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-purple-400/50">
            <Image
              src="/love.jpg"
              alt="Lovely Profile"
              width={80}
              height={100}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
