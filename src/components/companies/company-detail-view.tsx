/**
 * Company detail layout: stats, timeline placeholder, and latest change slot.
 */

import Link from "next/link";
import type { CompanyMeta } from "@/content/companies";
import { CompanyLogo } from "@/components/shared/company-logo";
import { StatusPill } from "@/components/shared/status-pill";
import { PhButton } from "@/components/shared/ph-button";
import { formatCategory } from "@/lib/companies/display";

export function CompanyDetailView({ company }: { company: CompanyMeta }) {
  return (
    <>
      <div className="ph-container -mt-2 pb-6">
        <div className="flex flex-wrap items-center gap-4">
          <CompanyLogo abbr={company.abbr} variant={company.logo} size="lg" />
          <div className="min-w-[180px] flex-1">
            <span className="ph-eyebrow">{formatCategory(company.category)}</span>
            <h1 className="text-4xl font-extrabold tracking-tight">{company.name}</h1>
            <p className="text-xs text-[var(--ph-muted)]">
              Policy record · Timeline loads from the API when connected
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PhButton
              href={`/companies/${company.slug}/changes/sample`}
              variant="primary"
            >
              View sample report layout <span aria-hidden>↗</span>
            </PhButton>
            <PhButton href="/companies" variant="secondary">
              All companies
            </PhButton>
          </div>
        </div>
      </div>

      <div className="ph-container pb-16">
        <div className="mb-5 rounded-xl border border-[#f4e2b3] bg-[#fff8e8] px-4 py-3 text-[11px] text-[#926b26] dark:border-[#5a4827] dark:bg-[#2e2718] dark:text-[#efd08a]">
          When no versions exist yet, this page shows an empty timeline instead of
          invented policy text for {company.name}.
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Latest stored version", value: "—", meta: "No data yet" },
            { label: "Available versions", value: "0", meta: "From timeline API" },
            { label: "Latest change", value: "—", meta: "When detected" },
            { label: "Importance", value: <StatusPill variant="never" />, meta: "" },
          ].map((stat) => (
            <div key={stat.label} className="ph-card">
              <div className="text-xs text-[var(--ph-muted)]">{stat.label}</div>
              <div className="mt-3 text-2xl font-extrabold">{stat.value}</div>
              {stat.meta && (
                <div className="mt-1 text-[11px] text-[#8994a6]">{stat.meta}</div>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-5">
            <div className="ph-card">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Latest policy summary</h3>
                <StatusPill variant="never" />
              </div>
              <p className="text-sm text-[var(--ph-muted)]">
                A summary derived from stored policy text appears here after the
                first successful fetch.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#e3e8f0] bg-[#f9fbfd] px-3 py-3 text-[11px] text-[#7a8799] dark:border-[#2b3b50] dark:bg-[#101b2a]">
                Policy source URL is shown when loaded from the API.
              </div>
            </div>
            <div className="ph-card">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Policy version timeline</h3>
                <span className="ph-pill ph-pill-neutral">No versions yet</span>
              </div>
              <div className="rounded-2xl border border-dashed border-[#cfd7e2] py-10 text-center text-sm text-[var(--ph-muted)]">
                No stored versions for this company yet. Run daily tracking or
                inspect sample data on WhatsApp after seeding.
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="ph-card">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Latest change</h3>
                <StatusPill variant="never" />
              </div>
              <p className="text-sm text-[var(--ph-muted)]">
                Change summaries appear here when a new version differs from the
                previous stored version.
              </p>
              <Link
                href={`/companies/${company.slug}/changes/sample`}
                className="ph-link mt-4 text-xs"
              >
                Preview change report layout <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="ph-card">
              <h3 className="text-base font-bold">Company details</h3>
              <div className="my-4 h-px bg-[var(--ph-line)]" />
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-[var(--ph-muted)]">Category</span>
                  <strong className="mt-1 block">{formatCategory(company.category)}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--ph-muted)]">Tracking status</span>
                  <div className="mt-1">
                    <StatusPill variant="never" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
