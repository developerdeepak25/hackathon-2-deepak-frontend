/**
 * Frequently asked questions.
 */

import { FaqList } from "@/components/marketing/faq-list";
import { PageHeader } from "@/components/shared/page-header";
import { PhButton } from "@/components/shared/ph-button";

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help & clarity"
        title="Frequently asked questions"
        description="Understand what PolicyHawk tracks, how comparisons work, and how to read sample demonstration results."
      />
      <div className="ph-container pb-16">
        <FaqList />
        <div className="ph-section-tight text-center">
          <h3 className="text-lg font-bold">Want to see how it works?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--ph-muted)]">
            Run the test-company simulation and inspect the generated change report.
          </p>
          <PhButton href="/demo" variant="primary" className="mt-4">
            Try the demo <span aria-hidden>→</span>
          </PhButton>
        </div>
      </div>
    </>
  );
}
