import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export default function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={cn("w-full max-w-[1200px] mx-auto px-gutter-desktop", className)}
    />
  );
}
