'use client';

import { X } from 'lucide-react';
import InvestmentForm from './InvestmentForm';

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: 'Husband' | 'Wife';
  onSubmit: (investor: 'Husband' | 'Wife', amount: number, date: string, notes?: string) => Promise<void>;
  isLoading?: boolean;
}

export default function AddInvestmentModal({
  isOpen,
  onClose,
  currentUser,
  onSubmit,
  isLoading,
}: AddInvestmentModalProps) {
  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg transform animate-slide-up">
        <div className="relative rounded-xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 transition-all duration-300 ease-in-out hover:shadow-3xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
              Add New Investment
            </h2>
            <button
              onClick={onClose}
              className="group rounded-lg border border-gray-300 bg-transparent p-1.5 text-gray-400 transition-all duration-300 ease-in-out hover:bg-gray-50 hover:text-gray-600 hover:scale-110 hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:hover:border-gray-500"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* Form Content */}
          <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-6 py-5">
            <InvestmentForm
              currentUser={currentUser}
              onSubmit={onSubmit}
              isLoading={isLoading}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
