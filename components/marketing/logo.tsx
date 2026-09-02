import Link from "next/link";

import { HEX_PATH } from "@/components/marketing/hex";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The Lively Cash mark: an accent hexagon with a second, open hexagon nested
 * inside it. Inline SVG so it inherits colour from whatever surface it sits on.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={cn("size-9 shrink-0 text-accent", className)}
    >
      <path
        d={HEX_PATH}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.43v5.14L12 17.15l4.5-2.58V9.43L12 6.85"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Stacked wordmark: the name in the display face over the descriptor in mono.
 * `surface` swaps the type colour for the footer's light band and any ink band.
 */
export function Wordmark({
  className,
  surface = "light",
}: {
  className?: string;
  surface?: "light" | "ink";
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display text-[0.9375rem] tracking-[0.02em] uppercase",
          surface === "ink" ? "text-white" : "text-ink",
        )}
      >
        Lively
      </span>
      <span
        className={cn(
          "mt-1 font-mono text-[0.5625rem] tracking-[0.28em] uppercase",
          surface === "ink" ? "text-ink-muted" : "text-ink-soft",
        )}
      >
        Cash ATMs
      </span>
    </span>
  );
}

export function Logo({
  className,
  surface = "light",
}: {
  className?: string;
  surface?: "light" | "ink";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-80",
        className,
      )}
      aria-label={`${siteConfig.name} — home`}
    >
      <LogoMark />
      <Wordmark surface={surface} />
    </Link>
  );
}
