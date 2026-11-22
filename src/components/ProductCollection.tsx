"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HeroIntro from "@/components/HeroIntro";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import type { Product } from "@/content/products";
import type { Locale } from "@/lib/i18n";

type Category = "all" | "robusta" | "arabica" | "blends";

const copy = {
  vi: {
    eyebrow: "Tuyển chọn • Thổ nhưỡng cà phê Việt Nam",
    title: "Bộ sưu tập cà phê ORBIS",
    titleLine1: "Bộ Sưu Tập",
    titleLine2Before: "",
    titleMark: "Cà Phê Việt",
    titleLine2After: ".",
    intro: "Từ đất đỏ bazan Buôn Ma Thuột đến cao nguyên sương mây Cầu Đất, mỗi dòng cà phê lưu giữ một sắc thái riêng của vùng đất Việt.",
    facts: [
      { value: "2", label: "Vùng trồng" },
      { value: "1.650m", label: "Độ cao tối đa", count: 1650, suffix: "m" },
      { value: "100%", label: "Hái chín thủ công" },
    ],
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
    titleLine1: "The ORBIS",
    titleLine2Before: "",
    titleMark: "Coffee",
    titleLine2After: " Collection.",
    intro: "From Buôn Ma Thuột’s red basalt soil to the misty Cầu Đất highlands, every coffee captures a distinct expression of Vietnam.",
    facts: [
      { value: "2", label: "Growing regions" },
      { value: "1,650m", label: "Peak elevation", count: 1650, suffix: "m" },
      { value: "100%", label: "Hand-picked" },
    ],
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

const categories = ["all", "robusta", "arabica", "blends"] as const;

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

  // Sliding "thumb" behind the active filter pill.
  const thumbRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<Partial<Record<Category, HTMLButtonElement>>>({});

  const moveThumb = useCallback((active: Category) => {
    const btn = buttonRefs.current[active];
    const thumb = thumbRef.current;
    if (!btn || !thumb) return;
    thumb.style.width = `${btn.offsetWidth}px`;
    thumb.style.transform = `translateX(${btn.offsetLeft}px)`;
  }, []);

  useEffect(() => {
    moveThumb(category);
    const handleResize = () => moveThumb(category);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [category, moveThumb]);

  // Cards fade/stagger in whenever the visible set changes (first paint,
  // category filter, or sort), mirroring sample/web/product-list-header.html.
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".plp-card"));
    cards.forEach((card) => card.classList.add("plp-card-pre"));

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            const card = entry.target as HTMLElement;
            card.style.transitionDelay = `${i * 90}ms`;
            card.classList.remove("plp-card-pre");
            io.unobserve(card);
            setTimeout(() => {
              card.style.transitionDelay = "";
            }, 800);
          });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, [visibleProducts]);

  return (
    <div className="flex flex-col w-full">
      <HeroIntro className="plp-intro contents" countLocale={locale === "vi" ? "vi-VN" : "en-US"}>
        <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop pt-space-xl pb-space-2xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-space-md">
          <div
            data-reveal
            style={{ "--hero-d": "0s" } as React.CSSProperties}
            className="inline-flex items-center gap-space-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">{labels.eyebrow}</Text>
          </div>
          <Text as="h1" scale="headline-lg" className="text-on-surface text-balance" aria-label={labels.title}>
            <span className="plp-line" aria-hidden="true">
              <span style={{ "--hero-d": "0.1s" } as React.CSSProperties}>{labels.titleLine1}</span>
            </span>
            <span className="plp-line" aria-hidden="true">
              <span style={{ "--hero-d": "0.22s" } as React.CSSProperties}>
                {labels.titleLine2Before}
                <em className="plp-mark not-italic text-primary italic">{labels.titleMark}</em>
                {labels.titleLine2After}
              </span>
            </span>
          </Text>
          <Text
            as="p"
            scale="body-lg"
            data-reveal
            style={{ "--hero-d": "0.55s" } as React.CSSProperties}
            className="text-on-surface-variant leading-relaxed"
          >
            {labels.intro}
          </Text>
          <div
            data-reveal
            style={{ "--hero-d": "0.7s" } as React.CSSProperties}
            className="flex justify-center flex-wrap gap-0 mt-space-sm"
          >
            {labels.facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`px-space-lg text-center ${index > 0 ? "border-l border-outline-variant/40" : ""}`}
              >
                <Text
                  as="span"
                  scale="headline-sm"
                  className="font-display text-primary leading-none"
                  {...("count" in fact ? { "data-count": fact.count, "data-suffix": fact.suffix } : {})}
                >
                  {fact.value}
                </Text>
                <Text as="span" scale="label-sm" className="block mt-1 text-on-surface-variant uppercase tracking-wider">
                  {fact.label}
                </Text>
              </div>
            ))}
          </div>
        </div>
        </section>

      <section aria-label={labels.title} className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop mb-space-3xl">
        <div
          data-reveal
          style={{ "--hero-d": "0.85s" } as React.CSSProperties}
          className="sticky top-20 z-[5] flex flex-col md:flex-row md:items-center justify-between gap-space-md py-space-md border-y border-outline-variant/30 bg-surface/90 backdrop-blur-md"
        >
          <div className="plp-pills relative flex flex-wrap items-center gap-1 p-1 bg-surface-container-high rounded-full" role="group" aria-label={labels.sort}>
            <span ref={thumbRef} aria-hidden="true" className="plp-thumb" />
            {categories.map((item, index) => (
              <button
                key={item}
                type="button"
                ref={(el) => {
                  if (el) buttonRefs.current[item] = el;
                }}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`relative z-[1] px-space-lg py-space-xs rounded-full font-sans text-label-md tracking-wider uppercase transition-colors duration-300 ${category === item ? "text-inverse-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}
              >
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
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-xl items-stretch pt-space-xl">
            {visibleProducts.map((product) => (
              <div key={product.slug} className="plp-card h-full">
                <ProductCard product={product} locale={locale} viewDetailLabel={viewDetailLabel} />
              </div>
            ))}
          </div>
        ) : <Text as="p" scale="body-md" className="py-space-2xl text-center text-on-surface-variant">{labels.empty}</Text>}
      </section>
      </HeroIntro>

      <section className="w-full bg-surface-container-low py-space-3xl mb-space-3xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
            <div data-anim className="lg:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-container shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={products[0]?.image} alt={products[0]?.name[locale] ?? "ORBIS coffee"} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent" />
              <Text as="span" scale="label-sm" className="absolute bottom-space-lg left-space-lg text-primary-fixed uppercase tracking-widest">{labels.storyEyebrow}</Text>
            </div>
            <div data-anim style={{ "--d": "0.15s" } as React.CSSProperties} className="lg:col-span-6 flex flex-col gap-space-lg">
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
        <div data-anim className="bg-surface-container-lowest p-space-2xl md:p-space-3xl rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-2xl">
          <div className="flex flex-col gap-space-md max-w-2xl">
            <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">{labels.contactTitle}</Text>
            <Text as="h2" scale="headline-md" className="text-on-surface">{labels.contactTitle}</Text>
            <Text as="p" scale="body-md" className="text-on-surface-variant">{labels.contactText}</Text>
          </div>
          <Button href={`/${locale}/lien-he`} variant="primary" size="lg" className="shrink-0">{labels.contact}</Button>
        </div>
      </section>
    </div>
  );
}
