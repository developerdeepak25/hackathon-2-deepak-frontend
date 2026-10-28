/**
 * Global not-found page (minimal chrome, no Redux prerender).
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="ph-container flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
      <span className="ph-eyebrow">
        <span className="ph-eyebrow-dot" />
        Page not found
      </span>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-3 max-w-md text-[var(--ph-muted)]">
        Return to the tracker or browse the configured companies.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex rounded-xl bg-[var(--ph-lime)] px-4 py-2.5 text-sm font-bold text-[#17211a]"
        >
          Go home
        </Link>
        <Link
          href="/companies"
          className="inline-flex rounded-xl border border-[var(--ph-line)] px-4 py-2.5 text-sm font-bold"
        >
          Companies
        </Link>
      </div>
    </div>
  );
}
