import type { Metadata } from "next";
import ProductCollection from "@/components/ProductCollection";
import { getDict } from "@/content/dictionary";
import { products } from "@/content/products";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "vi" ? "Bộ sưu tập cà phê | ORBIS COFFEE" : "Coffee Collection | ORBIS COFFEE",
    description: locale === "vi"
      ? "Khám phá các dòng cà phê Robusta, Arabica và phối trộn được tuyển chọn từ những vùng trồng đặc trưng của Việt Nam."
      : "Explore curated Robusta, Arabica, and blended coffees from Vietnam’s distinctive growing regions.",
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const dict = getDict(localeParam);

  return <ProductCollection products={products} locale={localeParam} viewDetailLabel={dict.products.viewDetail} />;
}
