import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Icon, { type IconName } from "@/components/ui/Icon";
import SocialIcon, { type SocialName } from "@/components/ui/SocialIcon";
import Text from "@/components/ui/Text";
import ContactForm from "@/components/ContactForm";
import HeroTypingTitle from "@/components/HeroTypingTitle";
import { getDict } from "@/content/dictionary";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const copy = {
  vi: {
    heroEyebrow: "Liên Hệ Với Chúng Tôi",
    titleLead: "Hãy cùng bắt đầu ", titleAccent: "cuộc trò chuyện.",
    intro: "Bạn muốn tìm hiểu về cà phê theo vùng trồng, đặt hàng riêng hay trao đổi cơ hội hợp tác? ANH COFFEE luôn sẵn lòng lắng nghe.",
    atelier: "ANH COFFEE Atelier", contactTitle: "Thông tin liên hệ",
    brandLabel: "Thương hiệu", brand: "ANH COFFEE — Vietnamese Terroir",
    emailLabel: "Email", phoneLabel: "Điện thoại", addressLabel: "Atelier & Flagship",
    hoursLabel: "Giờ đón khách", hours: "Thứ Hai – Chủ Nhật: 08:00 – 20:00",
    mapEyebrow: "Ghé thăm Atelier", mapTitle: "Tìm ANH COFFEE tại Sài Gòn",
    mapDescription: "Atelier tọa lạc trên đường Đồng Khởi, trung tâm Quận 1, Thành phố Hồ Chí Minh.",
    directions: "Chỉ đường", openMap: "Mở bản đồ",
    socialEyebrow: "Cộng Đồng ANH COFFEE", socialTitle: "Theo dõi chúng tôi",
    socialDescription: "Câu chuyện mùa vụ, hậu trường rang mộc và lịch thử nếm mới nhất.",
  },
  en: {
    heroEyebrow: "Get In Touch",
    titleLead: "Let’s start ", titleAccent: "a conversation.",
    intro: "Curious about our coffee origins, looking to arrange an order, or exploring a partnership? The ANH COFFEE team would be glad to hear from you.",
    atelier: "ANH COFFEE Atelier", contactTitle: "Contact information",
    brandLabel: "Brand", brand: "ANH COFFEE — Vietnamese Terroir",
    emailLabel: "Email", phoneLabel: "Telephone", addressLabel: "Atelier & Flagship",
    hoursLabel: "Reception hours", hours: "Monday – Sunday: 08:00 – 20:00 ICT",
    mapEyebrow: "Visit the atelier", mapTitle: "Find ANH COFFEE in Saigon",
    mapDescription: "Our atelier is located on Đồng Khởi Street in the heart of District 1, Ho Chi Minh City.",
    directions: "Get directions", openMap: "Open map",
    socialEyebrow: "ANH COFFEE Community", socialTitle: "Follow us",
    socialDescription: "Harvest stories, roastery behind-the-scenes, and the latest cupping schedule.",
  },
} satisfies Record<Locale, Record<string, string>>;

const socialLinks: { name: SocialName; label: string; handle: Record<Locale, string>; href: string; hidden?: boolean }[] = [
  { name: "facebook", label: "Facebook", handle: { vi: "ANH COFFEE", en: "ANH COFFEE" }, href: "https://www.facebook.com/profile.php?id=61596190678510" },
  { name: "instagram", label: "Instagram", handle: { vi: "@orbiscoffee", en: "@orbiscoffee" }, href: "https://instagram.com/orbiscoffee", hidden: true },
  { name: "tiktok", label: "TikTok", handle: { vi: "@orbiscoffee", en: "@orbiscoffee" }, href: "https://tiktok.com/@orbiscoffee", hidden: true },
  { name: "zalo", label: "Zalo OA", handle: { vi: "Nhắn tin tư vấn", en: "Chat with us" }, href: "https://zalo.me/orbiscoffee", hidden: true },
];

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
    title: locale === "vi" ? "Liên hệ | ANH COFFEE" : "Contact | ANH COFFEE",
    description: locale === "vi"
      ? "Liên hệ ANH COFFEE để được tư vấn sản phẩm, đặt hàng hoặc trao đổi cơ hội hợp tác."
      : "Contact ANH COFFEE about product guidance, orders, or partnership opportunities.",
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
            <Text as="span" scale="label-sm" className="text-primary uppercase tracking-[0.2em]">{labels.heroEyebrow}</Text>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <HeroTypingTitle
            lead={labels.titleLead}
            typed={labels.titleAccent}
            className="font-display text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight text-balance"
          />
          <Text as="p" scale="body-lg" className="text-on-surface-variant max-w-2xl leading-relaxed">{labels.intro}</Text>
        </div>
      </section>

      <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop pb-space-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          <div data-anim className="lg:col-span-7">
            <ContactForm locale={locale} />
          </div>

          <aside className="lg:col-span-5 flex flex-col gap-space-md lg:sticky lg:top-28">
            <div data-anim style={{ "--d": "0.1s" } as React.CSSProperties} className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg">
              <div>
                <Text as="span" scale="label-sm" className="text-secondary uppercase tracking-[0.16em]">{labels.atelier}</Text>
                <Text as="h2" scale="headline-sm" className="text-on-surface mt-space-xs">{labels.contactTitle}</Text>
              </div>

              <dl className="flex flex-col gap-space-md">
                {contactDetails.map(({ icon, key }) => {
                  const value = detailValues[key];
                  return (
                    <div key={key} className="flex items-start gap-space-md">
                      <div className="w-9 h-9 rounded-[9999px] bg-secondary-container/50 flex items-center justify-center shrink-0 text-primary">
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
            </div>

            <div data-anim style={{ "--d": "0.2s" } as React.CSSProperties} className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div>
                <Text as="span" scale="label-sm" className="text-secondary uppercase tracking-[0.16em]">{labels.socialEyebrow}</Text>
                <Text as="h3" scale="headline-sm" className="text-on-surface mt-space-xs">{labels.socialTitle}</Text>
                <Text as="p" scale="body-sm" className="text-on-surface-variant mt-space-xs">{labels.socialDescription}</Text>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                {socialLinks.filter((link) => !link.hidden).map(({ name, label, handle, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} ${locale === "vi" ? "(mở trong tab mới)" : "(opens in a new tab)"}`}
                    className="group flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-lowest/70 hover:bg-surface-container-lowest hover:shadow-[0_6px_18px_rgba(89,64,29,0.10)] hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className="w-11 h-11 rounded-[9999px] bg-secondary-container/50 text-primary flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-inverse-surface group-hover:text-primary-fixed">
                      <SocialIcon name={name} className="w-5 h-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-sans text-[0.95rem] leading-5 font-semibold text-on-surface truncate">{label}</span>
                      <span className="block font-sans text-[0.8rem] leading-5 text-on-surface-variant truncate">{handle[locale]}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-gutter-desktop pb-space-3xl">
        <div data-anim className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
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

        <div data-anim style={{ "--d": "0.1s" } as React.CSSProperties} className="relative h-[360px] md:h-[420px] rounded-xl overflow-hidden shadow-md bg-surface-container">
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
                <Text as="h3" scale="title-lg" className="text-on-surface mt-space-xs">ANH COFFEE — Đồng Khởi</Text>
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
    </div>
  );
}
