"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Clearance under the sticky header, on top of its measured height. */
const ANCHOR_GAP = 24;

/**
 * Smooth scrolling, mounted once in the root layout.
 *
 * Lenis has its own `respectReducedMotion` handling, but that only flattens the
 * easing while still routing every scroll through JS. When the user has asked
 * for reduced motion we do not instantiate it at all, so scrolling is the
 * browser's own — and we re-check if the preference changes mid-session.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    /*
     * In-page anchors are handled here rather than through Lenis's own
     * `anchors` option, which resolved targets to the wrong offset — a link to
     * a section 1,900px down eased smoothly to 418px and stopped, with no
     * interruption in the curve. Computing the destination ourselves is
     * deterministic: measure the target, subtract the sticky header, scroll to
     * that number.
     */
    function onDocumentClick(event: MouseEvent) {
      if (
        !lenis ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      const id = anchor?.getAttribute("href")?.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      const header = document.querySelector("header");
      const offset = (header?.offsetHeight ?? 0) + ANCHOR_GAP;

      event.preventDefault();
      lenis.scrollTo(
        window.scrollY + target.getBoundingClientRect().top - offset,
      );
      // Keep the URL and the back button honest.
      window.history.pushState(null, "", `#${id}`);
    }

    function sync() {
      lenis?.destroy();
      lenis = null;

      if (query.matches) return;

      lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, autoRaf: true });
    }

    sync();
    query.addEventListener("change", sync);
    // Reduced motion leaves `lenis` null and the handler bails, so the browser
    // does its own instant jump using the `scroll-mt-*` classes on the targets.
    document.addEventListener("click", onDocumentClick);

    return () => {
      query.removeEventListener("change", sync);
      document.removeEventListener("click", onDocumentClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
