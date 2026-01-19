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
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Investment History
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          No investments recorded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Investment History
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Investor
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Notes
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr
                key={investment.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {formatDate(investment.date)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      investment.investor === 'Husband'
                        ? 'bg-green-100 text-blue-800 dark:bg-blue-900 dark:text-green-200'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}
                  >
                    {getInvestorDisplayName(investment.investor)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(investment.amount)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {investment.notes || '-'}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onDelete(investment.id)}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed dark:text-red-400 dark:hover:bg-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
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
