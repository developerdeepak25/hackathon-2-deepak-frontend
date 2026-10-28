/**
 * Central query keys so list and detail views invalidate consistently.
 */

export const queryKeys = {
  companies: ["companies"] as const,
  companyTimeline: (slug: string) => ["companies", slug, "timeline"] as const,
  changeDetail: (slug: string, changeId: string) =>
    ["companies", slug, "change", changeId] as const,
  recentChanges: ["changes", "recent"] as const,
  latestJob: ["jobs", "latest"] as const,
};
