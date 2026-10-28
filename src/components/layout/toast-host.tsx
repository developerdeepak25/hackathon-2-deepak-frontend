"use client";

/**
 * Fixed toast stack driven by Redux ui.toasts.
 */

import { useEffect } from "react";
import { dismissToast } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function ToastHost() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((s) => s.ui.toasts);

  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = window.setTimeout(() => {
      dispatch(dismissToast(latest.id));
    }, 3300);
    return () => window.clearTimeout(timer);
  }, [toasts, dispatch]);

  const visible = toasts[toasts.length - 1];
  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-5 right-5 z-[100] max-w-[min(360px,calc(100vw-40px))] rounded-xl bg-[#172438] px-4 py-3 text-xs text-white shadow-lg dark:bg-[#e6edf7] dark:text-[#101a29]"
    >
      {visible.text}
    </div>
  );
}
