'use client';

import { useState } from 'react';
import { getInvestorDisplayName } from '@/lib/constants';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
      <div>
        <label
          htmlFor="investor"
          className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300"
        >
          Who is investing?
        </label>
        <input
          type="text"
          id="investor"
          value={getInvestorDisplayName(currentUser)}
          readOnly
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 shadow-sm transition-all duration-300 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-300"
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300"
        >
          Amount <span className="text-red-500 transition-colors duration-300">*</span>
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
          required
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-md focus:shadow-blue-500/20 hover:border-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/30 dark:hover:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300"
        >
          Date <span className="text-red-500 transition-colors duration-300">*</span>
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm transition-all duration-300 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-md focus:shadow-blue-500/20 hover:border-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/30 dark:hover:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="notes"
          className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300"
        >
          Notes <span className="text-xs font-normal text-gray-500 dark:text-gray-400 transition-colors duration-300">(Optional)</span>
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes about this investment..."
          rows={3}
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-md focus:shadow-blue-500/20 hover:border-blue-400 resize-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/30 dark:hover:border-blue-500"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="group flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-blue-600 bg-transparent px-4 py-2.5 font-semibold text-blue-600 shadow-sm transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:scale-100 disabled:hover:shadow-sm dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-offset-gray-800 dark:hover:shadow-blue-400/50"
        >
          <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          {isLoading ? 'Adding...' : 'Add Investment'}
        </button>
      </div>
    </form>
  );
}
