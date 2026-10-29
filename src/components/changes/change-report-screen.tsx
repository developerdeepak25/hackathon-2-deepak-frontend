"use client";

/**
 * Loads one change from the API and renders the shared report layout.
 */

import type { CompanyMeta } from "@/content/companies";
import { QueryError, Shimmer } from "@/components/shared/query-state";
import { useChangeDetail } from "@/lib/query/hooks";
import { ChangeReportView, toChangeReport } from "./change-report-view";

export function ChangeReportScreen({
  company,
  changeId,
  backHref,
}: {
  company: CompanyMeta;
  changeId: string;
  backHref: string;
}) {
  const query = useChangeDetail(company.slug, changeId);

  if (query.isPending) {
    return (
      <div className="ph-container space-y-4 pb-16">
        <Shimmer className="h-48" />
        <Shimmer className="h-64" />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="ph-container pb-16">
        <QueryError
          message={query.error.message}
          onRetry={() => {
            void query.refetch();
          }}
        />
      </div>
    );
  }

  const change = query.data.change;
  return (
    <ChangeReportView
      company={company}
      backHref={backHref}
      report={toChangeReport({
        summary: change.summary,
        whatItMeansForYou: change.whatItMeansForYou,
        importance: change.importance,
        isSample: change.isSample,
        isSimulation: company.slug === "test-company",
        fromExcerpt: change.fromExcerpt,
        toExcerpt: change.toExcerpt,
        removedSpan: change.removedSpan,
        addedSpan: change.addedSpan,
        tags: change.tags,
        changedSections: change.changedSections,
        aiStatus: change.aiStatus,
      })}
    />
  );
}
