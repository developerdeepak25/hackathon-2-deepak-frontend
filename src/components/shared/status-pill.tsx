/**
 * Fetch / record status badges used on directory and tracker tables.
 */

import { cn } from "@/lib/utils";

export type StatusPillVariant =
  | "sample"
  | "changed"
  | "unchanged"
  | "failed"
  | "never"
  | "simulation"
  | "neutral";

const config: Record<StatusPillVariant, { label: string; className: string }> =
  {
    sample: { label: "Sample history", className: "ph-pill-blue" },
    changed: { label: "Change detected", className: "ph-pill-amber" },
    unchanged: { label: "Unchanged", className: "ph-pill-green" },
    failed: { label: "Check failed", className: "ph-pill-red" },
    never: { label: "Not checked", className: "ph-pill-neutral" },
    simulation: { label: "Simulation mode", className: "ph-pill-blue" },
    neutral: { label: "—", className: "ph-pill-neutral" },
  };

/** Renders a small labeled pill for tracking or sample state. */
export function StatusPill({ variant }: { variant: StatusPillVariant }) {
  const item = config[variant];
  return (
    <span className={cn("ph-pill", item.className)}>{item.label}</span>
  );
}
