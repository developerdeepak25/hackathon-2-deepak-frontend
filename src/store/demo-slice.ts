/**
 * On-screen demo session. Reset clears this view only. Simulations are not stored.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SimulateChangeResponse } from "@/lib/api/types";

export interface DemoState {
  checksRun: number;
  lastResult: SimulateChangeResponse | null;
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
    setDemoResult(state, action: PayloadAction<SimulateChangeResponse>) {
      state.lastResult = action.payload;
      state.checksRun += 1;
    },
    /** Clears the visible demo session. Nothing was written to the API. */
    resetDemoSession(state) {
      state.lastResult = null;
      state.sessionReset += 1;
    },
  },
});

export const { setDemoResult, resetDemoSession } = demoSlice.actions;
export default demoSlice.reducer;
