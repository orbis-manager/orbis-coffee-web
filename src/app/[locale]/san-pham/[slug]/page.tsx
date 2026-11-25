import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getDict } from "@/content/dictionary";
import { products } from "@/content/products";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((product) => ({ locale, slug: product.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name[locale]} | ANH COFFEE`,
    description: product.description[locale],
    openGraph: { title: product.name[locale], description: product.description[locale], images: [product.image] },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const relatedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3);
  const dict = getDict(localeParam);

  return <ProductDetail product={product} relatedProducts={relatedProducts} locale={localeParam} viewDetailLabel={dict.products.viewDetail} />;
}
