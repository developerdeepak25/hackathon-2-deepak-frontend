/**
 * Static MVP company metadata for UI layout and filters.
 * Live fetch status and counts come from the API in a later milestone.
 */

export type CompanyCategory = "messaging" | "workplace" | "social" | "streaming";

export type CompanyLogoVariant =
  | "whatsapp"
  | "telegram"
  | "zoom"
  | "teams"
  | "slack"
  | "discord"
  | "linkedin"
  | "x"
  | "instagram"
  | "spotify"
  | "test";

export interface CompanyMeta {
  slug: string;
  name: string;
  abbr: string;
  category: CompanyCategory;
  logo: CompanyLogoVariant;
}

/** The ten companies tracked in the MVP, aligned with the API seed list. */
export const MVP_COMPANIES: CompanyMeta[] = [
  {
    slug: "whatsapp",
    name: "WhatsApp",
    abbr: "WA",
    category: "messaging",
    logo: "whatsapp",
  },
  {
    slug: "telegram",
    name: "Telegram",
    abbr: "TG",
    category: "messaging",
    logo: "telegram",
  },
  {
    slug: "zoom",
    name: "Zoom",
    abbr: "Zm",
    category: "workplace",
    logo: "zoom",
  },
  {
    slug: "microsoft-teams",
    name: "Microsoft Teams",
    abbr: "MT",
    category: "workplace",
    logo: "teams",
  },
  {
    slug: "slack",
    name: "Slack",
    abbr: "S",
    category: "workplace",
    logo: "slack",
  },
  {
    slug: "discord",
    name: "Discord",
    abbr: "D",
    category: "social",
    logo: "discord",
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    abbr: "in",
    category: "social",
    logo: "linkedin",
  },
  { slug: "x", name: "X", abbr: "X", category: "social", logo: "x" },
  {
    slug: "instagram",
    name: "Instagram",
    abbr: "IG",
    category: "social",
    logo: "instagram",
  },
  {
    slug: "spotify",
    name: "Spotify",
    abbr: "Sp",
    category: "streaming",
    logo: "spotify",
  },
];

/** Resolves MVP company metadata by slug for route pages. */
export function getCompanyMeta(slug: string): CompanyMeta | undefined {
  return MVP_COMPANIES.find((c) => c.slug === slug);
}
