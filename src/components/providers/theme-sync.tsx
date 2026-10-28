"use client";

/**
 * Applies dark/light class on html and persists the user's theme choice.
 */

import { useEffect } from "react";
import { hydrateTheme, toggleTheme } from "@/store/theme-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const STORAGE_KEY = "policyhawk-theme";

/** Hydrates theme from localStorage and keeps document class in sync. */
export function ThemeSync() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        dispatch(hydrateTheme(stored));
      }
    } catch {
      /* private mode */
    }
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  return null;
}

/** Hook for the header theme toggle button. */
export function useThemeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  return {
    mode,
    toggle: () => dispatch(toggleTheme()),
  };
}
