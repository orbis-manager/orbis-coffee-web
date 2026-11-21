import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export default function Select({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn(
          "w-full h-[50px] px-space-md pr-10 rounded bg-surface-container-low text-on-surface font-sans text-body-md appearance-none focus:outline-none focus:bg-surface-container-lowest transition-all cursor-pointer",
          className
        )}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-space-md top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
        ▾
      </span>
    </div>
  );
}
