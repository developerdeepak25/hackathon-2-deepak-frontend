"use client";

/**
 * Sticky site header with primary nav and theme toggle.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun } from "lucide-react";
import { BrandMark } from "@/components/icons/brand-mark";
import { PhButton } from "@/components/shared/ph-button";
import { cn } from "@/lib/utils";
import { useThemeToggle } from "@/components/providers/theme-sync";
import { setMobileNavOpen } from "@/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const links = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/demo", label: "Live demo" },
  { href: "/pricing", label: "Pricing" },
];

/** Returns whether a nav item should appear active for the current path. */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Topbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.mobileNavOpen);
  const { mode, toggle } = useThemeToggle();

  return (
    <header className="sticky top-0 z-50 flex h-[68px] items-center gap-3 border-b border-[var(--ph-line)] bg-[var(--ph-surface)]/90 px-4 backdrop-blur-lg md:h-[78px] md:gap-7 md:px-[max(26px,calc((100vw-1240px)/2))] dark:bg-[#0a111e]/90">
      <Link
        href="/"
        className="flex min-w-0 items-center gap-2.5 md:min-w-[180px]"
        aria-label="PolicyHawk home"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--ph-navy)] text-[var(--ph-lime)]">
          <BrandMark />
        </span>
        <span className="text-lg font-extrabold tracking-tight md:text-xl">
          Policy<span className="text-[#6f7c90] dark:text-[#9baac0]">Hawk</span>
        </span>
      </Link>

      <nav
        className={cn(
          "flex flex-1 items-center gap-1 max-md:absolute max-md:top-[67px] max-md:left-0 max-md:right-0 max-md:flex-col max-md:items-stretch max-md:border-b max-md:border-[var(--ph-line)] max-md:bg-[var(--ph-surface)] max-md:p-4 max-md:shadow-lg dark:max-md:bg-[#0b1422]",
          !open && "max-md:hidden",
        )}
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => dispatch(setMobileNavOpen(false))}
            className={cn(
              "rounded-[11px] px-3 py-2.5 text-sm font-semibold text-[#68758a] transition hover:bg-[#f0f3f7] hover:text-[var(--ph-ink)] dark:text-[#9baac0] dark:hover:bg-[#1a273a] dark:hover:text-[#f0f4fa]",
              isActive(pathname, link.href) &&
                "bg-[#f0f3f7] text-[var(--ph-ink)] dark:bg-[#1a273a] dark:text-[#f0f4fa]",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <PhButton
          href="/tracker"
          variant="secondary"
          small
          className="max-md:hidden"
        >
          Open tracker <span aria-hidden>↗</span>
        </PhButton>
        <button
          type="button"
          onClick={toggle}
          className="grid h-9 w-9 place-items-center rounded-[11px] border border-[var(--ph-line)] bg-[var(--ph-surface)] text-[#657187] hover:bg-[#fbfcfe] dark:hover:bg-[#1a2a40]"
          aria-label={
            mode === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          {mode === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-[11px] border border-[var(--ph-line)] md:hidden"
          aria-label="Toggle navigation"
          onClick={() => dispatch(setMobileNavOpen(!open))}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
