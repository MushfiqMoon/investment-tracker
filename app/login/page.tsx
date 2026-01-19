'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate, setUserSession, getUserSession } from '@/lib/auth';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const user = getUserSession();
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = authenticate(password);
    if (user) {
      setUserSession(user);
      router.push('/dashboard');
      return;
    }

    // If password doesn't match
    setError('Invalid password. Please try again.');
    setPassword('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
          <div className="mb-6 flex items-center justify-center">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
              <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Investment Tracker
          </h1>
          <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your password to access the dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900 dark:text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
