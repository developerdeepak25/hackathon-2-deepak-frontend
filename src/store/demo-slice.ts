/**
 * On-screen demo session state until the live simulate-change API is wired.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DemoPhase = "idle" | "fetching" | "comparing" | "explaining" | "done";

export interface DemoResultPreview {
  title: string;
  summary: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  oldExcerpt: string;
  newExcerpt: string;
  changeId: string;
}

export interface DemoState {
  phase: DemoPhase;
  checksRun: number;
  lastResult: DemoResultPreview | null;
  sessionReset: number;
}

const initialState: DemoState = {
  phase: "idle",
  checksRun: 0,
  lastResult: null,
  sessionReset: 0,
};

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    setDemoPhase(state, action: PayloadAction<DemoPhase>) {
      state.phase = action.payload;
    },
    setDemoResult(state, action: PayloadAction<DemoResultPreview>) {
      state.lastResult = action.payload;
      state.checksRun += 1;
      state.phase = "done";
    },
    /** Clears the visible demo session without implying backend sample rows were deleted. */
    resetDemoSession(state) {
      state.phase = "idle";
      state.lastResult = null;
      state.sessionReset += 1;
    },
  },
});

export const { setDemoPhase, setDemoResult, resetDemoSession } =
  demoSlice.actions;
export default demoSlice.reducer;
