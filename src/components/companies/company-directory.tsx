"use client";

/**
 * Company directory loaded from GET /companies, with search and filters in Redux.
 */

import Link from "next/link";
import { Search } from "lucide-react";
import { getCompanyMeta } from "@/content/companies";
import { CompanyLogo } from "@/components/shared/company-logo";
import { StatusPill } from "@/components/shared/status-pill";
import {
  EmptyState,
  QueryError,
  Shimmer,
  ShimmerCards,
} from "@/components/shared/query-state";
import {
  companyCardStatus,
  formatCategory,
  formatWhen,
  type DirectoryStatusFilter,
} from "@/lib/companies/display";
import type { CompanyListEntry } from "@/lib/api/types";
import { useCompanies } from "@/lib/query/hooks";
import {
  setDirectoryCategory,
  setDirectorySearch,
  setDirectoryStatus,
} from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";

const categories = [
  "all",
  "messaging",
  "workplace",
  "social",
  "streaming",
] as const;

const statusFilters: [DirectoryStatusFilter, string][] = [
  ["all", "All statuses"],
  ["never", "Not checked"],
  ["unchanged", "Unchanged"],
  ["changed", "Changed"],
  ["failed", "Check failed"],
];

/** Keeps a company when it matches the current search, category, and status. */
function matchesFilters(
  company: CompanyListEntry,
  search: string,
  category: string,
  statusFilter: DirectoryStatusFilter,
): boolean {
  const term = search.toLowerCase();
  const matchesSearch =
    !term ||
    company.name.toLowerCase().includes(term) ||
    company.slug.includes(term);
  const matchesCategory = category === "all" || company.category === category;
  const status = companyCardStatus(company);
  const matchesStatus = statusFilter === "all" || status === statusFilter;
  return matchesSearch && matchesCategory && matchesStatus;
}

export function CompanyDirectory() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((s) => s.ui.directorySearch);
  const category = useAppSelector((s) => s.ui.directoryCategory);
  const statusFilter = useAppSelector((s) => s.ui.directoryStatus);
  const query = useCompanies();

  if (query.isPending) {
    return (
      <div className="space-y-4">
        <ShimmerCards />
        <Shimmer className="h-12" />
        <ShimmerCards count={6} />
      </div>
    );
  }

  if (query.isError) {
    return (
      <QueryError
        message={query.error.message}
        onRetry={() => {
          void query.refetch();
        }}
      />
    );
  }

  const companies = query.data.companies;
  const filtered = companies.filter((company) =>
    matchesFilters(company, search, category, statusFilter),
  );
  const withChanges = companies.filter((company) => company.changeCount > 0).length;
  const latestCheck = companies.reduce<string | null>((latest, company) => {
    if (!company.lastCheckedAt) return latest;
    if (!latest || company.lastCheckedAt > latest) return company.lastCheckedAt;
    return latest;
  }, null);

  return (
    <>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Tracked companies" value={String(query.data.total)} meta="From the API" />
        <Stat label="Companies with changes" value={String(withChanges)} meta="Stored change records" />
        <Stat label="Latest successful fetch" value={formatWhen(latestCheck)} meta="Newest lastCheckedAt" small />
        <Stat label="Importance levels" value="4" meta="Low · Medium · High · Critical" />
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#8b96a7]" />
          <input
            value={search}
            onChange={(event) => dispatch(setDirectorySearch(event.target.value))}
            placeholder="Search by company name..."
            aria-label="Search companies"
            className="w-full rounded-xl border border-[var(--ph-line)] bg-[var(--ph-surface)] py-3 pr-3 pl-10 text-[var(--ph-ink)] outline-none focus:border-[#8798f4]"
          />
        </div>
        <span className="text-xs text-[var(--ph-muted)]">
          {filtered.length} compan{filtered.length === 1 ? "y" : "ies"}
        </span>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((item) => (
          <FilterChip
            key={item}
            active={category === item}
            onClick={() => dispatch(setDirectoryCategory(item))}
            label={item === "all" ? "All companies" : formatCategory(item)}
          />
        ))}
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {statusFilters.map(([value, label]) => (
          <FilterChip
            key={value}
            active={statusFilter === value}
            onClick={() => dispatch(setDirectoryStatus(value))}
            label={label}
          />
        ))}
      </div>

      {companies.length === 0 ? (
        <EmptyState
          title="No companies yet"
          description="The tracker has no active companies. Seed the API and refresh."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No companies match"
          description="Try another name, category, or status. This is a filter result, not an API error."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company) => {
            const meta = getCompanyMeta(company.slug);
            return (
              <Link
                key={company.slug}
                href={`/companies/${company.slug}`}
                className="ph-card block min-h-[192px] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <CompanyLogo
                    abbr={meta?.abbr ?? company.name.slice(0, 2)}
                    variant={meta?.logo ?? "x"}
                  />
                  <div>
                    <h4 className="text-sm font-bold">{company.name}</h4>
                    <p className="text-[11px] text-[#8792a4]">
                      {formatCategory(company.category)}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#edf0f4] pt-3 dark:border-[#29384d]">
                  <span className="text-[10px] text-[#7b8798]">
                    {formatWhen(company.lastCheckedAt)}
                  </span>
                  <StatusPill variant={companyCardStatus(company)} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

function Stat({
  label,
  value,
  meta,
  small,
}: {
  label: string;
  value: string;
  meta: string;
  small?: boolean;
}) {
  return (
    <div className="ph-card">
      <div className={cn("font-extrabold tracking-tight", small ? "text-lg" : "text-3xl")}>
        {value}
      </div>
      <div className="mt-2 text-xs text-[var(--ph-muted)]">{label}</div>
      <div className="mt-1 text-[11px] text-[#8994a6]">{meta}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border border-[var(--ph-line)] px-3 py-2 text-[11px] font-bold",
        active
          ? "border-[var(--ph-navy)] bg-[var(--ph-navy)] text-white dark:border-[var(--ph-lime)] dark:bg-[var(--ph-lime)] dark:text-[#182219]"
          : "bg-[var(--ph-surface)] text-[#65738a]",
      )}
    >
      {label}
    </button>
  );
}
