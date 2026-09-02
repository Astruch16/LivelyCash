import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { LogoMark, Wordmark } from "@/components/marketing/logo";
import {
  FooterLegalNav,
  FooterNavColumn,
} from "@/components/marketing/footer-nav";
import { Container, Eyebrow } from "@/components/marketing/section";
import { footerNav, legalNav, siteConfig } from "@/lib/site";

/** Quiet and light — the design has no dark footer. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <Wordmark />
            </div>
            <p className="max-w-xs text-sm text-ink-soft">
              ATM placement, sales and service across the Fraser Valley. Locally
              owned, locally serviced, and running current-generation{" "}
              {siteConfig.hardware} hardware.
            </p>
          </div>

          {footerNav.map((group) => (
            <FooterNavColumn
              key={group.title}
              title={group.title}
              links={group.links}
            />
          ))}

          <div>
            <Eyebrow as="h2">Get in touch</Eyebrow>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2.5 text-ink-soft transition-colors hover:text-ink"
                >
                  <PhoneIcon aria-hidden="true" className="size-4 shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="flex items-center gap-2.5 break-all text-ink-soft transition-colors hover:text-ink"
                >
                  <MailIcon aria-hidden="true" className="size-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ink-soft">
                <MapPinIcon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0"
                />
                <span>
                  Serving {siteConfig.region}
                  <br />
                  {siteConfig.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-6 font-mono text-[0.625rem] tracking-[0.14em] text-ink-soft uppercase">
          <FooterLegalNav links={legalNav} />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {siteConfig.legalName}. All rights reserved.
            </p>
            <p>
              Chilliwack &middot; Abbotsford &middot; Agassiz &middot; Hope
              &middot; Harrison
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
