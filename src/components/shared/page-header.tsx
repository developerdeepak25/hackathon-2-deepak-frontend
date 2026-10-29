/**
 * Shared page title block used on marketing and product routes.
 */

import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb?: { href: string; label: string }[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="ph-page-header ph-section-tight pb-8 pt-10 md:pt-12">
      <div className="ph-container">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            className="mb-5 flex items-center gap-2 text-[11px] text-[#8390a2]"
            aria-label="Breadcrumb"
          >
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>›</span>}
                <Link
                  href={crumb.href}
                  className="font-medium text-[#65738a] hover:text-[var(--ph-blue)] dark:hover:text-[#e8eef7]"
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="ph-eyebrow">
              <span className="ph-eyebrow-dot" />
              {eyebrow}
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[var(--ph-ink)] md:text-[47px]">
              {title}
            </h1>
            {description && (
              <p className="mt-3 max-w-2xl text-[var(--ph-muted)] leading-7">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}
