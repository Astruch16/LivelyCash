"use client";

import Link from "next/link";

import { Eyebrow } from "@/components/marketing/section";
import { Underline, useUnderline } from "@/components/marketing/underline-nav";
import type { NavLink } from "@/lib/site";

/**
 * A footer link column carrying the same sliding underline as the main nav.
 * The links are stacked rather than in a row, so the bar travels down the
 * column instead of across it — the indicator tracks both axes.
 */
export function FooterNavColumn({
  title,
  links,
}: {
  title: string;
  links: NavLink[];
}) {
  const { navRef, rect, visible, instant, linkProps, onLeave } = useUnderline();
  const headingId = `footer-${title}`;

  return (
    <nav
      ref={navRef}
      aria-labelledby={headingId}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      className="relative"
    >
      <Eyebrow as="h2" id={headingId}>
        {title}
      </Eyebrow>
      <ul className="mt-5 flex flex-col items-start gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              {...linkProps}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Underline rect={rect} visible={visible} instant={instant} />
    </nav>
  );
}

/** The fine-print policy links, laid out in a row that may wrap. */
export function FooterLegalNav({ links }: { links: NavLink[] }) {
  const { navRef, rect, visible, instant, linkProps, onLeave } = useUnderline();

  return (
    <nav
      ref={navRef}
      aria-label="Legal"
      onMouseLeave={onLeave}
      onBlur={onLeave}
      className="relative"
    >
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              {...linkProps}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Underline rect={rect} visible={visible} instant={instant} />
    </nav>
  );
}
