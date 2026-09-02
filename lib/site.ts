/**
 * Single source of truth for site-wide identity, navigation and contact
 * details. Update the placeholder contact values before launch.
 */

// TODO(launch): point NEXT_PUBLIC_SITE_URL at the real production domain.
// Canonical URLs, Open Graph tags, the sitemap and robots.txt all derive
// from this value.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.livelycashatms.ca"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Lively Cash ATMs",
  shortName: "Lively Cash",
  legalName: "Lively Cash ATMs",
  url: siteUrl,
  tagline: "ATM placement & sales across the Fraser Valley",
  description:
    "Lively Cash ATMs places, sells and services Hyosung Halo II ATMs for businesses in Chilliwack, Abbotsford, Agassiz, Hope and Harrison, BC. Free placement programs, local support and transparent revenue sharing.",
  phone: "(604) 799-8937",
  phoneHref: "tel:+16047998937",
  email: "livelycashatms@gmail.com",
  emailHref: "mailto:livelycashatms@gmail.com",
  region: "Fraser Valley, British Columbia",
  addressRegion: "BC",
  addressCountry: "CA",
  // TODO(launch): confirm the mailing address shown in the footer and JSON-LD.
  addressLocality: "Chilliwack",
  hours: "Mon–Fri 8:00am – 6:00pm PT",
  hardware: "Hyosung Halo II",
} as const;

export type NavLink = {
  href: string;
  label: string;
  description?: string;
};

export const cityNav: NavLink[] = [
  {
    href: "/cities/abbotsford",
    label: "Abbotsford",
    description: "The Fraser Valley's largest retail and agriculture hub",
  },
  {
    href: "/cities/chilliwack",
    label: "Chilliwack",
    description: "Fast-growing retail, hospitality and event traffic",
  },
  {
    href: "/cities/hope",
    label: "Hope",
    description: "Highway-corridor travellers, fuel stops and diners",
  },
  {
    href: "/cities/harrison",
    label: "Harrison",
    description: "Resort-town tourism and seasonal visitor spending",
  },
  {
    href: "/cities/agassiz",
    label: "Agassiz",
    description: "Farm markets, agri-tourism and community events",
  },
];

export const mainNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/processing", label: "Processing" },
  { href: "/why-us", label: "Why Us?" },
  { href: "/plans", label: "Plans" },
];

/** Policy pages, shown in the footer's fine print row. */
export const legalNav: NavLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/accessibility", label: "Accessibility" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/why-us", label: "Why Us?" },
      { href: "/processing", label: "Processing" },
      { href: "/plans", label: "Plans" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Service areas",
    links: cityNav.map(({ href, label }) => ({ href, label })),
  },
];
