import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { CtaButton } from "@/components/marketing/cta-button";
import {
  LegalDocument,
  LegalMeta,
  type LegalSection,
} from "@/components/marketing/legal-document";
import { Container, PageHeader } from "@/components/marketing/section";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/*
 * The hardware features below come from the manufacturer's published
 * specification for the Halo II (see `lib/halo-ii.ts`), not from assumption.
 *
 * TODO(launch): the manufacturer states ADA compliance, which is the US
 * standard. If we want to claim conformance to CSA B651 — the Canadian one —
 * that has to come from the supplier in writing first.
 */
const LAST_UPDATED = "31 August 2026";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility",
  description:
    "How Lively Cash ATMs approaches accessibility — on this website, and at the machines we install in Fraser Valley businesses. Includes how to report a barrier.",
  path: "/accessibility",
});

const sections: LegalSection[] = [
  {
    id: "commitment",
    heading: "Our commitment",
    body: (
      <>
        <p>
          An ATM is a piece of public infrastructure sitting inside somebody
          else&rsquo;s shop. If a customer cannot reach it, read it or hear it,
          it has failed at the one job it has — and so have we.
        </p>
        <p>
          We are a small operator, so we will not pretend to have a compliance
          department. What we can commit to is specific: build this website to a
          recognised standard, site every machine so it can actually be used,
          and fix what we get wrong when someone tells us about it.
        </p>
      </>
    ),
  },
  {
    id: "standard",
    heading: "The standard we build to",
    body: (
      <>
        <p>
          We aim to meet{" "}
          <strong>
            Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA
          </strong>{" "}
          across this website. That is the benchmark referenced by Canadian
          accessibility legislation and it is the one we measure ourselves
          against.
        </p>
        <p>
          British Columbia&rsquo;s <em>Accessible British Columbia Act</em> sets
          out a provincial framework for identifying and removing barriers. Its
          detailed obligations currently fall on prescribed public-sector
          organisations rather than on a business our size, but we have written
          this page, and the feedback route at the bottom of it, in that spirit
          rather than waiting to be told.
        </p>
      </>
    ),
  },
  {
    id: "website",
    heading: "What we have built into this website",
    body: (
      <>
        <p>Concretely, rather than as a statement of intent:</p>
        <ul>
          <li>
            <strong>Keyboard operable throughout.</strong> Every link, button,
            menu, form field and the mobile navigation panel can be reached and
            used with a keyboard alone, in a logical order, with no traps.
          </li>
          <li>
            <strong>Visible focus.</strong> Focused elements get a solid
            two-pixel outline with an offset, not a faint glow — including the
            pill buttons, where the outline is drawn deliberately rather than
            inherited.
          </li>
          <li>
            <strong>A skip link.</strong> The first thing a keyboard user
            reaches on any page jumps straight past the navigation to the main
            content.
          </li>
          <li>
            <strong>Real landmarks and headings.</strong> Header, navigation,
            main and footer are marked up as such, and headings descend in order
            so a screen-reader user can navigate by structure.
          </li>
          <li>
            <strong>Contrast that clears AA.</strong> Body copy runs about 6.9:1
            on white and headings about 18:1. On the dark bands, labels run
            about 7.4:1. Our brand yellow is never used for body text on white —
            it only clears 1.7:1, so it is used as a fill, with dark text on
            top.
          </li>
          <li>
            <strong>Motion that respects your settings.</strong> If your device
            asks for reduced motion, the smooth-scrolling is switched off
            entirely, the hero&rsquo;s load sequence collapses to a single
            300&nbsp;ms fade, and the emblem stops floating and stops following
            your cursor. Nothing is left invisible or mid-animation.
          </li>
          <li>
            <strong>Forms that explain themselves.</strong> Every field on the{" "}
            <Link href="/contact">contact form</Link> has a visible label,
            errors are announced and tied to the field they belong to, and the
            first invalid field receives focus when a submission fails.
          </li>
          <li>
            <strong>Text that scales.</strong> The layout reflows down to a
            phone and up to a 200% zoom without content being cut off or forcing
            you to scroll sideways.
          </li>
          <li>
            <strong>Described images.</strong> Photographs and diagrams carry
            alternative text. Purely decorative graphics are hidden from
            assistive technology so they are not read out as noise.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "at-the-machine",
    heading: "Accessibility at the machine",
    body: (
      <>
        <p>
          A website is the easy part. The machine is what your customers
          actually have to use.
        </p>
        <h3>What we commit to at installation</h3>
        <ul>
          <li>
            <strong>Siting for approach.</strong> We look at where a machine can
            physically go before we agree to a placement, and we site it so
            there is clear floor space to approach and use it — including from a
            seated position — rather than wedging it into whatever corner is
            free.
          </li>
          <li>
            <strong>Reach and sightlines.</strong> We consider screen height,
            keypad reach and glare when choosing the spot, not after the machine
            is bolted down.
          </li>
          <li>
            <strong>Keeping the approach clear.</strong> We ask every host
            business to keep the path to the machine unobstructed and lit during
            opening hours. It is in our agreements because it matters.
          </li>
        </ul>
        <h3>Hardware</h3>
        <p>
          We deploy one machine on every placement, the {siteConfig.hardware},
          which means we know its accessibility features rather than guessing at
          a fleet of mismatched hardware. Its published specification includes:
        </p>
        <ul>
          <li>
            <strong>An ADA compliant keypad</strong>, with a PCI compliant
            encrypting PIN pad.
          </li>
          <li>
            <strong>An earphone jack</strong>, so a customer who cannot read the
            screen can be guided through the transaction by audio.
          </li>
          <li>
            <strong>EPP and lead-through indicators</strong>, which light the
            next thing to touch rather than relying on the screen alone.
          </li>
          <li>
            <strong>Six on-screen languages</strong> — English, French, Spanish,
            Japanese, Chinese and Korean.
          </li>
        </ul>
        <p>
          We check those are enabled and working at handover, and again on
          service visits. The{" "}
          <Link href="/#halo-ii-specs">full specification is published</Link> if
          you want to read it.
        </p>
        <p>
          If you are a host business and a customer has raised a barrier at your
          machine, tell us. Repositioning a machine or fixing a feature is a
          service call, not a negotiation.
        </p>
      </>
    ),
  },
  {
    id: "limitations",
    heading: "Known limitations",
    body: (
      <>
        <p>We would rather list these than let you find them:</p>
        <ul>
          <li>
            <strong>The outlined headline on our home page.</strong> The final
            line of the hero headline is drawn as an outline in our brand
            yellow, which is a low-contrast decorative treatment. The words are
            real, selectable text and are read normally by screen readers, but
            the outline itself is harder to read than the solid lines above it.
          </li>
          <li>
            <strong>Some imagery is still placeholder.</strong> A few product
            illustrations are stand-ins pending real photography. Their
            alternative text describes what will be shown.
          </li>
          <li>
            <strong>We have not commissioned a third-party audit.</strong> Our
            testing so far is our own — keyboard-only passes, contrast
            measurement, and checking the site with reduced motion enabled.
          </li>
          <li>
            <strong>
              The machine&rsquo;s keypad is certified to the American standard.
            </strong>{" "}
            Hyosung specifies the Halo II as ADA compliant. We have not verified
            it against CSA B651, the Canadian accessibility standard, and we do
            not claim that it meets it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "feedback",
    heading: "Tell us about a barrier",
    body: (
      <>
        <p>
          If any part of this website, or any machine we have installed, is
          difficult or impossible for you to use, we want to hear about it —
          including if you just want the same information in a different format.
          You do not need to use any particular wording or form.
        </p>
        <dl>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={siteConfig.emailHref}>{siteConfig.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={siteConfig.phoneHref}>{siteConfig.phone}</a> (
              {siteConfig.hours})
            </dd>
          </div>
          <div>
            <dt>Where a machine is</dt>
            <dd>
              If you can, tell us the business and roughly where the machine
              sits inside it. That is usually enough for us to find it.
            </dd>
          </div>
        </dl>
        <p>
          <strong>We will acknowledge you within five business days</strong> and
          tell you what we are going to do about it and roughly when. If we
          cannot fix something, we will say so and explain why rather than going
          quiet.
        </p>
        <p>
          Feedback can be given anonymously. If you would like a reply, leave us
          a way to reach you.
        </p>
      </>
    ),
  },
  {
    id: "review",
    heading: "How this page is kept current",
    body: (
      <p>
        We review this page whenever we make a significant change to the website
        or to how we install machines, and at least once a year. The date at the
        top is the last time it was reviewed, not just the last time it was
        edited.
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Accessibility", path: "/accessibility" },
        ])}
      />

      <section className="relative overflow-hidden bg-white pt-14 pb-4 sm:pt-16 lg:pt-20">
        <Container className="relative">
          <PageHeader
            id="accessibility-doc"
            eyebrow="Accessibility"
            title="Accessibility at Lively Cash"
            description="What we have built into this website, what we commit to at every machine we install, and how to tell us when we have got it wrong."
          >
            <LegalMeta updated={LAST_UPDATED}>
              <span>Target: WCAG 2.1 Level AA</span>
            </LegalMeta>
            <CtaButton href="/contact" variant="dark" size="md">
              Report a barrier
            </CtaButton>
          </PageHeader>
        </Container>
      </section>

      <LegalDocument sections={sections} ariaLabelledBy="accessibility-doc" />
    </>
  );
}
