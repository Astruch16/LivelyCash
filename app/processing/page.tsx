import type { Metadata } from "next";
import Image from "next/image";
import {
  ActivityIcon,
  LockIcon,
  RouterIcon,
  SignalIcon,
  WifiIcon,
} from "lucide-react";

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
import { atmServiceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Processing",
  description:
    "How ATM transaction processing works, in plain language: what the processing network does, how transactions are encrypted, DPL wireless versus local internet, and uptime monitoring.",
  path: "/processing",
});

const steps = [
  {
    number: "01",
    title: "The customer starts a withdrawal",
    body: "They insert their card and enter their PIN on the machine's encrypting PIN pad. The PIN is scrambled inside that keypad before it goes anywhere — the ATM itself never handles it in readable form, and neither do you.",
  },
  {
    number: "02",
    title: "The request leaves the machine",
    body: "The ATM sends an encrypted authorisation request over its connection — either a dedicated wireless device or your local internet. It contains what the network needs to route the request, and nothing a bystander could use.",
  },
  {
    number: "03",
    title: "The processing network routes it",
    body: "The processor identifies which financial institution issued the card and passes the request through the appropriate interbank network to that bank, which checks the account balance and daily limits.",
  },
  {
    number: "04",
    title: "The bank approves or declines",
    body: "The answer comes back down the same encrypted path in a second or two. If approved, the machine dispenses the cash, prints the receipt, and records the transaction along with the surcharge.",
  },
  {
    number: "05",
    title: "Settlement happens behind the scenes",
    body: "The funds move between institutions on the regular settlement cycle, and the surcharge revenue is accounted for according to whichever Lively Cash program you are on. You do not have to reconcile anything by hand.",
  },
];

const connectivity = [
  {
    icon: SignalIcon,
    title: "DPL wireless",
    tag: "Recommended for most sites",
    points: [
      "The machine runs on its own dedicated cellular connection.",
      "It never touches your business network or your Wi-Fi password.",
      "Works in older buildings, rural sites and seasonal locations where wired internet is unreliable or absent.",
      "Free on Turnkey and Combo placements; wholesale pricing plus a $15 monthly communication fee on purchased machines.",
    ],
  },
  {
    icon: WifiIcon,
    title: "Your local internet",
    tag: "Lowest ongoing cost",
    points: [
      "The ATM connects over your existing wired connection.",
      "No DPL device to buy and no monthly communication fee.",
      "Improves your terms: the Combo surcharge split gets increased 5% in your favour.",
      "Best where you have a stable business connection that is not routinely unplugged or reset.",
    ],
  },
];

const guarantees = [
  {
    icon: LockIcon,
    title: "Encrypted end to end",
    body: "PINs are encrypted inside the keypad hardware and stay encrypted across the network. Card data is never stored on the machine or readable at your location.",
  },
  {
    icon: ActivityIcon,
    title: "Monitored for uptime",
    body: "We watch machine health remotely — connectivity, error states and cash levels. On monitored programs, an ATM that goes offline or runs low gets flagged to us rather than discovered by a customer at the counter.",
  },
  {
    icon: RouterIcon,
    title: "Independent of your systems",
    body: "The ATM has its own connection and its own security boundary. Nothing about it depends on your POS, your office network or your staff.",
  },
];

