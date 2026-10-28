"use client";

/**
 * Demo panel: one live simulated check through the server proxy.
 */

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { GitCompare, Play, RotateCcw } from "lucide-react";
import { TEST_COMPANY } from "@/content/companies";
import { ImportancePill } from "@/components/shared/importance-pill";
import { QueryError, Shimmer } from "@/components/shared/query-state";
import { StatusPill } from "@/components/shared/status-pill";
import { toApiError } from "@/lib/api/client";
import type { SimulateChangeResponse } from "@/lib/api/types";
import { queryKeys } from "@/lib/query/keys";
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
  const queryClient = useQueryClient();
  const { checksRun, lastResult } = useAppSelector((s) => s.demo);

  const mutation = useMutation({
    mutationFn: runSimulation,
    onSuccess: (result) => {
      dispatch(
        setDemoResult({
          summary: result.summary,
          whatItMeans: result.whatItMeansForYou,
          importance: result.importance,
          oldExcerpt: result.fromExcerpt,
          newExcerpt: result.toExcerpt,
          removedSpan: result.removedSpan,
          addedSpan: result.addedSpan,
          changeId: result.changeId,
          aiStatus: result.aiStatus,
          aiNotice: result.aiNotice,
        }),
      );
      void queryClient.invalidateQueries({
        queryKey: queryKeys.companyTimeline("test-company"),
      });
      dispatch(pushToast("Simulated check complete."));
    },
  });

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="ph-card">
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
          Reset clears this screen. Sample rows already stored stay labeled as sample.
        </p>
      </div>

      <div className="ph-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Latest check result</h3>
            <p className="text-xs text-[var(--ph-muted)]">
              Appears here after a check completes
            </p>
          </div>
          {lastResult ? (
            <span className="ph-pill ph-pill-green">Complete</span>
          ) : (
            <span className="ph-pill ph-pill-neutral">Waiting</span>
          )}
        </div>

        {mutation.isPending ? (
          <div className="space-y-3">
            <Shimmer className="h-8 w-40" />
            <Shimmer className="h-24" />
            <Shimmer className="h-20" />
          </div>
        ) : mutation.isError ? (
          <QueryError
            message={mutation.error.message}
            onRetry={() => mutation.mutate()}
          />
        ) : lastResult ? (
          <div className="rounded-2xl border border-[#cfe9d8] bg-[#f8fffa] p-4 dark:border-[#285440] dark:bg-[#10261f]">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-bold">{lastResult.summary}</h3>
              <ImportancePill importance={lastResult.importance} />
            </div>
            {lastResult.whatItMeans !== lastResult.aiNotice ? (
              <p className="mt-2 text-xs text-[#5f7568] dark:text-[#b0d0bc]">
                {lastResult.whatItMeans}
              </p>
            ) : null}
            {lastResult.aiNotice ? (
              <p className="mt-2 text-[11px] text-[#926b26]">{lastResult.aiNotice}</p>
            ) : null}
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <div className="rounded-lg border border-[#e1efe5] bg-white p-3 text-[11px] dark:border-[#285440] dark:bg-[#0d1c18]">
                <span className="text-[10px] text-[#809188]">Removed</span>
                <p className="mt-1 leading-relaxed">{lastResult.removedSpan || "—"}</p>
              </div>
              <div className="rounded-lg border border-[#e1efe5] bg-white p-3 text-[11px] dark:border-[#285440] dark:bg-[#0d1c18]">
                <span className="text-[10px] text-[#809188]">Added</span>
                <p className="mt-1 leading-relaxed">{lastResult.addedSpan || "—"}</p>
              </div>
            </div>
            <Link
              href={`/companies/test-company/changes/${lastResult.changeId}`}
              className="ph-link mt-4 text-xs"
            >
              Open full change report <span aria-hidden>→</span>
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#d6dee8] bg-[#fafbfd] py-10 text-center dark:border-[#35465d] dark:bg-[#0e1827]">
            <GitCompare className="mx-auto mb-3 h-8 w-8 text-[#4355cf]" />
            <h3 className="text-base font-bold">Ready to compare</h3>
            <p className="mx-auto mt-2 max-w-xs text-xs text-[var(--ph-muted)]">
              Run a simulated check to fetch the live policy and compare it with the prior text.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
