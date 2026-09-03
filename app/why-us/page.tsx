import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheckIcon,
  GraduationCapIcon,
  MapPinIcon,
  MonitorSmartphoneIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  TimerIcon,
} from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { CtaButton } from "@/components/marketing/cta-button";
import { FaqList } from "@/components/marketing/faq";
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
import { planFaqs } from "@/lib/faqs";
import { atmServiceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { plans } from "@/lib/plans";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Why Us?",
  description:
    "Why Fraser Valley businesses choose Lively Cash ATMs: a local team, fast on-site support, modern Hyosung Halo II hardware, transparent revenue sharing and flexible programs.",
  path: "/why-us",
});

const differentiators = [
  {
    icon: MapPinIcon,
    title: "A local Fraser Valley team",
    body: "We are based here and we only serve here — Chilliwack, Abbotsford, Agassiz, Hope and Harrison. You are not an outlying pin on a national route map, and your call is not triaged against a queue in another province.",
  },
  {
    icon: TimerIcon,
    title: "Fast on-site support",
    body: "Most ATM problems are physical: a jam, an empty receipt roll, a machine that needs a reset or a reload. Those take minutes in person and days over a helpdesk. We drive out.",
  },
  {
    icon: MonitorSmartphoneIcon,
    title: `Modern ${siteConfig.hardware} hardware`,
    body: "One machine, deployed everywhere, that we know inside out. A bright interactive display, quick transaction flow, and a shell that looks like it belongs in a good retail space rather than a bus depot.",
  },
  {
    icon: ScaleIcon,
    title: "Transparent revenue sharing",
    body: "No schedule you only see after signing. We'll walk you through the per-transaction fees and surcharge sharing for your specific location before you commit to anything — and the equipment is wholesale, with no upcharge.",
  },
  {
    icon: SlidersHorizontalIcon,
    title: "Flexible programs",
    body: "Own it, share it, or go fully hands-off. If none of the three is quite right for your situation, tell us — we are small enough to discuss alterations rather than pointing at a policy.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Professional secured installation",
    body: "Every machine is properly bolted and secured at installation, sited sensibly for sightlines and traffic flow, and connected on its own secure link rather than piggybacking on your network.",
  },
  {
    icon: GraduationCapIcon,
    title: "Training provided",
    body: "On the programs where you load the machine yourself, we train your team on stocking, balancing and day-to-day maintenance — and we stay on the end of the phone afterwards.",
  },
  {
    icon: BadgeCheckIcon,
    title: "Honest about fit",
    body: "If your foot traffic will not support a machine, we will say so in the first conversation. A disappointed location is worse for us than a placement we never made.",
  },
];

