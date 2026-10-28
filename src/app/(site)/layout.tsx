/**
 * Site chrome with Redux and React Query (not used by root not-found).
 */

import { AppProviders } from "@/components/providers/app-providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { ToastHost } from "@/components/layout/toast-host";
import { Topbar } from "@/components/layout/topbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <Topbar />
      <main className="min-h-[65vh] flex-1 ph-page-in" aria-live="polite">
        {children}
      </main>
      <SiteFooter />
      <ToastHost />
    </AppProviders>
  );
}
