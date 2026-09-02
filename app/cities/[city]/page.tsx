import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon, StoreIcon } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { CtaButton } from "@/components/marketing/cta-button";
import { HexIcon } from "@/components/marketing/hex";
import { InkBand } from "@/components/marketing/ink-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/reveal";
import {
  Container,
  DisplayHeading,
  Eyebrow,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/marketing/section";
import { cities, citySlugs, getCity } from "@/lib/cities";
import { atmServiceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/** Prerender all five city pages at build time. */
export function generateStaticParams() {
  return citySlugs.map((city) => ({ city }));
}

/** Anything outside the five known slugs 404s rather than rendering. */
export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/cities/[city]">,
): Promise<Metadata> {
  const { city: slug } = await props.params;
  const city = getCity(slug);

  if (!city) return {};

  return pageMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/cities/${city.slug}`,
    keywords: [
      `ATM ${city.name}`,
      `ATM placement ${city.name} BC`,
      `free ATM ${city.name}`,
      `ATM machine ${city.name}`,
      "Hyosung Halo II",
    ],
  });
}

export default async function CityPage(props: PageProps<"/cities/[city]">) {
  const { city: slug } = await props.params;
  const city = getCity(slug);

  if (!city) notFound();

  const otherCities = cities.filter((entry) => entry.slug !== city.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cities", path: "/cities/abbotsford" },
          { name: city.longName, path: `/cities/${city.slug}` },
        ])}
      />
      <JsonLd
        data={atmServiceJsonLd({
          name: `ATM placement and servicing in ${city.longName}, BC`,
          description: city.metaDescription,
          path: `/cities/${city.slug}`,
          cityName: city.longName,
        })}
      />

      <section className="relative overflow-hidden bg-white pt-14 pb-4 sm:pt-16 lg:pt-20">
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <PageHeader
              eyebrow={city.kicker}
              title={city.h1}
              description={city.lede}
            >
              <CtaButton href="/contact" variant="dark">
                Free {city.name} assessment
              </CtaButton>
              <CtaButton href="/plans" variant="ghost">
                See our plans
              </CtaButton>
            </PageHeader>

            <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {city.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-line bg-base-soft p-5"
                >
                  <dt className="font-display text-lg text-ink">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 text-sm text-ink-soft">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <Section aria-labelledby="city-copy-heading">
        <h2 id="city-copy-heading" className="sr-only">
          ATM services in {city.longName}
        </h2>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="flex flex-col gap-12">
            {city.sections.map((section) => (
              <Reveal key={section.heading}>
                <DisplayHeading as="h3" className="text-ink">
                  {section.heading}
                </DisplayHeading>
                <div className="mt-6 flex flex-col gap-4 text-pretty text-ink-soft">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="rounded-3xl border border-line bg-base-soft p-6 sm:p-9">
                <p className="text-lg text-pretty sm:text-xl">{city.closing}</p>
                <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <CtaButton href="/contact" variant="dark">
                    Contact us
                  </CtaButton>
                  <CtaButton href="/plans" variant="ghost">
                    Compare the programs
                  </CtaButton>
                </div>
              </div>
            </Reveal>
          </div>

          <aside className="flex flex-col gap-5">
            <Reveal>
              <div className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-[0.9375rem] text-ink">
                  {city.name} businesses we place ATMs in
                </h3>
                <ul className="mt-5 flex flex-col gap-3 text-sm">
                  {city.businessTypes.map((type) => (
                    <li key={type} className="flex gap-3">
                      <CheckIcon
                        aria-hidden="true"
                        strokeWidth={2.25}
                        className="mt-0.5 size-4 shrink-0 text-accent"
                      />
                      <span className="text-ink-soft">{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* The page's one ink band. */}
            <Reveal delay={0.05}>
              <InkBand className="p-6">
                <Eyebrow surface="ink">The hardware</Eyebrow>
                <h3 className="mt-4 font-display text-[0.9375rem] text-white">
                  Every {city.name} placement runs the {siteConfig.hardware}
                </h3>
                <p className="mt-3 text-sm text-ink-muted">
                  Modern, reliable, and built around a bright interactive
                  display that customers get through quickly.
                </p>
                <Image
                  src="/images/hyosung-halo-ii.png"
                  alt={`A Hyosung Halo II ATM of the kind Lively Cash installs in ${city.longName}`}
                  width={327}
                  height={1009}
                  sizes="7rem"
                  className="mx-auto mt-6 h-auto w-28"
                />
                <CtaButton
                  href="/processing"
                  variant="accent"
                  size="md"
                  className="mt-6"
                >
                  How processing works
                </CtaButton>
              </InkBand>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section tone="soft" aria-labelledby="other-cities-heading">
        <Reveal>
          <SectionHeader
            id="other-cities-heading"
            eyebrow="Nearby"
            title="We Serve the Rest of the Valley Too"
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.06}
        >
          {otherCities.map((entry) => (
            <RevealItem as="li" key={entry.slug}>
              <Link
                href={`/cities/${entry.slug}`}
                className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-accent"
              >
                <HexIcon size="sm" frameClassName="text-accent/70">
                  <StoreIcon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 text-ink"
                  />
                </HexIcon>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-ink">
                    ATMs in {entry.name}
                  </span>
                  <span className="mt-1.5 text-xs text-ink-soft">
                    {entry.blurb}
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBanner
        // Matches the soft nearby cities section above it.
        tone="soft"
        eyebrow={`Serving ${city.longName}`}
        title={
          <>
            Put an ATM in your{" "}
            <span className="text-accent">{city.name} business.</span>
          </>
        }
        description={`Tell us where you are in ${city.longName} and how busy you get. We'll recommend the program that makes you the most money with the least hassle.`}
      />
    </>
  );
}
