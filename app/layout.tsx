import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InstallPrompt from "@/components/InstallPrompt";
import DailyQuoteCard from "@/components/DailyQuoteCard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investment Tracker",
  description: "Track your shared investments",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InstallPrompt />
        <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-4 bg-gray-50 dark:bg-gray-900">
          {children}
          <DailyQuoteCard />
        </div>
      </body>
    </html>
  );
}
