'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSession, clearUserSession } from '@/lib/auth';
import {
  getInvestments,
  addInvestment,
  deleteInvestment,
  calculateStats,
  Investment,
} from '@/lib/investments';
import StatsCards from '@/components/StatsCards';
import Charts from '@/components/Charts';
import AddInvestmentModal from '@/components/AddInvestmentModal';
import HistoryTable from '@/components/HistoryTable';
import { LogOut, Plus } from 'lucide-react';

export default function DashboardPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<'Husband' | 'Wife' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const user = getUserSession();
    if (!user) {
      router.push('/login');
      return;
    }

    setCurrentUser(user);
    // Fetch investments
    loadInvestments();
  }, [router]);

  const loadInvestments = async () => {
    try {
      setIsLoading(true);
      const data = await getInvestments();
      setInvestments(data);
    } catch (error) {
      console.error('Error loading investments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddInvestment = async (
    investor: 'Husband' | 'Wife',
    amount: number,
    date: string,
    notes?: string
  ) => {
    try {
      setIsSubmitting(true);
      const newInvestment = await addInvestment(investor, amount, date, notes);
      if (newInvestment) {
        await loadInvestments();
      } else {
        alert('Failed to add investment. Please check the browser console for details.');
      }
    } catch (error) {
      console.error('Error adding investment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to add investment: ${errorMessage}\n\nPlease check:\n1. Database connection\n2. Notes column exists in database\n3. Browser console for details`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteInvestment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this investment?')) {
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await deleteInvestment(id);
      if (success) {
        await loadInvestments();
      } else {
        alert('Failed to delete investment. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting investment:', error);
      alert('Failed to delete investment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearUserSession();
    router.push('/login');
  };

  const stats = calculateStats(investments);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Investment Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Track your shared investments
            </p>
          </div>
          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards stats={stats} />
        </div>

        {/* Charts */}
        <div className="mb-8">
          <Charts investments={investments} stats={stats} />
        </div>

        {/* History */}
        <div className="mb-8">
          <HistoryTable
            investments={investments}
            onDelete={handleDeleteInvestment}
            isLoading={isSubmitting}
          />
        </div>

        {/* Add Investment Modal */}
        {currentUser && (
          <AddInvestmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            currentUser={currentUser}
            onSubmit={handleAddInvestment}
            isLoading={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
