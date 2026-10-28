/**
 * Presentational pricing tiers (no checkout in MVP).
 */

export interface PricingPlan {
  name: string;
  price: string;
  unit?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
  status: "available" | "planned";
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    unit: "forever",
    description: "Explore the core tracking experience.",
    features: [
      "Access to the 10 MVP companies",
      "View available policy histories",
      "Read change summaries",
      "See importance levels",
    ],
    cta: "Explore tracker",
    href: "/tracker",
    status: "available",
  },
  {
    name: "Pro",
    price: "Price TBD",
    description: "For individuals who want deeper monitoring.",
    features: [
      "Followed-company lists (planned)",
      "Change alerts (planned)",
      "Expanded monitoring options",
      "Additional history tools",
    ],
    cta: "Planned feature set",
    href: "/faq",
    featured: true,
    status: "planned",
  },
  {
    name: "Team",
    price: "Price TBD",
    description: "For teams reviewing vendor privacy practices.",
    features: [
      "Shared vendor coverage (planned)",
      "Team-oriented views",
      "Expanded company coverage",
      "Team-ready reporting",
    ],
    cta: "Planned feature set",
    href: "/faq",
    status: "planned",
  },
];
