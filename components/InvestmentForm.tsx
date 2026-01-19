'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface InvestmentFormProps {
  currentUser: 'Husband' | 'Wife';
  onSubmit: (investor: 'Husband' | 'Wife', amount: number, date: string, notes?: string) => Promise<void>;
  isLoading?: boolean;
  onSuccess?: () => void;
}

export default function InvestmentForm({ currentUser, onSubmit, isLoading, onSuccess }: InvestmentFormProps) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!date) {
      alert('Please select a date');
      return;
    }

    await onSubmit(currentUser, amountNum, date, notes || undefined);
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    if (onSuccess) {
      onSuccess();
    }
  };

  const getInvestorName = () => {
    return currentUser === 'Husband' ? 'Mushfiqur Rahman' : 'Margena Akther';
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Add New Investment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="investor"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Who is investing?
          </label>
          <input
            type="text"
            id="investor"
            value={getInvestorName()}
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this investment..."
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-5 w-5" />
          {isLoading ? 'Adding...' : 'Add Investment'}
        </button>
      </form>
    </div>
  );
}
