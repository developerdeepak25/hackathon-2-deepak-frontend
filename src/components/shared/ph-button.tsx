/**
 * Link-styled buttons matching prototype btn variants.
 */

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "lime" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--ph-navy)] text-white shadow-md hover:bg-[#23344f] dark:bg-[var(--ph-lime)] dark:text-[#17211a] dark:hover:bg-[var(--ph-lime-hover)]",
  lime: "bg-[var(--ph-lime)] text-[#162234] hover:bg-[var(--ph-lime-hover)]",
  secondary:
    "border border-[var(--ph-line)] bg-[var(--ph-surface)] text-[var(--ph-ink)] hover:border-[#c7cfdb] hover:bg-[#fbfcfe] dark:hover:bg-[#1a2a40]",
  ghost: "bg-transparent text-[var(--ph-muted)] hover:bg-transparent",
};

/** Navigation button with prototype styling. */
export function PhButton({
  href,
  children,
  variant = "secondary",
  className,
  small,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  small?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-bold whitespace-nowrap transition hover:-translate-y-px",
        small ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
