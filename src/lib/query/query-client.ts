/**
 * Shared TanStack Query client for PolicyHawk server state.
 */

import { QueryClient } from "@tanstack/react-query";

/** Creates a QueryClient with sensible defaults for dashboard-style pages. */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
