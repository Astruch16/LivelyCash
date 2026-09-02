import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee, pure CSS.
 *
 * The track holds the list twice and the keyframes translate it by exactly
 * half its width, so the second copy lands where the first started and the
 * loop is seamless. That only holds if the two lists are the sole children of
 * the track and carry their own trailing gap — do not add a `gap` to the track
 * itself. The duplicate is hidden from assistive tech, and the animation is
 * dropped under `prefers-reduced-motion` (see the `marquee-track` utility),
 * leaving an ordinary horizontally scrollable row.
 *
 * Two copies is enough only because the strip is capped at the container
 * width: one copy of the list must be at least as wide as the strip, or a gap
 * appears at the end of each cycle. Check that again before letting this run
 * full-bleed.
 */
export function Marquee<T>({
  items,
  renderItem,
  getKey,
  durationSeconds = 44,
  className,
  label,
}: {
  items: readonly T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string;
  durationSeconds?: number;
  className?: string;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "group relative flex scrollbar-none overflow-x-auto",
        // Fades both edges so chips leave the strip rather than clipping.
        "mask-[linear-gradient(to_right,transparent,black_4rem,black_calc(100%-4rem),transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max marquee-track group-focus-within:paused group-hover:paused"
        style={{ "--marquee-duration": `${durationSeconds}s` } as CSSProperties}
      >
        <ul className="flex shrink-0 gap-3 pr-3">
          {items.map((item) => (
            <li key={getKey(item)}>{renderItem(item)}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className="flex shrink-0 gap-3 pr-3">
          {items.map((item) => (
            <li key={getKey(item)}>{renderItem(item)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** The outlined pill chip the partner marquee is built from. */
export function MarqueeChip({
  name,
  detail,
}: {
  name: string;
  detail?: string;
}) {
  return (
    <span className="inline-flex items-center gap-3 rounded-full border border-line bg-white px-5 py-3 whitespace-nowrap">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      <span className="text-sm text-ink">{name}</span>
      {detail ? (
        <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-soft uppercase">
          {detail}
        </span>
      ) : null}
    </span>
  );
}
