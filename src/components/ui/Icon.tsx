import type { ComponentPropsWithoutRef } from "react";

const paths = {
  arrowForward: "M5 12h14M13 6l6 6-6 6",
  east: "M4 12h16M14 6l6 6-6 6",
  leaf: "M5 21c0-9 6-15 15-15-1 9-7 15-15 15Zm0 0c2-4 5-7 9-9",
  star: "M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1L6.6 19.3l1.3-6-4.6-4.1 6.1-.6Z",
  handPick: "M7 11V6a2 2 0 1 1 4 0v5M11 11V5a2 2 0 1 1 4 0v6M15 11V7a2 2 0 1 1 4 0v7c0 3.9-3.1 7-7 7h-1c-2.2 0-4-1-5.5-3L3 13.5c-.6-.8-.4-2 .5-2.5s2-.2 2.5.6L7 13",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-15v2m0 12v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2m16 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  flame:
    "M12 2c1 3-2 4-2 7a3 3 0 0 0 6 0c0-1-.5-2-1-2.5 2 1 3 3.5 3 5.5a6 6 0 0 1-12 0c0-4 2-6 2-6s0 2 1 2c0-3-1-4 3-6Z",
  lock: "M6 11V8a6 6 0 1 1 12 0v3M5 11h14v9H5v-9Zm7 4v2",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({
  name,
  className,
  ...props
}: ComponentPropsWithoutRef<"svg"> & { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
