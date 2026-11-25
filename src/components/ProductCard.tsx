import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import Link from "next/link";
import type { Product } from "@/content/products";
import { formatVnd } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

const featuredLabel: Record<Locale, string> = {
  vi: "Bán chạy",
  en: "Best seller",
};

export default function ProductCard({
  product,
  locale,
  viewDetailLabel,
}: {
  product: Product;
  locale: Locale;
  viewDetailLabel: string;
}) {
  return (
    <Link
      href={`/${locale}/san-pham/${product.slug}`}
      aria-label={`${viewDetailLabel}: ${product.name[locale]}`}
      className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
    <Card hoverLift className="group flex flex-col h-full">
      <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden group/image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name[locale]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
        />
        <span className="absolute top-space-sm left-space-sm px-space-sm py-1 rounded bg-surface/90 backdrop-blur-sm font-sans text-label-sm uppercase tracking-[0.14em] text-primary">
          {product.origin[locale]}
        </span>
        {product.featured && (
          <span className="absolute top-space-sm right-space-sm px-space-sm py-1 rounded bg-inverse-surface font-sans text-label-sm uppercase tracking-[0.14em] text-primary-fixed">
            {featuredLabel[locale]}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-space-lg justify-between">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-space-xs">
            <Text as="span" scale="label-md" className="text-primary uppercase tracking-[0.1em]">
              {product.category[locale]}
            </Text>
            <span className="flex items-center text-primary text-xs">
              <Icon name="star" fill="currentColor" stroke="none" className="w-3.5 h-3.5" />
              <span className="font-semibold ml-0.5">{product.rating.toFixed(1)}</span>
            </span>
          </div>
          <Text as="h3" scale="headline-sm" className="mb-space-xs leading-snug min-h-[3.25rem]">
            {product.name[locale]}
          </Text>
          <div className="flex flex-wrap items-center gap-x-space-sm gap-y-1 font-sans text-body-sm text-on-surface-variant">
            {product.highlights[locale].map((item, index) => (
              <span key={item} className="flex items-center gap-space-sm">
                {index > 0 && <span className="w-[3px] h-[3px] rounded-full bg-primary-container" />}
                {item}
              </span>
            ))}
          </div>
          <ul aria-label={product.name[locale]} className="flex flex-wrap gap-1.5 mt-space-sm">
            {product.notes[locale].map((note) => (
              <li
                key={note}
                className="px-space-sm py-1 rounded-[9999px] bg-secondary-container/40 font-sans text-label-sm text-on-secondary-container"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-space-md flex items-center justify-between border-t border-outline-variant/20 mt-space-md">
          <Text as="span" scale="title-lg" className="font-bold">
            {formatVnd(product.price)}
          </Text>
          <span className="inline-flex items-center gap-space-xs font-sans text-label-md font-semibold uppercase tracking-[0.1em] text-primary">
            {viewDetailLabel}
            <Icon name="arrowForward" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Card>
    </Link>
  );
}
