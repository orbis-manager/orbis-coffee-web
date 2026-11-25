import type { SocialName } from "@/components/ui/SocialIcon";

/** Set `hidden: true` for a channel that doesn't exist yet — kept in code, hidden from the UI. */
export const socialLinks: { name: SocialName; label: string; href: string; hidden?: boolean }[] = [
  { name: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61596190678510" },
  { name: "instagram", label: "Instagram", href: "https://instagram.com/orbiscoffee", hidden: true },
  { name: "tiktok", label: "TikTok", href: "https://tiktok.com/@orbiscoffee", hidden: true },
  { name: "zalo", label: "Zalo OA", href: "https://zalo.me/orbiscoffee", hidden: true },
];
