'use client';

interface PageLoaderProps {
  message?: string;
}

export default function PageLoader({ message = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="flex min-h-screen items-center justify-center animate-fade-in">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent transition-colors duration-300" />
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 animate-pulse-slow">
          {message}
        </p>
      </div>
    </div>
  );
}
