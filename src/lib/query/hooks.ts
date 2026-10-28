/**
 * React Query hooks for PolicyHawk product reads.
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchChangeDetail,
  fetchCompanies,
  fetchCompanyTimeline,
  fetchLatestJob,
  fetchRecentChanges,
} from "@/lib/api/client";
import { queryKeys } from "./keys";

/** Loads the tracked company directory. */
export function useCompanies() {
  return useQuery({
    queryKey: queryKeys.companies,
    queryFn: fetchCompanies,
  });
}

/** Loads one company's version timeline and change summaries. */
export function useCompanyTimeline(slug: string) {
  return useQuery({
    queryKey: queryKeys.companyTimeline(slug),
    queryFn: () => fetchCompanyTimeline(slug),
    enabled: Boolean(slug),
  });
}

/** Loads one change report with excerpts. */
export function useChangeDetail(slug: string, changeId: string) {
  return useQuery({
    queryKey: queryKeys.changeDetail(slug, changeId),
    queryFn: () => fetchChangeDetail(slug, changeId),
    enabled: Boolean(slug && changeId),
  });
}

/** Loads the tracker feed of recent changes. */
export function useRecentChanges() {
  return useQuery({
    queryKey: queryKeys.recentChanges,
    queryFn: fetchRecentChanges,
  });
}

/** Loads the newest job run. A null body is an empty value, not an error. */
export function useLatestJob() {
  return useQuery({
    queryKey: queryKeys.latestJob,
    queryFn: fetchLatestJob,
  });
}
