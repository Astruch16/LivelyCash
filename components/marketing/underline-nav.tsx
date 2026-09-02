"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "motion/react";

const SLIDE = { type: "spring", stiffness: 420, damping: 34 } as const;

type Rect = { left: number; top: number; width: number };

/**
 * Tracks which link in a nav the pointer (or keyboard focus) is on, and reports
 * where a single shared underline should sit — measured relative to the nav.
 *
 * One measured element rather than a `layoutId` per link: with one indicator we
 * control the exit fade and the resting state directly, and there is never a
 * moment where two elements claim the same shared layout id.
 *
 * Both axes are tracked, so the same indicator works for a horizontal bar (the
 * header, where it slides sideways) and a stacked column (the footer, where it
 * slides down the list).
 */
export function useUnderline({
  /** Horizontal inset, for links whose padding should not be underlined. */
  inset = 0,
  /** Distance above the link's bottom edge. */
  gap = 0,
}: { inset?: number; gap?: number } = {}) {
  const navRef = useRef<HTMLElement>(null);
  /**
   * `el` is null when the pointer has left. `instant` marks a re-entry, where
   * the underline should be placed under the new link and faded in rather than
   * dragged across from wherever it was parked. The updater form gives us the
   * previous value without reading a ref during render.
   */
  const [{ el, instant }, setTarget] = useState<{
    el: HTMLElement | null;
    instant: boolean;
  }>({ el: null, instant: true });

  // Held separately so it survives `el` going null and the bar fades out where
  // it is, instead of collapsing back to the nav's top-left corner.
  const [rect, setRect] = useState<Rect | null>(null);

  const measure = useCallback(() => {
    const nav = navRef.current;
    if (!nav || !el) return;

    const navBox = nav.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    setRect({
      left: box.left - navBox.left + inset,
      top: box.bottom - navBox.top - gap,
      width: Math.max(0, box.width - inset * 2),
    });
  }, [el, inset, gap]);

  useLayoutEffect(measure, [measure]);

  // Fonts loading, reflow and viewport changes all move the labels underneath.
  useEffect(() => {
    if (!el) return;
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [el, measure]);

  const onEnter = (next: HTMLElement) =>
    setTarget((prev) => ({ el: next, instant: prev.el === null }));
  const onLeave = () => setTarget((prev) => ({ ...prev, el: null }));

  return {
    navRef,
    rect,
    visible: el !== null,
    instant,
    onEnter,
    onLeave,
    /** Spread onto each link so pointer and keyboard both drive the bar. */
    linkProps: {
      onMouseEnter: (event: { currentTarget: HTMLElement }) =>
        onEnter(event.currentTarget),
      onFocus: (event: { currentTarget: HTMLElement }) =>
        onEnter(event.currentTarget),
    },
  };
}

/**
 * The bar itself. It fades in where the pointer lands, slides to the next link,
 * and fades out — parked in place — when the pointer leaves the nav.
 */
export function Underline({
  rect,
  visible,
  instant,
}: {
  rect: Rect | null;
  visible: boolean;
  instant: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 h-0.5 rounded-full bg-accent/60"
      initial={false}
      animate={{
        x: rect?.left ?? 0,
        y: rect?.top ?? 0,
        width: rect?.width ?? 0,
        opacity: visible && rect ? 1 : 0,
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              x: instant ? { duration: 0 } : SLIDE,
              y: instant ? { duration: 0 } : SLIDE,
              width: instant ? { duration: 0 } : SLIDE,
              opacity: { duration: 0.18 },
            }
      }
    />
  );
}
