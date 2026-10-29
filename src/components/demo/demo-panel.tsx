"use client";

/**
 * Demo panel: one live simulated check, rendered with the same report as a stored change.
 */

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Play, RotateCcw } from "lucide-react";
import { ChangeReportView, toChangeReport } from "@/components/changes/change-report-view";
import { QueryError, Shimmer } from "@/components/shared/query-state";
import { StatusPill } from "@/components/shared/status-pill";
import { TEST_COMPANY } from "@/content/companies";
import { toApiError } from "@/lib/api/client";
import type { SimulateChangeResponse } from "@/lib/api/types";
import { resetDemoSession, setDemoResult } from "@/store/demo-slice";
import { pushToast } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const PRIOR_EXCERPT =
  "We collect account information to provide and maintain our services. We do not use private messages for advertising.";

/** Calls the Next.js proxy, which holds the job secret. */
async function runSimulation(): Promise<SimulateChangeResponse> {
  try {
    const response = await axios.post<SimulateChangeResponse>("/api/demo/simulate");
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export function DemoPanel() {
  const dispatch = useAppDispatch();
  const { checksRun, lastResult } = useAppSelector((s) => s.demo);

  const mutation = useMutation({
    mutationFn: runSimulation,
    onSuccess: (result) => {
      dispatch(setDemoResult(result));
      dispatch(pushToast("Simulated check complete."));
    },
  });

  return (
    <div>
      <div className="ph-card mb-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="ph-eyebrow">
              <span className="ph-eyebrow-dot" />
              Test environment
            </span>
            <h3 className="mt-3 text-lg font-bold">{TEST_COMPANY.name}</h3>
            <p className="text-xs text-[var(--ph-muted)]">
              Demo-only · Not one of the 10 daily tracked companies
            </p>
          </div>
          <StatusPill variant="simulation" />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[var(--ph-line)] p-3">
            <span className="text-[10px] text-[var(--ph-muted)]">Live policy</span>
            <strong className="mt-1 block text-xs">Fetched on each check</strong>
          </div>
          <div className="rounded-xl border border-[var(--ph-line)] p-3">
            <span className="text-[10px] text-[var(--ph-muted)]">Simulated checks</span>
            <strong className="mt-1 block text-xs">{checksRun}</strong>
          </div>
        </div>

        <h4 className="text-sm font-bold">Predefined prior version</h4>
        <div className="my-3 rounded-xl border border-[#e7ecf2] bg-[#f8fafc] p-4 text-xs leading-relaxed text-[#526078] dark:border-[#2b3b50] dark:bg-[#0c1625] dark:text-[#c0ccdc]">
          {PRIOR_EXCERPT}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--ph-navy)] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-45 dark:bg-[var(--ph-lime)] dark:text-[#17211a]"
          >
            <Play className="h-4 w-4" />
            {mutation.isPending ? "Checking live policy…" : "Run simulated check"}
          </button>
          <button
            type="button"
            onClick={() => {
              mutation.reset();
              dispatch(resetDemoSession());
              dispatch(pushToast("Demo session reset."));
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--ph-line)] px-4 py-2.5 text-sm font-bold"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
        <p className="mt-3 text-[11px] text-[var(--ph-muted)]">
          The result stays on this screen only. It is not saved as a tracked change.
        </p>
      </div>

      {mutation.isPending ? (
        <div className="space-y-4">
          <Shimmer className="h-48" />
          <Shimmer className="h-64" />
        </div>
      ) : null}

      {mutation.isError ? (
        <QueryError
          message={mutation.error.message}
          onRetry={() => mutation.mutate()}
        />
      ) : null}

      {lastResult && !mutation.isPending ? (
        <ChangeReportView
          embedded
          company={TEST_COMPANY}
          backHref="/demo"
          report={toChangeReport({
            summary: lastResult.summary,
            whatItMeansForYou: lastResult.whatItMeansForYou,
            importance: lastResult.importance,
            isSample: false,
            isSimulation: false,
            fromExcerpt: lastResult.fromExcerpt,
            toExcerpt: lastResult.toExcerpt,
            removedSpan: lastResult.removedSpan,
            addedSpan: lastResult.addedSpan,
            tags: lastResult.tags,
            changedSections: lastResult.changedSections,
            aiStatus: lastResult.aiStatus,
          })}
        />
      ) : null}
    </div>
  );
}
