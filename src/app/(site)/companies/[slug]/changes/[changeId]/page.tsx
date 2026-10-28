/**
 * Change report detail page (layout preview until API change fetch is wired).
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChangeReportView,
  type ChangeReportData,
} from "@/components/changes/change-report-view";
import { getCompanyMeta } from "@/content/companies";

const SAMPLE_REPORT: ChangeReportData = {
  title: "Example: expanded data-use wording",
  summary:
    "This layout preview shows how PolicyHawk presents a difference between two stored policy versions.",
  whatItMeans:
    "The summary is a starting point. Review the exact wording, applicable exceptions, and original policy before drawing conclusions.",
  importance: "medium",
  isSample: true,
  isSimulation: false,
  fromLabel: "v1",
  toLabel: "v2",
  oldExcerpt:
    "We collect account information to provide and maintain our services.",
  newExcerpt:
    "We collect account information to provide and maintain our services.",
  removedSpan: "We do not use private messages for advertising.",
  addedSpan:
    "We may use selected interaction data to improve our services and personalize features.",
  tags: ["Data usage", "Privacy policy"],
};

export default async function ChangeReportPage({
  params,
}: {
  params: Promise<{ slug: string; changeId: string }>;
}) {
  const { slug } = await params;
  const company = getCompanyMeta(slug);
  if (!company) notFound();

  const backHref =
    slug === "test-company" ? "/demo" : `/companies/${slug}`;

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
      <ChangeReportView
        company={company}
        report={SAMPLE_REPORT}
        backHref={backHref}
      />
    </>
  );
}
