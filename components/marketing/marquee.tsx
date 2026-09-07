import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee, pure CSS.
 *
 * The track holds `copies` identical copies of the list and the keyframes
 * translate it by exactly one copy's width, so copy 2 lands where copy 1
 * started and the loop is seamless. That only holds if the lists are the sole
 * children of the track and carry their own trailing gap — do not add a `gap`
 * to the track itself.
 *
 * How many copies: after shifting by one copy the window must still be full,
 * which needs `copies × copy ≥ strip + copy`. Two copies therefore require one
 * copy to be at least as wide as the visible strip; three only half as wide.
 * Running full-bleed the strip is the whole viewport, so two is not enough on
 * a wide display and a gap appears at the end of every cycle — hence the
 * default of three.
 *
 * The duplicates are hidden from assistive tech, and the animation is dropped
 * under `prefers-reduced-motion` (see the `marquee-track` utility), leaving an
 * ordinary horizontally scrollable row.
 */
export function Marquee<T>({
  items,
  renderItem,
  getKey,
  durationSeconds = 72,
  copies = 3,
  className,
  label,
}: {
  items: readonly T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string;
  durationSeconds?: number;
  copies?: number;
  className?: string;
  label: string;
}) {
  const lists = Array.from({ length: copies });

  return (
    <div
      role="group"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "group relative flex scrollbar-none overflow-x-auto",
        /*
         * Fades both edges so cards leave the strip rather than clipping. The
         * fade is narrower on small screens: at 5rem a side it would consume
         * 160px of a 390px viewport, leaving no width in which a 288px card is
         * ever fully legible.
         */
        "mask-[linear-gradient(to_right,transparent,black_1.5rem,black_calc(100%-1.5rem),transparent)]",
        "sm:mask-[linear-gradient(to_right,transparent,black_5rem,black_calc(100%-5rem),transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max marquee-track group-focus-within:paused group-hover:paused"
        style={
          {
            "--marquee-duration": `${durationSeconds}s`,
            "--marquee-shift": `-${(100 / copies).toFixed(4)}%`,
          } as CSSProperties
        }
      >
        {lists.map((_, index) => (
          <ul
            key={index}
            // Only the first copy is real content; the rest are visual filler.
            aria-hidden={index === 0 ? undefined : "true"}
            className="flex shrink-0 gap-8 pr-8"
          >
            {items.map((item) => (
              <li key={getKey(item)} className="flex">
                {renderItem(item)}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/**
 * The card the partner marquee is built from.
 *
 * Landscape rather than square, and stripped to the two things worth reading
 * at scrolling speed: the business, and the town it is in. Nine identical
 * icons down a moving strip added repetition rather than information, so
 * there is none — the card is the name and the place.
 *
 * Fixed width with a minimum height, since the names run from "Lami Cuts" to
 * "Chillibowl Lanes & Pool Hall" and cards that resized with their copy would
 * ripple as they scrolled past. Content is centred vertically so a one-line
 * and a two-line name sit on the same optical axis.
 */
export function MarqueeChip({
  name,
  detail,
}: {
  name: string;
  detail?: string;
}) {
  return (
    <span className="flex min-h-32 w-72 flex-col justify-center rounded-2xl border border-accent bg-white px-7 py-6">
      <span className="block font-display text-[0.9375rem] text-balance text-ink">
        {name}
      </span>
      {detail ? (
        <span className="mt-3 block font-mono text-[0.625rem] tracking-[0.2em] text-ink-soft uppercase">
          {detail}
        </span>
      ) : null}
    </span>
  );
}
