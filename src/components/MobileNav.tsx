"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import SocialIcon from "@/components/ui/SocialIcon";
import { socialLinks } from "@/content/social-links";
import { locales, type Locale } from "@/lib/i18n";

type NavItem = {
  key: "home" | "products" | "contact";
  href: string;
  label: string;
};

/**
 * Hamburger trigger + full-screen drawer, mirroring
 * sample/web/mobile-header-menu.html: clip-path wipe reveal, large numbered
 * serif links, a CTA + language pill + socials + contact info footer.
 * The panel stays mounted once opened so the close transition can play —
 * only `visibility` (via the `is-open` class) gates interactivity.
 */
export default function MobileNav({
  locale,
  items,
  ctaLabel,
  ctaHref,
  address,
  phone,
}: {
  locale: Locale;
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  address: string;
  phone: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() ?? `/${locale}`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    // Portals need a real DOM node, which only exists once mounted on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    // Close the drawer whenever the route changes (e.g. a nav link was tapped).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open && wasOpen.current) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 901px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () => Array.from(panel.querySelectorAll<HTMLElement>("a[href], button"));
    const focusTimer = setTimeout(() => focusables()[0]?.focus({ preventScroll: true }), 350);

    function onKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const stops = [triggerRef.current, ...focusables()].filter((el): el is HTMLElement => el !== null);
      const index = stops.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        stops[stops.length - 1]?.focus();
      } else if (!event.shiftKey && index === stops.length - 1) {
        event.preventDefault();
        stops[0]?.focus();
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeydown);
    };
  }, [open]);

  function isActive(key: NavItem["key"]) {
    if (key === "home") return pathname === `/${locale}` || pathname === `/${locale}/`;
    if (key === "products") {
      return pathname === `/${locale}/san-pham` || pathname.startsWith(`/${locale}/san-pham/`);
    }
    return pathname === `/${locale}/lien-he` || pathname.startsWith(`/${locale}/lien-he/`);
  }

  const restOfPath = pathname.replace(/^\/(vi|en)(?=\/|$)/, "");

  return (
    <div className="min-[901px]:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? (locale === "vi" ? "Đóng menu" : "Close menu") : locale === "vi" ? "Mở menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="mnav-burger relative w-11 h-11 rounded-[9999px] bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className={`absolute left-[13px] right-[13px] h-[1.6px] rounded bg-on-surface ${open ? "top-[21px] rotate-45" : "top-4"}`} />
        <span className={`absolute left-[13px] right-[13px] top-[21px] h-[1.6px] rounded bg-on-surface ${open ? "opacity-0" : "opacity-100"}`} />
        <span className={`absolute left-[13px] right-[13px] h-[1.6px] rounded bg-on-surface ${open ? "top-[21px] -rotate-45" : "top-[26px]"}`} />
      </button>

      {mounted && createPortal(
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={locale === "vi" ? "Menu" : "Menu"}
          className={`mnav-panel fixed inset-0 z-40 flex flex-col overflow-y-auto bg-surface px-6 pt-24 pb-[calc(1.75rem+env(safe-area-inset-bottom))] ${open ? "is-open" : ""}`}
        >
          <span className="font-sans text-label-sm uppercase tracking-[0.2em] text-primary">
            {locale === "vi" ? "Khám Phá ANH COFFEE" : "Discover ANH COFFEE"}
          </span>

          <ul className="mnav-links list-none m-0 mt-space-md p-0 flex flex-col">
            {items.map((item, index) => {
              const active = isActive(item.key);
              return (
                <li key={item.key} className="overflow-hidden border-b border-outline-variant/40">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline gap-space-md py-space-md font-display text-[2.1rem] leading-[1.1] tracking-tight transition-colors duration-200 ${active ? "italic text-primary" : "text-on-surface"}`}
                  >
                    <span aria-hidden="true" className="-translate-y-[1.1em] font-sans text-label-sm tracking-[0.1em] text-outline">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                    {active && <span aria-hidden="true" className="ml-auto self-center w-1.5 h-1.5 rounded-full bg-primary-container" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mnav-foot mt-auto flex flex-col gap-space-lg pt-space-xl">
            <Button href={ctaHref} onClick={() => setOpen(false)} variant="primary" size="lg" className="w-full justify-center">
              {ctaLabel}
              <Icon name="arrowForward" className="w-4 h-4" />
            </Button>

            <div className="flex items-center justify-between gap-space-md">
              <div
                className="flex items-center gap-1 rounded-[9999px] bg-surface-container-high p-1"
                role="group"
                aria-label={locale === "vi" ? "Ngôn ngữ" : "Language"}
              >
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}${restOfPath}`}
                    onClick={() => setOpen(false)}
                    aria-current={l === locale}
                    className={`rounded-[9999px] px-space-md py-space-xs font-sans text-label-sm uppercase tracking-[0.12em] transition-colors duration-200 ${l === locale ? "bg-inverse-surface text-inverse-on-surface" : "text-on-surface-variant"}`}
                  >
                    {l}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-space-sm">
                {socialLinks.filter((link) => !link.hidden).map(({ name, label, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex w-10 h-10 items-center justify-center rounded-[9999px] border border-outline-variant text-on-surface-variant"
                  >
                    <SocialIcon name={name} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <p className="font-sans text-body-sm leading-relaxed text-on-surface-variant">
              {address}
              <br />
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="font-semibold text-primary">
                {phone}
              </a>{" "}
              · {locale === "vi" ? "Mở cửa 08:00–20:00" : "Open 08:00–20:00"}
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
