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
        description="Run the test-company simulation to inspect a before-and-after policy comparison."
      />
      <div className="ph-container pb-16">
        <div className="mb-5 rounded-xl border border-[#f4e2b3] bg-[#fff8e8] px-4 py-3 text-[11px] text-[#926b26] dark:border-[#5a4827] dark:bg-[#2e2718] dark:text-[#efd08a]">
          <strong>Simulation mode:</strong> Uses predefined prior policy text and
          will fetch live policy text through the API in the next milestone. It
          does not modify real company tracking state.
        </div>
        <DemoPanel />
      </div>
    </>
  );
}
