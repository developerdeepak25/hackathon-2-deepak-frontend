/**
 * Axios client for public PolicyHawk API reads.
 */

import axios, { type AxiosError } from "axios";
import type {
  ChangeDetailResponse,
  CompaniesListResponse,
  CompanyTimelineResponse,
  LatestJob,
  RecentChangesResponse,
} from "./types";

const DEFAULT_API = "http://localhost:4000/api";

/** Resolves the public API base URL, without a trailing slash. */
export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? DEFAULT_API;
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { Accept: "application/json" },
});

/** Turns an Axios failure into a message the query error panel can show. */
export function toApiError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const data = (error as AxiosError<{ message?: string | string[] }>).response
      ?.data;
    const raw = data?.message;
    const message = Array.isArray(raw) ? raw.join(", ") : raw;
    return new Error(
      message ||
        error.message ||
        `Request failed (${error.response?.status ?? "network"})`,
    );
  }
  return error instanceof Error ? error : new Error("Request failed");
}

/** Runs a GET and rethrows a readable Error. */
async function get<T>(path: string): Promise<T> {
  try {
    const response = await api.get<T>(path);
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

/** Lists the 10 tracked companies. */
export function fetchCompanies(): Promise<CompaniesListResponse> {
  return get<CompaniesListResponse>("/companies");
}

/** Loads versions and changes for one company without policy bodies. */
export function fetchCompanyTimeline(
  slug: string,
): Promise<CompanyTimelineResponse> {
  return get<CompanyTimelineResponse>(`/companies/${slug}/timeline`);
}

/** Loads one change report, including capped excerpts. */
export function fetchChangeDetail(
  slug: string,
  changeId: string,
): Promise<ChangeDetailResponse> {
  return get<ChangeDetailResponse>(
    `/companies/${slug}/changes/${changeId}`,
  );
}

/** Loads the newest changes across companies. */
export function fetchRecentChanges(): Promise<RecentChangesResponse> {
  return get<RecentChangesResponse>("/changes/recent?limit=10");
}

/** Loads the newest tracking job, or null when none has run. */
export function fetchLatestJob(): Promise<LatestJob | null> {
  return get<LatestJob | null>("/jobs/latest");
}
