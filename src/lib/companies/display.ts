/**
 * Human-readable labels and styling helpers for company categories and fetch status.
 */

import type { FetchStatus } from "@/lib/api/types";
import type { StatusPillVariant } from "@/components/shared/status-pill";

const CHANGE_TAG_LABELS: Record<string, string> = {
  "ai-training": "AI training",
  "data-sharing": "Data sharing",
  "data-selling": "Data selling",
  retention: "Retention",
  deletion: "Deletion",
  other: "Other",
};

/** Maps a change tag slug to a short label. Phrases that are already readable stay as written. */
export function formatChangeTag(tag: string): string {
  if (CHANGE_TAG_LABELS[tag]) {
    return CHANGE_TAG_LABELS[tag];
  }
  if (!/[-_]/.test(tag)) {
    return tag;
  }
  return tag
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/** Maps API category slugs to directory chip labels. */
export function formatCategory(category: string): string {
  const labels: Record<string, string> = {
    messaging: "Messaging",
    workplace: "Workplace",
    social: "Social",
    streaming: "Streaming",
  };
  return labels[category] ?? category;
}

/** Maps list fields to the directory status pill. */
export function companyCardStatus(company: {
  lastFetchStatus: FetchStatus;
  changeCount: number;
}): StatusPillVariant {
  if (company.lastFetchStatus === "failed") return "failed";
  if (company.lastFetchStatus === "never") return "never";
  if (company.changeCount > 0) return "changed";
  return "unchanged";
}

/** Formats an API timestamp for cards and tables. */
export function formatWhen(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export type FetchStatusUi = "ok" | "failed" | "never";

export type DirectoryStatusFilter =
  | "all"
  | "changed"
  | "unchanged"
  | "failed"
  | "never";

/** Tailwind classes for the colored company avatar square in the prototype. */
export function logoClass(variant: string): string {
  const map: Record<string, string> = {
    whatsapp: "bg-[#ddf8e7] text-[#168351] dark:bg-[#173d31] dark:text-[#8ce8ba]",
    telegram: "bg-[#e2f3ff] text-[#1685c4]",
    zoom: "bg-[#e7edff] text-[#2e65e9]",
    teams: "bg-[#eae7ff] text-[#5546ba]",
    slack: "bg-[#ffefe5] text-[#9b5942]",
    discord: "bg-[#e8e8ff] text-[#5658cc]",
    linkedin: "bg-[#e0f2ff] text-[#12629e]",
    x: "bg-[#edf0f4] text-[#202b3b] dark:bg-[#26354a] dark:text-[#e1eaf6]",
    instagram: "bg-[#ffebf3] text-[#bb467e]",
    spotify: "bg-[#ddf8e7] text-[#147d4e]",
    test: "bg-[#e9f8d9] text-[#2f711e] dark:bg-[#152d26] dark:text-[#9ddbb5]",
  };
  return map[variant] ?? map.x;
}
