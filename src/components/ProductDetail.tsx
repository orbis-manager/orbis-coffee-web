import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import type { Product } from "@/content/products";
import { formatVnd } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

const copy = {
  vi: {
    home: "Trang chủ", products: "Sản phẩm", rating: "Đánh giá", origin: "Nguồn gốc & tuyển chọn",
    profile: "Hồ sơ hương vị", profileNote: "Gợi ý hương vị theo mô tả sản phẩm",
    tasting: "Đặc điểm", type: "Dòng cà phê", size: "Khối lượng", roast: "Rang mộc thủ công",
    storyEyebrow: "Từ vùng trồng đến tách cà phê", storyTitle: "Một sắc thái riêng của cà phê Việt",
    story: "Mỗi sản phẩm ORBIS được tuyển chọn để giữ lại nét đặc trưng của giống hạt và vùng trồng. Thưởng thức nguyên chất để cảm nhận trọn vẹn hương vị riêng của dòng cà phê này.",
    contact: "Liên hệ đặt hàng", back: "Quay lại sản phẩm", relatedEyebrow: "Khám phá thêm",
    relatedTitle: "Những lựa chọn khác", trustOrigin: "Tuyển chọn nguồn gốc", trustRoast: "Rang mộc", trustFresh: "Đóng gói giữ hương",
    description: "Câu chuyện hương vị",
  },
  en: {
    home: "Home", products: "Products", rating: "Rating", origin: "Origin & selection",
    profile: "Flavor profile", profileNote: "Tasting notes from the product description",
    tasting: "Character", type: "Coffee type", size: "Pack size", roast: "Artisan roasted",
    storyEyebrow: "From origin to cup", storyTitle: "A distinct expression of Vietnamese coffee",
    story: "Each ORBIS coffee is selected to preserve the character of its varietal and growing region. Enjoy it on its own to experience the distinctive flavor of this coffee.",
    contact: "Enquire about this coffee", back: "Back to products", relatedEyebrow: "Explore more",
    relatedTitle: "More from the collection", trustOrigin: "Selected by origin", trustRoast: "Artisan roasted", trustFresh: "Sealed for freshness",
    description: "The flavor story",
  },
};

function getWeight(category: string) {
  return category.match(/\d+\s*g/i)?.[0] ?? "—";
}

