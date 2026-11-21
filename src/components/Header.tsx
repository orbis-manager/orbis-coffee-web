import Link from "next/link";
import Logo from "@/components/Logo";
import LangSwitcher from "@/components/LangSwitcher";
import Button from "@/components/ui/Button";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/san-pham`, label: dict.nav.products },
    { href: `/${locale}/lien-he`, label: dict.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(89,64,29,0.04)]">
      <div className="h-20 max-w-[1200px] mx-auto px-gutter-desktop flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-space-sm focus:outline-none">
          <Logo className="h-9 w-9 shrink-0 text-on-surface" />
          <span className="flex flex-col items-start">
            <span className="font-display text-headline-sm tracking-tight text-on-surface uppercase">
              ORBIS COFFEE
            </span>
            <span className="font-sans text-label-sm tracking-[0.2em] text-primary uppercase">
              {dict.header.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-space-xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-space-lg">
          <LangSwitcher current={locale} />
          <Button
            href={`/${locale}/san-pham`}
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex h-[46px]"
          >
            {dict.header.cta}
          </Button>
        </div>
      </div>
    </header>
  );
}
