import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

// Static class map so Tailwind's scanner can see every literal class name.
const scaleClasses = {
  "display-xl": "font-display text-display-xl",
  "display-lg": "font-display text-display-lg",
  "display-lg-mobile": "font-display text-display-lg-mobile",
  "display-xl-mobile": "font-display text-display-xl-mobile",
  "headline-lg": "font-display text-headline-lg",
  "headline-lg-mobile": "font-display text-headline-lg-mobile",
  "headline-md": "font-display text-headline-md",
  "headline-sm": "font-display text-headline-sm",
  "title-lg": "font-sans text-title-lg",
  "title-md": "font-sans text-title-md",
  "body-lg": "font-sans text-body-lg",
  "body-md": "font-sans text-body-md",
  "body-sm": "font-sans text-body-sm",
  "label-lg": "font-sans text-label-lg",
  "label-md": "font-sans text-label-md",
  "label-sm": "font-sans text-label-sm",
} as const;

export type TextScale = keyof typeof scaleClasses;

type Props<T extends ElementType> = {
  as?: T;
  scale: TextScale;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export default function Text<T extends ElementType = "p">({
  as,
  scale,
  className,
  ...props
}: Props<T>) {
  const Component = as ?? "p";

  return (
    <Component {...props} className={cn(scaleClasses[scale], className)} />
  );
}
