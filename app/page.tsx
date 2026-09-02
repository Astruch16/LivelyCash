import type { Metadata } from "next";
import Image from "next/image";
import {
  BatteryChargingIcon,
  HeadphonesIcon,
  LineChartIcon,
  LockIcon,
  MonitorSmartphoneIcon,
  NfcIcon,
  PercentIcon,
  ShieldCheckIcon,
  VaultIcon,
  type LucideIcon,
} from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { CtaButton } from "@/components/marketing/cta-button";
import { HaloSpecTable } from "@/components/marketing/halo-spec-table";
import { HEX_PATH, HexIcon } from "@/components/marketing/hex";
import { Hero } from "@/components/marketing/hero";
import { PartnerMarquee } from "@/components/marketing/partner-marquee";
import { PlanSummaryCard } from "@/components/marketing/plan-cards";
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/reveal";
import { Section, SectionHeader } from "@/components/marketing/section";
import { ServiceAreaGrid } from "@/components/marketing/service-areas";
import { StatBand } from "@/components/marketing/stat-band";
import { atmServiceJsonLd } from "@/lib/jsonld";
import { plans } from "@/lib/plans";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Home",
  absoluteTitle: `Free ATM Placement in the Fraser Valley | ${siteConfig.name}`,
  description:
    "Lively Cash ATMs places and services Hyosung Halo II ATMs for businesses in Chilliwack, Abbotsford, Agassiz, Hope and Harrison, BC. Free placement, local support, transparent revenue sharing.",
  path: "/",
});

const hardwareFeatures: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MonitorSmartphoneIcon,
    title: "10.1-inch interactive display",
    body: "A large, responsive TFT panel — customers get through a withdrawal fast, even with a queue behind them.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Advanced security",
    body: "An encrypting PIN pad, a modern card reader, and a machine bolted and secured at install.",
  },
  {
    icon: VaultIcon,
    title: "Large cash capacity",
    body: "Up to 4,000 notes across two cassettes, so there is more on hand between reloads.",
  },
  {
    icon: NfcIcon,
    title: "Contactless ready",
    body: "An optional NFC reader adds tap cards and mobile wallets — tell us if you want one fitted.",
  },
  {
    icon: BatteryChargingIcon,
    title: "Energy efficient",
    body: "Current-generation hardware built to run seven days a week without adding to your power bill.",
  },
];

