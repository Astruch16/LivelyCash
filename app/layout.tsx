import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Michroma } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { siteConfig, siteUrl } from "@/lib/site";

import "./globals.css";

/** Body copy and UI. */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Display face, headings only. Michroma ships a single weight and is not a
 * variable font, so the weight has to be declared.
 */
const michroma = Michroma({
  variable: "--font-michroma",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/** Eyebrows, technical labels and the decorative coordinates. */
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "business",
  keywords: [
    "ATM placement",
    "ATM machines Fraser Valley",
    "free ATM placement BC",
    "Hyosung Halo II",
    "ATM for my business",
    "Chilliwack ATM",
    "Abbotsford ATM",
  ],
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: siteConfig.name,
    url: siteUrl,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${dmSans.variable} ${michroma.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-ink">
        <JsonLd data={localBusinessJsonLd()} />
        <SmoothScroll />
        {/* Parked just above the viewport and slid into view on focus, rather
            than sr-only/not-sr-only, which would strip its padding. */}
        <a
          href="#main"
          className="absolute top-0 left-4 z-100 -translate-y-full rounded-b-xl bg-accent px-4 py-2.5 text-sm font-medium text-ink transition-transform duration-150 focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
