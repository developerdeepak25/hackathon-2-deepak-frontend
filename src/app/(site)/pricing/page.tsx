/**
 * Presentational pricing page (no checkout).
 */

import { Check } from "lucide-react";
import { PRICING_PLANS } from "@/content/pricing";
import { PageHeader } from "@/components/shared/page-header";
import { PhButton } from "@/components/shared/ph-button";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plans & pricing"
        title="Simple plans for clearer privacy awareness"
        description="Pricing is a product concept for this MVP. Account management and payment processing are not enabled yet."
      />
      <div className="ph-container pb-16">
        <div className="mb-8 rounded-xl border border-[#f4e2b3] bg-[#fff8e8] px-4 py-3 text-[11px] leading-relaxed text-[#926b26] dark:border-[#5a4827] dark:bg-[#2e2718] dark:text-[#efd08a]">
          These plans are illustrative. No checkout, billing, or user accounts are
          implemented in this release.
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "ph-card relative",
                plan.featured &&
                  "border-[#1a2b44] shadow-lg dark:border-[#536849]",
              )}
            >
              {plan.featured && (
                <span className="ph-pill ph-pill-dark absolute right-4 top-4">
                  Most features
                </span>
              )}
              <span
                className={cn(
                  "ph-pill",
                  plan.status === "planned" ? "ph-pill-neutral" : "ph-pill-green",
                )}
              >
                {plan.status === "planned" ? "Planned" : "Available in demo"}
              </span>
              <h3 className="mt-5 text-xl font-bold">{plan.name}</h3>
              <p className="mt-2 min-h-10 text-xs text-[var(--ph-muted)]">
                {plan.description}
              </p>
              <div className="mt-4 text-[34px] font-extrabold tracking-tight">
                {plan.price}{" "}
                {plan.unit && (
                  <small className="text-xs font-semibold text-[#8390a1]">
                    {plan.unit}
                  </small>
                )}
              </div>
              <ul className="my-5 grid gap-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs text-[#58677d] dark:text-[#b7c3d4]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#58a242]" />
                    {f}
                  </li>
                ))}
              </ul>
              <PhButton
                href={plan.href}
                variant={plan.featured ? "secondary" : "primary"}
                className="w-full justify-center"
              >
                {plan.cta}
              </PhButton>
              <p className="mt-3 text-[11px] text-[var(--ph-muted)]">
                {plan.status === "planned"
                  ? "Proposed features; not yet implemented."
                  : "No payment required to explore PolicyHawk."}
              </p>
            </div>
          ))}
        </div>
        <div className="ph-section-tight text-center">
          <h2 className="text-2xl font-extrabold">Have questions about the scope?</h2>
          <PhButton href="/faq" variant="secondary" className="mt-4">
            Read FAQs <span aria-hidden>→</span>
          </PhButton>
        </div>
      </div>
    </>
  );
}
