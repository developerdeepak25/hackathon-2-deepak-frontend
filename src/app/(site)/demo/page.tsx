/**
 * Live demo page for test-company simulation.
 */

import { DemoPanel } from "@/components/demo/demo-panel";
import { PageHeader } from "@/components/shared/page-header";

export default function DemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive demonstration"
        title="See a policy change in action"
        description="The previous version is a hardcoded WhatsApp policy with extra sample clauses. The current version is WhatsApp’s privacy policy fetched live."
      />
      <div className="ph-container pb-16">
        <DemoPanel />
      </div>
    </>
  );
}
