"use client";

/**
 * Company directory grid with search and category/status filters (UI-first static list).
 */

import Link from "next/link";
import { Search } from "lucide-react";
import { MVP_COMPANIES } from "@/content/companies";
import { CompanyLogo } from "@/components/shared/company-logo";
import { StatusPill } from "@/components/shared/status-pill";
import { formatCategory } from "@/lib/companies/display";
import {
  setDirectoryCategory,
  setDirectorySearch,
  setDirectoryStatus,
} from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import type { DirectoryStatusFilter } from "@/lib/companies/display";

const categories = [
  "all",
  "messaging",
  "workplace",
  "social",
  "streaming",
] as const;

/** Filters the static MVP list until live API rows are merged in. */
export function CompanyDirectory() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((s) => s.ui.directorySearch);
  const category = useAppSelector((s) => s.ui.directoryCategory);
  const statusFilter = useAppSelector((s) => s.ui.directoryStatus);

  const filtered = MVP_COMPANIES.filter((c) => {
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.includes(search.toLowerCase());
    const matchesCategory = category === "all" || c.category === category;
    const matchesStatus =
      statusFilter === "all" || statusFilter === "never";
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Configured companies", value: "10", meta: "Fixed MVP list" },
          {
            label: "Confirmed live changes",
            value: "—",
            meta: "Connect API for totals",
          },
          {
            label: "Latest successful fetch",
            value: "—",
            meta: "Shown when backend runs",
          },
          {
            label: "Importance levels",
            value: "4",
            meta: "Low · Medium · High · Critical",
          },
        ].map((stat) => (
          <div key={stat.label} className="ph-card">
            <div className="text-3xl font-extrabold tracking-tight">
              {stat.value}
            </div>
            <div className="mt-2 text-xs text-[var(--ph-muted)]">{stat.label}</div>
            <div className="mt-1 text-[11px] text-[#8994a6]">{stat.meta}</div>
          </div>
        ))}
      </div>

      <div className="mb-5 rounded-xl border border-[#f4e2b3] bg-[#fff8e8] px-4 py-3 text-[11px] text-[#926b26] dark:border-[#5a4827] dark:bg-[#2e2718] dark:text-[#efd08a]">
        Cards show layout and filters. Live fetch status and change counts appear
        here once the directory is wired to the API.
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#8b96a7]" />
          <input
            value={search}
            onChange={(e) => dispatch(setDirectorySearch(e.target.value))}
            placeholder="Search by company name..."
            aria-label="Search companies"
            className="w-full rounded-xl border border-[var(--ph-line)] bg-[var(--ph-surface)] py-3 pr-3 pl-10 text-[var(--ph-ink)] outline-none focus:border-[#8798f4] focus:ring-[3px] focus:ring-[rgba(82,105,239,0.1)]"
          />
        </div>
        <span className="text-xs text-[var(--ph-muted)]">
          {filtered.length} compan{filtered.length === 1 ? "y" : "ies"}
        </span>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => dispatch(setDirectoryCategory(cat))}
            className={cn(
              "rounded-full border border-[var(--ph-line)] px-3 py-2 text-[11px] font-bold capitalize",
              category === cat
                ? "border-[var(--ph-navy)] bg-[var(--ph-navy)] text-white dark:border-[var(--ph-lime)] dark:bg-[var(--ph-lime)] dark:text-[#182219]"
                : "bg-[var(--ph-surface)] text-[#65738a]",
            )}
          >
            {cat === "all" ? "All companies" : formatCategory(cat)}
          </button>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {(
          [
            ["all", "All statuses"],
            ["never", "Not checked"],
            ["unchanged", "Unchanged"],
            ["changed", "Changed"],
            ["failed", "Check failed"],
          ] as [DirectoryStatusFilter, string][]
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => dispatch(setDirectoryStatus(value))}
            className={cn(
              "rounded-full border border-[var(--ph-line)] px-3 py-2 text-[11px] font-bold",
              statusFilter === value
                ? "border-[var(--ph-navy)] bg-[var(--ph-navy)] text-white dark:border-[var(--ph-lime)] dark:bg-[var(--ph-lime)] dark:text-[#182219]"
                : "bg-[var(--ph-surface)] text-[#65738a]",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            href={`/companies/${c.slug}`}
            className="ph-card block min-h-[192px] transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <CompanyLogo abbr={c.abbr} variant={c.logo} />
              <div>
                <h4 className="text-sm font-bold">{c.name}</h4>
                <p className="text-[11px] text-[#8792a4]">
                  {formatCategory(c.category)}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-[#edf0f4] pt-3 dark:border-[#29384d]">
              <span className="text-[10px] text-[#7b8798]">Awaiting API status</span>
              <StatusPill variant="never" />
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-[#cfd7e2] bg-[var(--ph-surface)] py-12 text-center text-[#8190a2]">
          No companies match your search or filters.
        </div>
      )}
    </>
  );
}
