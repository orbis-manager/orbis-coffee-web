import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Our custom type-scale keys (components/ui/Text.tsx) are plain words like
// "display-lg" or "headline-sm". tailwind-merge's default config resolves
// `color: [isAny]`, so any unrecognized "text-{word}" class — including our
// scale names — also satisfies the text-color group and gets deduped against
// a real color class like "text-on-surface", silently dropping one of them.
// Registering the scale names under "font-size" resolves them there first.
const fontSizeScale = [
  "display-xl",
  "display-lg",
  "display-lg-mobile",
  "display-xl-mobile",
  "headline-lg",
  "headline-lg-mobile",
  "headline-md",
  "headline-sm",
  "title-lg",
  "title-md",
  "body-lg",
  "body-md",
  "body-sm",
  "label-lg",
  "label-md",
  "label-sm",
];

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: fontSizeScale }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} ₫`;
}
