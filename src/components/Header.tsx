import Link from "next/link";
import Logo from "@/components/Logo";
import LangSwitcher from "@/components/LangSwitcher";
import HeaderNav from "@/components/HeaderNav";
import MobileNav from "@/components/MobileNav";
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
    { key: "home" as const, href: `/${locale}`, label: dict.nav.home },
    { key: "products" as const, href: `/${locale}/san-pham`, label: dict.nav.products },
    { key: "contact" as const, href: `/${locale}/lien-he`, label: dict.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(89,64,29,0.04)]">
      <div className="h-20 max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-space-sm focus:outline-none">
          <Logo className="h-9 w-9 shrink-0" />
          <span className="flex flex-col items-start">
            <span className="font-display text-headline-sm tracking-tight text-on-surface uppercase">
              ANH COFFEE
            </span>
            <span className="max-[380px]:hidden font-sans text-label-sm tracking-[0.2em] text-primary uppercase">
              {dict.header.tagline}
            </span>
          </span>
        </Link>

        <HeaderNav locale={locale} items={navItems} />

        <div className="flex items-center gap-space-sm sm:gap-space-lg">
          <div className="max-[380px]:hidden">
            <LangSwitcher current={locale} />
          </div>
          <Button
            href={`/${locale}/san-pham`}
            variant="secondary"
            size="sm"
            className="hidden min-[901px]:inline-flex h-[46px]"
          >
            {dict.header.cta}
          </Button>
          <MobileNav
            locale={locale}
            items={navItems}
            ctaLabel={dict.header.cta}
            ctaHref={`/${locale}/san-pham`}
            address={dict.footer.address}
            phone={dict.footer.phone}
          />
        </div>
      </div>
    </header>
  );
}
