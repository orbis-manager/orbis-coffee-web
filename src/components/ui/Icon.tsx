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
  storefront: "M3 10h18l-1.5-6h-15L3 10Zm1 0v10h16V10M8 20v-6h8v6M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0",
  mail: "M3 5h18v14H3V5Zm0 1 9 7 9-7",
  phone: "M7 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-2l-5-2-2 3a14 14 0 0 1-6-6l3-2-2-5Z",
  mapPin: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v6l4 2",
  coffee: "M4 8h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm13 2h2a2 2 0 1 1 0 4h-2M7 4c-1 1 1 1 0 3m5-3c-1 1 1 1 0 3",
  check: "m5 12 4 4L19 6",
  arrowUpRight: "M7 17 17 7M7 7h10v10",
  shield: "M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Zm-3-11 2 2 4-4",
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
