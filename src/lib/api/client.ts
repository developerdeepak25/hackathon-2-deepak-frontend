/**
 * Browser-safe fetch wrapper for the PolicyHawk API (used after UI wiring).
 */

import type { CompaniesListResponse } from "./types";

const DEFAULT_API = "http://localhost:4000/api";

/** Resolves API base URL from env with a local dev fallback. */
export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? DEFAULT_API;
}

/** Performs a JSON GET against the Nest API. */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/** Lists active tracked companies (wired in directory/tracker milestone). */
export async function fetchCompanies(): Promise<CompaniesListResponse> {
  return apiGet<CompaniesListResponse>("/companies");
}
