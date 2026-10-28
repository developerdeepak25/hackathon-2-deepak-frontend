/**
 * Tracker overview dashboard.
 */

import { TrackerDashboard } from "@/components/tracker/tracker-dashboard";
import { PageHeader } from "@/components/shared/page-header";

export default function TrackerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tracker overview"
        title="Your privacy policy radar"
        description="A single view of configured companies, change reports, and recent tracking activity."
      />
      <div className="ph-container pb-16">
        <TrackerDashboard />
      </div>
    </>
  );
}
