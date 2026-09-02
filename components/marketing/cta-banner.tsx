import type { ReactNode } from "react";
import { PhoneIcon } from "lucide-react";

import { CtaButton } from "@/components/marketing/cta-button";
import { InkBand } from "@/components/marketing/ink-band";
import { Reveal } from "@/components/marketing/reveal";
import { Container, Eyebrow } from "@/components/marketing/section";
import { siteConfig } from "@/lib/site";

/**
 * The closing dark inset band. One per page — it is the page's single use of
 * ink, unless the page has an ink band of its own further up.
 */
export function CtaBanner({
  tone = "light",
  eyebrow = "Ready to grow your revenue?",
  title = (
    <>
      Let&rsquo;s build a smarter cash solution&mdash;
      <span className="text-accent">together.</span>
    </>
  ),
  description = "Tell us where you are and how your customers pay. We'll recommend the program that makes you the most money with the least hassle — no obligation, no pressure.",
  primaryLabel = "Let's talk",
  secondaryHref = "/plans",
  secondaryLabel = "Compare the programs",
}: {
  /**
   * Must match the tone of the section immediately above.
   *
   * The band carries no top padding of its own — the space above it belongs to
   * the preceding section. When the two backgrounds differ, the colour
   * boundary lands exactly on the band's top edge and it reads as shoved up
   * against it, even though the gaps above and below are both 96px.
   */
  tone?: "light" | "soft";
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className={tone === "soft" ? "bg-base-soft" : "bg-white"}>
      <Container className="pb-16 sm:pb-20 lg:pb-24">
        <Reveal>
          <InkBand
            cutCorner
            /* Bottom padding runs a step tighter than the top: everything
               below the rule is a single small line, so equal padding leaves
               the card's mass bunched in its upper half. */
            className="px-6 pt-12 pb-10 sm:px-10 sm:pt-14 sm:pb-12 lg:px-14 lg:pt-16 lg:pb-14"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-20 hidden size-72 rounded-full bg-accent/12 blur-3xl md:block"
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-xl flex-col items-start gap-5">
                <Eyebrow surface="ink">{eyebrow}</Eyebrow>
                <h2 className="font-display text-[1.3rem] leading-[1.2] text-balance text-white sm:text-[1.65rem] sm:leading-[1.15] lg:text-[1.95rem]">
                  {title}
                </h2>
                <p className="text-pretty text-ink-muted">{description}</p>
              </div>

              <div className="shrink-0">
                <CtaButton href="/contact" variant="accent">
                  {primaryLabel}
                </CtaButton>
              </div>
            </div>

            {/*
             * Below the rule: the phone line and the secondary link share a
             * row, so the band closes on one line of alternatives rather than
             * stacking a second button against the primary one above.
             */}
            <div className="relative mt-10 flex flex-col gap-5 border-t border-ink-line pt-7 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <p className="text-sm text-ink-muted">
                Prefer to talk it through?{" "}
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-1.5 font-medium text-accent underline-offset-4 hover:underline"
                >
                  <PhoneIcon aria-hidden="true" className="size-3.5" />
                  {siteConfig.phone}
                </a>
              </p>

              <CtaButton href={secondaryHref} variant="ghost-ink" size="md">
                {secondaryLabel}
              </CtaButton>
            </div>
          </InkBand>
        </Reveal>
      </Container>
    </section>
  );
}
