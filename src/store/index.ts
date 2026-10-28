/**
 * Redux store for PolicyHawk client UI state (not server data).
 */

import { configureStore } from "@reduxjs/toolkit";
import demoReducer from "./demo-slice";
import themeReducer from "./theme-slice";
import uiReducer from "./ui-slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      ui: uiReducer,
      demo: demoReducer,
    },
    // Disable DevTools during Next prerender (uses non-deterministic ids).
    devTools: process.env.NODE_ENV === "development" && typeof window !== "undefined",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
