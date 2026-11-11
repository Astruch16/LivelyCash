import { QuoteIcon, StarIcon } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/marketing/reveal";
import { testimonials } from "@/lib/testimonials";

/**
 * Partner reviews as three cards. Each card is a column so the business name
 * sits on the same baseline across the row however long the quote runs — the
 * slack collects above the footer rule rather than below it.
 */
export function TestimonialGrid() {
  return (
    <RevealGroup as="ul" className="grid gap-5 lg:grid-cols-3" stagger={0.08}>
      {testimonials.map((review) => (
        /*
         * Not links, so the hover stays decorative — the same lift and accent
         * edge as the processing cards, with the movement kept out of a
         * reduced-motion session.
         */
        <RevealItem
          as="li"
          key={review.business}
          className="flex h-full rounded-3xl border border-line bg-white transition-[border-color,box-shadow,translate] duration-300 ease-out hover:border-accent hover:shadow-panel motion-safe:hover:-translate-y-1"
        >
          <figure className="flex w-full flex-col p-7 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <QuoteIcon
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-7 text-accent"
              />
              {/*
               * Accent stars only clear 1.7:1 on white, so they are decoration
               * and the rating is carried as text for assistive tech.
               */}
              <div className="flex gap-1">
                <span className="sr-only">Rated {review.rating} out of 5</span>
                {Array.from({ length: review.rating }, (_, index) => (
                  <StarIcon
                    key={index}
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 fill-accent text-accent-deep"
                  />
                ))}
              </div>
            </div>

            <h3 className="mt-6 font-display text-[1.05rem] leading-[1.35] text-balance text-ink">
              {review.headline}
            </h3>

            <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-pretty text-ink-soft">
              <p>{review.quote}</p>
            </blockquote>

            <figcaption className="mt-7 border-t border-line pt-5 font-mono text-xs font-medium tracking-[0.14em] text-ink uppercase">
              {review.business}
            </figcaption>
          </figure>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
