import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export default function Textarea({
  className,
  ...props
}: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full min-h-[140px] p-space-md rounded bg-surface-container-low text-on-surface font-sans text-body-md placeholder:text-on-surface-variant/40 focus:outline-none focus:bg-surface-container-lowest transition-all resize-none",
        className
      )}
    />
  );
}
