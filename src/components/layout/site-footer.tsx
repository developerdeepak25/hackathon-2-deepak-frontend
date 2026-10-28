/**
 * Site footer with product and explore links.
 */

import Link from "next/link";
import { BrandMark } from "@/components/icons/brand-mark";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#253247] bg-[#0d1728] px-4 py-10 text-white dark:bg-[#070d17]">
      <div className="ph-container">
        <div className="flex flex-col justify-between gap-10 pb-8 md:flex-row">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--ph-navy)] text-[var(--ph-lime)]">
                <BrandMark />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                Policy<span className="text-[#9baac0]">Hawk</span>
              </span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-[#99a7bb]">
              Know when the rules around your data change. Follow policy
              versions, inspect what changed, and understand why it matters.
            </p>
          </div>
          <div className="flex flex-wrap gap-12 md:gap-16">
            <div>
              <strong className="text-[11px] text-[#c2ccda]">PRODUCT</strong>
              <Link
                href="/companies"
                className="mt-3 block text-xs text-[#8f9db1] hover:text-[var(--ph-lime)]"
              >
                Companies
              </Link>
              <Link
                href="/tracker"
                className="mt-3 block text-xs text-[#8f9db1] hover:text-[var(--ph-lime)]"
              >
                Tracker overview
              </Link>
              <Link
                href="/demo"
                className="mt-3 block text-xs text-[#8f9db1] hover:text-[var(--ph-lime)]"
              >
                Interactive demo
              </Link>
            </div>
            <div>
              <strong className="text-[11px] text-[#c2ccda]">EXPLORE</strong>
              <Link
                href="/how-it-works"
                className="mt-3 block text-xs text-[#8f9db1] hover:text-[var(--ph-lime)]"
              >
                How it works
              </Link>
              <Link
                href="/pricing"
                className="mt-3 block text-xs text-[#8f9db1] hover:text-[var(--ph-lime)]"
              >
                Pricing
              </Link>
              <Link
                href="/faq"
                className="mt-3 block text-xs text-[#8f9db1] hover:text-[var(--ph-lime)]"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] text-[#75849a] md:flex-row md:justify-between">
          <span>© 2026 PolicyHawk</span>
          <span>
            Sample and simulated records are clearly identified in the product.
          </span>
        </div>
      </div>
    </footer>
  );
}
