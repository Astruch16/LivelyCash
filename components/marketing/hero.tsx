"use client";

import { useState } from "react";
import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Variants,
} from "motion/react";

import { CtaButton } from "@/components/marketing/cta-button";
import { HeroEmblem } from "@/components/marketing/hero-emblem";
import { Container, eyebrowLabel } from "@/components/marketing/section";
import { cn } from "@/lib/utils";

/*
 * "The Dispense" — the hero loads the way an ATM dispenses: one orchestrated
 * mechanical cycle, then a quiet ambient hum. Every delay lives in `T` and
 * every animated element hangs off the single variants tree below, so the
 * sequence can be retimed from one place.
 *
 * Timings that matter relative to a *sibling* are expressed as stagger inside
 * one parent (the headline lines); everything else is a direct child of the
 * section root, which declares no stagger, so those delays are absolute.
 *
 * Under `prefers-reduced-motion` the tree is bypassed entirely and the hero
 * gets a single 300ms fade: no dispense, no float, no parallax.
 */
const T = {
  eyebrow: 0,
  headline: 0.15,
  emblem: 0.5,
  copy: 0.6,
} as const;

const LINE_STAGGER = 0.12;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * The eyebrow's accent rule, matching `<Eyebrow />` elsewhere on the site. It
 * draws out from the left while the label's words are still arriving.
 */
const eyebrowRule: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      scaleX: { duration: 0.5, ease: EASE_OUT, delay: T.eyebrow + 0.3 },
      opacity: { duration: 0.25, delay: T.eyebrow + 0.3 },
    },
  },
};

const eyebrowWord = (index: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.22, delay: T.eyebrow + 0.12 + index * 0.045 },
  },
});

/** Lines feed out of their slot 120ms apart, like bills leaving the tray. */
const headline: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: T.headline, staggerChildren: LINE_STAGGER },
  },
};

const headlineLine: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    // High stiffness, low bounce: fast start, firm stop, one small settle.
    transition: { type: "spring", stiffness: 330, damping: 30, mass: 0.9 },
  },
};

/**
 * The "transaction complete" beat. It carries no delay of its own — it is the
 * fourth stagger child of the headline, which lands it one slot after the last
 * line starts.
 */
const period: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 620, damping: 14 },
  },
};

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay },
  },
});

const emblem: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: T.emblem },
  },
};

/**
 * Reduced motion has to keep the tree, not drop it. `useReducedMotion()` only
 * resolves after the first render, so an element that simply loses its
 * `variants` on the second render keeps whatever style the first one committed
 * — which is how the whole hero once ended up stuck at `opacity: 0`. Instead
 * every element keeps a variants entry that resolves straight to its finished
 * state.
 */
function still(variants: Variants): Variants {
  const target = { ...(variants.visible as TargetAndTransition) };
  delete target.transition;
  const state: TargetAndTransition = { ...target, transition: { duration: 0 } };
  return { hidden: state, visible: state };
}

function resolve(animated: boolean, variants: Variants): Variants {
  return animated ? variants : still(variants);
}

/** The section root is the only thing that moves under reduced motion. */
const rootDispense: Variants = { hidden: {}, visible: {} };

const rootStill: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const EYEBROW_WORDS = "ATM solutions for the Fraser Valley".split(" ");

export function Hero() {
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion;
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <motion.section
      aria-labelledby="hero-heading"
      initial="hidden"
      animate="visible"
      variants={animated ? rootDispense : rootStill}
      className="relative overflow-hidden bg-white"
    >
      <Container className="relative pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-2.5">
              <p className={cn(eyebrowLabel, "text-ink")}>
                {EYEBROW_WORDS.map((word, index) => (
                  <motion.span
                    key={word}
                    variants={resolve(animated, eyebrowWord(index))}
                  >
                    {word}
                    {index < EYEBROW_WORDS.length - 1 ? " " : ""}
                  </motion.span>
                ))}
              </p>
              <motion.span
                aria-hidden="true"
                variants={resolve(animated, eyebrowRule)}
                className="block h-0.5 w-8 origin-left rounded-full bg-accent/60"
              />
            </div>

            {/*
             * The headline is the three programs, in order: buy the machine
             * (Purchase), load it yourself (Combo), or just give it floor space
             * (Turnkey). It deliberately does not lead on "free" — only two of
             * the three cost nothing up front, and the Purchase program runs
             * $4,000–$5,000. See `lib/plans.ts`.
             *
             * TODO(launch): final headline copy needs sign-off. The two-part
             * pattern — solid lines, then one outlined accent line closed by a
             * solid accent period — is the fixed part; the words are not.
             */}
            <motion.h1
              id="hero-heading"
              variants={resolve(animated, headline)}
              className="font-display text-[1.9rem] leading-[1.3] tracking-[-0.01em] text-ink uppercase sm:text-[2.9rem] sm:leading-[1.24] lg:text-[3.6rem] lg:leading-[1.2]"
            >
              <span className="-my-[0.06em] block overflow-hidden py-[0.06em]">
                <motion.span
                  variants={resolve(animated, headlineLine)}
                  className="block"
                >
                  Own It,
                </motion.span>
              </span>
              <span className="-my-[0.06em] block overflow-hidden py-[0.06em]">
                <motion.span
                  variants={resolve(animated, headlineLine)}
                  className="block"
                >
                  Share It,
                </motion.span>
              </span>
              <span className="flex items-baseline">
                <span className="-my-[0.06em] block overflow-hidden py-[0.06em]">
                  <motion.span
                    variants={resolve(animated, headlineLine)}
                    className="block text-outline md:[--text-stroke-width:2px]"
                  >
                    Or Host It
                  </motion.span>
                </span>
                <motion.span
                  variants={resolve(animated, period)}
                  className="inline-block text-accent"
                >
                  .
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={resolve(animated, fadeUp(T.copy))}
              className="max-w-lg text-pretty text-ink-soft"
            >
              Three programs on the same Hyosung Halo II. Buy the machine and
              keep the biggest share of every surcharge, load your own cash
              without the capital outlay, or hand us the lot and just collect a
              cheque — anywhere in the Fraser Valley.
            </motion.p>

            <motion.div
              variants={resolve(animated, fadeUp(T.copy + 0.12))}
              className="mt-1 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              {/* Hovering the primary CTA makes the machine acknowledge it. */}
              <span
                className="inline-flex"
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
              >
                <CtaButton
                  href="/contact"
                  variant="dark"
                  landPulse={animated}
                  landDelay={T.copy + 0.3}
                >
                  Get Started
                </CtaButton>
              </span>
              <CtaButton href="/plans" variant="ghost">
                See Our Plans
              </CtaButton>
            </motion.div>
          </div>

          <motion.div
            variants={resolve(animated, emblem)}
            className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-[27rem]"
          >
            <HeroEmblem glowDelay={T.emblem} pulse={ctaHovered} />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
