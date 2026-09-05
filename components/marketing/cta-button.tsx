"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

/**
 * Every call to action on the site is one of these. Each is a pill with a
 * circular icon chip on the right; the chip is what animates on hover. Pass
 * `href` for a link or `type` for a form control — nothing else should
 * hand-roll a button.
 */
export type CtaVariant = "dark" | "accent" | "ghost" | "ghost-ink" | "outline";

const shellStyles: Record<CtaVariant, string> = {
  dark: "bg-ink text-white hover:bg-black focus-visible:outline-ink",
  accent:
    "bg-accent text-ink hover:bg-accent-deep focus-visible:outline-ink focus-visible:outline-offset-3",
  ghost:
    "text-ink hover:text-black focus-visible:outline-ink [&_[data-chip]]:border [&_[data-chip]]:border-line",
  "ghost-ink":
    "text-white focus-visible:outline-accent [&_[data-chip]]:border [&_[data-chip]]:border-white/30",
  /*
   * Ghost with a pill outline, so it reads as a button beside a filled one.
   *
   * The edge is a ring rather than a border. A real border adds 1px to every
   * side, which made this variant 2px taller than the filled button next to
   * it and left it overhanging by a pixel top and bottom. A ring paints as a
   * box-shadow, so the pill keeps the same box as `dark` and `accent` and the
   * pair line up exactly.
   */
  outline:
    "ring-1 ring-inset ring-line text-ink hover:ring-ink focus-visible:outline-ink [&_[data-chip]]:border [&_[data-chip]]:border-line",
};

const chipStyles: Record<CtaVariant, string> = {
  dark: "bg-accent text-ink",
  accent: "bg-ink text-accent",
  ghost: "text-ink group-hover/cta:border-accent",
  "ghost-ink": "text-white group-hover/cta:border-accent",
  outline: "text-ink group-hover/cta:border-accent",
};

const sizeStyles = {
  md: {
    shell: "gap-3 py-1.5 pr-1.5 pl-5 text-[0.6875rem]",
    chip: "size-9",
    icon: "size-3.5",
  },
  lg: {
    shell: "gap-3.5 py-2 pr-2 pl-6.5 text-xs sm:pl-7",
    chip: "size-11",
    icon: "size-4",
  },
} as const;

export type CtaSize = keyof typeof sizeStyles;

type CtaBase = {
  children: ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
  /**
   * Plays a single 45° rotate-and-back on the arrow chip as the button lands.
   * Used by the hero load sequence, not by ordinary page buttons.
   */
  landPulse?: boolean;
  landDelay?: number;
  /** Replaces the arrow in the chip — a spinner while a form submits, say. */
  icon?: ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  "aria-label"?: string;
};

export type CtaButtonProps =
  | (CtaBase & { href: string; type?: never; disabled?: never })
  | (CtaBase & { href?: never; type: "submit" | "button"; disabled?: boolean });

export function CtaButton(props: CtaButtonProps) {
  const {
    children,
    variant = "dark",
    size = "lg",
    className,
    landPulse = false,
    landDelay = 0,
    icon,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const reduceMotion = useReducedMotion();
  const dims = sizeStyles[size];

  const chipVariants: Variants = reduceMotion
    ? {
        rest: { rotate: 0, x: 0 },
        land: { rotate: 0, x: 0 },
        hover: { rotate: 0, x: 0 },
      }
    : {
        rest: { rotate: 0, x: 0 },
        land: {
          rotate: [0, 45, 0],
          transition: {
            duration: 0.5,
            delay: landDelay,
            times: [0, 0.45, 1],
            ease: "easeOut",
          },
        },
        hover: {
          rotate: 45,
          x: 2,
          transition: { type: "spring", stiffness: 520, damping: 22 },
        },
      };

  // Only the dark button flashes: on the accent button the chip is already ink,
  // and on the ghosts there is no fill to brighten.
  const flashVariants: Variants =
    reduceMotion || variant !== "dark"
      ? {}
      : {
          rest: { backgroundColor: "var(--color-accent)" },
          land: { backgroundColor: "var(--color-accent)" },
          hover: {
            backgroundColor: [
              "var(--color-accent)",
              "var(--color-accent-bright)",
              "var(--color-accent)",
            ],
            transition: { duration: 0.45, ease: "easeOut" },
          },
        };

  const shared = {
    initial: "rest",
    animate: landPulse && !reduceMotion ? "land" : "rest",
    whileHover: "hover",
    whileFocus: "hover",
    onClick,
    onMouseEnter,
    onMouseLeave,
    "aria-label": props["aria-label"],
    className: cn(
      // `outline-none` zeroes `--tw-outline-style`, so the focus ring needs
      // `outline-solid` put back or it lands as a 2px outline of style `none`.
      "group/cta inline-flex w-fit items-center rounded-full font-medium tracking-[0.16em] uppercase transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid disabled:pointer-events-none disabled:opacity-60",
      dims.shell,
      shellStyles[variant],
      className,
    ),
  } as const;

  const content = (
    <>
      <span>{children}</span>
      <motion.span
        data-chip
        aria-hidden="true"
        variants={flashVariants}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full",
          dims.chip,
          chipStyles[variant],
        )}
      >
        {icon ? (
          <span className="flex items-center justify-center">{icon}</span>
        ) : (
          <motion.span
            variants={chipVariants}
            className="flex items-center justify-center"
          >
            <ArrowUpRightIcon className={dims.icon} strokeWidth={2.25} />
          </motion.span>
        )}
      </motion.span>
    </>
  );

  if (props.href !== undefined) {
    /*
     * Same-page anchors deliberately skip next/link. Routing a hash through
     * the router makes Next perform its own scroll, which Lenis reads as user
     * input and abandons its animation part-way — the link then lands hundreds
     * of pixels short of the target. A plain anchor leaves Lenis to handle it.
     */
    if (props.href.startsWith("#")) {
      return (
        <motion.a href={props.href} {...shared}>
          {content}
        </motion.a>
      );
    }

    return (
      <MotionLink href={props.href} {...shared}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button type={props.type} disabled={props.disabled} {...shared}>
      {content}
    </motion.button>
  );
}