export default function ProcessingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Processing", path: "/processing" },
        ])}
      />
      <JsonLd
        data={atmServiceJsonLd({
          name: "ATM transaction processing",
          description:
            "Lively Cash connects merchant-owned and placed ATMs to its processing network, with encrypted transactions, DPL wireless or local internet connectivity, and uptime monitoring.",
          path: "/processing",
        })}
      />

      <section className="relative overflow-hidden bg-white pt-14 pb-4 sm:pt-16 lg:pt-20">
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <PageHeader
              eyebrow="Processing"
              title="What Actually Happens When a Customer Takes Out Cash"
              description="You do not need to understand payment networks to run an ATM. But you should know what you are connected to, who touches the money, and what happens when something goes wrong. Here it is without the jargon."
            >
              <CtaButton href="/contact" variant="dark">
                Get connected
              </CtaButton>
            </PageHeader>
            <Image
              src="/images/processing-network.svg"
              alt="Diagram showing a transaction travelling from the ATM over an encrypted link to the processing network and back"
              width={720}
              height={320}
              priority
              className="h-auto w-full rounded-2xl border border-line"
            />
          </div>
        </Container>
      </section>

      <Section aria-labelledby="flow-heading">
        <Reveal>
          <SectionHeader
            id="flow-heading"
            eyebrow="The transaction"
            title="Five Seconds, Five Steps"
            description="Every withdrawal on a Lively Cash machine follows the same path."
          />
        </Reveal>
        <RevealGroup
          as="ol"
          className="mt-12 flex flex-col gap-4"
          stagger={0.06}
        >
          {steps.map((step) => (
            <RevealItem
              as="li"
              key={step.number}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:gap-8 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="font-mono text-xs font-medium tracking-[0.2em] text-accent-deep sm:w-16 sm:shrink-0"
              >
                {step.number}
              </span>
              <div className="sm:flex-1">
                <h3 className="font-display text-[0.9375rem] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-pretty text-ink-soft sm:text-base">
                  {step.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* The page's one ink band. */}
      <Section tone="soft" aria-labelledby="network-heading">
        <Reveal>
          <InkBand className="p-6 sm:p-9 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
              <div>
                <div className="flex max-w-xl flex-col items-start gap-5">
                  <Eyebrow surface="ink">The processing network</Eyebrow>
                  <DisplayHeading
                    as="h2"
                    id="network-heading"
                    className="text-white"
                  >
                    What the Network Does — and What It Doesn&rsquo;t
                  </DisplayHeading>
                </div>
                <div className="mt-6 flex flex-col gap-4 text-pretty text-ink-muted">
                  <p>
                    The processing network is the switchboard between your
                    machine and the customer&rsquo;s bank. It authenticates the
                    terminal, routes each request to the right financial
                    institution, carries the approval back, and keeps the
                    transaction record that everything downstream is reconciled
                    against.
                  </p>
                  <p>
                    Lively Cash connects your ATM to that network. That is true
                    whether we own the machine or you do — under the ATM
                    Purchase Program you buy the hardware outright and we
                    install it and connect it to our processing network, so a
                    merchant-owned machine gets exactly the same routing,
                    monitoring and support as a placed one.
                  </p>
                  <p>
                    What the network does not do is give anyone access to your
                    business banking, your point-of-sale system, or your
                    customer records. The ATM is a self-contained device with
                    one job. It is not connected to your till.
                  </p>
                </div>
              </div>

              <ul className="flex flex-col gap-4">
                {guarantees.map((item) => (
                  <li
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-ink-line bg-ink-raised p-6"
                  >
                    <HexIcon size="sm" frameClassName="text-accent/70">
                      <item.icon
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="size-4 text-accent"
                      />
                    </HexIcon>
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-ink-muted">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </InkBand>
        </Reveal>
      </Section>

      <Section aria-labelledby="connectivity-heading">
        <Reveal>
          <SectionHeader
            id="connectivity-heading"
            eyebrow="Connectivity"
            title="Wireless (DPL) or Your Own Internet"
            description="Both options are fully supported. Which one is right depends on your building, not on our preference."
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2" stagger={0.08}>
          {connectivity.map((option) => (
            <RevealItem
              as="article"
              key={option.title}
              className="flex flex-col rounded-2xl border border-line bg-white p-6 sm:p-7"
            >
              <HexIcon frameClassName="text-accent/70">
                <option.icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 text-ink"
                />
              </HexIcon>
              <h3 className="mt-5 font-display text-[0.9375rem] text-ink">
                {option.title}
              </h3>
              <p className="mt-2 font-mono text-[0.625rem] tracking-[0.2em] text-ink-soft uppercase">
                {option.tag}
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-sm text-ink-soft">
                {option.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-6">
          <div className="rounded-3xl border border-line bg-base-soft p-6 sm:p-9">
            <h3 className="font-display text-[0.9375rem] text-ink">
              Uptime is the whole product
            </h3>
            <p className="mt-4 max-w-3xl text-pretty text-ink-soft">
              An ATM only earns while it is online and stocked. That is why we
              monitor connectivity and cash levels rather than waiting for a
              phone call, why the {siteConfig.hardware} is the only machine we
              deploy, and why our service radius stops at the edge of the Fraser
              Valley. A machine we can reach in forty minutes is worth more to
              you than one covered by a national contract and a five-day
              response window.
            </p>
            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <CtaButton href="/contact" variant="dark">
                Ask about connecting
              </CtaButton>
              <CtaButton href="/plans" variant="ghost">
                See program costs
              </CtaButton>
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaBanner
        eyebrow="Already own an ATM?"
        title={
          <>
            We&rsquo;ll connect{" "}
            <span className="text-accent">your machine.</span>
          </>
        }
        description="We connect merchant-owned machines to our processing network, install and secure them, and provide maintenance calls on request."
        primaryLabel="Get connected"
      />
    </>
  );
}
