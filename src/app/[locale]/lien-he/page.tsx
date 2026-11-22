import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import ContactForm from "@/components/ContactForm";
import { getDict } from "@/content/dictionary";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const copy = {
  vi: {
    title: "Hãy cùng bắt đầu một cuộc trò chuyện.",
    intro: "Bạn muốn tìm hiểu về cà phê theo vùng trồng, đặt hàng riêng hay trao đổi cơ hội hợp tác? ORBIS luôn sẵn lòng lắng nghe.",
    atelier: "ORBIS Atelier", contactTitle: "Thông tin liên hệ", origin: "Đà Lạt & Buôn Ma Thuột",
    brandLabel: "Thương hiệu", brand: "ORBIS COFFEE — Vietnamese Terroir",
    emailLabel: "Email", phoneLabel: "Điện thoại", addressLabel: "Atelier & Flagship",
    hoursLabel: "Giờ đón khách", hours: "Thứ Hai – Chủ Nhật: 08:00 – 20:00",
    cuppingTitle: "Thử nếm & tư vấn riêng", cupping: "Các buổi thử nếm theo mùa, tư vấn rang xay và quà tặng doanh nghiệp được sắp xếp theo lịch hẹn.",
    mapEyebrow: "Ghé thăm Atelier", mapTitle: "Tìm ORBIS tại Sài Gòn",
    mapDescription: "Atelier tọa lạc trên đường Đồng Khởi, trung tâm Quận 1, Thành phố Hồ Chí Minh.",
    directions: "Chỉ đường", openMap: "Mở bản đồ",
    wholesaleEyebrow: "Đối tác & bán sỉ", wholesaleTitle: "Đưa cà phê ORBIS đến không gian của bạn",
    wholesaleDescription: "Trao đổi cùng chúng tôi về lựa chọn cà phê, tư vấn pha chế hoặc hợp tác dành cho nhà hàng, khách sạn và doanh nghiệp.",
    wholesaleCta: "Trao đổi hợp tác",
  },
  en: {
    title: "Let’s start a conversation.",
    intro: "Curious about our coffee origins, looking to arrange an order, or exploring a partnership? The ORBIS team would be glad to hear from you.",
    atelier: "ORBIS Atelier", contactTitle: "Contact information", origin: "Đà Lạt & Buôn Ma Thuột",
    brandLabel: "Brand", brand: "ORBIS COFFEE — Vietnamese Terroir",
    emailLabel: "Email", phoneLabel: "Telephone", addressLabel: "Atelier & Flagship",
    hoursLabel: "Reception hours", hours: "Monday – Sunday: 08:00 – 20:00 ICT",
    cuppingTitle: "Private cupping & concierge", cupping: "Seasonal tastings, roast consultations, and corporate gifting can be arranged by appointment.",
    mapEyebrow: "Visit the atelier", mapTitle: "Find ORBIS in Saigon",
    mapDescription: "Our atelier is located on Đồng Khởi Street in the heart of District 1, Ho Chi Minh City.",
    directions: "Get directions", openMap: "Open map",
    wholesaleEyebrow: "Hospitality & wholesale", wholesaleTitle: "Bring ORBIS coffee to your space",
    wholesaleDescription: "Talk with us about coffee selection, brewing consultation, or partnerships for restaurants, hotels, and businesses.",
    wholesaleCta: "Discuss a partnership",
  },
} satisfies Record<Locale, Record<string, string>>;

