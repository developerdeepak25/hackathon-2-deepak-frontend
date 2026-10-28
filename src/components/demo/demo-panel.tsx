"use client";

/**
 * Interactive demo UI: simulates in-request progress until the API proxy is wired.
 */

import Link from "next/link";
import { GitCompare, Play, RotateCcw } from "lucide-react";
import { TEST_COMPANY } from "@/content/companies";
import { CompanyLogo } from "@/components/shared/company-logo";
import { StatusPill } from "@/components/shared/status-pill";
import { ImportancePill } from "@/components/shared/importance-pill";
import {
  resetDemoSession,
  setDemoPhase,
  setDemoResult,
} from "@/store/demo-slice";
import { pushToast } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const BASE_POLICY =
  "We collect account information to provide and maintain our services. We do not use private messages for advertising.";

/** Runs staged UI progress; replace body with fetch to /api/demo/simulate when backend is ready. */
async function runSimulatedCheck(
  dispatch: ReturnType<typeof useAppDispatch>,
) {
  dispatch(setDemoPhase("fetching"));
  await delay(800);
  dispatch(setDemoPhase("comparing"));
  await delay(700);
  dispatch(setDemoPhase("explaining"));
  await delay(900);
  dispatch(
    setDemoResult({
      title: "A new purpose for interaction data",
      summary:
        "The comparison adds advertising personalization as a possible use of selected interaction data compared with the predefined earlier version.",
      severity: "Medium",
      oldExcerpt: BASE_POLICY,
      newExcerpt: `${BASE_POLICY} We may use selected interaction data to personalize advertising and improve our services.`,
      changeId: "demo-preview",
    }),
  );
  dispatch(pushToast("Simulated check complete. Open the full report when API is wired."));
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function DemoPanel() {
  const dispatch = useAppDispatch();
  const { phase, checksRun, lastResult } = useAppSelector((s) => s.demo);
  const busy = phase !== "idle" && phase !== "done";

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
          <div className="rounded-xl border border-[var(--ph-line)] bg-[#0e1827]/5 p-3 dark:bg-[#0e1827]">
            <span className="text-[10px] text-[var(--ph-muted)]">Current policy excerpt</span>
            <strong className="mt-1 block text-xs">Live fetch on run</strong>
          </div>
          <div className="rounded-xl border border-[var(--ph-line)] p-3">
            <span className="text-[10px] text-[var(--ph-muted)]">Simulated checks</span>
            <strong className="mt-1 block text-xs">{checksRun}</strong>
          </div>
        </div>

        <h4 className="text-sm font-bold">Predefined prior version (excerpt)</h4>
        <div className="my-3 rounded-xl border border-[#e7ecf2] bg-[#f8fafc] p-4 text-xs leading-relaxed text-[#526078] dark:border-[#2b3b50] dark:bg-[#0c1625] dark:text-[#c0ccdc]">
          {BASE_POLICY}
        </div>

        {busy && (
          <div className="mb-3 flex items-center gap-2 text-[11px] text-[#7d8a9d]">
            <span className="capitalize">{phase}…</span>
            <div className="h-1 w-24 overflow-hidden rounded-full bg-[#e8edf3] dark:bg-[#26364a]">
              <span
                className="block h-full bg-[var(--ph-lime)] transition-all"
                style={{
                  width:
                    phase === "fetching"
                      ? "33%"
                      : phase === "comparing"
                        ? "66%"
                        : "90%",
                }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => runSimulatedCheck(dispatch)}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--ph-navy)] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-45 dark:bg-[var(--ph-lime)] dark:text-[#17211a]"
          >
            <Play className="h-4 w-4" />
            Run simulated check
          </button>
          <button
            type="button"
            onClick={() => {
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
          Next milestone: this button calls the backend simulate-change path with
          the same comparison logic as real tracking.
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

        {lastResult ? (
          <div className="rounded-2xl border border-[#cfe9d8] bg-[#f8fffa] p-4 dark:border-[#285440] dark:bg-[#10261f]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CompanyLogo abbr="PH" variant="test" size="sm" />
                <h3 className="mt-2 text-lg font-bold">{lastResult.title}</h3>
              </div>
              <ImportancePill importance="medium" />
            </div>
            <p className="mt-2 text-xs text-[#5f7568] dark:text-[#b0d0bc]">
              {lastResult.summary}
            </p>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <div className="rounded-lg border border-[#e1efe5] bg-white p-3 text-[11px] dark:border-[#285440] dark:bg-[#0d1c18]">
                <span className="text-[10px] text-[#809188]">Previous excerpt</span>
                <p className="mt-1 leading-relaxed">{lastResult.oldExcerpt}</p>
              </div>
              <div className="rounded-lg border border-[#e1efe5] bg-white p-3 text-[11px] dark:border-[#285440] dark:bg-[#0d1c18]">
                <span className="text-[10px] text-[#809188]">New excerpt</span>
                <p className="mt-1 leading-relaxed">{lastResult.newExcerpt}</p>
              </div>
            </div>
            <Link
              href="/companies/test-company/changes/demo-preview"
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
              Run a simulated check to preview the summary and importance level.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
