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
import { LogOut, MessageCirclePlus } from 'lucide-react';

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
      <div className="flex min-h-screen items-center justify-center animate-fade-in">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent transition-colors duration-300"></div>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 animate-pulse-slow">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-fade-in">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Investment Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Track your shared investments
            </p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {currentUser && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="order-2 inline-flex items-center justify-center gap-2 rounded-md border-2 border-blue-600 bg-transparent px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 md:order-1 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white dark:hover:shadow-blue-400/50"
              >
                <MessageCirclePlus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                Add
              </button>
            )}
            <button
              onClick={handleLogout}
              className="order-1 inline-flex items-center justify-center gap-2 rounded-md border-2 border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-600 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50 active:scale-95 md:order-2 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-400 dark:hover:text-white dark:hover:shadow-gray-400/50"
            >
              <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <StatsCards stats={stats} />
        </div>

        {/* Charts */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <Charts investments={investments} stats={stats} />
        </div>

        {/* History */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
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
