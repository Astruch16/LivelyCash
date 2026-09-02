"use client";

import { useEffect, useRef, useState } from "react";
import {
  BoxIcon,
  HeadphonesIcon,
  MapPinIcon,
  TrendingUpIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { InkBand } from "@/components/marketing/ink-band";
import { Container } from "@/components/marketing/section";
import { cn } from "@/lib/utils";

type Stat = {
  icon: LucideIcon;
  /** The finished figure. Rendered verbatim on the server and when static. */
  display: string;
  label: string;
  /** Counts 0 → `countTo` the first time the band scrolls into view. */
  countTo?: number;
  /** Formats an in-flight value; defaults to a thousands-separated integer. */
  format?: (value: number) => string;
  suffix?: string;
};

const stats: Stat[] = [
  {
    icon: BoxIcon,
    display: "10",
    label: "ATMs deployed",
    countTo: 10,
  },
  {
    icon: UsersIcon,
    display: "15",
    label: "Happy partners",
    countTo: 15,
  },
  {
    icon: TrendingUpIcon,
    display: "10K+",
    label: "Transactions processed",
    // Counted in thousands rather than in units: ticking 0 → 10,000 would
    // spend most of the animation reading "0K".
    countTo: 10,
    format: (value) => `${Math.round(value)}K`,
    suffix: "+",
  },
  {
    icon: MapPinIcon,
    display: "Fraser Valley",
    label: "Local & proud",
  },
  {
    icon: HeadphonesIcon,
    display: "100%",
    label: "Local support",
    countTo: 100,
    suffix: "%",
  },
];

/**
 * `null` means "not counting" — the server render, the reduced-motion render
 * and the pre-animation client render all show the finished figure, so the
 * number never appears as a placeholder if JavaScript never gets there.
 */
function StatValue({ stat, active }: { stat: Stat; active: boolean }) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState<number | null>(null);
  const target = stat.countTo;

  useEffect(() => {
    if (target === undefined || reduceMotion || !active) return;

    // `onUpdate` seeds the value on the animation's first frame, so there is
    // no need to reset to zero up front.
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setValue,
    });

    return () => controls.stop();
  }, [active, reduceMotion, target]);

  if (value === null) return <>{stat.display}</>;

  return (
    <>
      {stat.format
        ? stat.format(value)
        : Math.round(value).toLocaleString("en-CA")}
      {stat.suffix}
    </>
  );
}

/**
 * Vertical hairlines between stats, suppressed at the start of each row so no
 * divider ever hangs off the left edge — the column count changes per
 * breakpoint, so each one gets its own rule.
 */
function dividerClass(index: number, total: number) {
  const isOrphan = total % 2 === 1 && index === total - 1;

  return cn(
    "border-ink-line",
    index % 2 === 1 && "border-l",
    // An odd count leaves the last stat alone on its row at two columns, so it
    // spans the full width instead of hanging off to one side.
    isOrphan && "col-span-2 sm:col-span-1",
    "sm:border-l",
    index % 3 === 0 && "sm:border-l-0",
    "lg:border-l",
    index % 5 === 0 && "lg:border-l-0",
  );
}

export function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    /*
     * Soft rather than white: sitting between the plans grid and the service
     * areas, both of which are white, a white band here would merge its own
     * padding with theirs into one long void. The page alternates tones for
     * exactly this reason.
     */
    <section
      aria-label="Lively Cash ATMs by the numbers"
      className="bg-base-soft"
    >
      <Container className="py-16 sm:py-20 lg:py-24">
        <div ref={ref}>
          <InkBand className="border border-accent px-2 py-10 sm:px-6 sm:py-12">
            <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "flex flex-col items-center px-3 text-center sm:px-6",
                    dividerClass(index, stats.length),
                  )}
                >
                  <stat.icon
                    aria-hidden="true"
                    strokeWidth={1.4}
                    className="size-6 text-accent"
                  />
                  {/*
                   * Two line-heights tall whatever the value: "Fraser Valley"
                   * wraps and the figures do not, and without a fixed box the
                   * labels underneath would sit at different heights across
                   * the row. `lh` keeps it tied to the type rather than to a
                   * magic pixel value.
                   */}
                  <dd className="mt-4 flex min-h-[2lh] items-center font-display text-lg leading-tight text-white tabular-nums sm:text-xl">
                    <StatValue stat={stat} active={inView} />
                  </dd>
                  <dt className="mt-2 font-mono text-[0.625rem] tracking-[0.18em] text-ink-muted uppercase">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </InkBand>
        </div>
      </Container>
    </section>
  );
}