export default function ProductDetail({
  product,
  relatedProducts,
  locale,
  viewDetailLabel,
}: {
  product: Product;
  relatedProducts: Product[];
  locale: Locale;
  viewDetailLabel: string;
}) {
  const labels = copy[locale];
  const tastingNotes = product.description[locale]
    .split(/[,;. ]\s*/)
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      <section className="w-full bg-surface-container-low py-space-sm">
        <Container className="flex flex-wrap items-center justify-between gap-space-sm">
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-sans text-label-md text-on-surface-variant uppercase tracking-wider">
            <Link href={`/${locale}`} className="hover:text-primary">{labels.home}</Link>
            <span className="text-outline-variant">/</span>
            <Link href={`/${locale}/san-pham`} className="hover:text-primary">{labels.products}</Link>
            <span className="text-outline-variant">/</span>
            <span aria-current="page" className="text-on-surface font-semibold truncate max-w-[220px] md:max-w-none">{product.name[locale]}</span>
          </nav>
          <Badge variant="secondary">{product.badge[locale]}</Badge>
        </Container>
      </section>

      <section className="w-full py-space-xl md:py-space-2xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-start">
            <div className="lg:col-span-6 flex flex-col gap-space-md">
              <div className="relative w-full aspect-square bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm group">
                <Image src={product.image} alt={product.name[locale]} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-space-md left-space-md"><Badge variant="surface">{product.badge[locale]}</Badge></div>
                <div className="absolute bottom-space-md right-space-md flex items-center gap-space-xs px-space-sm py-space-xs bg-surface/90 rounded text-on-surface-variant">
                  <Icon name="star" className="w-4 h-4 text-primary" />
                  <Text as="span" scale="label-md">{product.rating.toFixed(1)} {labels.rating}</Text>
                </div>
              </div>
              <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-lg shadow-sm flex gap-space-md items-start">
                <Icon name="leaf" className="w-7 h-7 text-primary shrink-0" />
                <div className="flex flex-col gap-space-xs">
                  <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.16em]">{labels.origin}</Text>
                  <Text as="p" scale="body-sm" className="text-on-surface-variant leading-relaxed">{product.description[locale]}</Text>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <Text as="span" scale="label-md" className="text-primary uppercase tracking-[0.15em]">{product.category[locale]}</Text>
                <Text as="h1" scale="headline-lg" className="text-on-surface tracking-tight leading-tight">{product.name[locale]}</Text>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm text-on-surface-variant">
                <span className="flex items-center gap-1 text-primary"><Icon name="star" className="w-4 h-4" /><Text as="span" scale="label-md" className="font-bold">{product.rating.toFixed(1)}</Text></span>
                <span className="text-outline-variant">•</span>
                <Text as="span" scale="label-sm" className="uppercase tracking-wider">{product.badge[locale]}</Text>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-space-sm py-space-sm bg-surface-container-low px-space-md rounded">
                <Text as="span" scale="headline-md" className="text-on-surface font-semibold tracking-tight">{formatVnd(product.price)}</Text>
                <Text as="span" scale="label-md" className="text-on-surface-variant uppercase tracking-widest">{labels.size}: {getWeight(product.category[locale])}</Text>
              </div>
              <div className="flex flex-col gap-space-xs">
                <Text as="h2" scale="title-lg" className="text-on-surface">{labels.description}</Text>
                <Text as="p" scale="body-md" className="text-on-surface-variant leading-relaxed">{product.description[locale]}</Text>
              </div>

              <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex flex-wrap items-center justify-between gap-space-xs">
                  <Text as="h2" scale="title-md" className="text-on-surface uppercase tracking-wider">{labels.profile}</Text>
                  <Text as="span" scale="label-sm" className="text-primary uppercase tracking-widest">{labels.profileNote}</Text>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  {tastingNotes.map((note, index) => (
                    <div key={`${note}-${index}`} className="p-space-sm bg-surface-container-low rounded">
                      <Text as="span" scale="label-sm" className="text-primary uppercase tracking-wider">{labels.tasting} {index + 1}</Text>
                      <Text as="p" scale="title-md" className="text-on-surface font-semibold">{note}</Text>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-space-md bg-secondary-container/40 rounded flex gap-space-sm items-start">
                <Icon name="flame" className="w-6 h-6 text-secondary shrink-0" />
                <div className="flex flex-col gap-space-xs">
                  <Text as="span" scale="label-sm" className="text-on-secondary-container uppercase tracking-wider">{labels.roast}</Text>
                  <Text as="p" scale="body-sm" className="text-on-secondary-container">{product.category[locale]}</Text>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-space-md pt-space-xs">
                <Button href="mailto:atelier@orbiscoffee.vn" variant="primary" size="lg" className="sm:flex-1">{labels.contact}</Button>
                <Button href={`/${locale}/san-pham`} variant="text" size="lg"><Icon name="arrowForward" className="w-4 h-4 rotate-180" />{labels.back}</Button>
              </div>
              <div className="grid grid-cols-3 gap-space-xs pt-space-xs">
                {[labels.trustOrigin, labels.trustRoast, labels.trustFresh].map((label) => (
                  <div key={label} className="flex flex-col items-center gap-1 p-space-sm bg-surface-container rounded text-center text-outline">
                    <Icon name="lock" className="w-4 h-4 text-primary" />
                    <Text as="span" scale="label-sm" className="uppercase tracking-wider">{label}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="w-full py-space-3xl bg-surface-container-low">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-space-2xl">
            <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">{labels.storyEyebrow}</Text>
            <Text as="h2" scale="headline-lg" className="text-on-surface mt-space-xs">{labels.storyTitle}</Text>
            <div className="w-12 h-0.5 bg-primary/40 mx-auto my-space-md" />
            <Text as="p" scale="body-md" className="text-on-surface-variant leading-relaxed">{labels.story}</Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {[[labels.origin, product.badge[locale]], [labels.type, product.category[locale]], [labels.profile, product.description[locale]]].map(([title, value]) => (
              <article key={title} className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm">
                <Text as="span" scale="label-sm" className="text-primary uppercase tracking-widest">{title}</Text>
                <Text as="p" scale="title-md" className="text-on-surface mt-space-xs">{value}</Text>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {relatedProducts.length > 0 && (
        <section className="w-full max-w-[1200px] mx-auto px-gutter-desktop py-space-3xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-xl">
            <div>
              <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">{labels.relatedEyebrow}</Text>
              <Text as="h2" scale="headline-lg" className="text-on-surface mt-space-xs">{labels.relatedTitle}</Text>
            </div>
            <Link href={`/${locale}/san-pham`} className="inline-flex items-center gap-space-xs font-sans text-label-lg tracking-wider uppercase text-primary hover:text-on-surface">{labels.products}<Icon name="east" className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {relatedProducts.map((related) => (
              <article key={related.slug} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
                <Link href={`/${locale}/san-pham/${related.slug}`} className="group block">
                  <div className="relative aspect-[4/3] bg-surface-container">
                    <Image src={related.image} alt={related.name[locale]} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-space-md">
                    <Text as="span" scale="label-sm" className="text-secondary">{related.category[locale]}</Text>
                    <Text as="h3" scale="title-lg" className="text-on-surface my-space-xs">{related.name[locale]}</Text>
                    <div className="flex items-center justify-between gap-space-sm">
                      <Text as="span" scale="title-md" className="text-on-surface">{formatVnd(related.price)}</Text>
                      <span className="font-sans text-label-sm text-primary uppercase tracking-wider">{viewDetailLabel}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
