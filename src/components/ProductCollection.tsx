"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import type { Product } from "@/content/products";
import type { Locale } from "@/lib/i18n";

type Category = "all" | "robusta" | "arabica" | "blends";

const copy = {
  vi: {
    eyebrow: "Tuyển chọn • Thổ nhưỡng cà phê Việt Nam",
    title: "Bộ sưu tập cà phê ORBIS",
    intro: "Từ đất đỏ bazan Buôn Ma Thuột đến cao nguyên sương mây Cầu Đất, mỗi dòng cà phê lưu giữ một sắc thái riêng của vùng đất Việt.",
    filters: ["Tất cả", "Robusta", "Arabica", "Phối trộn"] as const,
    count: "sản phẩm được tuyển chọn",
    sort: "Sắp xếp",
    featured: "Nổi bật",
    low: "Giá thấp đến cao",
    high: "Giá cao đến thấp",
    storyEyebrow: "Triết lý ORBIS",
    storyTitle: "Tôn vinh bản sắc thổ nhưỡng Việt Nam",
    story: "Chúng tôi tuyển chọn những hạt cà phê đặc trưng từ các vùng trồng giàu bản sắc, sau đó rang mộc theo từng mẻ nhỏ để làm nổi bật hương vị tự nhiên trong mỗi tách cà phê.",
    featureOne: "Tuyển chọn theo vùng trồng",
    featureOneText: "Mỗi dòng cà phê mang dấu ấn riêng của vùng đất và giống hạt.",
    featureTwo: "Rang mộc mẻ nhỏ",
    featureTwoText: "Tôn trọng đặc tính tự nhiên của hạt trong từng mẻ rang.",
    contactTitle: "Bạn cần tư vấn chọn cà phê?",
    contactText: "ORBIS sẵn sàng hỗ trợ lựa chọn hạt, mức rang và cách pha phù hợp với gu thưởng thức của bạn.",
    contact: "Liên hệ ORBIS",
    empty: "Chưa có sản phẩm trong danh mục này.",
  },
  en: {
    eyebrow: "Curated selection • Vietnamese coffee terroir",
    title: "The ORBIS coffee collection",
    intro: "From Buôn Ma Thuột’s red basalt soil to the misty Cầu Đất highlands, every coffee captures a distinct expression of Vietnam.",
    filters: ["All coffee", "Robusta", "Arabica", "Blends"] as const,
    count: "curated coffees",
    sort: "Sort",
    featured: "Featured",
    low: "Price: low to high",
    high: "Price: high to low",
    storyEyebrow: "The ORBIS approach",
    storyTitle: "Celebrating the character of Vietnamese terroir",
    story: "We select distinctive coffees from expressive growing regions, then roast in small batches to bring out the beans’ natural character in every cup.",
    featureOne: "Selected by origin",
    featureOneText: "Each coffee reflects the character of its growing region and varietal.",
    featureTwo: "Small-batch roasting",
    featureTwoText: "Every roast respects the beans’ natural qualities.",
    contactTitle: "Need help choosing your coffee?",
    contactText: "ORBIS can help you find the beans, roast, and brew method that suit your taste.",
    contact: "Contact ORBIS",
    empty: "There are no products in this category yet.",
  },
};

function categoryFor(product: Product): Exclude<Category, "all"> {
  const category = product.category.en.toLowerCase();
  if (category.includes("blend")) return "blends";
  return category.includes("arabica") ? "arabica" : "robusta";
}

export default function ProductCollection({
  products,
  locale,
  viewDetailLabel,
}: {
  products: Product[];
  locale: Locale;
  viewDetailLabel: string;
}) {
  const labels = copy[locale];
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState("featured");

  const visibleProducts = useMemo(() => {
    const filtered = category === "all" ? [...products] : products.filter((product) => categoryFor(product) === category);
    if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, products, sort]);

  return (
    <div className="flex flex-col w-full">
      <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop pt-space-xl pb-space-2xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-space-md">
          <div className="inline-flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">{labels.eyebrow}</Text>
          </div>
          <Text as="h1" scale="headline-lg" className="text-on-surface text-balance">{labels.title}</Text>
          <Text as="p" scale="body-lg" className="text-on-surface-variant leading-relaxed">{labels.intro}</Text>
        </div>
      </section>

      <section aria-label={labels.title} className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop mb-space-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-md border-b border-outline-variant/30">
          <div className="flex flex-wrap items-center gap-space-xs" role="group" aria-label={labels.sort}>
            {(["all", "robusta", "arabica", "blends"] as const).map((item, index) => (
              <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item}
                className={`px-space-lg py-space-xs rounded-full font-sans text-label-md tracking-wider uppercase transition-all duration-200 ${category === item ? "bg-inverse-surface text-inverse-on-surface shadow-sm" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"}`}>
                {labels.filters[index]}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between md:justify-end gap-space-md">
            <Text as="span" scale="label-md" className="text-outline uppercase tracking-wider whitespace-nowrap"><strong className="text-on-surface">{visibleProducts.length}</strong> {labels.count}</Text>
            <label className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded shadow-sm">
              <span className="font-sans text-label-sm uppercase tracking-wider text-outline">{labels.sort}:</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent font-sans text-label-md text-on-surface focus:outline-none cursor-pointer" aria-label={labels.sort}>
                <option value="featured">{labels.featured}</option>
                <option value="price-asc">{labels.low}</option>
                <option value="price-desc">{labels.high}</option>
              </select>
            </label>
          </div>
        </div>
        {visibleProducts.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-xl items-stretch pt-space-xl">
            {visibleProducts.map((product) => <ProductCard key={product.slug} product={product} locale={locale} viewDetailLabel={viewDetailLabel} />)}
          </div>
        ) : <Text as="p" scale="body-md" className="py-space-2xl text-center text-on-surface-variant">{labels.empty}</Text>}
      </section>

      <section className="w-full bg-surface-container-low py-space-3xl mb-space-3xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-container shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={products[0]?.image} alt={products[0]?.name[locale] ?? "ORBIS coffee"} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent" />
              <Text as="span" scale="label-sm" className="absolute bottom-space-lg left-space-lg text-primary-fixed uppercase tracking-widest">{labels.storyEyebrow}</Text>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-space-lg">
              <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">{labels.storyEyebrow}</Text>
              <Text as="h2" scale="headline-lg" className="text-on-surface leading-tight">{labels.storyTitle}</Text>
              <Text as="p" scale="body-md" className="text-on-surface-variant leading-relaxed">{labels.story}</Text>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {[ [labels.featureOne, labels.featureOneText], [labels.featureTwo, labels.featureTwoText] ].map(([title, description]) => (
                  <div key={title} className="p-space-md bg-surface-container-lowest rounded-lg shadow-sm flex flex-col gap-space-xs">
                    <Icon name="leaf" className="w-5 h-5 text-primary" />
                    <Text as="h3" scale="title-md" className="text-on-surface">{title}</Text>
                    <Text as="p" scale="body-sm" className="text-on-surface-variant">{description}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop mb-space-3xl">
        <div className="bg-surface-container-lowest p-space-2xl md:p-space-3xl rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-2xl">
          <div className="flex flex-col gap-space-md max-w-2xl">
            <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">{labels.contactTitle}</Text>
            <Text as="h2" scale="headline-md" className="text-on-surface">{labels.contactTitle}</Text>
            <Text as="p" scale="body-md" className="text-on-surface-variant">{labels.contactText}</Text>
          </div>
          <Button href="mailto:atelier@orbiscoffee.vn" variant="primary" size="lg" className="shrink-0">{labels.contact}</Button>
        </div>
      </section>
    </div>
  );
}
