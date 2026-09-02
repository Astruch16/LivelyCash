import type { ReactNode } from "react";

import { Reveal } from "@/components/marketing/reveal";
import {
  DisplayHeading,
  Eyebrow,
  Section,
} from "@/components/marketing/section";

export type LegalSection = {
  /** Anchor target, also used by the contents list. */
  id: string;
  heading: string;
  body: ReactNode;
};

/**
 * Shared shell for the policy pages — Privacy, Terms and Accessibility. They
 * are long documents that people arrive at looking for one specific clause, so
 * every one gets the same numbered contents list and the same anchored,
 * deep-linkable sections.
 */
export function LegalDocument({
  sections,
  ariaLabelledBy,
}: {
  sections: LegalSection[];
  /** Id of the visually hidden heading that names the document. */
  ariaLabelledBy: string;
}) {
  return (
    <Section aria-labelledby={ariaLabelledBy}>
      <div className="grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
        <nav
          aria-label="On this page"
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <Eyebrow as="h2">On this page</Eyebrow>
          <ol className="mt-5 flex flex-col gap-2.5">
            {sections.map((section, index) => (
              <li key={section.id} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="pt-0.5 font-mono text-[0.625rem] text-ink-soft/70 tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex max-w-2xl flex-col gap-12">
          {sections.map((section, index) => (
            <Reveal key={section.id} as="article" className="scroll-mt-28">
              <span
                aria-hidden="true"
                className="font-mono text-[0.625rem] tracking-[0.2em] text-accent-deep tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <DisplayHeading
                as="h2"
                id={section.id}
                size="minor"
                className="mt-3 scroll-mt-28 text-ink"
              >
                {section.heading}
              </DisplayHeading>
              <div className="legal-prose mt-4">{section.body}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** The "last updated" stamp that sits under every policy page header. */
export function LegalMeta({
  updated,
  children,
}: {
  updated: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.625rem] tracking-[0.2em] text-ink-soft uppercase">
      <span>Last updated {updated}</span>
      {children}
    </div>
  );
}
