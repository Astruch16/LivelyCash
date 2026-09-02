"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Scroll reveals. These are thin client wrappers on purpose: pages stay server
 * components and pass their already-rendered markup through as `children`.
 */
const VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -6% 0px",
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Looked up rather than built with `motion.create()` at render time, which
 * would hand React a brand new component type on every render.
 */
const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
} as const;

export type RevealTag = keyof typeof tags;

function itemVariants(reduceMotion: boolean | null): Variants {
  if (reduceMotion) {
    // `y` is reset explicitly: `useReducedMotion()` resolves after the first
    // render, so the offset from that render is already committed and a
    // variant that omits `y` would leave it there.
    return {
      hidden: { opacity: 0, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
}) {
  const reduceMotion = useReducedMotion();
  const Comp = tags[as];

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={itemVariants(reduceMotion)}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/**
 * Staggers its `<RevealItem />` children. Any other child still renders, it
 * just does not animate — the stagger works by variant propagation.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  stagger?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const Comp = tags[as];

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
}) {
  const reduceMotion = useReducedMotion();
  const Comp = tags[as];

  return (
    <Comp variants={itemVariants(reduceMotion)} className={className}>
      {children}
    </Comp>
  );
}
