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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl dark:bg-gray-800">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Form */}
        <div className="p-6">
          <InvestmentForm
            currentUser={currentUser}
            onSubmit={onSubmit}
            isLoading={isLoading}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}
