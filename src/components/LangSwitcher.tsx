"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { locales, type Locale } from "@/lib/i18n";

/** Swaps the locale segment in the current path, keeping the rest of the URL. */
export default function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.replace(/^\/(vi|en)(?=\/|$)/, "");

  return (
    <div className="flex items-center font-sans text-label-sm uppercase tracking-wider text-on-surface-variant font-medium">
      {locales.map((locale, i) => (
        <Fragment key={locale}>
          {i > 0 && <span className="mx-space-xs text-outline-variant font-light">|</span>}
          {locale === current ? (
            <span className="text-on-surface font-bold cursor-default">
              {locale}
            </span>
          ) : (
            <Link
              href={`/${locale}${rest}`}
              className="text-on-surface-variant hover:text-on-surface transition-colors duration-200"
            >
              {locale}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );
}
