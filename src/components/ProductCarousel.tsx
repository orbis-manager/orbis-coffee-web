"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/content/products";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function ProductCarousel({
  products,
  locale,
  viewDetailLabel,
}: {
  products: Product[];
  locale: Locale;
  viewDetailLabel: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", duration: 20 },
    [Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-gutter-desktop">
          {products.map((product) => (
            <div
              key={product.slug}
              className="flex-[0_0_100%] md:flex-[0_0_33.3333%] min-w-0 pl-gutter-desktop"
            >
              <ProductCard
                product={product}
                locale={locale}
                viewDetailLabel={viewDetailLabel}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-space-sm mt-space-xl">
        {products.map((product, index) => (
          <button
            key={product.slug}
            type="button"
            aria-label={`${index + 1}`}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === selectedIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-outline-variant hover:bg-outline"
            )}
          />
        ))}
      </div>
    </div>
  );
}
