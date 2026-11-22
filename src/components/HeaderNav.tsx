"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type NavItem = {
  key: "home" | "products" | "contact";
  href: string;
  label: string;
};

export default function HeaderNav({
  locale,
  items,
}: {
  locale: Locale;
  items: NavItem[];
}) {
  const pathname = usePathname() ?? `/${locale}`;

  function isActive(key: NavItem["key"]) {
    if (key === "home") return pathname === `/${locale}` || pathname === `/${locale}/`;
    if (key === "products") {
      return pathname === `/${locale}/san-pham` || pathname.startsWith(`/${locale}/san-pham/`);
    }
    return pathname === `/${locale}/lien-he` || pathname.startsWith(`/${locale}/lien-he/`);
  }

  return (
    <nav aria-label={locale === "vi" ? "Điều hướng chính" : "Main navigation"} className="hidden md:flex items-center gap-space-xl">
      {items.map((item) => {
        const active = isActive(item.key);

        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`group relative py-space-sm font-sans text-label-lg uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary ${active ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"}`}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={`absolute left-0 right-0 -bottom-0.5 h-px origin-center bg-primary transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
