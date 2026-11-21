import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export default function Input({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={cn(
        "w-full h-[50px] px-space-md rounded bg-surface-container-low text-on-surface font-sans text-body-md placeholder:text-on-surface-variant/40 focus:outline-none focus:bg-surface-container-lowest transition-all",
        className
      )}
    />
  );
}
