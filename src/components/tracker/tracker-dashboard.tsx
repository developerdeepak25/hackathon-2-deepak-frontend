/**
 * Tracker overview table and stats (UI shell before live feed).
 */

import Link from "next/link";
import { AlertTriangle, Clock, GitCompare, Shield } from "lucide-react";
import { MVP_COMPANIES } from "@/content/companies";
import { CompanyLogo } from "@/components/shared/company-logo";
import { StatusPill } from "@/components/shared/status-pill";
import { formatCategory } from "@/lib/companies/display";
import { PhButton } from "@/components/shared/ph-button";

export function TrackerDashboard() {
  return (
    <>
      <div className="mb-5 rounded-xl border border-[#f4e2b3] bg-[#fff8e8] px-4 py-3 text-[11px] text-[#926b26] dark:border-[#5a4827] dark:bg-[#2e2718] dark:text-[#efd08a]">
        Dashboard metrics and the recent-changes feed populate when the directory
        and timeline APIs are connected. Sample and simulated records stay
        labeled separately from live fetch results.
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Tracked companies", value: "10", icon: Shield, meta: "MVP list" },
          { label: "Changes detected", value: "—", icon: GitCompare, meta: "From API" },
          { label: "High importance", value: "—", icon: AlertTriangle, meta: "When available" },
          { label: "Last tracking run", value: "—", icon: Clock, meta: "Job history" },
        ].map((stat) => (
          <div key={stat.label} className="ph-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--ph-muted)]">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-[var(--ph-muted)]" />
            </div>
            <div className="mt-4 text-3xl font-extrabold">{stat.value}</div>
            <div className="mt-1 text-[11px] text-[#8994a6]">{stat.meta}</div>
          </div>
        ))}
      </div>

      <div className="ph-card mb-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">Recent policy changes</h3>
            <p className="text-xs text-[var(--ph-muted)]">Most recent reports, when available</p>
          </div>
          <span className="ph-pill ph-pill-neutral">Awaiting API</span>
        </div>
        <div className="rounded-2xl border border-dashed border-[#cfd7e2] py-12 text-center">
          <p className="text-sm font-bold">No live change reports loaded</p>
          <p className="mx-auto mt-2 max-w-md text-xs text-[var(--ph-muted)]">
            Connect the backend to populate this feed. Use the test-company demo to
            experience the change-report flow now.
          </p>
          <PhButton href="/demo" variant="secondary" className="mt-4">
            Try demo <span aria-hidden>→</span>
          </PhButton>
        </div>
      </div>

      <div className="ph-card">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">All tracked companies</h3>
            <p className="text-xs text-[var(--ph-muted)]">The 10 companies included in this MVP</p>
          </div>
          <span className="ph-pill ph-pill-neutral">10 companies</span>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-[var(--ph-line)]">
          <table className="min-w-[700px] w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--ph-line)] bg-[#f8fafc] dark:bg-[#0d1726]">
                {["Company", "Category", "Policy status", "Last checked", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wide text-[#8a96a8]"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {MVP_COMPANIES.map((c) => (
                <tr
                  key={c.slug}
                  className="border-b border-[#edf0f4] hover:bg-[#fbfcfe] dark:border-[#29384d] dark:hover:bg-[#152338]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CompanyLogo abbr={c.abbr} variant={c.logo} size="sm" />
                      <strong>{c.name}</strong>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--ph-muted)]">
                    {formatCategory(c.category)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill variant="never" />
                  </td>
                  <td className="px-4 py-3 text-[var(--ph-muted)]">—</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/companies/${c.slug}`}
                      className="font-bold text-[#4156d8] dark:text-[#a9b6ff]"
                    >
                      Open →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
