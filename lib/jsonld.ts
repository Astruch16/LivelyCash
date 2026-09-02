import { cityNav, siteConfig, siteUrl } from "@/lib/site";

type JsonLdObject = Record<string, unknown>;

/**
 * Sitewide `LocalBusiness` node. Rendered once from the root layout so every
 * page carries the business identity, service area and contact point.
 */
export function localBusinessJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteUrl,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    currenciesAccepted: "CAD",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      addressCountry: siteConfig.addressCountry,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Fraser Valley, British Columbia",
      },
      ...cityNav.map((city) => ({
        "@type": "City",
        name: `${city.label}, British Columbia`,
      })),
    ],
    knowsAbout: [
      "ATM placement",
      "ATM sales",
      "ATM processing",
      "Hyosung Halo II",
      "Surcharge revenue sharing",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      areaServed: "CA-BC",
      availableLanguage: "English",
    },
  };
}

/** `Service` node for an ATM placement offering, optionally scoped to a city. */
export function atmServiceJsonLd({
  name,
  description,
  path,
  cityName,
}: {
  name: string;
  description: string;
  path: string;
  cityName?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${path}#service`,
    name,
    description,
    serviceType: "ATM placement and servicing",
    url: `${siteUrl}${path}`,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: cityName
      ? { "@type": "City", name: `${cityName}, British Columbia` }
      : {
          "@type": "AdministrativeArea",
          name: "Fraser Valley, British Columbia",
        },
  };
}

/** `FAQPage` node built from a list of question/answer pairs. */
export function faqJsonLd(
  path: string,
  faqs: readonly { question: string; answer: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}${path}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** `BreadcrumbList` node. Pass crumbs from the site root downwards. */
export function breadcrumbJsonLd(
  crumbs: readonly { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}
