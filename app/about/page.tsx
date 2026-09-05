import type { Metadata } from "next";
import Image from "next/image";
import {
  HandshakeIcon,
  HeartHandshakeIcon,
  MapPinnedIcon,
  TruckIcon,
} from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { CtaButton } from "@/components/marketing/cta-button";
import { HexIcon } from "@/components/marketing/hex";
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/reveal";
import {
  Container,
  Eyebrow,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/marketing/section";
import { ServiceAreaGrid } from "@/components/marketing/service-areas";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Lively Cash ATMs is a locally owned ATM placement and sales company based in the Fraser Valley, BC. Local service, modern Hyosung Halo II hardware and honest revenue sharing.",
  path: "/about",
});

const values = [
  {
    icon: MapPinnedIcon,
    title: "We are actually local",
    description:
      "Our service area is the Fraser Valley, not 'BC and Alberta' with a dispatch centre three provinces away. When your machine needs attention, the person coming out already lives between Abbotsford and Hope.",
  },
  {
    icon: TruckIcon,
    title: "Fast, in-person support",
    description:
      "Most issues are a receipt roll, a jam or a cash load — things that take fifteen minutes in person and days over a support queue. We would rather drive out than escalate a ticket.",
  },
  {
    icon: HandshakeIcon,
    title: "Honest revenue sharing",
    description:
      "Our splits and per-transaction fees are walked through with you before you sign anything, not buried in a schedule you only see afterwards. If a program is a bad fit for your volume, we will tell you that instead of selling it to you.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "Long relationships, not placements",
    description:
      "We are a small operator in a small region. Every location we look after is somewhere we might run into you at the grocery store, and we run the business accordingly.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="relative overflow-hidden bg-white pt-14 pb-4 sm:pt-16 lg:pt-20">
        <Container className="relative">
          <PageHeader
            eyebrow="About Lively Cash"
            title="A Fraser Valley ATM Company, Run by People From the Fraser Valley"
            description="We place, sell and service ATMs for businesses in Chilliwack, Abbotsford, Agassiz, Hope and Harrison. That is the whole map — and keeping it that small is deliberate."
          >
            <CtaButton href="/contact" variant="dark">
              Talk to us
            </CtaButton>
            <CtaButton href="/plans" variant="ghost">
              See our plans
            </CtaButton>
          </PageHeader>
        </Container>
      </section>

      <Section aria-labelledby="story-heading">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <SectionHeader
              id="story-heading"
              eyebrow="Who we are"
              title="Locally Owned and Locally Operated"
            />
            <div className="flex flex-col gap-4 text-pretty text-ink-soft">
              <p>
                Lively Cash ATMs was built around a straightforward observation:
                the businesses that need an ATM most are the ones least well
                served by the big national operators. A corner store in Agassiz,
                a seasonal shop at Harrison, a diner on the highway in Hope —
                these are exactly the locations that end up as a low-priority
                pin on somebody&rsquo;s route map out of the Lower Mainland.
              </p>
              <p>
                We took the opposite approach. We service a single region we can
                actually cover, we deploy one machine we know inside out — the{" "}
                {siteConfig.hardware} — and we answer our own phone. If your
                machine is empty on a Friday afternoon in July, that is a
                problem we can be standing in front of, not a case number.
              </p>
              <p>
                Everything else follows from that. Our programs are structured
                so a business owner can pick the level of involvement they
                actually want: buy the machine and keep the lion&rsquo;s share
                of the surcharge, load your own cash without the capital outlay,
                or hand the entire thing over and never think about it again.
                Whichever you choose, the terms are written down and we walk you
                through the numbers before you commit to anything.
              </p>
              <p>
                We also try to be honest about fit. An ATM is not right for
                every location — some businesses genuinely will not generate
                enough transactions to make the floor space worth it. We would
                rather tell you that in the first conversation than install a
                machine that disappoints you six months later.
              </p>
            </div>
          </Reveal>

          <Reveal as="aside" delay={0.05}>
            <div className="rounded-3xl border border-line bg-base-soft p-6 sm:p-8">
              <Eyebrow as="h2">What we do</Eyebrow>
              <ul className="mt-5 flex flex-col gap-3 text-sm text-ink-soft">
                <li>ATM placement in merchant locations, at no cost to you</li>
                <li>ATM sales for operators who want to own their machine</li>
                <li>
                  Connection of merchant-owned machines to our processing
                  network
                </li>
                <li>Installation, securing and on-site staff training</li>
                <li>Maintenance, monitoring and cash stocking</li>
              </ul>
              {/* TODO(launch): swap in real product photography once we have
                  location sign-off. */}
              <Image
                src="/images/halo-ii-detail.svg"
                alt="The Hyosung Halo II interactive display"
                width={640}
                height={400}
                className="mt-7 h-auto w-full rounded-2xl border border-line"
              />
              <CtaButton
                href="/contact"
                variant="dark"
                size="md"
                className="mt-7"
              >
                Talk about your location
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="soft" aria-labelledby="values-heading">
        <Reveal>
          <SectionHeader
            id="values-heading"
            eyebrow="How we operate"
            title="What Being Local Actually Changes"
            description="Every ATM company says it offers good service. Here is the specific difference proximity makes."
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="mt-12 grid gap-5 sm:grid-cols-2"
          stagger={0.07}
        >
          {values.map((value) => (
            /*
             * The site's standard card hover — lift, accent edge, shadow —
             * the same treatment the processing, plan and differentiator
             * cards use. Not links, so no pointer cursor. The transition
             * names its properties rather than using `transition` (all),
             * which would also animate the opacity and transform Motion
             * drives during the scroll reveal.
             */
            <RevealItem
              as="li"
              key={value.title}
              className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow,translate] duration-300 ease-out hover:border-accent hover:shadow-panel motion-safe:hover:-translate-y-1 sm:p-7"
            >
              <HexIcon
                className="transition-transform duration-300 ease-out motion-safe:group-hover:scale-110"
                frameClassName="text-accent/70 transition-colors duration-300 ease-out group-hover:text-accent"
              >
                <value.icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 text-ink"
                />
              </HexIcon>
              <h3 className="mt-5 font-display text-[0.9375rem] text-ink">
                {value.title}
              </h3>
              <p className="mt-3 text-sm text-ink-soft">{value.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section aria-labelledby="about-areas-heading">
        <Reveal>
          <SectionHeader
            id="about-areas-heading"
            eyebrow="Where we work"
            title="Five Communities, Covered Properly"
          />
        </Reveal>
        <div className="mt-12">
          <ServiceAreaGrid />
        </div>
      </Section>

      <CtaBanner
        eyebrow="Ready when you are"
        title={
          <>
            Let&rsquo;s talk about{" "}
            <span className="text-accent">your location.</span>
          </>
        }
        description="A short conversation is usually enough to tell whether an ATM makes sense for your business, and which program fits."
        primaryLabel="Contact us"
        secondaryHref="/why-us"
        secondaryLabel="Why choose Lively Cash"
      />
    </>
  );
}
