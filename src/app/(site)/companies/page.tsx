/**
 * Tracked companies directory.
 */

import { CompanyDirectory } from "@/components/companies/company-directory";
import { PageHeader } from "@/components/shared/page-header";

export default function CompaniesPage() {
  return (
    <>
      <PageHeader
        eyebrow="The company directory"
        title="Tracked companies"
        description="Browse the 10 companies in the MVP and inspect their policy records when the backend has stored versions."
      />
      <div className="ph-container pb-16">
        <CompanyDirectory />
      </div>
    </>
  );
}
