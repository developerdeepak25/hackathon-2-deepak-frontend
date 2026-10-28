/**
 * Response shapes aligned with policyhawk-api Swagger definitions.
 */

export type Importance = "low" | "medium" | "high" | "critical";
export type FetchStatus = "ok" | "failed" | "never";

export interface CompanyListEntry {
  id: string;
  slug: string;
  name: string;
  category: string;
  policyUrl: string;
  isActive: boolean;
  lastCheckedAt: string | null;
  lastChangedAt: string | null;
  lastFetchStatus: FetchStatus;
  todayChangeCount: number;
}

export interface CompaniesListResponse {
  total: number;
  companies: CompanyListEntry[];
}

export interface PolicyChange {
  id: string;
  detectedAt: string;
  summary: string;
  whatItMeansForYou: string;
  importance: Importance;
  tags: string[];
  changedSections: string[];
  aiStatus: "ok" | "fallback";
  isSample: boolean;
  fromVersionText: string;
  toVersionText: string;
}
