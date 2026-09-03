import type { ReactNode } from "react";
import { CheckIcon } from "lucide-react";

import { CtaButton } from "@/components/marketing/cta-button";
import { RevealItem } from "@/components/marketing/reveal";
import { DisplayHeading, Eyebrow } from "@/components/marketing/section";
import type { Plan } from "@/lib/plans";
import { cn } from "@/lib/utils";

/**
 * The "recommended" flag.
 *
 * `floating` lifts it onto the card's top edge with a glow — used by the
 * compact summary cards, whose `<article>` is `relative` and sized for it. The
 * full-width detail cards on /plans keep it inline in their header row: they
 * are not positioned, so a floating badge escapes to the nearest positioned
 * ancestor, and their `overflow-hidden` would clip it anyway.
 */
function RecommendedTag({ floating = false }: { floating?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent px-4 py-2 font-mono text-[0.625rem] font-medium tracking-[0.18em] whitespace-nowrap text-ink uppercase",
        floating &&
          "absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 badge-glow",
      )}
    >
      Recommended
    </span>
  );
}

function ProfitLabel({ plan, ink }: { plan: Plan; ink: boolean }) {
  return (
    <p
      className={cn(
        "font-mono text-[0.625rem] font-medium tracking-[0.2em] uppercase",
        ink ? "text-ink-muted" : "text-ink-soft",
      )}
    >
      {plan.profitLevel}
    </p>
  );
}

function FeatureItem({
  children,
  ink = false,
}: {
  children: ReactNode;
  ink?: boolean;
}) {
  return (
    <li className="flex gap-3">
      <CheckIcon
        aria-hidden="true"
        strokeWidth={2.25}
        className="mt-0.5 size-4 shrink-0 text-accent"
      />
      <span className={ink ? "text-ink-muted" : "text-ink-soft"}>
        {children}
      </span>
    </li>
  );
}

/**
 * Compact plan card for the home page grid. The recommended program is the
 * visual anchor: it is the one ink card in an otherwise light row.
 *
 * The card is itself the grid item and lays its six blocks onto the parent's
 * row tracks via `grid-rows-subgrid`, so the profit label, heading, summary,
 * cost line and button each sit at the same height in all three cards no
 * matter how differently the copy wraps. The features row is the `1fr` track,
 * so any slack collects there rather than pushing the buttons out of line.
 */
export function PlanSummaryCard({ plan }: { plan: Plan }) {
  const ink = Boolean(plan.recommended);
  const headline = plan.costs[0];

  return (
    <RevealItem
      as="article"
      className={cn(
        "relative flex h-full flex-col rounded-2xl p-6 sm:p-7",
        // Only the properties the hover touches: `transition` (all) would also
        // transition opacity and transform, which Motion is driving during the
        // card's scroll reveal.
        "transition-[border-color,box-shadow,translate] duration-300 ease-out hover:shadow-panel motion-safe:hover:-translate-y-1",
        "lg:row-span-6 lg:grid lg:grid-rows-subgrid lg:gap-0",
        // The ink card carries a transparent border so its content box starts
        // at the same offset as the bordered light cards — without it every
        // row in that card sits 1px higher than its neighbours.
        ink
          ? "border border-transparent bg-ink text-white hover:border-accent"
          : "border border-line bg-white hover:border-accent",
      )}
    >
      {plan.recommended ? <RecommendedTag floating /> : null}

      <ProfitLabel plan={plan} ink={ink} />

      <DisplayHeading
        as="h3"
        size="minor"
        className={cn("mt-5", ink ? "text-white" : "text-ink")}
      >
        {plan.name}
      </DisplayHeading>

      <p
        className={cn("mt-3 text-sm", ink ? "text-ink-muted" : "text-ink-soft")}
      >
        {plan.summary}
      </p>

      <ul className="mt-6 flex flex-col gap-3 text-sm">
        {plan.features.slice(0, 3).map((feature) => (
          <FeatureItem key={feature} ink={ink}>
            {feature}
          </FeatureItem>
        ))}
      </ul>

      <div
        className={cn(
          "mt-6 flex items-baseline justify-between gap-3 border-t pt-5 text-sm",
          ink ? "border-ink-line" : "border-line",
        )}
      >
        <span className={ink ? "text-ink-muted" : "text-ink-soft"}>
          {headline.label}
        </span>
        <span className="font-medium">{headline.value}</span>
      </div>

      <div className="mt-6">
        <CtaButton
          href={`/plans#${plan.slug}`}
          variant={ink ? "accent" : "outline"}
          size="md"
        >
          {plan.shortName} details
        </CtaButton>
      </div>
    </RevealItem>
  );
}

