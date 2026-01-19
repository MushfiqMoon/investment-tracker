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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 dark:from-gray-900 dark:to-gray-800 animate-fade-in">
      <div className="w-full max-w-md animate-slide-up">
        <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <div className="mb-6 flex items-center justify-center">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-blue-200 dark:hover:bg-blue-800 hover:shadow-lg">
              <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400 transition-all duration-300" />
            </div>
          </div>
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            Investment Tracker
          </h1>
          <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Enter your password to access the dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
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
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-md focus:shadow-blue-500/20 hover:border-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/30 dark:hover:border-blue-500"
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900 dark:text-red-200 transition-all duration-300 ease-in-out animate-fade-in-up animate-pulse-slow">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="group w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 dark:hover:shadow-blue-400/50"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <Lock className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Login
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
