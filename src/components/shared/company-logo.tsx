/**
 * Colored initials avatar matching the HTML prototype company cards.
 */

import { cn } from "@/lib/utils";
import { logoClass } from "@/lib/companies/display";

type Size = "sm" | "md" | "lg";

const sizeClass: Record<Size, string> = {
  sm: "h-[37px] w-[37px] rounded-xl text-xs",
  md: "h-12 w-12 rounded-[15px] text-base",
  lg: "h-[62px] w-[62px] rounded-[18px] text-xl",
};

export function CompanyLogo({
  abbr,
  variant,
  size = "md",
  className,
}: {
  abbr: string;
  variant: string;
  size?: Size;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center border border-black/5 font-extrabold tracking-tight",
        sizeClass[size],
        logoClass(variant),
        className,
      )}
      aria-hidden
    >
      {abbr}
    </div>
  );
}