const processingFeatures: { icon: LucideIcon; title: string; body: string }[] =
  [
    {
      icon: PercentIcon,
      title: "Competitive rates",
      body: "Published splits and per-transaction fees, so you keep more of your surcharge revenue.",
    },
    {
      icon: LineChartIcon,
      title: "Real-time reporting",
      body: "See performance, volume and payouts without waiting for a monthly statement.",
    },
    {
      icon: LockIcon,
      title: "Secure & compliant",
      body: "PINs encrypted inside the keypad, and a machine that never touches your till or your network.",
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated support",
      body: "Local techs who can be standing in front of the machine, not a queue in another province.",
    },
  ];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={atmServiceJsonLd({
          name: "ATM placement and servicing in the Fraser Valley",
          description: siteConfig.description,
          path: "/",
        })}
      />

      <Hero />

      {/* Partners */}
      <Section tone="soft" aria-labelledby="partners-heading">
        <Reveal>
          <SectionHeader
            id="partners-heading"
            eyebrow="Our locations"
            title="Trusted by Local Businesses"
            description="Barbers, markets, breweries, nightclubs, bowling alleys and curling clubs across the Valley run a Lively Cash machine."
          />
        </Reveal>
        <Reveal className="-mx-5 mt-12 sm:-mx-6 lg:-mx-8">
          <PartnerMarquee />
        </Reveal>
      </Section>

      {/* Hardware */}
      <Section aria-labelledby="hardware-heading">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr_0.8fr] lg:items-center lg:gap-10">
          <Reveal className="lg:order-1">
            <SectionHeader
              id="hardware-heading"
              eyebrow="Premium hardware"
              title={
                <>
                  Hyosung Halo II
                  <br />
                  Engineered for Reliability
                </>
              }
              description="Customers hesitate at a scuffed, slow, decade-old machine — and a hesitant customer is a lost transaction. The Halo II combines advanced security, an intuitive display and a shell that belongs in a good retail space."
            >
              <CtaButton href="#halo-ii-specs" variant="dark" className="mt-2">
                View the specs
              </CtaButton>
            </SectionHeader>
          </Reveal>

          <Reveal className="lg:order-2" delay={0.05}>
            {/*
             * The machine is tall and narrow (roughly 1:3), so it is sized by
             * width against a small cap — letting it fill the column would
             * make it about 940px tall. The accent hexagon is anchored to the
             * image rather than to the column so it frames the machine the
             * same way at every breakpoint.
             */}
            <div className="relative mx-auto w-40 sm:w-44">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className="absolute -inset-x-[36%] top-[14%] text-accent"
              >
                <path d={HEX_PATH} fill="currentColor" strokeLinejoin="round" />
              </svg>
              <Image
                src="/images/hyosung-halo-ii.png"
                alt="A Hyosung Halo II ATM — a freestanding machine with a colour touchscreen, card reader, keypad and cash dispenser"
                width={327}
                height={1009}
                priority
                sizes="(min-width: 640px) 11rem, 10rem"
                className="relative w-full drop-shadow-emblem"
              />
            </div>
          </Reveal>

          <RevealGroup
            as="ul"
            className="flex flex-col gap-6 lg:order-3"
            stagger={0.07}
          >
            {hardwareFeatures.map((feature) => (
              <RevealItem
                as="li"
                key={feature.title}
                className="flex items-start gap-4"
              >
                <HexIcon size="sm" frameClassName="text-line">
                  <feature.icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 text-ink"
                  />
                </HexIcon>
                <div>
                  <h3 className="text-sm font-medium text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{feature.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-16 lg:mt-20">
          <HaloSpecTable />
        </div>
      </Section>

      {/* Processing teaser */}
      <Section tone="soft" aria-labelledby="processing-heading">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <Reveal>
            <SectionHeader
              id="processing-heading"
              eyebrow="Smart processing"
              title="More Value in Every Transaction"
              description="Transparent pricing, real-time reporting and dedicated support — so you keep more of what you earn."
            >
              <CtaButton href="/processing" variant="dark" className="mt-2">
                Learn about processing
              </CtaButton>
            </SectionHeader>
          </Reveal>

          <RevealGroup
            as="ul"
            className="grid gap-4 sm:grid-cols-2"
            stagger={0.07}
          >
            {processingFeatures.map((feature) => (
              /*
               * These cards are not links, so the hover stays decorative — a
               * lift and an accent edge, no pointer cursor implying a click.
               * `motion-safe:` keeps the movement out of a reduced-motion
               * session while the colour change still reads.
               */
              <RevealItem
                as="li"
                key={feature.title}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow,translate] duration-300 ease-out hover:border-accent hover:shadow-panel motion-safe:hover:-translate-y-1"
              >
                <feature.icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-6 text-accent transition-transform duration-300 ease-out motion-safe:group-hover:scale-110"
                />
                <h3 className="mt-5 text-sm font-medium text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{feature.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Plans */}
      <Section id="plans" aria-labelledby="plans-heading">
        <Reveal>
          <SectionHeader
            id="plans-heading"
            eyebrow="Our programs"
            title="Three Ways to Put an ATM on Your Floor"
            description="Own the machine and keep the most revenue, load your own cash without buying hardware, or hand the whole thing to us. Every number is published on the plans page."
          />
        </Reveal>

        {/*
         * Six shared row tracks — profit label, heading, summary, features,
         * cost, button — that each card maps onto with `grid-rows-subgrid`.
         * The features track is `1fr` so uneven copy collects its slack there
         * and the cost lines and buttons stay level across all three cards.
         * Row gaps are zero: the spacing lives on the cards' own margins.
         */}
        <RevealGroup
          className="mt-16 grid gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_1fr_auto_auto] lg:gap-y-0"
          stagger={0.08}
        >
          {plans.map((plan) => (
            <PlanSummaryCard key={plan.slug} plan={plan} />
          ))}
        </RevealGroup>

        <Reveal className="mt-10">
          <CtaButton href="/plans" variant="ghost">
            Compare all three programs
          </CtaButton>
        </Reveal>
      </Section>

      {/* By the numbers */}
      <StatBand />

      {/* Service areas */}
      <Section aria-labelledby="areas-heading">
        <Reveal>
          <SectionHeader
            id="areas-heading"
            eyebrow="Service areas"
            title="We Cover the Fraser Valley Properly"
            description="Not as an outlying zone on somebody else's national service map — this is where we are based and where our techs already are."
          />
        </Reveal>
        <div className="mt-12">
          <ServiceAreaGrid />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
