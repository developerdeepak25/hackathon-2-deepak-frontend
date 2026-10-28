"use client";

/**
 * Wraps the app with Redux and React Query for product pages.
 */

import { QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import { Provider } from "react-redux";
import { createQueryClient } from "@/lib/query/query-client";
import { makeStore, type AppStore } from "@/store";
import type { QueryClient } from "@tanstack/react-query";
import { ThemeSync } from "./theme-sync";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  const queryClientRef = useRef<QueryClient | null>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = createQueryClient();
  }

  return (
    <Provider store={storeRef.current!}>
      <QueryClientProvider client={queryClientRef.current!}>
        <ThemeSync />
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
