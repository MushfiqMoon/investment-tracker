'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthSelectorProps {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthSelector({ year, month, onChange }: MonthSelectorProps) {
  const now = new Date();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;

  const handlePrev = () => {
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth < 1) {
      prevMonth = 12;
      prevYear = year - 1;
    }
    onChange(prevYear, prevMonth);
  };

  const handleNext = () => {
    if (isCurrentMonth) return;
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onChange(nextYear, nextMonth);
  };

  return (
    <div className="flex items-center justify-center gap-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 transition-all duration-300 ease-in-out">
      <button
        onClick={handlePrev}
        className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        aria-label="Previous month"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <span className="min-w-[160px] text-center text-lg font-semibold text-gray-900 dark:text-white">
        {MONTH_NAMES[month - 1]} {year}
      </span>
      <button
        onClick={handleNext}
        disabled={isCurrentMonth}
        className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        aria-label="Next month"
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </div>
  );
}
