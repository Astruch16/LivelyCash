import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/marketing/contact-form";
import { Reveal } from "@/components/marketing/reveal";
import {
  Container,
  DisplayHeading,
  Eyebrow,
  PageHeader,
  Section,
} from "@/components/marketing/section";
import { Skeleton } from "@/components/marketing/skeleton";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { cityNav, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Talk to Lively Cash ATMs about placing, buying or servicing an ATM in Chilliwack, Abbotsford, Agassiz, Hope or Harrison, BC. We reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ])}
      />

      <section className="relative overflow-hidden bg-white pt-14 pb-4 sm:pt-16 lg:pt-20">
        <Container className="relative">
          <PageHeader
            eyebrow="Contact us"
            title="Tell Us About Your Location"
            description="A few details is all it takes for us to tell you which program fits, roughly what a machine would earn, and whether an ATM makes sense for your business at all."
          />
        </Container>
      </section>

      <Section aria-labelledby="contact-form-heading">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <DisplayHeading
              as="h2"
              id="contact-form-heading"
              size="minor"
              className="text-ink"
            >
              Send us a message
            </DisplayHeading>
            <p className="mt-4 text-ink-soft">
              Required fields are validated before sending. We never share your
              details with anyone.
            </p>

            <div className="mt-9">
              <Suspense fallback={<FormSkeleton />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <aside className="flex flex-col gap-5">
            <Reveal>
              <div className="rounded-2xl border border-line bg-base-soft p-6">
                <Eyebrow as="h2">Reach us directly</Eyebrow>
                {/* TODO(launch): confirm the published opening hours. */}
                <ul className="mt-5 flex flex-col gap-4 text-sm">
                  <li className="flex items-start gap-3">
                    <PhoneIcon
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-ink-soft"
                    />
                    <a
                      href={siteConfig.phoneHref}
                      className="font-medium underline-offset-4 hover:underline"
                    >
                      {siteConfig.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MailIcon
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-ink-soft"
                    />
                    <a
                      href={siteConfig.emailHref}
                      className="font-medium break-all underline-offset-4 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <ClockIcon
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-ink-soft"
                    />
                    <span className="text-ink-soft">{siteConfig.hours}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPinIcon
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-ink-soft"
                    />
                    <span className="text-ink-soft">
                      Serving {siteConfig.region}
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-line bg-white p-6">
                <Eyebrow as="h2">Where we work</Eyebrow>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cityNav.map((city) => (
                    <li key={city.href}>
                      <Link
                        href={city.href}
                        className="inline-flex rounded-full border border-line px-3.5 py-2 text-sm transition-colors hover:border-accent"
                      >
                        {city.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-ink-soft">
                  Nearby but not on the list? Ask anyway — we&rsquo;ll tell you
                  honestly whether we can service you properly.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line bg-white p-6">
                <Eyebrow as="h2">Not sure which program?</Eyebrow>
                <p className="mt-4 text-sm text-ink-soft">
                  Pick &ldquo;Not sure yet&rdquo; in the form, or read the full
                  breakdown of all three first.
                </p>
                <Link
                  href="/plans"
                  className="mt-5 inline-block font-mono text-[0.625rem] tracking-[0.2em] text-ink uppercase underline underline-offset-4"
                >
                  Compare the programs &rarr;
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-36 w-full" />
      </div>
      <Skeleton className="h-14 w-52 rounded-full" />
    </div>
  );
}
