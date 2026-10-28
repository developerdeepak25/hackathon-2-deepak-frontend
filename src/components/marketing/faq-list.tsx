"use client";

/**
 * Expandable FAQ list from static content.
 */

import { useState } from "react";
import { FAQ_ITEMS } from "@/content/faq";
import { cn } from "@/lib/utils";

export function FaqList() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-3xl border-t border-[var(--ph-line)]">
      {FAQ_ITEMS.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.question}
            className="border-b border-[var(--ph-line)]"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-bold text-[var(--ph-ink)]"
              onClick={() => setOpenIndex(open ? -1 : index)}
              aria-expanded={open}
            >
              {item.question}
              <span
                className={cn(
                  "text-2xl font-light text-[#8a96a8] transition",
                  open && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            {open && (
              <div className="pb-5 pr-8 text-xs leading-relaxed text-[var(--ph-muted)]">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
