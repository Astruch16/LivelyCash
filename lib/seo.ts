import type { Metadata } from "next";

import { siteConfig, siteUrl } from "@/lib/site";

type PageMetadataInput = {
  /** Page name, used as `{title} | Lively Cash ATMs`. */
  title: string;
  description: string;
  /** Root-relative path, e.g. `/plans`. Used for the canonical URL. */
  path: string;
  /** Overrides the default `{title} | Lively Cash ATMs` pattern. */
  absoluteTitle?: string;
  keywords?: string[];
};

/**
 * Builds a full metadata object — title, description, canonical, Open Graph
 * and Twitter card — for a single page.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  keywords,
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const fullTitle = absoluteTitle ?? `${title} | ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_CA",
      title: fullTitle,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