const contactDetails: { icon: IconName; key: "brand" | "email" | "phone" | "address" | "hours" }[] = [
  { icon: "storefront", key: "brand" },
  { icon: "mail", key: "email" },
  { icon: "phone", key: "phone" },
  { icon: "mapPin", key: "address" },
  { icon: "clock", key: "hours" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === "vi" ? "Liên hệ | ORBIS COFFEE" : "Contact | ORBIS COFFEE",
    description: locale === "vi"
      ? "Liên hệ ORBIS COFFEE để được tư vấn sản phẩm, đặt hàng hoặc trao đổi cơ hội hợp tác."
      : "Contact ORBIS COFFEE about product guidance, orders, or partnership opportunities.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam;
  const labels = copy[locale];
  const dict = getDict(locale);
  const mapQuery = "68 Dong Khoi, Ben Nghe, District 1, Ho Chi Minh City, Vietnam";
  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`;

  const detailValues: Record<(typeof contactDetails)[number]["key"], string> = {
    brand: labels.brand,
    email: dict.footer.email,
    phone: dict.footer.phone,
    address: dict.footer.address,
    hours: labels.hours,
  };
  const detailTitles: Record<(typeof contactDetails)[number]["key"], string> = {
    brand: labels.brandLabel,
    email: labels.emailLabel,
    phone: labels.phoneLabel,
    address: labels.addressLabel,
    hours: labels.hoursLabel,
  };

  return (
    <div className="flex flex-col w-full">
      <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop pt-space-2xl pb-space-xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-space-md">
          <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded bg-secondary-container/40">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">{labels.atelier}</Text>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <Text as="h1" scale="display-lg" className="text-on-surface tracking-tight text-balance">{labels.title}</Text>
          <Text as="p" scale="body-lg" className="text-on-surface-variant max-w-2xl leading-relaxed">{labels.intro}</Text>
        </div>
      </section>

      <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop pb-space-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          <ContactForm locale={locale} />

          <aside className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg">
              <div>
                <Text as="span" scale="label-sm" className="text-secondary uppercase tracking-[0.16em]">{labels.atelier}</Text>
                <Text as="h2" scale="headline-sm" className="text-on-surface mt-space-xs">{labels.contactTitle}</Text>
              </div>

              <div className="relative w-full h-44 rounded-lg overflow-hidden group">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsMIYhqseBIneXD_9lWk4vrPT6F3ZP4Rn8klOwIX117oU9jc_7lZ4et1SyHJ385YeBfOu9H4dlWANAnONI4VoyWg8oETHXIYk3Hup5NNFLaWagBjLnsGW-iJU7cIa4QrrJwqrvb1PWACdSYERcUyKFahJIm5pG2N7SCcmW-Apj36bowQnocczrnbfiks-g-PI6BZgJbJq5pEO6jnGlmemIKgvRcV7bvsIfDtMUBa7M"
                  alt={labels.origin}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent" />
                <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between gap-space-sm text-inverse-on-surface">
                  <Text as="span" scale="label-sm" className="uppercase tracking-[0.14em]">{labels.origin}</Text>
                  <Icon name="coffee" className="w-5 h-5 shrink-0" />
                </div>
              </div>

              <dl className="flex flex-col gap-space-md">
                {contactDetails.map(({ icon, key }) => {
                  const value = detailValues[key];
                  return (
                    <div key={key} className="flex items-start gap-space-md">
                      <div className="w-9 h-9 rounded-full bg-secondary-container/50 flex items-center justify-center shrink-0 text-primary">
                        <Icon name={icon} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <dt className="font-sans text-label-sm uppercase tracking-[0.1em] text-secondary">{detailTitles[key]}</dt>
                        <dd className="mt-0.5 font-sans text-body-sm text-on-surface-variant leading-relaxed">
                          {key === "email" ? <a href={`mailto:${value}`} className="font-semibold text-primary hover:text-secondary transition-colors">{value}</a>
                            : key === "phone" ? <a href="tel:+842838226868" className="font-semibold text-on-surface hover:text-primary transition-colors">{value}</a>
                              : value}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>

              <div className="p-space-md rounded-lg bg-surface-variant/70">
                <div className="flex items-center gap-space-xs text-primary">
                  <Icon name="coffee" className="w-[18px] h-[18px]" />
                  <Text as="span" scale="label-sm" className="uppercase tracking-wider">{labels.cuppingTitle}</Text>
                </div>
                <Text as="p" scale="body-sm" className="text-on-surface-variant leading-relaxed mt-space-xs">{labels.cupping}</Text>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop pb-space-3xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col gap-space-xs">
            <div className="inline-flex items-center gap-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">{labels.mapEyebrow}</Text>
            </div>
            <Text as="h2" scale="headline-md" className="text-on-surface">{labels.mapTitle}</Text>
            <Text as="p" scale="body-md" className="text-on-surface-variant max-w-xl">{labels.mapDescription}</Text>
          </div>
          <Button href={mapUrl} target="_blank" rel="noopener noreferrer" variant="ghost" size="md">
            {labels.directions}<Icon name="arrowUpRight" className="w-4 h-4" />
          </Button>
        </div>

        <div className="relative h-[360px] md:h-[420px] rounded-xl overflow-hidden shadow-md bg-surface-container">
          <iframe
            title={labels.mapTitle}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full border-0"
          />
          <div className="absolute bottom-space-md left-space-md right-space-md md:right-auto md:max-w-md bg-surface-container-lowest/95 backdrop-blur-md p-space-md md:p-space-lg rounded-lg shadow-xl pointer-events-none">
            <div className="flex items-start justify-between gap-space-md">
              <div>
                <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.16em]">{labels.atelier}</Text>
                <Text as="h3" scale="title-lg" className="text-on-surface mt-space-xs">ORBIS COFFEE — Đồng Khởi</Text>
              </div>
              <Icon name="mapPin" className="w-7 h-7 text-primary shrink-0" />
            </div>
            <Text as="p" scale="body-sm" className="text-on-surface-variant mt-space-xs">{dict.footer.address}</Text>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="pointer-events-auto mt-space-sm inline-flex items-center gap-space-xs font-sans text-label-sm uppercase tracking-wider font-semibold text-primary hover:text-secondary">
              {labels.openMap}<Icon name="arrowUpRight" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-low py-space-xl">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs text-center md:text-left">
            <Text as="span" scale="label-sm" className="text-secondary uppercase tracking-[0.16em]">{labels.wholesaleEyebrow}</Text>
            <Text as="h2" scale="headline-sm" className="text-on-surface">{labels.wholesaleTitle}</Text>
            <Text as="p" scale="body-sm" className="text-on-surface-variant max-w-2xl">{labels.wholesaleDescription}</Text>
          </div>
          <Button href={`mailto:${dict.footer.email}?subject=${encodeURIComponent(locale === "vi" ? "Trao đổi hợp tác ORBIS COFFEE" : "ORBIS COFFEE partnership inquiry")}`} variant="primary" size="lg" className="shrink-0">
            {labels.wholesaleCta}<Icon name="arrowUpRight" className="w-4 h-4" />
          </Button>
        </Container>
      </section>
    </div>
  );
}
