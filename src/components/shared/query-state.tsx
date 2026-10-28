/**
 * Shared loading shimmer, error, and empty panels for product queries.
 */

import { cn } from "@/lib/utils";

/** Pulsing blocks used while a list or report is loading. */
export function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-[#e6ebf2] dark:bg-[#1a2738]",
        className,
      )}
    />
  );
}

/** Card-sized placeholders for the directory and tracker stats. */
export function ShimmerCards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <Shimmer key={index} className="h-28" />
      ))}
    </div>
  );
}

/** Row placeholders for tables and timelines. */
export function ShimmerRows({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, index) => (
        <Shimmer key={index} className="h-14" />
      ))}
    </div>
  );
}

/** Shows the request error and lets the user run the query again. */
export function QueryError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#f0c9c9] bg-[#fff6f6] px-5 py-8 text-center dark:border-[#5a3038] dark:bg-[#2a1820]">
      <p className="text-sm font-bold text-[var(--ph-ink)]">Could not load this</p>
      <p className="mx-auto mt-2 max-w-md text-xs text-[var(--ph-muted)]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-xl bg-[var(--ph-navy)] px-4 py-2 text-xs font-bold text-white dark:bg-[var(--ph-lime)] dark:text-[#17211a]"
      >
        Retry
      </button>
    </div>
  );
}

/** Dashed panel for a successful response that has nothing to show. */
export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#cfd7e2] bg-[var(--ph-surface)] px-5 py-12 text-center">
      <p className="text-sm font-bold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-xs text-[var(--ph-muted)]">
        {description}
      </p>
    </div>
  );
}
