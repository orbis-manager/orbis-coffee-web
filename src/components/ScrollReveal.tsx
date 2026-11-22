"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide "fade up on scroll" reveal — style A ("NHẸ NHÀNG" / soft) from
 * sample/web/homepage-scroll-effects.html. Any element marked `data-anim`
 * (optionally with a `--d` stagger delay) fades/slides in once it scrolls
 * into view. Mounted once per locale layout; re-scans on route change and
 * skips elements already revealed, so it stays correct even if Next.js
 * keeps a route's tree warm across navigations.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-anim]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      elements.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    elements.forEach((el) => {
      if (!el.classList.contains("in")) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
