'use client';

import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function AccountError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <div className="max-w-md">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--accent)]">
          Dammy T &amp; Motion Wears
        </p>
        <h1 className="display mt-4 text-4xl">Account Unavailable</h1>
        <p className="mt-4 text-sm text-[#777]">
          We encountered an issue loading your account details. Please sign in or try again.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/auth/signin?callbackUrl=/account"
            className="inline-block bg-[var(--ink)] px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-white"
          >
            Sign in
          </Link>
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 border border-[var(--line)] px-6 py-3 text-[11px] font-bold uppercase tracking-widest"
          >
            <RefreshCw size={14} /> Try again
          </button>
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-xs text-[#666] underline"
        >
          <ArrowLeft size={14} /> Back to shop
        </Link>
      </div>
    </main>
  );
}
