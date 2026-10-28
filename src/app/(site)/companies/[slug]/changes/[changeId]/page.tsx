/**
 * Change report route. The logo comes from static metadata; the body is loaded by React Query.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { ChangeReportScreen } from "@/components/changes/change-report-screen";
import { getCompanyMeta } from "@/content/companies";

export default async function ChangeReportPage({
  params,
}: {
  params: Promise<{ slug: string; changeId: string }>;
}) {
  const { slug, changeId } = await params;
  const company = getCompanyMeta(slug);
  if (!company) notFound();

  const backHref = slug === "test-company" ? "/demo" : `/companies/${slug}`;

  return (
    <>
      <div className="ph-container pt-10 pb-4">
        <nav className="text-[11px] text-[#8390a2]" aria-label="Breadcrumb">
          <Link href="/companies" className="hover:text-[var(--ph-blue)]">
            Companies
          </Link>
          <span className="mx-2">›</span>
          <Link href={backHref} className="hover:text-[var(--ph-blue)]">
            {company.name}
          </Link>
          <span className="mx-2">›</span>
          <span>Change report</span>
        </nav>
      </div>
      <ChangeReportScreen
        company={company}
        changeId={changeId}
        backHref={backHref}
      />
    </>
  );
}
