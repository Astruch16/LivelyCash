import { PlusIcon } from "lucide-react";

import type { Faq } from "@/lib/faqs";

/**
 * Native `<details>` disclosures — fully keyboard accessible and searchable by
 * the browser's find-in-page, with no client JavaScript. `faq-disclosure`
 * (globals.css) eases the answer open rather than letting it snap.
 */
export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <details key={faq.question} className="faq-disclosure group py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-lg py-5 text-left font-medium text-ink transition-colors marker:content-none hover:text-ink-soft [&::-webkit-details-marker]:hidden">
            <span className="text-balance">{faq.question}</span>
            <PlusIcon
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-accent transition-transform duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-45"
            />
          </summary>
          <p className="pb-6 text-sm text-pretty text-ink-soft sm:text-base">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
