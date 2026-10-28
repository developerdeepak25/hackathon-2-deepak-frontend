/**
 * Central query keys so list and detail views invalidate consistently.
 */

export const queryKeys = {
  companies: ["companies"] as const,
  companyTimeline: (slug: string) => ["companies", slug, "timeline"] as const,
  companyChanges: (slug: string, date?: string) =>
    ["companies", slug, "changes", date ?? "today"] as const,
  changeDetail: (slug: string, changeId: string) =>
    ["companies", slug, "change", changeId] as const,
};
