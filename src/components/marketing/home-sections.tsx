/**
 * Landing page sections translated from the HTML prototype.
 */

import Link from "next/link";
import { AlertTriangle, Clock, FileText, GitCompare } from "lucide-react";
import { MVP_COMPANIES } from "@/content/companies";
import { CompanyLogo } from "@/components/shared/company-logo";
import { PhButton } from "@/components/shared/ph-button";
import { formatCategory } from "@/lib/companies/display";
import { ImportancePill } from "@/components/shared/importance-pill";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--ph-navy)] py-14 text-white md:py-[70px]">
      <div className="pointer-events-none absolute -right-40 -top-56 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(96,130,218,0.19),transparent_68%)]" />
      <div className="ph-container relative z-10 grid items-center gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <span className="ph-eyebrow text-[#cad4e4]">
            <span className="ph-eyebrow-dot" />
            Privacy policy change tracker
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-[70px]">
            Know when the rules around your{" "}
            <span className="text-[var(--ph-lime)]">data change.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#b3bfd0] md:text-lg">
            Privacy policies change quietly. PolicyHawk tracks versions,
            highlights what changed, and translates the important parts into
            plain language.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PhButton href="/tracker" variant="lime">
              Open tracker <span aria-hidden>↗</span>
            </PhButton>
            <PhButton href="/demo" variant="secondary">
              Try demo
            </PhButton>
          </div>
          <p className="mt-6 flex items-center gap-3 text-xs text-[#aeb8c9]">
            <span className="flex -space-x-1.5">
              {["WA", "Zm", "in", "Sp"].map((a) => (
                <span
                  key={a}
                  className="grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--ph-navy)] bg-[#dae4f2] text-[9px] font-extrabold text-[#26354a] first:ml-0"
                >
                  {a}
                </span>
              ))}
            </span>
            One place to inspect policy changes across 10 companies
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-lg rotate-1">
          <div className="overflow-hidden rounded-[21px] border border-white/15 bg-[var(--ph-surface)] text-[var(--ph-ink)] shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-[var(--ph-line)] bg-[#fcfdff] px-4 py-3 dark:bg-[#0e1725]">
              <i className="h-1.5 w-1.5 rounded-full bg-[#d2d9e2]" />
              <i className="h-1.5 w-1.5 rounded-full bg-[#d2d9e2]" />
              <i className="h-1.5 w-1.5 rounded-full bg-[#d2d9e2]" />
              <span className="ml-2 text-[10px] font-bold text-[#6f7d90]">
                POLICYHAWK / CHANGE REPORT
              </span>
            </div>
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CompanyLogo abbr="PH" variant="test" size="sm" />
                  <div>
                    <strong className="text-sm">Sample policy report</strong>
                    <div className="text-[10px] text-[#8a95a6]">
                      Version 01 → Version 02
                    </div>
                  </div>
                </div>
                <ImportancePill importance="medium" />
              </div>
              <div className="rounded-xl border border-[#e9edf2] p-3 dark:border-[#2a394d] dark:bg-[#131f30]">
                <div className="flex justify-between text-[11px] font-bold">
                  What changed?
                  <span className="font-normal text-[var(--ph-muted)]">Sample</span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-[#56647a] dark:text-[#b5c1d2]">
                  A new purpose for selected interaction data has been added to
                  this sample policy.
                </p>
              </div>
              <div className="mt-3 rounded-xl border border-[#e9edf2] p-3 dark:border-[#2a394d]">
                <strong className="text-[11px]">Plain-language explanation</strong>
                <p className="mt-2 text-[11px] text-[#56647a] dark:text-[#b5c1d2]">
                  The wording expands how data may be used. Review the specific
                  data types and choices available to users.
                </p>
              </div>
            </div>
          </div>
          <div className="-bottom-4 -right-2 absolute rotate-[-3deg] rounded-xl bg-[var(--ph-lime)] px-4 py-3 text-[11px] font-extrabold text-[#1c2b24] shadow-lg">
            Change explained
            <span className="mt-0.5 block text-[10px] font-semibold opacity-70">
              Without reading the whole policy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LogoStrip() {
  const featured = MVP_COMPANIES.slice(0, 5);
  return (
    <div className="ph-container flex flex-wrap items-center justify-between gap-4 border-b border-[var(--ph-line)] py-6">
      <span className="w-full text-[10px] font-extrabold uppercase tracking-widest text-[#8792a3] md:w-auto">
        Companies in the MVP
      </span>
      {featured.map((c) => (
        <span
          key={c.slug}
          className="flex items-center gap-2 text-xs font-extrabold text-[#8792a3]"
        >
          <b className="grid h-6 w-6 place-items-center rounded-md bg-[#e8edf3] text-[10px] text-[#5a687c] dark:bg-[#26354a] dark:text-[#e1eaf6]">
            {c.abbr}
          </b>
          {c.name}
        </span>
      ))}
      <Link href="/companies" className="ph-link text-sm">
        All 10 companies <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 grid h-11 w-11 place-items-center rounded-[13px] bg-[#f0f3f8] text-[#4355cf] dark:bg-[#202b40] dark:text-[#abb6ff]">
      {children}
    </div>
  );
}

export function ProblemSection() {
  const items = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Hard to understand",
      text: "Legal wording makes it difficult to quickly understand how a company handles information.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Easy to overlook",
      text: "Changes to data collection, sharing, or usage can be buried in a long updated document.",
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Found too late",
      text: "People can learn about an important change long after it has already been published.",
    },
  ];
  return (
    <section className="ph-section">
      <div className="ph-container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="ph-eyebrow">
              <span className="ph-eyebrow-dot" />
              The problem
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-[43px]">
              Important changes shouldn&apos;t
              <br />
              get lost in legal text.
            </h2>
          </div>
          <p className="max-w-md text-[var(--ph-muted)]">
            Policies are long, updates are easy to miss, and the practical
            meaning of a change is rarely obvious. PolicyHawk brings the
            difference into focus.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="ph-card">
              <FeatureIcon>{item.icon}</FeatureIcon>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--ph-muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionSection() {
  const items = [
    {
      icon: <GitCompare className="h-5 w-5" />,
      title: "See what changed",
      text: "Compare previous and current policy versions with additions, removals, and rewrites highlighted.",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Read the plain summary",
      text: "Understand the change in everyday language, with links back to the relevant policy text.",
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Spot what matters",
      text: "Use importance labels as a starting point for closer review.",
    },
  ];
  return (
    <section className="ph-section bg-[#eef2f7] dark:bg-[#0d1726]">
      <div className="ph-container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="ph-eyebrow">
              <span className="ph-eyebrow-dot" />
              The solution
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-[43px]">
              From policy text to
              <br />
              something you can act on.
            </h2>
          </div>
          <p className="max-w-md text-[var(--ph-muted)]">
            Three focused capabilities help you move from a raw document to an
            understandable change report.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="ph-card">
              <FeatureIcon>{item.icon}</FeatureIcon>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--ph-muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrackedCompaniesPreview() {
  return (
    <section className="ph-section">
      <div className="ph-container">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="ph-eyebrow">
              <span className="ph-eyebrow-dot" />
              Tracked companies
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-[43px]">
              The tools people use every day.
            </h2>
          </div>
          <Link href="/companies" className="ph-link">
            Browse all companies <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MVP_COMPANIES.slice(0, 8).map((c) => (
            <Link
              key={c.slug}
              href={`/companies/${c.slug}`}
              className="ph-card block transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <CompanyLogo abbr={c.abbr} variant={c.logo} size="sm" />
                <div>
                  <h4 className="text-sm font-bold">{c.name}</h4>
                  <p className="text-[11px] text-[#8792a4]">
                    {formatCategory(c.category)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#edf0f4] pt-3 text-[10px] dark:border-[#29384d]">
                <span className="text-[#7b8798]">Policy record</span>
                <span className="ph-link text-[10px]">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <PhButton href="/companies" variant="secondary">
            See all 10 companies <span aria-hidden>→</span>
          </PhButton>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksTeaser() {
  const steps = [
    {
      n: "01",
      title: "Track",
      text: "Fetch configured policy pages and save a version for future comparison.",
    },
    {
      n: "02",
      title: "Compare",
      text: "Compare a new version with the previous stored version to identify text changes.",
    },
    {
      n: "03",
      title: "Explain",
      text: "Present a plain-language summary alongside the source text and importance level.",
    },
  ];
  return (
    <section className="ph-section overflow-hidden bg-[var(--ph-navy)] text-white">
      <div className="ph-container">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="ph-eyebrow text-[#cad4e4]">
              <span className="ph-eyebrow-dot" />
              How it works
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-[43px]">
              A simple process.
              <br />A clearer picture.
            </h2>
          </div>
          <p className="max-w-md text-[#aeb9ca]">
            PolicyHawk turns version tracking into an easy-to-follow flow from
            collection through comparison to explanation.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="mb-6 text-xs font-extrabold text-[#7d8ba0]">
                STEP {s.n} / 03
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-[#aeb9ca]">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <PhButton href="/how-it-works" variant="lime">
            Explore the full process <span aria-hidden>→</span>
          </PhButton>
        </div>
      </div>
    </section>
  );
}

export function CaseStudiesSection() {
  const cases = [
    {
      year: "2021",
      name: "TikTok",
      text: "TikTok updated its U.S. Privacy Policy to mention the potential collection of biometric identifiers, including faceprints and voiceprints, from user content.",
    },
    {
      year: "2023",
      name: "Zoom",
      text: "Updated terms raised concerns about using customer content for AI training. Public backlash in August 2023 prompted Zoom to clarify its policy.",
    },
  ];
  return (
    <section className="ph-section">
      <div className="ph-container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="ph-eyebrow">
              <span className="ph-eyebrow-dot" />
              Why it matters
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-[43px]">
              Policy changes can have
              <br />
              consequences.
            </h2>
          </div>
          <p className="max-w-md text-[var(--ph-muted)]">
            Historical cases show why the timing and wording of privacy-policy
            updates deserve attention.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <article key={c.name} className="ph-card relative flex min-h-[240px] flex-col justify-between overflow-hidden">
              <div>
                <span className="text-[11px] font-bold text-[#76849a]">
                  CASE STUDY · {c.year}
                </span>
                <h3 className="mt-4 text-xl font-bold">{c.name}</h3>
                <p className="relative z-10 mt-3 text-sm text-[var(--ph-muted)]">
                  {c.text}
                </p>
              </div>
              <Link href="/how-it-works" className="ph-link relative z-10 mt-4 text-xs">
                Why version history matters <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-[var(--ph-muted)]">
          Case-study summaries are presentation copy and should be reviewed
          against source material before publication.
        </p>
      </div>
    </section>
  );
}

export function DemoCtaSection() {
  return (
    <section className="ph-section bg-[#eef2f7] dark:bg-[#0d1726]">
      <div className="ph-container grid items-center gap-12 md:grid-cols-2">
        <div>
          <span className="ph-eyebrow">
            <span className="ph-eyebrow-dot" />
            Try it yourself
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">
            See a policy change happen.
          </h2>
          <p className="mt-3 text-[var(--ph-muted)]">
            Run a simulated check on the test company. PolicyHawk fetches live
            policy text, compares it with a predefined earlier version, and
            shows the summary and importance level.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PhButton href="/demo" variant="primary">
              Open interactive demo <span aria-hidden>→</span>
            </PhButton>
            <PhButton href="/tracker" variant="secondary">
              View tracker
            </PhButton>
          </div>
        </div>
        <div className="ph-card">
          <h3 className="text-lg font-bold">Demo preview</h3>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <GitCompare className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <strong className="block text-xs">Version comparison</strong>
                See added and removed text side by side.
              </span>
            </li>
            <li className="flex gap-3">
              <FileText className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <strong className="block text-xs">Plain-language summary</strong>
                Get a quick explanation of the change.
              </span>
            </li>
            <li className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <strong className="block text-xs">Importance level</strong>
                Low, medium, high, or critical.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-[11px] text-[var(--ph-muted)]">
            Simulation only · Sample records are labeled in the UI.
          </p>
        </div>
      </div>
    </section>
  );
}

export function HomeClosingCta() {
  return (
    <section className="ph-section">
      <div className="ph-container text-center">
        <span className="ph-eyebrow justify-center">
          <span className="ph-eyebrow-dot" />
          Explore PolicyHawk
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-[43px]">
          A clearer view of privacy changes.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--ph-muted)]">
          Start with the company directory, inspect a policy history, or run the
          interactive demo.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <PhButton href="/companies" variant="primary">
            Explore companies
          </PhButton>
          <PhButton href="/demo" variant="secondary">
            Run demo
          </PhButton>
        </div>
      </div>
    </section>
  );
}