const comparison = [
  {
    label: "Who answers when something breaks",
    us: "A local tech who can be on site the same or next day",
    them: "A national call centre and a ticket number",
  },
  {
    label: "Hardware you get",
    us: `A current-generation ${siteConfig.hardware} on every placement`,
    them: "Whatever refurbished unit is on the truck",
  },
  {
    label: "Revenue terms",
    us: "Published rates and splits before you sign anything",
    them: "Quoted case by case, disclosed in a schedule",
  },
  {
    label: "Program flexibility",
    us: "Buy it, load it, or hand it over — and we'll discuss alterations",
    them: "One contract, take it or leave it",
  },
  {
    label: "Cash stocking",
    us: "Weekly on Turnkey, or trained and supported if you do it",
    them: "Route-based, whenever the schedule allows",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why Us?", path: "/why-us" },
        ])}
      />
      <JsonLd
        data={atmServiceJsonLd({
          name: "Local ATM placement and support in the Fraser Valley",
          description:
            "A local Fraser Valley ATM operator offering fast on-site support, modern Hyosung Halo II hardware, transparent revenue sharing, flexible programs, secured installation and staff training.",
          path: "/why-us",
        })}
      />
      <JsonLd data={faqJsonLd("/why-us", planFaqs.slice(0, 4))} />

      <section className="relative overflow-hidden bg-white pt-14 pb-4 sm:pt-16 lg:pt-20">
        <Container className="relative">
          <PageHeader
            eyebrow="Why Lively Cash"
            title="The Case for a Local Operator, in Specifics"
            description="Anyone can promise good service. What follows is what we actually do differently, and what it means for the money your machine makes."
          >
            <CtaButton href="/contact" variant="dark">
              Start a conversation
            </CtaButton>
            <CtaButton href="/plans" variant="ghost">
              See the programs
            </CtaButton>
          </PageHeader>
        </Container>
      </section>

      <Section aria-labelledby="diff-heading">
        <Reveal>
          <SectionHeader
            id="diff-heading"
            eyebrow="Differentiators"
            title="Eight Reasons Businesses Stay With Us"
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.05}
        >
          {/*
           * The same decorative hover the processing and plan cards use: a
           * lift, an accent edge and a shadow. These are not links, so no
           * pointer cursor. The transition names its properties rather than
           * using `transition` (all), which would also animate the opacity and
           * transform Motion drives during the scroll reveal. The hex chip
           * scales as a whole — frame and glyph together — and its hairline
           * comes up to full accent.
           */}
          {differentiators.map((item) => (
            <RevealItem
              as="li"
              key={item.title}
              className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow,translate] duration-300 ease-out hover:border-accent hover:shadow-panel motion-safe:hover:-translate-y-1"
            >
              <HexIcon
                size="sm"
                className="transition-transform duration-300 ease-out motion-safe:group-hover:scale-110"
                frameClassName="text-accent/70 transition-colors duration-300 ease-out group-hover:text-accent"
              >
                <item.icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4 text-ink"
                />
              </HexIcon>
              <h3 className="mt-5 text-sm font-medium text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* The page's one ink band. */}
      <Section tone="soft" aria-labelledby="compare-heading">
        <Reveal>
          <InkBand className="p-6 sm:p-9 lg:p-12">
            <div className="flex max-w-3xl flex-col items-start gap-5">
              <Eyebrow surface="ink">Side by side</Eyebrow>
              <DisplayHeading
                as="h2"
                id="compare-heading"
                className="text-white"
              >
                Lively Cash vs. a National Operator
              </DisplayHeading>
              <p className="text-pretty text-ink-muted">
                Generalisations, but ones every merchant who has switched to us
                recognises.
              </p>
            </div>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparison of Lively Cash ATMs and a typical national ATM
                  operator
                </caption>
                <thead>
                  <tr className="border-b border-ink-line">
                    <th
                      scope="col"
                      className="px-5 py-4 font-mono text-[0.625rem] font-medium tracking-[0.2em] text-ink-muted uppercase"
                    >
                      What matters
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 font-mono text-[0.625rem] font-medium tracking-[0.2em] text-accent uppercase"
                    >
                      Lively Cash
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 font-mono text-[0.625rem] font-medium tracking-[0.2em] text-ink-muted uppercase"
                    >
                      Typical national operator
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-ink-line last:border-0"
                    >
                      <th
                        scope="row"
                        className="px-5 py-5 align-top font-medium text-white"
                      >
                        {row.label}
                      </th>
                      <td className="px-5 py-5 align-top text-white">
                        <span className="inline-flex items-start gap-2.5">
                          <BadgeCheckIcon
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-accent"
                          />
                          {row.us}
                        </span>
                      </td>
                      <td className="px-5 py-5 align-top text-ink-muted">
                        {row.them}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InkBand>
        </Reveal>
      </Section>

      <Section aria-labelledby="flex-heading">
        <Reveal>
          <SectionHeader
            id="flex-heading"
            eyebrow="Flexible by design"
            title="As Involved as You Want to Be"
            description="The same hardware and the same processing network — three different levels of involvement."
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="mt-12 grid gap-5 md:grid-cols-3"
          stagger={0.07}
        >
          {plans.map((plan) => (
            <RevealItem
              as="li"
              key={plan.slug}
              className="flex flex-col rounded-2xl border border-line bg-white p-6"
            >
              <p className="font-mono text-[0.625rem] font-medium tracking-[0.2em] text-ink-soft uppercase">
                {plan.profitLevel}
              </p>
              <h3 className="mt-4 font-display text-[0.9375rem] text-ink">
                {plan.name}
              </h3>
              <p className="mt-3 text-sm text-ink-soft">{plan.summary}</p>
              <Link
                href={`/plans#${plan.slug}`}
                className="mt-auto pt-6 font-mono text-[0.625rem] tracking-[0.2em] text-ink uppercase underline-offset-4 hover:underline"
              >
                Full details &rarr;
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="soft" aria-labelledby="whyus-faq-heading">
        <Reveal>
          <SectionHeader
            id="whyus-faq-heading"
            eyebrow="Before you ask"
            title="The Four Questions We Hear Most"
          />
        </Reveal>
        <Reveal className="mt-10 max-w-3xl">
          <FaqList faqs={planFaqs.slice(0, 4)} />
        </Reveal>
      </Section>

      <CtaBanner
        // Matches the soft FAQ section above it.
        tone="soft"
        eyebrow="No call centre, no script"
        title={
          <>
            Talk to someone who <span className="text-accent">lives here.</span>
          </>
        }
        description="Tell us about your location and we'll tell you honestly what it's worth."
      />
    </>
  );
}
