/**
 * Importance labels from AI analysis (includes API critical level).
 */

import { cn } from "@/lib/utils";
import type { Importance } from "@/lib/api/types";

const map: Record<
  Importance,
  { label: string; className: string }
> = {
  low: { label: "Low", className: "ph-pill-green" },
  medium: { label: "Medium", className: "ph-pill-amber" },
  high: { label: "High", className: "ph-pill-red" },
  critical: { label: "Critical", className: "ph-pill-red" },
};

/** Shows low / medium / high / critical with prototype colors. */
export function ImportancePill({
  importance,
  className,
}: {
  importance: Importance | string;
  className?: string;
}) {
  const key = (importance in map ? importance : "medium") as Importance;
  const item = map[key];
  return (
    <span className={cn("ph-pill", item.className, className)}>
      {item.label}
    </span>
  );
}
