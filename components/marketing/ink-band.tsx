import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The only way dark appears in this design: a large rounded container inset
 * inside a light section. Never a page background, and at most one per page
 * outside the home page.
 */
export function InkBand({
  children,
  className,
  /** Cuts the bottom-right corner at an angle, as on the home page CTA. */
  cutCorner = false,
}: {
  children: ReactNode;
  className?: string;
  cutCorner?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-ink text-white",
        cutCorner &&
          "[--cut:2rem] [clip-path:polygon(0_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%)] sm:[--cut:3.5rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}
