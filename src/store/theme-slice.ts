/**
 * Persists light/dark theme choice for the PolicyHawk marketing and product shell.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light";

export interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /** Sets theme from user toggle and should be mirrored to localStorage by the sync component. */
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
    /** Hydrates Redux from localStorage on first client render. */
    hydrateTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
    /** Flips between dark (default) and light presentation. */
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { setTheme, hydrateTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
