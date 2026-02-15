'use client';

import { useState, useEffect } from 'react';
import {
  getTodaysMessage,
  getOrCreateQuoteRow,
  incrementLikes,
} from '@/lib/quoteMessage';
import { Heart } from 'lucide-react';

export default function DailyQuoteCard() {
  const [quote, setQuote] = useState<{ id: number; message: string } | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const load = async () => {
      const todaysMessage = getTodaysMessage();
      setQuote(todaysMessage);

      try {
        const row = await getOrCreateQuoteRow(todaysMessage.id, new Date());
        setLikes(row?.likes ?? 0);
      } catch (error) {
        console.error('Error loading quote likes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleLike = async () => {
    if (!quote || isLiking) return;

    setIsLiking(true);
    try {
      const newCount = await incrementLikes(quote.id, new Date());
      setLikes(newCount);
    } catch (error) {
      console.error('Error liking quote:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const gradientClass =
    'bg-[linear-gradient(to_right,lab(30.6017%_56.7637_-64.4751),lab(24.9401%_45.2703_-51.2728),lab(52.0183%_66.11_-78.2316))]';

  if (isLoading || !quote) {
    return (
      <div
        className={`sticky bottom-0 z-10 flex h-14 items-center justify-center rounded-lg px-4 shadow-md ${gradientClass}`}
      >
        <p className="text-sm text-white/90">Loading today&apos;s quote...</p>
      </div>
    );
  }

  const marqueeSegment = `  🌱 "${quote.message}" 💰  `;

  return (
    <div
      className={`sticky bottom-0 z-10 flex h-14 items-center rounded-lg border-t border-white/10 shadow-md ${gradientClass}`}
      role="banner"
      aria-label="Today's motivation"
    >
      <div className="ml-4 flex min-w-0 flex-1 items-center overflow-hidden sm:ml-6 sm:mr-4">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          <i><span className="text-base font-medium text-white sm:text-[1rem]">{marqueeSegment}</span></i>
          <i><span className="text-base font-medium text-white sm:text-[1rem]">{marqueeSegment}</span></i>
        </div>
      </div>
      <button
        onClick={handleLike}
        disabled={isLiking}
        className="mr-4 flex shrink-0 items-center gap-1.5 rounded-lg border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-50 sm:mr-6"
        aria-label="Like this quote"
      >
        <Heart
          fill="currentColor"
          className="h-4 w-4 text-red-500 animate-heart-beat sm:h-5 sm:w-5 dark:text-red-400"
          aria-hidden
        />
        {likes}
      </button>
    </div>
  );
}
