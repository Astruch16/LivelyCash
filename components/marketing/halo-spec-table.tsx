import { Reveal } from "@/components/marketing/reveal";
import { Eyebrow } from "@/components/marketing/section";
import { haloIiSpecs } from "@/lib/halo-ii";

/**
 * The Halo II's manufacturer specifications, as a two-column sheet: label on
 * the left, values on the right, hairline between rows. Long groups
 * ("Additional features") and one-line groups ("Power supply") sit in the same
 * rhythm, which a card grid would not manage without ragged whitespace.
 */
export function HaloSpecTable() {
  return (
    <Reveal>
      <div
        id="halo-ii-specs"
        className="scroll-mt-28 rounded-3xl border border-line bg-base-soft p-6 sm:p-9 lg:p-12"
      >
        <Eyebrow as="h3">Full specifications</Eyebrow>

        <dl className="mt-9 border-t border-line">
          {haloIiSpecs.map((group) => (
            <div
              key={group.label}
              className="grid gap-2 border-b border-line py-5 sm:grid-cols-[13rem_1fr] sm:gap-8"
            >
              <dt className="font-mono text-[0.6875rem] font-medium tracking-[0.16em] text-ink-soft uppercase">
                {group.label}
              </dt>
              <dd>
                <ul className="flex flex-col gap-2.5 text-sm text-ink">
                  {group.entries.map((entry) => (
                    <li key={entry.text}>
                      {entry.text}
                      {entry.detail ? (
                        <ul className="mt-1.5 flex flex-col gap-1 text-ink-soft">
                          {entry.detail.map((line) => (
                            <li key={line} className="flex gap-2.5">
                              <span
                                aria-hidden="true"
                                className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                              />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        {/* TODO(launch): confirm against the current Hyosung datasheet — the
            manufacturer revises these between hardware refreshes. */}
        <p className="mt-7 text-sm text-ink-soft">
          Specifications are the manufacturer&rsquo;s and are subject to change.
          Items marked optional are not fitted as standard — ask us what your
          placement includes.
        </p>
      </div>
    </Reveal>
  );
}
