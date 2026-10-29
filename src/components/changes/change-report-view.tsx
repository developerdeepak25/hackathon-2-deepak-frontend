"use client";

/**
 * Shared change report layout with side-by-side and stacked diff tabs.
 */

import { useState } from "react";
import Link from "next/link";
import type { CompanyMeta } from "@/content/companies";
import { CompanyLogo } from "@/components/shared/company-logo";
import { ImportancePill } from "@/components/shared/importance-pill";
import { PhButton } from "@/components/shared/ph-button";
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
    fromLabel: input.fromLabel ?? "Previous",
    toLabel: input.toLabel ?? "Current",
    oldExcerpt: input.fromExcerpt,
    newExcerpt: input.toExcerpt,
    removedSpan: input.removedSpan,
    addedSpan: input.addedSpan,
    tags: input.tags.length > 0 ? input.tags : input.changedSections,
    aiStatus: input.aiStatus,
  };
}

/** Renders the navy report header and diff panels from the prototype. */
export function ChangeReportView({
  company,
  report,
  backHref,
  embedded = false,
}: {
  company: CompanyMeta;
  report: ChangeReportData;
  backHref: string;
  embedded?: boolean;
}) {
  const [stacked, setStacked] = useState(false);

  return (
    <div className={embedded ? undefined : "ph-container pb-16"}>
      <div className="relative mb-5 overflow-hidden rounded-[22px] bg-[var(--ph-navy)] px-6 py-7 text-white dark:border dark:border-[#2b3b50] dark:bg-[#111d2f]">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <CompanyLogo abbr={company.abbr} variant={company.logo} size="sm" />
            <span className="text-xs font-bold text-[#c0cbd9]">{company.name}</span>
            <span className="ph-pill ph-pill-blue">
              {report.isSimulation ? "Simulation result" : report.isSample ? "Sample report" : "Change report"}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{report.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#bac5d5]">{report.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-[#aeb9c9]">
            <span>
              {report.fromLabel} → {report.toLabel}
            </span>
            <span>·</span>
            <ImportancePill importance={report.importance} />
          </div>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-[#f4e2b3] bg-[#fff8e8] px-4 py-3 text-[11px] text-[#926b26] dark:border-[#5a4827] dark:bg-[#2e2718] dark:text-[#efd08a]">
        {report.isSimulation
          ? "Simulated result from the test company. Not a verified change to a tracked company's live policy."
          : "Review the complete policy source before drawing conclusions. This summary is not legal advice."}
        {report.aiStatus === "fallback" ? ` ${report.whatItMeans}` : ""}
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-2">
        <div className="ph-card">
          <h3 className="text-base font-bold">What changed?</h3>
          <p className="mt-2 text-sm text-[var(--ph-muted)]">{report.summary}</p>
        </div>
        <div className="ph-card">
          <h3 className="text-base font-bold">Why it may matter</h3>
          <p className="mt-2 text-sm text-[var(--ph-muted)]">{report.whatItMeans}</p>
        </div>
      </div>

      <div className="ph-card mb-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">Policy text comparison</h3>
            <p className="text-xs text-[var(--ph-muted)]">
              Excerpts around changed spans — not the full policy document.
            </p>
          </div>
          <span className="ph-pill ph-pill-blue">Excerpt view</span>
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
          <DiffPanel label="Previous version" version={report.fromLabel} body={report.oldExcerpt} removed={report.removedSpan} />
          <DiffPanel label="New version" version={report.toLabel} body={report.newExcerpt} added={report.addedSpan} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="ph-card">
          <h3 className="text-base font-bold">Change categories</h3>
          <div className="mt-3 flex flex-wrap gap-1">
            {report.tags.map((t) => (
              <span
                key={t}
                className="inline-flex rounded-md bg-[#f0f3f8] px-2 py-1.5 text-[10px] font-bold text-[#68758a] dark:bg-[#202c3e] dark:text-[#b8c5d7]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="ph-card">
          <h3 className="text-base font-bold">Report details</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <PhButton href={backHref} variant="secondary">
              Back
            </PhButton>
            <PhButton href="/companies" variant="secondary">
              All companies
            </PhButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiffPanel({
  label,
  version,
  body,
  removed,
  added,
}: {
  label: string;
  version: string;
  body: string;
  removed?: string;
  added?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--ph-line)] bg-[var(--ph-surface)]">
      <div className="flex items-center justify-between border-b border-[var(--ph-line)] bg-[#f8fafc] px-4 py-3 text-[11px] font-extrabold dark:bg-[#0e1827]">
        <span>{label.toUpperCase()}</span>
        <span className="ph-pill ph-pill-neutral">{version}</span>
      </div>
      <div className="min-h-[120px] p-4 font-mono text-[11px] leading-loose break-words text-[#526078] dark:text-[#b8c5d7]">
        <span>{body}</span>
        {removed && (
          <>
            <br />
            <br />
            <span className="rounded bg-[#ffe5e5] px-1 text-[#a33c3c] dark:bg-[#4a2931] dark:text-[#ffb5b5]">
              {removed}
            </span>
          </>
        )}
        {added && (
          <>
            <br />
            <br />
            <span className="rounded bg-[#dbf8e3] px-1 text-[#18764b] dark:bg-[#174331] dark:text-[#a1f0c2]">
              {added}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
