import Link from "next/link";
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";

import { HexIcon } from "@/components/marketing/hex";
import { RevealGroup, RevealItem } from "@/components/marketing/reveal";
import { cities } from "@/lib/cities";

/**
 * The five communities as large link chips. Used on the home page and again on
 * About, so the treatment only exists here.
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
          <Link
            href={`/cities/${city.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-accent"
          >
            <span className="flex items-start justify-between gap-3">
              <HexIcon size="sm" frameClassName="text-accent/70">
                <MapPinIcon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4 text-ink"
                />
              </HexIcon>
              <ArrowUpRightIcon
                aria-hidden="true"
                className="mt-2 size-4 shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </span>
            <span className="mt-5 font-display text-[0.9375rem] text-ink">
              {city.longName}
            </span>
            <span className="mt-2.5 text-sm text-ink-soft">{city.blurb}</span>
            <span className="mt-5 font-mono text-[0.625rem] tracking-[0.2em] text-ink-soft uppercase">
              ATMs in {city.name}
            </span>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
