"use client";

/**
 * Wraps the app with Redux and React Query for product pages.
 */

import { QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { createQueryClient } from "@/lib/query/query-client";
import { makeStore } from "@/store";
import { ThemeSync } from "./theme-sync";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => makeStore(), []);
  const queryClient = useMemo(() => createQueryClient(), []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeSync />
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
