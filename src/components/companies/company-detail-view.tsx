"use client";

/**
 * Company detail: timeline and latest change from GET /companies/:slug/timeline.
 */

import Link from "next/link";
import type { CompanyMeta } from "@/content/companies";
import { CompanyLogo } from "@/components/shared/company-logo";
import { ChangeTags } from "@/components/shared/change-tags";
import { ImportancePill } from "@/components/shared/importance-pill";
import { StatusPill } from "@/components/shared/status-pill";
import { PhButton } from "@/components/shared/ph-button";
import {
  EmptyState,
  QueryError,
  Shimmer,
  ShimmerCards,
} from "@/components/shared/query-state";
import { formatCategory, formatWhen } from "@/lib/companies/display";
import { useCompanyTimeline } from "@/lib/query/hooks";

export function CompanyDetailView({ company }: { company: CompanyMeta }) {
  const query = useCompanyTimeline(company.slug);

  return (
    <>
      <div className="ph-container -mt-2 pb-6">
        <div className="flex flex-wrap items-center gap-4">
          <CompanyLogo abbr={company.abbr} variant={company.logo} size="lg" />
          <div className="min-w-[180px] flex-1">
            <span className="ph-eyebrow">{formatCategory(company.category)}</span>
            <h1 className="text-4xl font-extrabold tracking-tight">{company.name}</h1>
            <p className="text-xs text-[var(--ph-muted)]">Policy record</p>
          </div>
          <PhButton href="/companies" variant="secondary">
            All companies
          </PhButton>
        </div>
      </div>

      <div className="ph-container pb-16">
        {query.isPending ? (
          <div className="space-y-4">
            <ShimmerCards />
            <Shimmer className="h-64" />
          </div>
        ) : query.isError ? (
          <QueryError
            message={query.error.message}
            onRetry={() => {
              void query.refetch();
            }}
          />
        ) : (
          <TimelineBody
            slug={company.slug}
            policyUrl={query.data.company.policyUrl}
            versions={query.data.versions}
            changes={query.data.changes}
          />
        )}
      </div>
    </>
  );
}

function TimelineBody({
  slug,
  policyUrl,
  versions,
  changes,
}: {
  slug: string;
  policyUrl: string;
  versions: {
    id: string;
    fetchedAt: string;
    isSample: boolean;
    textLength: number;
  }[];
  changes: {
    id: string;
    detectedAt: string;
    summary: string;
    whatItMeansForYou: string;
    importance: string;
    tags: string[];
    changedSections: string[];
    isSample: boolean;
  }[];
}) {
  const latest = changes[0];

  return (
    <>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="ph-card">
          <div className="text-xs text-[var(--ph-muted)]">Stored versions</div>
          <div className="mt-3 text-2xl font-extrabold">{versions.length}</div>
        </div>
        <div className="ph-card">
          <div className="text-xs text-[var(--ph-muted)]">Stored changes</div>
          <div className="mt-3 text-2xl font-extrabold">{changes.length}</div>
        </div>
        <div className="ph-card">
          <div className="text-xs text-[var(--ph-muted)]">Latest version</div>
          <div className="mt-3 text-lg font-extrabold">
            {versions[0] ? formatWhen(versions[0].fetchedAt) : "—"}
          </div>
        </div>
        <div className="ph-card">
          <div className="text-xs text-[var(--ph-muted)]">Latest importance</div>
          <div className="mt-3">
            {latest ? (
              <ImportancePill importance={latest.importance} />
            ) : (
              <StatusPill variant="never" />
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-5">
          <div className="ph-card">
            <h3 className="text-lg font-bold">Policy source</h3>
            <p className="mt-2 text-sm text-[var(--ph-muted)]">
              Opens the page PolicyHawk fetches for this company.
            </p>
            <a
              href={policyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-xl border border-[var(--ph-line)] px-4 py-2 text-sm font-bold"
            >
              View original policy <span aria-hidden>↗</span>
            </a>
          </div>
          <div className="ph-card">
            <h3 className="mb-4 text-lg font-bold">Policy version timeline</h3>
            {versions.length === 0 ? (
              <EmptyState
                title="No stored versions yet"
                description="This company has not been checked, or the first fetch has not been saved."
              />
            ) : (
              <div className="space-y-4">
                {versions.map((version, index) => (
                  <div key={version.id} className="grid grid-cols-[26px_1fr] gap-3">
                    <div
                      className={
                        index === 0
                          ? "mt-1 h-3 w-3 rounded-full bg-[var(--ph-blue)]"
                          : "mt-1 h-3 w-3 rounded-full bg-[#dfe5ed] dark:bg-[#2a394d]"
                      }
                    />
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="text-sm">{formatWhen(version.fetchedAt)}</strong>
                        {version.isSample ? <StatusPill variant="sample" /> : null}
                      </div>
                      <p className="mt-1 text-xs text-[var(--ph-muted)]">
                        {version.textLength.toLocaleString()} characters
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="ph-card">
          <h3 className="text-lg font-bold">Change examples</h3>
          {changes.length === 0 ? (
            <EmptyState
              title="No changes yet"
              description="A change appears when a new fetch differs from the previous stored version."
            />
          ) : (
            <div className="mt-4 space-y-4">
              {changes.map((change) => (
                <div key={change.id} className="rounded-xl border border-[var(--ph-line)] p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <ImportancePill importance={change.importance} />
                    {change.isSample ? <StatusPill variant="sample" /> : null}
                    <ChangeTags tags={change.tags} />
                  </div>
                  <p className="mt-2 text-sm">{change.summary}</p>
                  <p className="mt-2 text-xs text-[var(--ph-muted)]">{change.whatItMeansForYou}</p>
                  <p className="mt-2 text-[10px] text-[#8994a6]">{formatWhen(change.detectedAt)}</p>
                  <Link
                    href={`/companies/${slug}/changes/${change.id}`}
                    className="ph-link mt-3 text-xs"
                  >
                    Read full change report <span aria-hidden>→</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
