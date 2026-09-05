import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, MapPinIcon, MessageSquareIcon } from "lucide-react";

import { HexIcon } from "@/components/marketing/hex";
import { RevealGroup, RevealItem } from "@/components/marketing/reveal";
import { cities } from "@/lib/cities";
import { cn } from "@/lib/utils";

/**
 * One chip in the grid. The city cards and the closing contact card share it
 * so the two cannot drift apart — only the icon, the copy and the surface
 * differ.
 */
function AreaCard({
  href,
  icon,
  title,
  blurb,
  footer,
  soft = false,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  blurb: string;
  footer: string;
  /** The soft surface marks the card that is an invitation, not a place. */
  soft?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-line p-6 transition-colors hover:border-accent",
        soft ? "bg-base-soft" : "bg-white",
      )}
    >
      <span className="flex items-start justify-between gap-3">
        <HexIcon size="sm" frameClassName="text-accent/70">
          {icon}
        </HexIcon>
        <ArrowUpRightIcon
          aria-hidden="true"
          className="mt-2 size-4 shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
        />
      </span>
      <span className="mt-5 font-display text-[0.9375rem] text-ink">
        {title}
      </span>
      <span className="mt-2.5 text-sm text-ink-soft">{blurb}</span>
      <span className="mt-5 font-mono text-[0.625rem] tracking-[0.2em] text-ink-soft uppercase">
        {footer}
      </span>
    </Link>
  );
}

/**
 * The five communities as large link chips, closed by a contact card. Used on
 * the home page and again on About, so the treatment only exists here.
 *
 * The contact card is not decoration for the empty sixth cell — it is the
 * honest answer to the question the grid raises, which is "what if I am not on
 * this list". It happens to complete the row at three columns. If a sixth city
 * is ever added the row will break again; at that point the contact card
 * should probably move out of the grid rather than a seventh cell being
 * invented for it.
 */
export function ServiceAreaGrid() {
  return (
    <RevealGroup
      as="ul"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      stagger={0.06}
    >
      {cities.map((city) => (
        <RevealItem as="li" key={city.slug}>
          <AreaCard
            href={`/cities/${city.slug}`}
            icon={
              <MapPinIcon
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-4 text-ink"
              />
            }
            title={city.longName}
            blurb={city.blurb}
            footer={`ATMs in ${city.name}`}
          />
        </RevealItem>
      ))}

      <RevealItem as="li">
        <AreaCard
          soft
          href="/contact"
          icon={
            <MessageSquareIcon
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4 text-ink"
            />
          }
          title="Somewhere else nearby?"
          blurb="Tell us where you are and how busy you get. If we cannot service you properly we will say so in the first conversation."
          footer="Get in touch"
        />
      </RevealItem>
    </RevealGroup>
  );
}
