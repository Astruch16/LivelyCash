"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

/**
 * Runs before paint in the browser, and is a no-op effect on the server, where
 * `useLayoutEffect` warns and cannot run anyway.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Types a short string out character by character the first time it scrolls
 * into view, with a block caret that blinks until it finishes.
 *
 * The text exists twice. The visible copy is `aria-hidden` and animated; a
 * screen-reader copy carries the complete string from the first render, so
 * assistive tech reads the label once and in full rather than following a
 * value that mutates thirty times.
 *
 * The character count starts at the full length rather than zero, so the
 * server-rendered HTML carries the real string and a visitor without
 * JavaScript reads a complete spec sheet. Hydration clears it, and
 * `prefers-reduced-motion` puts it straight back — starting at zero instead
 * meant a reduced-motion visitor got a sheet with no labels on it at all.
 *
 * Both the slicing and the caret run on motion values rather than React state.
 * Motion writes straight to the DOM node, so a sheet full of these schedules
 * no renders at all.
 */
export function Typewriter({
  text,
  className,
  /** Milliseconds per character. Deliberately unhurried. */
  speed = 45,
  delay = 0,
  as: Comp = "span",
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  as?: "span" | "h3";
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  const count = useMotionValue(text.length);
  const shown = useTransform(count, (value) =>
    text.slice(0, Math.round(value)),
  );
  /** Hides the caret once the line is written. The blink itself is CSS. */
  const caret = useMotionValue(0);

  useIsomorphicLayoutEffect(() => {
    // Reduced motion, or a later switch to it: show the whole string, no caret.
    if (reduceMotion) {
      count.set(text.length);
      caret.set(0);
      return;
    }

    /*
     * Cleared at hydration rather than when the row enters view. Waiting meant
     * the full string was painted for a frame or two first — the observer
     * fires after layout, so there was no way to reset before that paint — and
     * a label flashing in, vanishing and then typing itself reads as a glitch.
     */
    count.set(0);
    if (!inView) return;

    const seconds = (text.length * speed) / 1000;
    caret.set(1);

    const typing = animate(count, text.length, {
      duration: seconds,
      delay: delay / 1000,
      ease: "linear",
    });
    const hideCaret = animate(caret, 0, {
      duration: 0.2,
      delay: delay / 1000 + seconds + 0.4,
    });

    return () => {
      typing.stop();
      hideCaret.stop();
    };
  }, [caret, count, delay, inView, reduceMotion, speed, text.length]);

  return (
    <Comp className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        <motion.span>{shown}</motion.span>
        {/*
         * Two elements: the outer one fades the caret out on a motion value,
         * the inner blinks on a CSS animation. Putting both on one element
         * would have them fighting over `opacity`. It is hidden until typing
         * starts, so no caret is left sitting on a static sheet.
         */}
        <motion.span
          style={{ opacity: caret }}
          className="ml-0.5 inline-block h-[0.9em] w-[0.45em] translate-y-[0.08em] align-baseline"
        >
          <span className="block size-full caret-blink bg-accent" />
        </motion.span>
      </span>
    </Comp>
  );
}
