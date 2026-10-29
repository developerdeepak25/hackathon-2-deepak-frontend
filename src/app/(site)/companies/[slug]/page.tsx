/**
 * Single company policy history page.
 */

import { notFound } from "next/navigation";
import { CompanyDetailView } from "@/components/companies/company-detail-view";
import { getCompanyMeta } from "@/content/companies";
import Link from "next/link";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompanyMeta(slug);
  if (!company) notFound();

  return (
    <div className="ph-record-page">
      <div className="ph-container pt-10">
        <nav className="ph-record-breadcrumb mb-2 text-[11px] text-[#8390a2]" aria-label="Breadcrumb">
          <Link href="/companies" className="hover:text-[var(--ph-blue)]">
            ← All companies
          </Link>
          <span className="mx-2">›</span>
          <span>{company.name}</span>
        </nav>
      </div>
      <CompanyDetailView company={company} />
    </div>
  );
}
