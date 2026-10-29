/**
 * Response shapes for the PolicyHawk Nest API reads used by the product UI.
 */

export type Importance = "low" | "medium" | "high" | "critical";
export type FetchStatus = "ok" | "failed" | "never";
export type AiStatus = "ok" | "fallback";

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
  changeCount: number;
}

export interface CompaniesListResponse {
  total: number;
  companies: CompanyListEntry[];
}

export interface CompanyHeader {
  id: string;
  slug: string;
  name: string;
  category: string;
  policyUrl: string;
}

export interface TimelineVersion {
  id: string;
  fetchedAt: string;
  isSample: boolean;
  textLength: number;
}

export interface TimelineChange {
  id: string;
  detectedAt: string;
  summary: string;
  whatItMeansForYou: string;
  importance: Importance;
  tags: string[];
  changedSections: string[];
  aiStatus: AiStatus;
  isSample: boolean;
  fromVersionId: string;
  toVersionId: string;
}

export interface CompanyTimelineResponse {
  company: CompanyHeader;
  versions: TimelineVersion[];
  changes: TimelineChange[];
}

export interface ChangeDetail extends TimelineChange {
  fromExcerpt: string;
  toExcerpt: string;
  removedSpan: string;
  addedSpan: string;
}

export interface ChangeDetailResponse {
  company: CompanyHeader;
  change: ChangeDetail;
}

export interface RecentChange {
  id: string;
  companySlug: string;
  companyName: string;
  detectedAt: string;
  summary: string;
  importance: Importance;
  isSample: boolean;
  aiStatus: AiStatus;
}

export interface RecentChangesResponse {
  changes: RecentChange[];
}

export interface LatestJob {
  status: string;
  startedAt: string;
  finishedAt: string | null;
  companiesChecked: number;
  changesFound: number;
}

export interface SimulateChangeResponse {
  companySlug: string;
  status: "changed";
  isSample: true;
  aiStatus: AiStatus;
  aiNotice: string | null;
  summary: string;
  whatItMeansForYou: string;
  importance: Importance;
  tags: string[];
  changedSections: string[];
  fromExcerpt: string;
  toExcerpt: string;
  removedSpan: string;
  addedSpan: string;
}
