import type { Metadata } from "next";
import { FileCheckIcon, InfoIcon } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { CtaButton } from "@/components/marketing/cta-button";
import { FaqList } from "@/components/marketing/faq";
import { HexIcon } from "@/components/marketing/hex";
import { InkBand } from "@/components/marketing/ink-band";
import { PlanDetailCard } from "@/components/marketing/plan-cards";
import { Reveal } from "@/components/marketing/reveal";
import {
  Container,
  DisplayHeading,
  Eyebrow,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/marketing/section";
import { planFaqs } from "@/lib/faqs";
import { atmServiceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { amlOnboarding, plans, plansClosingLine } from "@/lib/plans";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Plans",
  description:
    "Compare the three Lively Cash ATM programs: the ATM Purchase Program, the ATM Combo Program and the recommended Turnkey ATM Placement Program. Full feature lists and costs.",
  path: "/plans",
});

export default function PlansPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Plans", path: "/plans" },
        ])}
      />
      <JsonLd
        data={atmServiceJsonLd({
          name: "ATM placement and purchase programs",
          description:
            "Three ATM programs for Fraser Valley businesses: purchase and own the machine, load your own cash under the combo program, or take a fully hands-off turnkey placement.",
          path: "/plans",
        })}
      />
      <JsonLd data={faqJsonLd("/plans", planFaqs)} />

      <section className="relative overflow-hidden bg-white pt-14 pb-4 sm:pt-16 lg:pt-20">
        <Container className="relative">
          <PageHeader
            eyebrow="Programs &amp; pricing"
            title="Three ATM Programs. Pick the One That Matches How Involved You Want to Be."
            description="Own the machine and keep the most revenue, load your own cash without buying hardware, or hand the whole operation to us. Every number is on this page."
          />
          <nav
            aria-label="Jump to a program"
            className="mt-9 flex flex-wrap gap-2"
          >
            {/* Plain anchors, not next/link — see the note in `CtaButton`:
                routing a hash through the router cuts Lenis's scroll short. */}
            {plans.map((plan, index) => (
              <a
                key={plan.slug}
                href={`#${plan.slug}`}
                className={
                  plan.recommended
                    ? "inline-flex items-center rounded-full bg-accent px-4 py-2.5 font-mono text-[0.625rem] font-medium tracking-[0.18em] text-ink uppercase transition-colors hover:bg-accent-deep"
                    : "inline-flex items-center rounded-full border border-line px-4 py-2.5 font-mono text-[0.625rem] font-medium tracking-[0.18em] text-ink-soft uppercase transition-colors hover:border-ink hover:text-ink"
                }
              >
                {index + 1}. {plan.shortName}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <Section aria-labelledby="programs-heading">
        <h2 id="programs-heading" className="sr-only">
          ATM programs in detail
        </h2>
        <div className="flex flex-col gap-6">
          {plans.map((plan, index) => (
            <Reveal key={plan.slug}>
              <PlanDetailCard plan={plan} index={index} />
            </Reveal>
          ))}
        </div>

        {/* AML onboarding — the page's one ink band. Applies to programs 1 and 2. */}
        <Reveal className="mt-6">
          <InkBand className="p-6 sm:p-9 lg:p-12">
            <div className="flex flex-wrap items-center gap-4">
              <HexIcon frameClassName="text-accent/70">
                <FileCheckIcon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 text-accent"
                />
              </HexIcon>
              <div>
                <DisplayHeading as="h3" size="minor" className="text-white">
                  {amlOnboarding.title}
                </DisplayHeading>
                <p className="mt-1.5 text-sm text-ink-muted">
                  {amlOnboarding.applies}
                </p>
              </div>
            </div>

            <p className="mt-7 text-ink-muted">{amlOnboarding.intro}</p>
            <ul className="mt-5 grid gap-2.5 text-sm sm:grid-cols-2">
              {amlOnboarding.requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex items-center gap-3 rounded-xl border border-ink-line bg-ink-raised px-4 py-3 text-white"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {requirement}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-3 text-sm text-ink-muted">
              <InfoIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {amlOnboarding.outro}
            </p>
          </InkBand>
        </Reveal>

        <Reveal className="mt-6">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-base-soft p-6 sm:p-9">
            <Eyebrow>Not quite right?</Eyebrow>
            <p className="max-w-3xl text-lg text-pretty sm:text-xl">
              {plansClosingLine}
            </p>
            <CtaButton href="/contact" variant="dark">
              Contact us about a program
            </CtaButton>
          </div>
        </Reveal>
      </Section>

      <Section tone="soft" aria-labelledby="plans-faq-heading">
        <Reveal>
          <SectionHeader
            id="plans-faq-heading"
            eyebrow="Common questions"
            title="Questions We Get Asked Before Signing"
          />
        </Reveal>
        <Reveal className="mt-10 max-w-3xl">
          <FaqList faqs={planFaqs} />
        </Reveal>
      </Section>

      <CtaBanner
        // Matches the soft FAQ section above it.
        tone="soft"
        eyebrow="Not sure which program fits?"
        title={
          <>
            Tell us your location, and we&rsquo;ll tell you{" "}
            <span className="text-accent">what pays.</span>
          </>
        }
        description="Tell us your location type and roughly how busy you are. We'll tell you which program pays you the most, and whether an ATM is worth it at all."
        secondaryHref="/why-us"
        secondaryLabel="Why choose Lively Cash"
      />
    </>
  );
}
