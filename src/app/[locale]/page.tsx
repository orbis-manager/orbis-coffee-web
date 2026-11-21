import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import ProductCarousel from "@/components/ProductCarousel";
import { getDict } from "@/content/dictionary";
import { products } from "@/content/products";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const processIcons: Record<string, IconName> = {
  pan_tool_alt: "handPick",
  wb_sunny: "sun",
  local_fire_department: "flame",
  lock: "lock",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const dict = getDict(locale);

  return (
    <div className="flex flex-col w-full">
      {/* HERO */}
      <section className="relative w-full max-w-[1200px] mx-auto px-gutter-desktop pt-space-xl pb-space-3xl overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded mb-space-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <Text as="span" scale="label-sm" className="text-primary font-semibold">
                {dict.hero.eyebrow}
              </Text>
            </div>
            <Text as="h1" scale="display-lg" className="text-on-surface leading-[1.08] mb-space-md tracking-tight">
              {dict.hero.title}
            </Text>
            <Text as="p" scale="body-lg" className="text-on-surface-variant max-w-xl mb-space-xl">
              {dict.hero.description}
            </Text>
            <div className="flex flex-wrap items-center gap-space-md mb-space-2xl">
              <Button href={`/${locale}/san-pham`} variant="primary" size="lg">
                {dict.hero.ctaPrimary}
              </Button>
              <Button href={`/${locale}#our-story`} variant="text" size="lg">
                <span>{dict.hero.ctaSecondary}</span>
                <Icon name="arrowForward" className="w-4 h-4" />
              </Button>
            </div>
            <div className="w-full pt-space-md bg-surface-container-low/70 rounded-lg p-space-md shadow-sm">
              <div className="grid grid-cols-3 gap-space-sm divide-x divide-outline-variant/40">
                {dict.hero.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col px-space-xs first:pl-0 pl-space-md">
                    <Text as="span" scale="headline-sm" className="text-primary leading-none mb-1">
                      {stat.value}
                    </Text>
                    <Text as="span" scale="label-sm" className="text-on-surface-variant">
                      {stat.label}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center mt-space-lg lg:mt-0">
            <div className="relative w-full max-w-[440px]">
              <div className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-[0_20px_48px_-12px_rgba(89,64,29,0.15)] bg-surface-container">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv_lLrg-j2YPNdxLxMFXFShUEMVoZrkv-bLN-fLhO0w63eyjGir0MFhCkNy9O-holau3WLMpC5i6ZPO0LkZtCaBJhs5uZaE2g4YAPpKv1ePlR5IoyidV601v_KgVw3iGAgAY9bibtQYyyUHj2zhwhizpU503AP4q3__VoMa20nLX0Eto_bGRVikN8_EJ2Ts3p2kGz7c9Tcizi0F4iq2sxfAvuwJ-6hXWRCV9-y0rws"
                  alt="ORBIS COFFEE heritage pack"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-space-md -left-space-xs lg:-left-space-md bg-surface p-space-md rounded-lg shadow-[0_8px_24px_-4px_rgba(89,64,29,0.12)] w-[calc(100%-2rem)] max-w-[300px]">
                <div className="flex items-center justify-between gap-space-sm mb-1">
                  <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.16em]">
                    {dict.hero.badgeLabel}
                  </Text>
                  <Badge variant="secondary">{dict.hero.badgeTag}</Badge>
                </div>
                <Text as="p" scale="title-md" className="font-display text-on-surface leading-snug">
                  {dict.hero.badgeTitle}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="w-full bg-surface-container-low py-space-3xl shadow-[0_4px_24px_-4px_rgba(89,64,29,0.03)]" id="our-story">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            <div className="lg:col-span-5 relative">
              <div className="group relative rounded-xl overflow-hidden shadow-[0_12px_36px_-6px_rgba(89,64,29,0.12)] bg-surface-container aspect-[4/5] w-full">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArXXNP7tZrcho8CheJj1THNk3VLxtBSkj4QNnhuxofWNshCtuOtaIcOQsrt5JzlHtMVAYM1tXXZZA0POtm5X94TcbUFqZpRoNVAjeRQqxgCoDPapZEjWg15ZLmAWZQd7fxQcuR4Wisx8zo8GZwEWFUsNFThpaIny7snFb8zMbr5oNiIGn82v4JKwNf2JSA7gxCmqYfgvAvpnsQ8Z6DHyknUpaWw9hfmJG1GguH_V1T"
                  alt={dict.story.terroirText}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-space-md -right-space-xs lg:-right-space-md bg-surface p-space-md rounded-lg shadow-[0_8px_24px_-4px_rgba(89,64,29,0.12)] max-w-[260px]">
                <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.16em] block mb-1">
                  {dict.story.terroirLabel}
                </Text>
                <Text as="p" scale="body-sm" className="text-on-surface font-medium leading-snug">
                  {dict.story.terroirText}
                </Text>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col items-start lg:pl-space-xl mt-space-xl lg:mt-0">
              <div className="inline-flex items-center gap-space-xs mb-space-xs">
                <Icon name="leaf" className="w-4 h-4 text-primary" />
                <Text as="span" scale="label-sm" className="text-primary font-bold">
                  {dict.story.eyebrow}
                </Text>
              </div>
              <Text as="h2" scale="headline-lg" className="text-on-surface mb-space-lg leading-tight">
                {dict.story.title}
              </Text>
              <div className="space-y-space-md font-sans text-body-md text-on-surface-variant leading-relaxed">
                {dict.story.paragraphs.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md w-full mt-space-xl bg-surface/50 rounded-lg p-space-md shadow-sm">
                {dict.story.features.map((feature) => (
                  <div key={feature.title} className="p-space-sm">
                    <Text as="span" scale="title-lg" className="text-on-surface block mb-1 font-bold">
                      {feature.title}
                    </Text>
                    <Text as="p" scale="body-sm" className="text-on-surface-variant">
                      {feature.description}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="w-full max-w-[1200px] mx-auto px-gutter-desktop py-space-3xl" id="products">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-2xl">
          <Text as="span" scale="label-sm" className="text-primary font-bold mb-space-xs">
            {dict.products.eyebrow}
          </Text>
          <Text as="h2" scale="headline-lg" className="text-on-surface mb-space-xs">
            {dict.products.title}
          </Text>
          <Text as="p" scale="body-md" className="text-on-surface-variant">
            {dict.products.description}
          </Text>
        </div>

        <ProductCarousel
          products={products}
          locale={locale}
          viewDetailLabel={dict.products.viewDetail}
        />

        <div className="flex justify-center mt-space-2xl">
          <Button href={`/${locale}/san-pham`} variant="ghost" size="lg">
            <span>{dict.products.viewAll}</span>
            <Icon name="east" className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="w-full bg-surface-container py-space-3xl">
        <Container>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-2xl">
            <Text as="span" scale="label-sm" className="text-primary font-bold mb-space-xs">
              {dict.process.eyebrow}
            </Text>
            <Text as="h2" scale="headline-lg" className="text-on-surface mb-space-xs">
              {dict.process.title}
            </Text>
            <Text as="p" scale="body-md" className="text-on-surface-variant">
              {dict.process.description}
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
            {dict.process.steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col justify-between h-full bg-surface rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <Text
                      as="span"
                      scale="headline-md"
                      className={i === 2 ? "text-primary font-bold" : "text-primary/40 font-bold"}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </Text>
                    <Icon name={processIcons[step.icon]} className="w-6 h-6 text-primary" />
                  </div>
                  <Text as="h3" scale="title-lg" className="text-on-surface mb-space-xs">
                    {step.title}
                  </Text>
                  <Text as="p" scale="body-sm" className="text-on-surface-variant">
                    {step.description}
                  </Text>
                </div>
                <div className="mt-space-lg pt-space-md border-t border-outline-variant/20 flex items-center gap-space-xs text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <Text as="span" scale="label-sm" className="uppercase tracking-wider">
                    {step.tag}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="w-full py-space-3xl px-gutter-desktop">
        <div className="max-w-[1200px] mx-auto rounded-xl bg-gradient-to-r from-secondary-container/60 via-surface-container to-secondary-container/40 p-space-2xl md:p-space-3xl shadow-[0_8px_32px_-8px_rgba(89,64,29,0.08)] relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <Text as="span" scale="label-sm" className="text-primary font-bold mb-space-xs block">
              {dict.cta.eyebrow}
            </Text>
            <Text as="h2" scale="headline-lg" className="text-on-surface mb-space-md">
              {dict.cta.title}
            </Text>
            <Text as="p" scale="body-lg" className="text-on-surface-variant mb-space-xl">
              {dict.cta.description}
            </Text>
            <div className="flex flex-wrap items-center gap-space-md">
              <Button href={`/${locale}/san-pham`} variant="primary" size="lg">
                {dict.cta.ctaPrimary}
              </Button>
              <Button href={`/${locale}/lien-he`} variant="outline" size="lg">
                {dict.cta.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
