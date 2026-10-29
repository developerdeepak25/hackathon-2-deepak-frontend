/**
 * Change-tag chips. Used beside the change title, not under the summary.
 */

import { formatChangeTag } from "@/lib/companies/display";
import { cn } from "@/lib/utils";

/** Renders formatted change tags as small chips. */
export function ChangeTags({
  tags,
  className,
  onDark = false,
}: {
  tags: string[];
  className?: string;
  onDark?: boolean;
}) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={cn(
            "inline-flex rounded-md px-2 py-1 text-[10px] font-bold",
            onDark
              ? "bg-white/10 text-[#d5deea]"
              : "bg-[#f0f3f8] text-[#68758a] dark:bg-[#202c3e] dark:text-[#b8c5d7]",
          )}
        >
          {formatChangeTag(tag)}
        </span>
      ))}
    </div>
  );
}
