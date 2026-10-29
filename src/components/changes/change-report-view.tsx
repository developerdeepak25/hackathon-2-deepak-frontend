"use client";

/**
 * Shared change report layout with side-by-side and stacked diff tabs.
 */

import { useState } from "react";
import type { CompanyMeta } from "@/content/companies";
import { ChangeTags } from "@/components/shared/change-tags";
import { CompanyLogo } from "@/components/shared/company-logo";
import { ImportancePill } from "@/components/shared/importance-pill";
import { formatWhen } from "@/lib/companies/display";
import { cn } from "@/lib/utils";
import type { AiStatus, Importance } from "@/lib/api/types";

export interface ChangeReportData {
  title: string;
  summary: string;
  whatItMeans: string;
  importance: Importance;
  isSample: boolean;
  isSimulation: boolean;
  fromLabel: string;
  toLabel: string;
  oldExcerpt: string;
  newExcerpt: string;
  removedSpan: string;
  addedSpan: string;
  tags: string[];
  changedSections: string[];
  detectedAt: string | null;
  aiStatus: AiStatus;
}

/** Maps API change fields into the report layout used by stored changes and the demo. */
export function toChangeReport(input: {
  summary: string;
  whatItMeansForYou: string;
  importance: Importance;
  isSample: boolean;
  isSimulation: boolean;
  fromExcerpt: string;
  toExcerpt: string;
  removedSpan: string;
  addedSpan: string;
  tags: string[];
  changedSections: string[];
  aiStatus: AiStatus;
  detectedAt?: string | null;
  fromLabel?: string;
  toLabel?: string;
}): ChangeReportData {
  return {
    title: input.summary,
    summary: input.summary,
    whatItMeans: input.whatItMeansForYou,
    importance: input.importance,
    isSample: input.isSample,
    isSimulation: input.isSimulation,
    fromLabel: input.fromLabel ?? "Previous version",
    toLabel: input.toLabel ?? "Current version",
    oldExcerpt: input.fromExcerpt,
    newExcerpt: input.toExcerpt,
    removedSpan: input.removedSpan,
    addedSpan: input.addedSpan,
    tags: input.tags,
    changedSections: input.changedSections,
    detectedAt: input.detectedAt ?? null,
    aiStatus: input.aiStatus,
  };
}

/** Renders the navy report header and diff panels from the prototype. */
export function ChangeReportView({
  company,
  report,
  embedded = false,
}: {
  company: CompanyMeta;
  report: ChangeReportData;
  embedded?: boolean;
}) {
  const [stacked, setStacked] = useState(false);
  const labels = [
    ...report.tags,
    ...report.changedSections.filter((section) => !report.tags.includes(section)),
  ];

  return (
    <div className={embedded ? undefined : "ph-container pb-16"}>
      <div className="relative mb-5 overflow-hidden rounded-[22px] bg-[var(--ph-navy)] px-6 py-6 text-white dark:border dark:border-[#2b3b50] dark:bg-[#111d2f]">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <CompanyLogo abbr={company.abbr} variant={company.logo} size="sm" />
            <span className="text-sm font-bold text-white">{company.name}</span>
            <span className="ph-pill ph-pill-blue">
              {report.isSimulation ? "Simulation result" : report.isSample ? "Sample example" : "Change report"}
            </span>
          </div>
          <ImportancePill importance={report.importance} />
        </div>
        <ChangeTags tags={labels} onDark className="relative z-10 mt-3" />
        {report.detectedAt ? (
          <p className="relative z-10 mt-3 text-xs text-[#aeb9c9]">
            Detected {formatWhen(report.detectedAt)}
          </p>
        ) : null}
      </div>

      {report.aiStatus === "fallback" ? (
        <div className="mb-5 rounded-xl border border-[#f4e2b3] bg-[#fff8e8] px-4 py-3 text-[11px] text-[#926b26] dark:border-[#5a4827] dark:bg-[#2e2718] dark:text-[#efd08a]">
          The model did not write this summary.
        </div>
      ) : null}

      <div className="mb-5 grid gap-4 md:grid-cols-2">
        <div className="ph-card">
          <h2 className="text-sm font-bold">What changed?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ph-ink)]">{report.summary}</p>
        </div>
        <div className="ph-card">
          <h2 className="text-sm font-bold">Why it may matter</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ph-muted)]">{report.whatItMeans}</p>
        </div>
      </div>

      <div className="ph-card mb-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">Policy text comparison</h3>
            <p className="text-xs text-[var(--ph-muted)]">
              Sentences that differ. Unchanged policy text is left out.
            </p>
          </div>
        </div>
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            className={cn(
              "rounded-lg px-3 py-2 text-[11px] font-bold",
              !stacked
                ? "border border-[var(--ph-line)] bg-[var(--ph-surface)] shadow-sm"
                : "bg-[#f2f4f8] text-[#758196] dark:bg-[#1a2639] dark:text-[#a6b4c9]",
            )}
            onClick={() => setStacked(false)}
          >
            Side by side
          </button>
          <button
            type="button"
            className={cn(
              "rounded-lg px-3 py-2 text-[11px] font-bold",
              stacked
                ? "border border-[var(--ph-line)] bg-[var(--ph-surface)] shadow-sm"
                : "bg-[#f2f4f8] text-[#758196] dark:bg-[#1a2639] dark:text-[#a6b4c9]",
            )}
            onClick={() => setStacked(true)}
          >
            Stacked view
          </button>
        </div>
        <div
          className={cn(
            "grid gap-3",
            stacked ? "grid-cols-1" : "md:grid-cols-2",
          )}
        >
          <DiffPanel
            label={report.fromLabel}
            text={report.removedSpan}
            tone="removed"
            empty="Nothing was removed."
          />
          <DiffPanel
            label={report.toLabel}
            text={report.addedSpan}
            tone="added"
            empty="Nothing was added."
          />
        </div>
      </div>
    </div>
  );
}

function DiffPanel({
  label,
  text,
  tone,
  empty,
}: {
  label: string;
  text: string;
  tone: "removed" | "added";
  empty: string;
}) {
  const sentences = text
    .split(/\n\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--ph-line)] bg-[var(--ph-surface)]">
      <div className="border-b border-[var(--ph-line)] bg-[#f8fafc] px-4 py-3 text-[11px] font-extrabold dark:bg-[#0e1827]">
        {label}
      </div>
      <div className="max-h-72 space-y-2 overflow-y-auto p-4 text-[13px] leading-relaxed break-words text-[#526078] dark:text-[#b8c5d7]">
        {sentences.length > 0 ? (
          sentences.map((sentence) => (
            <p
              key={sentence}
              className={cn(
                "rounded-lg px-3 py-2",
                tone === "removed"
                  ? "bg-[#ffe5e5] text-[#a33c3c] dark:bg-[#4a2931] dark:text-[#ffb5b5]"
                  : "bg-[#dbf8e3] text-[#18764b] dark:bg-[#174331] dark:text-[#a1f0c2]",
              )}
            >
              {sentence}
            </p>
          ))
        ) : (
          <p className="text-[var(--ph-muted)]">{empty}</p>
        )}
      </div>
    </div>
  );
}
