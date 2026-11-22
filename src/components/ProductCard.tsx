import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import Link from "next/link";
import type { Product } from "@/content/products";
import { formatVnd } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

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
    <Card hoverLift className="flex flex-col h-full">
      <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name[locale]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-space-sm left-space-sm">
          <Badge variant="surface">{product.badge[locale]}</Badge>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-space-lg justify-between">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-space-xs">
            <Text as="span" scale="label-md" className="text-secondary">
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
          <Text
            as="p"
            scale="body-sm"
            className="text-on-surface-variant min-h-[2.75rem] line-clamp-2"
          >
            {product.description[locale]}
          </Text>
        </div>
        <div className="pt-space-md flex items-center justify-between border-t border-outline-variant/20 mt-space-md">
          <Text as="span" scale="title-lg" className="font-bold">
            {formatVnd(product.price)}
          </Text>
          <span className="inline-flex items-center justify-center gap-space-xs rounded font-sans font-semibold uppercase tracking-[0.08em] transition-all duration-200 bg-primary text-on-primary hover:bg-secondary shadow-[0_4px_20px_-2px_rgba(89,64,29,0.18)] h-10 px-space-md text-label-md">
            {viewDetailLabel}
          </span>
        </div>
      </div>
    </Card>
    </Link>
  );
}
