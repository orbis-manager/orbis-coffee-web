import Link from "next/link";
import Logo from "@/components/Logo";
import Container from "@/components/ui/Container";
import SocialIcon, { type SocialName } from "@/components/ui/SocialIcon";
import Text from "@/components/ui/Text";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";

const socialLinks: { name: SocialName; label: string; href: string }[] = [
  { name: "facebook", label: "Facebook", href: "https://facebook.com/orbiscoffee" },
  { name: "instagram", label: "Instagram", href: "https://instagram.com/orbiscoffee" },
  { name: "tiktok", label: "TikTok", href: "https://tiktok.com/@orbiscoffee" },
  { name: "zalo", label: "Zalo OA", href: "https://zalo.me/orbiscoffee" },
];

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
            <div className="flex items-center gap-space-sm pt-space-xs">
              {socialLinks.map(({ name, label, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-outline-variant text-secondary flex items-center justify-center hover:bg-inverse-surface hover:border-inverse-surface hover:text-primary-fixed transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <SocialIcon name={name} className="w-4 h-4" />
                </a>
              ))}
            </div>
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
