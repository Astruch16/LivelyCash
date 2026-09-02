"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * The short accent rule that marks the start of a labelled block. It is
 * deliberately much narrower than the text above it — it is a marker, not an
 * underline.
 *
 * It draws itself out from the left the first time it scrolls into view, then
 * stays put. Under `prefers-reduced-motion` it simply fades in.
 */
export function AccentRule({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      initial={reduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
      whileInView={reduceMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={
        reduceMotion
          ? { duration: 0.3 }
          : {
              scaleX: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.25 },
            }
      }
      className={cn(
        "block h-0.5 w-8 origin-left rounded-full bg-accent/60",
        className,
      )}
    />
  );
}
