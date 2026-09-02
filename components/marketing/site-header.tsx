"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, MenuIcon, PhoneIcon } from "lucide-react";

import { CtaButton } from "@/components/marketing/cta-button";
import { Logo } from "@/components/marketing/logo";
import { Eyebrow } from "@/components/marketing/section";
import { Underline, useUnderline } from "@/components/marketing/underline-nav";
import { useMediaQuery } from "@/components/marketing/use-media-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cityNav, mainNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

const linkBase =
  "rounded-full px-3 py-2 font-mono text-[0.6875rem] font-medium tracking-[0.18em] uppercase transition-colors hover:text-ink";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // 12px inset so the bar underlines the label, not the link's padding.
  const { navRef, rect, visible, instant, linkProps, onLeave } = useUnderline({
    inset: 12,
    gap: 2,
  });

  const citiesActive = pathname.startsWith("/cities");

  /*
   * The Cities menu opens on hover as well as on click.
   *
   * Only where hover actually exists: on touch, `mouseenter` fires on tap and
   * would open the menu a moment before the click toggled it shut again.
   *
   * Closing is delayed because the panel sits 4px below the trigger — closing
   * the instant the pointer leaves the trigger would snatch the menu away
   * while the pointer is still crossing that gap. Entering the panel cancels
   * the pending close.
   */
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [citiesOpen, setCitiesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const openOnHover = useCallback(() => {
    if (!canHover) return;
    cancelClose();
    setCitiesOpen(true);
  }, [canHover, cancelClose]);

  const closeAfterGrace = useCallback(() => {
    if (!canHover) return;
    cancelClose();
    closeTimer.current = setTimeout(() => setCitiesOpen(false), 180);
  }, [canHover, cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white/85 backdrop-blur-md supports-backdrop-filter:bg-white/75">
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center gap-3 px-5 sm:px-6 lg:h-20 lg:px-8">
        <Logo className="mr-auto" />

        <nav
          ref={navRef}
          aria-label="Main"
          onMouseLeave={onLeave}
          onBlur={onLeave}
          className="relative hidden items-center lg:flex"
        >
          {mainNav.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...linkProps}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                linkBase,
                isActive(pathname, item.href) ? "text-ink" : "text-ink-soft",
              )}
            >
              {item.label}
            </Link>
          ))}

          {/*
           * `modal={false}` matters for a hover menu. Radix's modal mode
           * scroll-locks the body and toggles `pointer-events` on it, so the
           * trigger kept losing and regaining pointer events under a
           * stationary cursor — firing mouseleave/mouseenter in a loop and
           * flickering. It also froze page scrolling just from hovering the
           * nav, and on a desktop with classic scrollbars the gutter
           * compensation shifts the whole page sideways.
           */}
          <DropdownMenu
            modal={false}
            open={citiesOpen}
            onOpenChange={setCitiesOpen}
          >
            <DropdownMenuTrigger
              onFocus={linkProps.onFocus}
              onMouseEnter={(event) => {
                linkProps.onMouseEnter(event);
                openOnHover();
              }}
              onMouseLeave={closeAfterGrace}
              className={cn(
                linkBase,
                "group inline-flex items-center gap-1.5 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                citiesActive ? "text-ink" : "text-ink-soft",
              )}
            >
              Cities
              <ChevronDownIcon
                aria-hidden="true"
                className="size-3.5 transition-transform duration-200 group-data-open:rotate-180"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onMouseEnter={cancelClose}
              onMouseLeave={closeAfterGrace}
              align="start"
              className="w-72 rounded-2xl border-line p-1.5"
            >
              {/*
               * shadcn's menu item hard-codes `cursor-default` (the native-menu
               * convention). These entries are navigation links, so they get
               * the hand — passed as a class so `cn()` twMerges the default
               * away rather than leaving two competing cursor utilities to
               * fight it out in the cascade.
               */}
              {cityNav.map((city) => (
                <DropdownMenuItem
                  key={city.href}
                  asChild
                  className="cursor-pointer"
                >
                  <Link
                    href={city.href}
                    className="flex-col items-start gap-0.5 rounded-xl px-2.5 py-2"
                  >
                    <span className="text-sm font-medium">{city.label}</span>
                    <span className="text-xs text-ink-soft group-focus/dropdown-menu-item:text-ink/75">
                      {city.description}
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {mainNav.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...linkProps}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                linkBase,
                isActive(pathname, item.href) ? "text-ink" : "text-ink-soft",
              )}
            >
              {item.label}
            </Link>
          ))}

          <Underline rect={rect} visible={visible} instant={instant} />
        </nav>

        <CtaButton
          href="/contact"
          variant="accent"
          size="md"
          className="ml-3 hidden lg:inline-flex"
        >
          Contact Us
        </CtaButton>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open navigation menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-base-soft lg:hidden"
            >
              <MenuIcon aria-hidden="true" className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            /* The vendored default is a 3/4-width panel; the design calls for
               a full-screen sheet on phones. */
            className="gap-0 border-line bg-white data-[side=right]:w-full"
          >
            <SheetHeader className="border-b border-line px-5 py-5">
              <SheetTitle className="text-left font-mono text-[0.6875rem] font-medium tracking-[0.2em] text-ink-soft uppercase">
                Menu
              </SheetTitle>
            </SheetHeader>

            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto px-4 py-6"
            >
              <ul className="flex flex-col gap-1">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        aria-current={
                          isActive(pathname, item.href) ? "page" : undefined
                        }
                        className={cn(
                          "block rounded-xl px-3 py-3 font-display text-sm transition-colors hover:bg-base-soft",
                          isActive(pathname, item.href)
                            ? "bg-base-soft text-ink"
                            : "text-ink-soft",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>

              <Eyebrow id="mobile-cities-heading" className="mt-7 mb-3 px-3">
                Cities
              </Eyebrow>
              <ul
                aria-labelledby="mobile-cities-heading"
                className="flex flex-col gap-1"
              >
                {cityNav.map((city) => (
                  <li key={city.href}>
                    <SheetClose asChild>
                      <Link
                        href={city.href}
                        aria-current={
                          pathname === city.href ? "page" : undefined
                        }
                        className={cn(
                          "block rounded-xl px-3 py-3 text-sm transition-colors hover:bg-base-soft",
                          pathname === city.href
                            ? "bg-base-soft text-ink"
                            : "text-ink-soft",
                        )}
                      >
                        {city.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-line p-5">
              <CtaButton
                href="/contact"
                variant="accent"
                className="w-full justify-between"
                onClick={() => setOpen(false)}
              >
                Contact Us
              </CtaButton>
              <a
                href={siteConfig.phoneHref}
                className="mt-4 flex items-center justify-center gap-2 rounded-full py-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <PhoneIcon aria-hidden="true" className="size-4" />
                {siteConfig.phone}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
