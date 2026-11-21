import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const variants = {
  primary:
    "bg-primary text-on-primary hover:bg-secondary shadow-[0_4px_20px_-2px_rgba(89,64,29,0.18)] hover:shadow-[0_12px_32px_-4px_rgba(89,64,29,0.22)]",
  secondary:
    "bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary",
  ghost:
    "bg-surface-container text-on-surface hover:bg-surface-container-high shadow-sm",
  outline:
    "bg-transparent text-secondary border border-outline-variant hover:border-primary hover:text-primary",
  text: "bg-transparent text-secondary hover:text-primary",
} as const;

const sizes = {
  sm: "h-10 px-space-md text-label-md",
  md: "h-[46px] px-space-lg text-label-lg",
  lg: "h-[52px] px-space-xl text-label-lg",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

const base =
  "inline-flex items-center justify-center gap-space-xs rounded font-sans font-semibold uppercase tracking-[0.08em] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsLink = CommonProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href) {
    return <Link {...props} className={classes} />;
  }

  return <button {...(props as ButtonAsButton)} className={classes} />;
}
