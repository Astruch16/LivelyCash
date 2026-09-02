"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { useMediaQuery } from "@/components/marketing/use-media-query";
import { cn } from "@/lib/utils";

/*
 * TODO(launch): swap the layered SVG below for the real 3D render at
 * `/public/hero-emblem.png`. Keep the wrapper — the load-in, the float, the
 * glow and the parallax all operate on it rather than on the artwork.
 */

/** Tile: pointy-top hexagon at R=170 in a 400×400 box. */
const TILE = "M200 30 347.2 115V285L200 370 52.8 285V115Z";

/** Mark: the logo hexagon at R=85, with the same open inner hexagon at R=42.5. */
const MARK_OUTER = "M200 115 273.6 157.5V242.5L200 285 126.4 242.5V157.5Z";
const MARK_INNER = "M163.2 178.75V221.25L200 242.5l36.8-21.25V178.75L200 157.5";

const POINTER_SPRING = { stiffness: 90, damping: 18, mass: 0.6 } as const;

export function HeroEmblem({
  className,
  /** Seconds to wait before the glow blooms, so it lands on the load timeline. */
  glowDelay = 0,
  /** One small "confirm" pulse — the machine acknowledging a CTA hover. */
  pulse = false,
}: {
  className?: string;
  glowDelay?: number;
  pulse?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const parallax = finePointer && !reduceMotion;

  const ref = useRef<HTMLDivElement>(null);
  const [bloomed, setBloomed] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, POINTER_SPRING);
  const y = useSpring(pointerY, POINTER_SPRING);
  // The mark lags the tile, which reads as depth between the two layers.
  const markX = useTransform(x, (value) => value * 0.4);
  const markY = useTransform(y, (value) => value * 0.4);

  useEffect(() => {
    if (!parallax) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    function onPointerMove(event: PointerEvent) {
      const node = ref.current;
      if (!node) return;

      const box = node.getBoundingClientRect();
      const dx = (event.clientX - (box.left + box.width / 2)) / box.width;
      const dy = (event.clientY - (box.top + box.height / 2)) / box.height;

      // Clamped, so the emblem drifts rather than chasing the cursor.
      pointerX.set(Math.max(-1, Math.min(1, dx)) * 10);
      pointerY.set(Math.max(-1, Math.min(1, dy)) * 10);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [parallax, pointerX, pointerY]);

  const breathing = bloomed && !reduceMotion;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("relative aspect-square w-full select-none", className)}
    >
      <motion.div
        style={parallax ? { x, y } : undefined}
        className="absolute inset-0"
      >
        {/* Ambient levitation. */}
        <motion.div
          animate={reduceMotion ? { y: 0 } : { y: [0, -6, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute inset-0"
        >
          {/* Confirm pulse on primary-CTA hover. */}
          <motion.div
            animate={{ scale: !reduceMotion && pulse ? 1.03 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="absolute inset-0"
          >
            {/*
             * Glow: blooms once as the machine powers on, then hands over to a
             * slow breath on a longer period than the float, so the two never
             * lock into step.
             */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={
                breathing
                  ? { opacity: [0.72, 1, 0.72], scale: [1, 1.05, 1] }
                  : { opacity: 0.82, scale: 1 }
              }
              transition={
                breathing
                  ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 1.1, delay: glowDelay, ease: "easeOut" }
              }
              onAnimationComplete={() => setBloomed(true)}
              className="absolute inset-[14%] rounded-full bg-accent/45 blur-3xl"
            />

            <svg
              viewBox="0 0 400 400"
              fill="none"
              focusable="false"
              className="relative size-full drop-shadow-emblem"
            >
              <defs>
                <linearGradient
                  id="emblem-tile"
                  x1="0.15"
                  y1="0"
                  x2="0.85"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f2f0e9" />
                </linearGradient>
              </defs>

              {/* Filling and stroking the same path rounds the hexagon's corners. */}
              <path
                d={TILE}
                fill="url(#emblem-tile)"
                stroke="url(#emblem-tile)"
                strokeWidth="34"
                strokeLinejoin="round"
              />
              <path
                d={TILE}
                stroke="var(--color-line)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            <motion.svg
              viewBox="0 0 400 400"
              fill="none"
              focusable="false"
              style={parallax ? { x: markX, y: markY } : undefined}
              className="absolute inset-0 size-full drop-shadow-mark"
            >
              <path
                d={MARK_OUTER}
                stroke="var(--color-accent)"
                strokeWidth="9"
                strokeLinejoin="round"
              />
              <path
                d={MARK_INNER}
                stroke="var(--color-accent)"
                strokeWidth="9"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
