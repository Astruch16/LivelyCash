import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The hexagon is the brand's only shape motif — it carries the logo mark, the
 * feature icon chips, the hardware backdrop and the hero emblem. Every one of
 * them draws from this single path so they stay in proportion with each other.
 *
 * Pointy-top, inscribed in a 24×24 box.
 */
export const HEX_PATH = "M12 1.7 21 6.85V17.15L12 22.3 3 17.15V6.85Z";

/** Matching CSS polygon, for clipping raster content to the same silhouette. */
export const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

export function HexOutline({
  className,
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-6", className)}
    >
      <path
        d={HEX_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HexSolid({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("size-6", className)}
    >
      <path d={HEX_PATH} fill="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Hexagonal icon chip: a hairline hexagon with an icon centred inside it.
 * Used for the hardware feature list and anywhere else an icon needs a frame.
 */
export function HexIcon({
  children,
  className,
  frameClassName,
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  frameClassName?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        size === "sm" ? "size-10" : "size-12",
        className,
      )}
    >
      <HexOutline
        strokeWidth={1}
        className={cn("absolute inset-0 size-full text-line", frameClassName)}
      />
      <span className="relative flex items-center justify-center">
        {children}
      </span>
    </span>
  );
}
