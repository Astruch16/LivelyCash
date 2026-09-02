import type { Metadata } from "next";
import Link from "next/link";

import { CtaButton } from "@/components/marketing/cta-button";
import { Container, Eyebrow, PageHeader } from "@/components/marketing/section";
import { cityNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container className="relative flex flex-col items-start gap-10 py-24 sm:py-32">
        <PageHeader
          eyebrow="Error 404"
          title="We Couldn't Find That Page"
          description="The link may be out of date. Try one of these instead — or tell us what you were looking for and we'll point you at it."
        >
          <CtaButton href="/" variant="dark">
            Back to home
          </CtaButton>
          <CtaButton href="/contact" variant="ghost">
            Contact us
          </CtaButton>
        </PageHeader>

        <nav aria-label="City pages">
          <Eyebrow>Service areas</Eyebrow>
          <ul className="mt-4 flex flex-wrap gap-2">
            {cityNav.map((city) => (
              <li key={city.href}>
                <Link
                  href={city.href}
                  className="inline-flex rounded-full border border-line px-4 py-2.5 font-mono text-[0.625rem] tracking-[0.18em] text-ink-soft uppercase transition-colors hover:border-accent hover:text-ink"
                >
                  {city.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
