/**
 * Client-only UI state: navigation drawer, directory filters, and toast messages.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DirectoryStatusFilter } from "@/lib/companies/display";

export interface ToastMessage {
  id: string;
  text: string;
}

export interface UiState {
  mobileNavOpen: boolean;
  directorySearch: string;
  directoryCategory: string;
  directoryStatus: DirectoryStatusFilter;
  toasts: ToastMessage[];
}

const initialState: UiState = {
  mobileNavOpen: false,
  directorySearch: "",
  directoryCategory: "all",
  directoryStatus: "all",
  toasts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    setDirectorySearch(state, action: PayloadAction<string>) {
      state.directorySearch = action.payload;
    },
    setDirectoryCategory(state, action: PayloadAction<string>) {
      state.directoryCategory = action.payload;
    },
    setDirectoryStatus(state, action: PayloadAction<DirectoryStatusFilter>) {
      state.directoryStatus = action.payload;
    },
    /** Shows a short-lived status message (e.g. demo reset). */
    pushToast(state, action: PayloadAction<string>) {
      state.toasts.push({
        id: `toast-${state.toasts.length}-${action.payload.length}`,
        text: action.payload,
      });
    },
    dismissToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  setMobileNavOpen,
  setDirectorySearch,
  setDirectoryCategory,
  setDirectoryStatus,
  pushToast,
  dismissToast,
} = uiSlice.actions;
export default uiSlice.reducer;
