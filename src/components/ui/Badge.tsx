import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const variants = {
  surface: "bg-surface/90 backdrop-blur text-primary",
  primary: "bg-primary-container text-on-primary-container",
  secondary: "bg-secondary-container text-on-secondary-container",
} as const;

export type BadgeVariant = keyof typeof variants;

export default function Badge({
  variant = "surface",
  className,
  ...props
}: ComponentPropsWithoutRef<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center px-space-xs py-0.5 rounded font-sans text-label-sm uppercase tracking-wider font-semibold",
        variants[variant],
        className
      )}
    />
  );
}
