import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
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
 * TODO(launch): counsel must review this before publishing. In particular,
 * confirm the limitation-of-liability cap and check it against whatever the
 * signed placement and purchase agreements actually say — this page must not
 * contradict them. The figures quoted here mirror `lib/plans.ts`; if those
 * change, change these.
 */
const LAST_UPDATED = "31 August 2026";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that govern use of the Lively Cash ATMs website, and how the information published about our three ATM programs relates to the agreement you actually sign.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "about",
    heading: "About these terms",
    body: (
      <>
        <p>
          These terms govern your use of this website,{" "}
          <strong>{siteConfig.url.replace(/^https?:\/\//, "")}</strong>,
          operated by {siteConfig.legalName} (&ldquo;Lively Cash&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site you accept
          them. If you do not, please stop using the site.
        </p>
        <p>
          <strong>These terms are not your ATM agreement.</strong> If you go
          ahead with a placement or a purchase, a separate written agreement
          will set out the commercial terms between us. Where that agreement and
          this page disagree, the signed agreement wins every time.
        </p>
      </>
    ),
  },
  {
    id: "who-can-use",
    heading: "Who this site is for",
    body: (
      <>
        <p>
          We sell to businesses. This site is intended for business owners and
          operators who are considering an ATM for a commercial premises, and by
          enquiring you confirm that you are:
        </p>
        <ul>
          <li>
            At least the age of majority in British Columbia, and able to enter
            into a contract.
          </li>
          <li>Enquiring on behalf of a business, and authorised to do so.</li>
        </ul>
        <p>
          We are not a bank, and we do not provide banking, lending or financial
          advice. Nothing on this site is financial, tax or legal advice about
          your business.
        </p>
      </>
    ),
  },
  {
    id: "program-information",
    heading: "Program information is not an offer",
    body: (
      <>
        <p>
          Our <Link href="/plans">plans page</Link> describes three programs —
          the ATM Purchase Program, the ATM Combo Program and the Turnkey ATM
          Placement Program. We publish those details, including the numbers, so
          you can compare them before you talk to anyone. That is unusual in
          this industry and we intend to keep doing it.
        </p>
        <p>
          Publishing them is not, however, a binding offer. Whether we can place
          a machine at your location depends on the site itself — foot traffic,
          where the machine would physically sit, connectivity, and whether the
          numbers work for both of us. We may decline, and we would rather tell
          you an ATM is not worth it than install one that disappoints you.
        </p>
      </>
    ),
  },
  {
    id: "pricing",
    heading: "Pricing, fees and revenue share",
    body: (
      <>
        <p>
          The figures published on this site are current at the date shown at
          the top of this page and are quoted in Canadian dollars. They are
          indicative and subject to confirmation in writing. In particular:
        </p>
        <ul>
          <li>
            Hardware pricing under the ATM Purchase Program is shown as an
            approximate range and depends on the machine configuration, shipping
            and site conditions at the time of quote.
          </li>
          <li>
            Wireless (DPL) device pricing and the monthly communication fee are
            set by the supplier and can change.
          </li>
          <li>
            Per-transaction fees and surcharge splits are as set out on the
            plans page, and are confirmed in your agreement.
          </li>
          <li>Taxes are extra unless we say otherwise.</li>
        </ul>
        <p>
          Where a program is described as having no up-front cost to you, that
          refers to the machine, its installation and its setup. It does not
          mean the machine is yours: under the Combo and Turnkey programs Lively
          Cash owns the ATM.
        </p>
        <p>
          We may change published pricing at any time. A change never applies
          retroactively to an agreement already signed.
        </p>
      </>
    ),
  },
  {
    id: "surcharges",
    heading: "Surcharges and cardholder fees",
    body: (
      <>
        <p>
          ATMs charge cardholders a surcharge for a withdrawal. That surcharge
          is disclosed on the machine&rsquo;s screen before the transaction is
          completed, and the cardholder can cancel at no cost.
        </p>
        <p>
          The cardholder&rsquo;s own financial institution may charge them
          separately for using a machine outside its network. That fee is
          between the cardholder and their bank; we neither set it nor receive
          it.
        </p>
        <p>
          Revenue estimates are not guarantees. What a machine earns depends on
          your traffic, your customers and your location, and nothing on this
          site should be read as a promise of a particular return.
        </p>
      </>
    ),
  },
  {
    id: "service",
    heading: "Service, uptime and support",
    body: (
      <>
        <p>
          We aim to keep every machine online and stocked, because a machine
          that is empty or offline earns nobody anything. Monitoring,
          maintenance and cash stocking differ by program — the Turnkey program
          includes weekly stocking and full maintenance, while under the
          Purchase and Combo programs the location loads the cash.
        </p>
        <p>
          We do not guarantee uninterrupted service. Machines depend on
          third-party networks, power, telecommunications and the availability
          of parts, and outages caused by those are outside our control.
          Response times and any service commitments are set out in your
          agreement, not here.
        </p>
      </>
    ),
  },
  {
    id: "host-responsibilities",
    heading: "If you host a machine",
    body: (
      <>
        <p>Where a machine is installed at your premises, you agree to:</p>
        <ul>
          <li>
            Give us reasonable access to install, service, stock and, at the end
            of the agreement, remove the machine.
          </li>
          <li>
            Keep the approach to the machine clear and lit during your opening
            hours.
          </li>
          <li>
            Not move, modify, open or attempt to repair the machine, and not
            allow anyone else to.
          </li>
          <li>
            Supply power, and — if you have chosen the local-internet option — a
            working connection.
          </li>
          <li>
            Tell us promptly about faults, damage, tampering, or any attempted
            theft or vandalism.
          </li>
        </ul>
        <p>
          Under the Combo and Purchase programs the location is responsible for
          the cash it loads into the machine and for handling it safely.
          Training on stocking and maintaining a machine is provided.
        </p>
      </>
    ),
  },
  {
    id: "aml",
    heading: "Identity checks and onboarding",
    body: (
      <>
        <p>
          The ATM Purchase Program and the ATM Combo Program require AML
          onboarding to our processing network before a machine can go live. You
          agree to provide the identification and corporate documents listed on
          the plans page, and to confirm they are accurate.
        </p>
        <p>
          We may decline or discontinue service if onboarding cannot be
          completed, if information provided turns out to be false, or if we are
          required to by our processing network or by law. How we handle those
          documents is set out in our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "Using this website",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the enquiry form to send unsolicited advertising, abusive
            content or anything unlawful.
          </li>
          <li>
            Attempt to interfere with the site, probe it for vulnerabilities, or
            circumvent the rate limiting on the enquiry form.
          </li>
          <li>
            Scrape, republish or resell the content of this site without our
            written permission.
          </li>
          <li>
            Misrepresent who you are or who you are enquiring on behalf of.
          </li>
        </ul>
        <p>
          If you believe you have found a security issue with this site, please
          email <a href={siteConfig.emailHref}>{siteConfig.email}</a> rather
          than disclosing it publicly, and give us a reasonable chance to fix
          it.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: (
      <>
        <p>
          The content of this site — text, layout, graphics, the Lively Cash
          name and logo — belongs to us or is used with permission, and is
          protected by Canadian and international copyright and trademark law.
          You may read it, print it and share links to it. You may not copy it
          for commercial use without asking.
        </p>
        <p>
          &ldquo;Hyosung&rdquo; and &ldquo;Halo II&rdquo; are the trademarks of
          their respective owner. We reference them to identify the hardware we
          deploy; we do not claim any rights in them, and this site is not
          endorsed by the manufacturer.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    heading: "Third-party links and services",
    body: (
      <p>
        Our ATMs connect to a third-party processing network, and this site may
        link to other organisations. We are not responsible for the content,
        availability or privacy practices of anything we do not operate, and a
        link is not an endorsement.
      </p>
    ),
  },
  {
    id: "disclaimers",
    heading: "Disclaimers",
    body: (
      <>
        <p>
          This website is provided &ldquo;as is&rdquo;. We take reasonable care
          to keep it accurate and current, but we do not warrant that it is free
          of errors, that it will always be available, or that the information
          on it is complete for your particular circumstances.
        </p>
        <p>
          Any figures, estimates or examples on this site are illustrative. They
          are not a forecast of what your location will earn.
        </p>
        <p>
          Nothing in these terms excludes any warranty, condition or right that
          cannot lawfully be excluded, including under BC consumer protection
          legislation where it applies.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <>
        <p>
          To the fullest extent the law allows, Lively Cash is not liable for
          indirect, incidental, special or consequential loss arising out of
          your use of this website — including lost profits, lost revenue, lost
          data or business interruption — even if we were told such loss was
          possible.
        </p>
        <p>
          Our total liability arising out of your use of this website is limited
          to CAD $100. Liability arising out of an installed machine or a signed
          agreement is governed by that agreement, not by this page.
        </p>
        <p>
          Nothing here limits liability for fraud, for fraudulent
          misrepresentation, or for anything else that cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: (
      <p>
        We may update these terms. The current version always lives at this
        address, with the date it took effect shown at the top. Continuing to
        use the site after a change means you accept the updated terms. Changes
        to this page never alter an agreement you have already signed.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the{" "}
        <strong>Province of British Columbia</strong> and the federal laws of
        Canada that apply there. You and we agree to the exclusive jurisdiction
        of the courts of British Columbia, which is where we are and where we
        work.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact",
    body: (
      <>
        <p>Questions about these terms:</p>
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
            <dt>Service area</dt>
            <dd>{siteConfig.region}</dd>
          </div>
        </dl>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
        ])}
      />

      <section className="relative overflow-hidden bg-white pt-14 pb-4 sm:pt-16 lg:pt-20">
        <Container className="relative">
          <PageHeader
            id="terms-doc"
            eyebrow="Terms"
            title="Terms & Conditions"
            description="The terms for using this website, and how the numbers we publish relate to the agreement you would actually sign."
          >
            <LegalMeta updated={LAST_UPDATED}>
              <span>Governed by British Columbia law</span>
            </LegalMeta>
          </PageHeader>
        </Container>
      </section>

      <LegalDocument sections={sections} ariaLabelledBy="terms-doc" />
    </>
  );
}