/**
 * Full plan card with every feature and the complete cost breakdown.
 *
 * `index` numbers the card within the three-program comparison. It is omitted
 * for offerings that sit outside that sequence — the mobile ATM service — in
 * which case the "Program N" chip is left off and the profit-level chip leads.
 */
export function PlanDetailCard({
  plan,
  index,
}: {
  plan: Plan;
  index?: number;
}) {
  return (
    <article
      id={plan.slug}
      aria-labelledby={`${plan.slug}-title`}
      className={cn(
        "scroll-mt-28 overflow-hidden rounded-3xl border bg-white",
        // Same hover as the summary and processing cards. Scoped transition:
        // `transition` (all) would also animate opacity and transform, which
        // Motion drives during the card's scroll reveal.
        "transition-[border-color,box-shadow,translate] duration-300 ease-out hover:shadow-panel motion-safe:hover:-translate-y-1",
        plan.recommended ? "border-accent" : "border-line hover:border-accent",
      )}
    >
      <div className="flex flex-col gap-8 p-6 sm:p-9 lg:flex-row lg:gap-12">
        <div className="lg:w-[58%]">
          <div className="flex flex-wrap items-center gap-3">
            {index === undefined ? null : (
              <span className="font-mono text-[0.625rem] font-medium tracking-[0.2em] text-ink-soft uppercase">
                Program {index + 1}
              </span>
            )}
            <span className="inline-flex items-center rounded-full border border-line px-3 py-1.5 font-mono text-[0.625rem] font-medium tracking-[0.18em] text-ink-soft uppercase">
              {plan.profitLevel}
            </span>
            {plan.recommended ? <RecommendedTag /> : null}
          </div>

          <DisplayHeading
            as="h3"
            id={`${plan.slug}-title`}
            size="section"
            className="mt-5 text-ink"
          >
            {plan.name}
          </DisplayHeading>
          <p className="mt-4 text-pretty text-ink-soft">{plan.intro}</p>

          <Eyebrow as="h4" className="mt-8">
            What&rsquo;s included
          </Eyebrow>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {plan.features.map((feature) => (
              <FeatureItem key={feature}>{feature}</FeatureItem>
            ))}
          </ul>
        </div>

        <div className="lg:w-[42%]">
          <div className="rounded-2xl border border-line bg-base-soft p-6 sm:p-7">
            <h4 className="font-mono text-[0.625rem] font-medium tracking-[0.2em] text-ink-soft uppercase">
              Costs
            </h4>
            <dl className="mt-5 flex flex-col divide-y divide-line">
              {plan.costs.map((cost) => (
                <div
                  key={cost.label}
                  className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0"
                >
                  <dt className="text-sm text-ink-soft">{cost.label}</dt>
                  <dd className="text-base font-medium">
                    {cost.value}
                    {cost.note ? (
                      <span className="mt-1 block text-sm font-normal text-ink-soft">
                        {cost.note}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 border-t border-line pt-5 text-sm text-ink-soft">
              <span className="font-medium text-ink">Best for:</span>{" "}
              {plan.bestFor}
            </p>

            <div className="mt-6">
              <CtaButton
                href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                variant={plan.recommended ? "accent" : "dark"}
                size="md"
              >
                Ask about this
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
