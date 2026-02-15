'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as unknown as { MSStream?: boolean }).MSStream
    );
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (isStandalone) return null;

  return (
    <div className="border-b border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-900 dark:bg-blue-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
            <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Add to Home Screen
            </p>
            {isIOS ? (
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Tap the share button and then &quot;Add to Home Screen&quot; to
                open this app like a native app.
              </p>
            ) : (
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Install this app on your device for quick access.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
