/**
 * On-screen demo session. Reset clears this view only; stored sample rows stay in the API.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Importance } from "@/lib/api/types";

export interface DemoResultPreview {
  summary: string;
  whatItMeans: string;
  importance: Importance;
  oldExcerpt: string;
  newExcerpt: string;
  removedSpan: string;
  addedSpan: string;
  changeId: string;
  aiStatus: "ok" | "fallback";
  aiNotice: string | null;
}

export interface DemoState {
  checksRun: number;
  lastResult: DemoResultPreview | null;
  sessionReset: number;
}

const initialState: DemoState = {
  checksRun: 0,
  lastResult: null,
  sessionReset: 0,
};

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    setDemoResult(state, action: PayloadAction<DemoResultPreview>) {
      state.lastResult = action.payload;
      state.checksRun += 1;
    },
    /** Clears the visible demo session without implying backend sample rows were deleted. */
    resetDemoSession(state) {
      state.lastResult = null;
      state.sessionReset += 1;
    },
  },
});

export const { setDemoResult, resetDemoSession } = demoSlice.actions;
export default demoSlice.reducer;
