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
import { getCompanyMeta } from "@/content/companies";
import { toApiError } from "@/lib/api/client";
import type { SimulateChangeResponse } from "@/lib/api/types";
import { resetDemoSession, setDemoResult } from "@/store/demo-slice";
import { pushToast } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const WHATSAPP = getCompanyMeta("whatsapp");

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
  const { lastResult } = useAppSelector((s) => s.demo);

  const mutation = useMutation({
    mutationFn: runSimulation,
    onSuccess: (result) => {
      dispatch(setDemoResult(result));
      dispatch(pushToast("Simulated check complete."));
    },
  });

  if (!WHATSAPP) {
    return null;
  }

  return (
    <div>
      <div className="mb-5 rounded-xl border border-[#f4e2b3] bg-[#fff8e8] px-4 py-3 text-[11px] leading-relaxed text-[#926b26] dark:border-[#5a4827] dark:bg-[#2e2718] dark:text-[#efd08a]">
        A saved WhatsApp policy with extra sample clauses is compared with the live policy. The result is not saved.
      </div>

      <div className="ph-card mb-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="ph-eyebrow">
              <span className="ph-eyebrow-dot" />
              Test environment
            </span>
            <h3 className="mt-3 text-lg font-bold">{WHATSAPP.name}</h3>
            <p className="text-xs text-[var(--ph-muted)]">
              Previous version is a modified hardcoded copy. Current version is the live fetch.
            </p>
          </div>
          <StatusPill variant="simulation" />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[var(--ph-line)] p-3">
            <span className="text-[10px] text-[var(--ph-muted)]">Previous version</span>
            <strong className="mt-1 block text-xs">Hardcoded copy plus the sample clauses</strong>
          </div>
          <div className="rounded-xl border border-[var(--ph-line)] p-3">
            <span className="text-[10px] text-[var(--ph-muted)]">Current version</span>
            <strong className="mt-1 block text-xs">WhatsApp’s privacy policy, fetched now</strong>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--ph-navy)] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-45 dark:bg-[var(--ph-lime)] dark:text-[#17211a]"
          >
            <Play className="h-4 w-4" />
            {mutation.isPending ? "Fetching WhatsApp’s policy…" : "Run simulated check"}
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
          The result stays on this screen. It is not stored as a WhatsApp change.
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
          company={WHATSAPP}
          report={toChangeReport({
            summary: lastResult.summary,
            whatItMeansForYou: lastResult.whatItMeansForYou,
            importance: lastResult.importance,
            isSample: true,
            isSimulation: true,
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
