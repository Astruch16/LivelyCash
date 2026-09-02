import type { ElementType, ReactNode } from "react";

import { AccentRule } from "@/components/marketing/accent-rule";
import { cn } from "@/lib/utils";

/**
 * Surfaces are always light. The two tones are the white page base and the
 * warm off-white used to separate adjacent sections; dark only ever appears as
 * an inset band (see `<InkBand />`), never as a section background.
 */
const toneStyles = {
  light: "bg-white",
  soft: "bg-base-soft",
} as const;

export type SectionTone = keyof typeof toneStyles;

/**
 * Where a shared component can sit on either a light surface or inside a dark
 * inset band, it takes this prop rather than relying on a colour-scheme swap.
 */
export type Surface = "light" | "ink";

export function Container({
  className,
  children,
  as: Comp = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: ElementType;
}) {
  return (
    <Comp
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}
    >
      {children}
    </Comp>
  );
}

export function Section({
  tone = "light",
  className,
  containerClassName,
  children,
  id,
  as: Comp = "section",
  "aria-labelledby": ariaLabelledBy,
}: {
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  id?: string;
  as?: ElementType;
  "aria-labelledby"?: string;
}) {
  return (
    <Comp
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "relative scroll-mt-28 py-16 text-ink sm:py-20 lg:py-24",
        toneStyles[tone],
        className,
      )}
    >
      <Container className={cn("relative", containerClassName)}>
        {children}
      </Container>
    </Comp>
  );
}

/**
 * Type for the eyebrow label. Exported because the hero builds its own markup
 * (it animates the label word by word) and the two must not drift apart.
 *
 * Deliberately not tiny: at 11px with 0.2em tracking these read as decoration
 * rather than as text. 13px, tighter tracking and full ink contrast make them
 * legible at a glance, which is the job.
 */
export const eyebrowLabel =
  "font-mono text-[0.8125rem] font-medium tracking-[0.16em] uppercase";

/**
 * Uppercase letterspaced label over a short accent rule. Sits above every
 * section heading in the design, so it is deliberately the only way to write
 * one — including where the label is itself a heading, via `as`.
 */
export function Eyebrow({
  children,
  className,
  surface = "light",
  as: Comp = "p",
  id,
}: {
  children: ReactNode;
  className?: string;
  surface?: Surface;
  as?: ElementType;
  id?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start gap-2.5", className)}>
      <Comp
        id={id}
        className={cn(
          eyebrowLabel,
          surface === "ink" ? "text-white/85" : "text-ink",
        )}
      >
        {children}
      </Comp>
      <AccentRule />
    </div>
  );
}

const headingSizes = {
  /** Section heading. */
  section:
    "text-[1.3rem] leading-[1.2] sm:text-[1.65rem] sm:leading-[1.15] lg:text-[1.95rem]",
  /** Interior page `h1`. */
  page: "text-[1.5rem] leading-[1.15] sm:text-[2rem] lg:text-[2.5rem] lg:leading-[1.1]",
  /** Sub-heading inside a section. */
  minor: "text-[1.05rem] leading-[1.3] sm:text-[1.25rem]",
} as const;

export type HeadingSize = keyof typeof headingSizes;

/**
 * The display face (Michroma) is reserved for headings — it is wide enough
 * that anything longer than a heading stops being readable in it.
 */
export function DisplayHeading({
  as: Comp = "h2",
  size = "section",
  className,
  children,
  id,
}: {
  as?: ElementType;
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Comp
      id={id}
      className={cn("font-display text-balance", headingSizes[size], className)}
    >
      {children}
    </Comp>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  size = "section",
  as = "h2",
  surface = "light",
  className,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  size?: HeadingSize;
  as?: ElementType;
  surface?: Surface;
  className?: string;
  /** Actions rendered beneath the description — usually a `<CtaButton />`. */
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col items-start gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow surface={surface}>{eyebrow}</Eyebrow> : null}
      <DisplayHeading
        as={as}
        id={id}
        size={size}
        className={surface === "ink" ? "text-white" : "text-ink"}
      >
        {title}
      </DisplayHeading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-pretty",
            surface === "ink" ? "text-ink-muted" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}

/**
 * The header every interior page opens with: eyebrow, display `h1`, lede, and
 * optional actions. Keeping it here is what makes About, Processing, Why Us,
 * Plans, Contact and the city pages read as one site.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
  id,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Actions rendered under the lede — usually one or two `<CtaButton />`s. */
  children?: ReactNode;
  className?: string;
  /** Set when something on the page needs to reference the `h1` by id. */
  id?: string;
}) {
  return (
    <div className={cn("flex max-w-3xl flex-col items-start gap-6", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <DisplayHeading as="h1" id={id} size="page" className="text-ink">
        {title}
      </DisplayHeading>
      {description ? (
        <p className="max-w-2xl text-lg text-pretty text-ink-soft">
          {description}
        </p>
      ) : null}
      {children ? (
        <div className="mt-1 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
