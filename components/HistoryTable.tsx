'use client';

import { Investment } from '@/lib/investments';
import { Trash2 } from 'lucide-react';

interface HistoryTableProps {
  investments: Investment[];
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export default function HistoryTable({
  investments,
  onDelete,
  isLoading,
}: HistoryTableProps) {
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getInvestorDisplayName = (investor: 'Husband' | 'Wife') => {
    return investor === 'Husband' ? 'Moon' : 'Lovely';
  };

  if (investments.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 transition-all duration-300 ease-in-out animate-fade-in-up">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
          Investment History
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 transition-colors duration-300">
          No investments recorded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg animate-fade-in-up">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
        Investment History
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Investor
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Notes
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment, index) => (
              <tr
                key={investment.id}
                className="border-b border-gray-100 dark:border-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-sm animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 0.05}s`, 
                  animationFillMode: 'both' 
                }}
              >
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white transition-colors duration-300">
                  {formatDate(investment.date)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white transition-colors duration-300">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium transition-all duration-300 ease-in-out hover:scale-110 ${
                      investment.investor === 'Husband'
                        ? 'bg-green-100 text-blue-800 dark:bg-blue-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-blue-800 hover:shadow-md'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800 hover:shadow-md'
                    }`}
                  >
                    {investment.investorName ?? getInvestorDisplayName(investment.investor)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                  {formatCurrency(investment.amount)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  {investment.notes || '-'}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onDelete(investment.id)}
                    disabled={isLoading}
                    className="group inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-red-600 transition-all duration-300 ease-in-out hover:bg-red-50 hover:scale-105 hover:shadow-md hover:shadow-red-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none dark:text-red-400 dark:hover:bg-red-900 dark:hover:shadow-red-400/30"
                  >
                    <Trash2 className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
