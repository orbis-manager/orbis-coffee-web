import Link from "next/link";
import Logo from "@/components/Logo";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const exploreHrefs = [
    `/${locale}`,
    `/${locale}/san-pham`,
    `/${locale}/nghi-thuc-pha-che`,
  ];

  return (
    <footer className="w-full bg-surface-container-low shadow-[0_-1px_8px_rgba(89,64,29,0.03)]">
      <Container className="py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-start">
          <div className="md:col-span-5 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <Logo className="h-8 w-8 shrink-0" />
              <span className="flex flex-col items-start">
                <span className="font-display text-headline-sm uppercase tracking-tight text-on-surface">
                  ORBIS COFFEE
                </span>
                <span className="font-sans text-label-sm tracking-[0.2em] text-primary uppercase">
                  {dict.header.tagline}
                </span>
              </span>
            </div>
            <Text as="p" scale="body-sm" className="text-on-surface-variant max-w-sm mt-space-xs">
              {dict.footer.description}
            </Text>
          </div>

          <div className="md:col-span-3 flex flex-col gap-space-md">
            <Text as="span" scale="label-sm" className="text-primary font-bold">
              {dict.footer.exploreTitle}
            </Text>
            <nav className="flex flex-col gap-space-sm">
              {dict.footer.exploreLinks.map((label, i) => (
                <Link
                  key={label}
                  href={exploreHrefs[i]}
                  className="font-sans text-body-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4 flex flex-col gap-space-md">
            <Text as="span" scale="label-sm" className="text-primary font-bold">
              {dict.footer.contactTitle}
            </Text>
            <div className="flex flex-col gap-space-xs font-sans text-body-sm text-on-surface-variant">
              <Text as="p" scale="title-md" className="text-on-surface">
                {dict.footer.contactName}
              </Text>
              <p>{dict.footer.address}</p>
              <p className="mt-space-xs">{dict.footer.email}</p>
              <p>{dict.footer.phone}</p>
            </div>
          </div>
        </div>

        <div className="mt-space-xl pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm font-sans text-label-sm text-on-surface-variant">
          <p>{dict.footer.copyright}</p>
          <p className="tracking-widest uppercase text-outline">{dict.footer.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
