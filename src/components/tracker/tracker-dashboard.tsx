"use client";

/**
 * Tracker overview backed by the company list, recent changes, and latest job.
 */

import Link from "next/link";
import { AlertTriangle, Clock, GitCompare, Shield } from "lucide-react";
import { getCompanyMeta } from "@/content/companies";
import { CompanyLogo } from "@/components/shared/company-logo";
import { ImportancePill } from "@/components/shared/importance-pill";
import { StatusPill } from "@/components/shared/status-pill";
import {
  EmptyState,
  QueryError,
  Shimmer,
  ShimmerCards,
  ShimmerRows,
} from "@/components/shared/query-state";
import {
  companyCardStatus,
  formatCategory,
  formatWhen,
} from "@/lib/companies/display";
import {
  useCompanies,
  useLatestJob,
  useRecentChanges,
} from "@/lib/query/hooks";

export function TrackerDashboard() {
  const companies = useCompanies();
  const recent = useRecentChanges();
  const job = useLatestJob();
  const pending = companies.isPending || recent.isPending || job.isPending;
  const failed = companies.isError || recent.isError || job.isError;
  const message =
    companies.error?.message ??
    recent.error?.message ??
    job.error?.message ??
    "The tracker could not be loaded.";

  if (pending) {
    return (
      <div className="space-y-5">
        <ShimmerCards />
        <Shimmer className="h-48" />
        <ShimmerRows count={6} />
      </div>
    );
  }

  if (failed) {
    return (
      <QueryError
        message={message}
        onRetry={() => {
          void companies.refetch();
          void recent.refetch();
          void job.refetch();
        }}
      />
    );
  }

  const rows = companies.data.companies;
  const changes = recent.data.changes;
  const changeTotal = rows.reduce((sum, company) => sum + company.changeCount, 0);
  const highCount = changes.filter(
    (change) => change.importance === "high" || change.importance === "critical",
  ).length;
  const finishedAt = job.data?.finishedAt ?? null;

  return (
    <>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Tracked companies" value={String(companies.data.total)} icon={Shield} meta="MVP list" />
        <Stat label="Changes detected" value={String(changeTotal)} icon={GitCompare} meta="Stored records" />
        <Stat label="High importance" value={String(highCount)} icon={AlertTriangle} meta="In the recent feed" />
        <Stat
          label="Last tracking run"
          value={finishedAt ? formatWhen(finishedAt) : "No tracking run yet"}
          icon={Clock}
          meta={job.data ? job.data.status : "No job stored"}
          small
        />
      </div>

      <div className="ph-card mb-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">Recent policy changes</h3>
            <p className="text-xs text-[var(--ph-muted)]">Newest stored comparisons</p>
          </div>
        </div>
        {changes.length === 0 ? (
          <EmptyState
            title="No change reports yet"
            description="Sample examples are labeled. A live report appears after a daily check finds a difference."
          />
        ) : (
          <div className="space-y-3">
            {changes.map((change) => {
              const meta = getCompanyMeta(change.companySlug);
              return (
              <Link
                key={change.id}
                href={`/companies/${change.companySlug}/changes/${change.id}`}
                className="block rounded-xl border border-[var(--ph-line)] px-4 py-3 hover:bg-[#fbfcfe] dark:hover:bg-[#152338]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <CompanyLogo
                      abbr={meta?.abbr ?? change.companyName.slice(0, 2)}
                      variant={meta?.logo ?? "x"}
                      size="sm"
                    />
                    <strong className="text-sm">{change.companyName}</strong>
                    {change.isSample ? <StatusPill variant="sample" /> : null}
                  </div>
                  <ImportancePill importance={change.importance} />
                </div>
                <p className="mt-2 text-sm">{change.summary}</p>
                <p className="mt-1 text-xs text-[var(--ph-muted)]">{change.whatItMeansForYou}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {change.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-md bg-[#f0f3f8] px-2 py-1 text-[10px] font-bold text-[#68758a] dark:bg-[#202c3e] dark:text-[#b8c5d7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-[#8994a6]">
                  {formatWhen(change.detectedAt)}
                  {change.aiStatus === "fallback" ? " · Summary unavailable" : ""}
                </p>
              </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="ph-card">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">All tracked companies</h3>
            <p className="text-xs text-[var(--ph-muted)]">The 10 companies included in this MVP</p>
          </div>
          <span className="ph-pill ph-pill-neutral">{rows.length} companies</span>
        </div>
        {rows.length === 0 ? (
          <EmptyState
            title="No companies yet"
            description="Seed the API to populate this table."
          />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[var(--ph-line)]">
            <table className="min-w-[700px] w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--ph-line)] bg-[#f8fafc] dark:bg-[#0d1726]">
                  {["Company", "Category", "Policy status", "Last checked", ""].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wide text-[#8a96a8]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((company) => {
                  const meta = getCompanyMeta(company.slug);
                  return (
                    <tr
                      key={company.slug}
                      className="border-b border-[#edf0f4] hover:bg-[#fbfcfe] dark:border-[#29384d] dark:hover:bg-[#152338]"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <CompanyLogo
                            abbr={meta?.abbr ?? company.name.slice(0, 2)}
                            variant={meta?.logo ?? "x"}
                            size="sm"
                          />
                          <strong>{company.name}</strong>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[var(--ph-muted)]">
                        {formatCategory(company.category)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill variant={companyCardStatus(company)} />
                      </td>
                      <td className="px-4 py-3 text-[var(--ph-muted)]">
                        {formatWhen(company.lastCheckedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/companies/${company.slug}`}
                          className="font-bold text-[#4156d8] dark:text-[#a9b6ff]"
                        >
                          Open →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  meta,
  small,
}: {
  label: string;
  value: string;
  icon: typeof Shield;
  meta: string;
  small?: boolean;
}) {
  return (
    <div className="ph-card">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--ph-muted)]">{label}</span>
        <Icon className="h-4 w-4 text-[var(--ph-muted)]" />
      </div>
      <div className={small ? "mt-4 text-lg font-extrabold" : "mt-4 text-3xl font-extrabold"}>
        {value}
      </div>
      <div className="mt-1 text-[11px] text-[#8994a6]">{meta}</div>
    </div>
  );
}
