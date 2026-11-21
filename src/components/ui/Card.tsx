import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export default function Card({
  className,
  hoverLift = false,
  ...props
}: ComponentPropsWithoutRef<"div"> & { hoverLift?: boolean }) {
  return (
    <div
      {...props}
      className={cn(
        "bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(89,64,29,0.06)]",
        hoverLift &&
          "hover:shadow-[0_16px_36px_-6px_rgba(89,64,29,0.12)] hover:-translate-y-1 transition-all duration-300",
        className
      )}
    />
  );
}
