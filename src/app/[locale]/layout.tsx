import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDict } from "@/content/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);

  return {
    title: dict.header.tagline,
    description: dict.hero.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDict(locale);

  return (
    <div lang={locale} className="flex min-h-full flex-col">
      <Header locale={locale} dict={dict} />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
