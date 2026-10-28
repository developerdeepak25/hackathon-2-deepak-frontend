/**
 * How PolicyHawk tracks, compares, and explains policy changes.
 */

import { Clock, FileText, GitCompare } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PhButton } from "@/components/shared/ph-button";

const steps = [
  {
    n: "01",
    icon: Clock,
    title: "Track the policy",
    desc: "Retrieve each configured policy page and save its contents as a version. The previous version remains available for comparison.",
  },
  {
    n: "02",
    icon: GitCompare,
    title: "Compare versions",
    desc: "When a new version is available, compare it with the last stored version to identify additions, removals, and rewritten text.",
  },
  {
    n: "03",
    icon: FileText,
    title: "Explain the difference",
    desc: "Present the relevant text, a plain-language summary, and an importance level so readers know where to focus.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="From policy text to a clear explanation"
        description="PolicyHawk follows a simple process: retrieve a policy, compare versions, and make the important differences easier to understand."
      />
      <div className="ph-container pb-16">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="ph-card">
              <div className="mb-4 text-xs font-extrabold text-[#7d8ba0]">
                STEP {s.n}
              </div>
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-[14px] border border-[#dfe5ec] text-[#3f55d7] dark:border-[#29384d] dark:bg-[#111c2b]">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--ph-muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="ph-card">
            <h3 className="text-lg font-bold">What a change report contains</h3>
            <ul className="mt-4 space-y-4 text-sm text-[var(--ph-muted)]">
              <li>
                <strong className="text-[var(--ph-ink)]">Exact difference</strong>{" "}
                — added, removed, or rewritten text between versions.
              </li>
              <li>
                <strong className="text-[var(--ph-ink)]">Plain-language summary</strong>{" "}
                — what changed and what it may mean for readers.
              </li>
              <li>
                <strong className="text-[var(--ph-ink)]">Importance level</strong>{" "}
                — low, medium, high, or critical to prioritize review.
              </li>
            </ul>
          </div>
          <div className="ph-card">
            <h3 className="text-lg font-bold">Be clear about the data</h3>
            <p className="mt-3 text-sm text-[var(--ph-muted)]">
              PolicyHawk distinguishes real fetched policy versions from sample
              history and simulated demonstration results. A failed fetch is not
              evidence that the policy stayed the same.
            </p>
            <div className="mt-4 rounded-xl border border-[#e0edcf] bg-[#f7faed] px-3 py-3 text-[11px] text-[#52733a] dark:border-[#28523e] dark:bg-[#152d26] dark:text-[#9ddbb5]">
              Sample data is always identified. Reports are explanatory summaries,
              not legal advice.
            </div>
          </div>
        </div>
        <div className="ph-section-tight text-center">
          <h2 className="text-2xl font-extrabold">Experience the comparison flow.</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--ph-muted)]">
            Try a sample change on the test company without waiting for an actual
            company to publish a new policy.
          </p>
          <div className="mt-5">
            <PhButton href="/demo" variant="primary">
              Open interactive demo <span aria-hidden>→</span>
            </PhButton>
          </div>
        </div>
      </div>
    </>
  );
}
