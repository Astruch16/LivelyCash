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
 * TODO(launch): have this reviewed by counsel before publishing, and confirm
 * the retention periods and the privacy officer's name and inbox. Everything
 * described here matches what the site actually does today — the contact
 * route (`app/api/contact/route.ts`), the rate limiter (`lib/rate-limit.ts`)
 * and the AML list (`lib/plans.ts`). If any of those change, change this too.
 */
const LAST_UPDATED = "31 August 2026";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Lively Cash ATMs collects, uses and protects personal information — from website enquiries and AML onboarding to what happens at the ATM itself.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who this policy covers",
    body: (
      <>
        <p>
          {siteConfig.legalName} (&ldquo;Lively Cash&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) places, sells and services ATMs for businesses in{" "}
          {siteConfig.region}. This policy explains what personal information we
          collect, why we collect it, and what we do with it.
        </p>
        <p>It covers:</p>
        <ul>
          <li>
            This website,{" "}
            <strong>{siteConfig.url.replace(/^https?:\/\//, "")}</strong>,
            including the enquiry form.
          </li>
          <li>
            Information you give us when you enquire about, or sign up for, one
            of our three ATM programs.
          </li>
          <li>
            Information that reaches us in the course of installing, servicing
            and monitoring an ATM at your location.
          </li>
        </ul>
        <p>
          We are a private-sector organisation in British Columbia, so we handle
          personal information under BC&rsquo;s{" "}
          <strong>Personal Information Protection Act (PIPA)</strong> and, where
          information crosses provincial or national borders, under the federal{" "}
          <strong>
            Personal Information Protection and Electronic Documents Act
            (PIPEDA)
          </strong>
          .
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    body: (
      <>
        <h3>When you use the enquiry form</h3>
        <p>
          The form on our <Link href="/contact">contact page</Link> asks for
          exactly seven things, and we do not collect anything beyond them:
        </p>
        <ul>
          <li>Your name</li>
          <li>Your business name</li>
          <li>Your email address</li>
          <li>Your phone number</li>
          <li>Which of our service areas you are in</li>
          <li>Which program you are interested in</li>
          <li>The message you write about your location</li>
        </ul>
        <p>
          The form also contains a hidden field that only automated bots fill
          in. If it is filled in we discard the submission. Nothing is stored
          from it.
        </p>

        <h3>When you become a Lively Cash location</h3>
        <p>
          The <strong>ATM Purchase Program</strong> and the{" "}
          <strong>ATM Combo Program</strong> both require anti-money-laundering
          (AML) onboarding to our processing network. For that we collect, from
          each director of the business:
        </p>
        <ul>
          <li>Full name, email address and phone number</li>
          <li>Photo identification</li>
          <li>
            A certified company void cheque, stamped by your financial
            institution
          </li>
          <li>Your articles of incorporation</li>
        </ul>
        <p>
          This is identity-verification information required of us by our
          processing network. It is used for that purpose and no other. We never
          use it for marketing.
        </p>

        <h3>Automatically, when you visit this site</h3>
        <p>
          When you submit the enquiry form we read your IP address and use it to
          rate-limit submissions — three per ten minutes — so the form cannot be
          used to flood our inbox. The address is held for the length of that
          window and is not used to build any profile of you.
        </p>
        <p>
          Our hosting provider keeps standard server logs (request time, page
          requested, IP address, browser user-agent) for operational security
          and troubleshooting.
        </p>
      </>
    ),
  },
  {
    id: "at-the-atm",
    heading: "What we do not collect at the ATM",
    body: (
      <>
        <p>
          This is worth stating plainly, because it is the question host
          businesses ask most often.
        </p>
        <p>
          <strong>
            Neither Lively Cash nor your business receives cardholder card data.
          </strong>{" "}
          A customer&rsquo;s PIN is encrypted inside the machine&rsquo;s
          encrypting PIN pad before it goes anywhere, and it stays encrypted
          across the network. Card numbers are not stored on the machine and are
          not readable at your location.
        </p>
        <p>
          The ATM runs on its own connection — a dedicated wireless device, or
          your internet if you choose that option — and is a self-contained
          device with one job. It is not connected to your point-of-sale system,
          your till or your office network, and it gives nobody access to your
          business banking.
        </p>
        <p>
          What we do see is transaction <em>metadata</em> for the terminal:
          counts, amounts, timestamps, surcharge totals, cash levels and error
          states. We use it to keep the machine stocked and running, and to
          calculate what you are owed. It does not identify the cardholder to us
          or to you.
        </p>
        <p>
          Cardholders&rsquo; own banks hold their transaction records, and any
          camera or security footage at your premises is yours, governed by your
          own privacy obligations as the business operating that equipment.
        </p>
      </>
    ),
  },
  {
    id: "why-we-use-it",
    heading: "Why we use your information",
    body: (
      <>
        <p>We use personal information only for these purposes:</p>
        <ul>
          <li>
            To answer your enquiry and tell you which program suits your
            location — including telling you honestly when an ATM is not worth
            it for you.
          </li>
          <li>
            To prepare a quote, an agreement and an installation for a location
            that goes ahead.
          </li>
          <li>
            To complete AML onboarding to our processing network, where the
            program requires it.
          </li>
          <li>
            To service, monitor, stock and support an installed machine, and to
            calculate and pay surcharge revenue.
          </li>
          <li>
            To keep this website and our inbox secure and working, including
            rate-limiting the enquiry form.
          </li>
          <li>To meet our legal, tax and record-keeping obligations.</li>
        </ul>
        <p>
          We rely on your consent, which you give by sending us an enquiry or
          entering into an agreement with us. Where the law requires us to
          collect or keep something — AML records in particular — we rely on
          that obligation instead.
        </p>
        <p>
          <strong>We do not sell personal information</strong>, and we do not
          share it with anyone for their own marketing.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies, analytics and tracking",
    body: (
      <>
        <p>
          This website sets <strong>no advertising or analytics cookies</strong>
          , and there are no third-party trackers, pixels or session recorders
          on it.
        </p>
        <p>
          The fonts used across the site are served from our own domain rather
          than from a font provider, so loading a page here does not tell any
          third party that you visited.
        </p>
        <p>
          If we introduce analytics later, we will update this policy first and
          say plainly what is being measured.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Who we share it with",
    body: (
      <>
        <p>
          We keep the list of people who touch your information short. It is
          limited to:
        </p>
        <dl>
          <div>
            <dt>Our processing network</dt>
            <dd>
              Receives AML onboarding information for identity verification, and
              routes and settles ATM transactions.
            </dd>
          </div>
          <div>
            <dt>Hardware suppliers and installers</dt>
            <dd>
              Receive the delivery address and site contact needed to ship and
              install a machine.
            </dd>
          </div>
          <div>
            <dt>Our IT and hosting providers</dt>
            <dd>
              Host this website and our email. They process information on our
              instructions only.
            </dd>
          </div>
          <div>
            <dt>Our professional advisers</dt>
            <dd>Accountants and lawyers, where they need it to advise us.</dd>
          </div>
          <div>
            <dt>Law enforcement and regulators</dt>
            <dd>
              Only where we are legally required to disclose, or where it is
              necessary to investigate a suspected crime against the machine.
            </dd>
          </div>
        </dl>
      </>
    ),
  },
  {
    id: "storage",
    heading: "Where it is stored, and for how long",
    body: (
      <>
        <p>
          Our website and email are hosted with providers who may store or
          process data on servers <strong>outside Canada</strong>, including in
          the United States. While information is in another country it is
          subject to that country&rsquo;s laws, and may be accessible to its
          courts and law-enforcement agencies.
        </p>
        <p>How long we keep things:</p>
        <ul>
          <li>
            <strong>Enquiries that do not go anywhere</strong> — kept for up to
            24 months so we can pick up the conversation if you come back, then
            deleted.
          </li>
          <li>
            <strong>IP addresses used for rate limiting</strong> — held only for
            the ten-minute window, then discarded.
          </li>
          <li>
            <strong>Location agreements and AML records</strong> — kept for the
            life of the agreement and then for as long as tax and AML law
            requires us to retain them.
          </li>
          <li>
            <strong>Server logs</strong> — kept on our host&rsquo;s standard
            retention schedule.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    heading: "How we protect it",
    body: (
      <>
        <p>
          This website is served over HTTPS, and the enquiry form validates and
          rate-limits every submission before it reaches us.
        </p>
        <p>
          AML documents are the most sensitive thing we handle. We ask for them
          over a channel we agree with you, we restrict access to the people who
          need it to complete onboarding, and we do not keep working copies once
          onboarding is finished.
        </p>
        <p>
          No system is perfect. If a breach ever puts you at real risk of
          significant harm, we will notify you and the Office of the Information
          and Privacy Commissioner for British Columbia as the law requires.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <p>Under BC&rsquo;s PIPA you can ask us to:</p>
        <ul>
          <li>
            <strong>Tell you what we hold</strong> about you, how we have used
            it, and who we have given it to.
          </li>
          <li>
            <strong>Correct</strong> anything that is wrong or out of date.
          </li>
          <li>
            <strong>Delete</strong> information we no longer have a legal or
            business reason to keep.
          </li>
          <li>
            <strong>Withdraw your consent</strong> to further contact. Some
            information we must keep regardless — AML records in particular —
            and we will tell you when that applies.
          </li>
        </ul>
        <p>
          Email <a href={siteConfig.emailHref}>{siteConfig.email}</a> and we
          will respond within 30 days, which is the period PIPA allows.
        </p>
        <p>
          If you are not satisfied with how we have handled a request, you can
          complain to the{" "}
          <strong>
            Office of the Information and Privacy Commissioner for British
            Columbia
          </strong>
          .
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children",
    body: (
      <p>
        Our services are sold to businesses, not to individuals, and this site
        is not directed at children. We do not knowingly collect personal
        information from anyone under the age of majority in British Columbia.
        If you believe a child has sent us information, email us and we will
        delete it.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        If we change how we handle personal information, we will update this
        page and move the &ldquo;last updated&rdquo; date at the top. If the
        change is significant and we hold your contact details, we will tell you
        directly rather than relying on you to notice.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us about privacy",
    body: (
      <>
        <p>
          Privacy questions, access requests and complaints all go to the same
          place:
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
            <dt>Service area</dt>
            <dd>{siteConfig.region}</dd>
          </div>
        </dl>
        {/* TODO(launch): name the designated privacy officer and, if we publish
            a mailing address, add it here alongside the inbox. */}
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />

      <section className="relative overflow-hidden bg-white pt-14 pb-4 sm:pt-16 lg:pt-20">
        <Container className="relative">
          <PageHeader
            id="privacy-doc"
            eyebrow="Privacy"
            title="Privacy Policy"
            description="What we collect, why we collect it, and what we do with it — written for the person actually reading it rather than for a filing cabinet."
          >
            <LegalMeta updated={LAST_UPDATED}>
              <span>Applies to {siteConfig.legalName}</span>
            </LegalMeta>
          </PageHeader>
        </Container>
      </section>

      <LegalDocument sections={sections} ariaLabelledBy="privacy-doc" />
    </>
  );
}
