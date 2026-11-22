"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scoped reveal orchestration for the homepage hero: toggles `.is-ready` on
 * the wrapper (driving the CSS in globals.css for the sliding title lines,
 * the hand-drawn brush underline, and the staggered [data-reveal] fade-ups),
 * then counts up any `[data-count]` stat values.
 * Mirrors sample/web/homepage-hero-animation.html. All copy stays in the
 * server-rendered markup; this only adds the motion layer, and replays it
 * cleanly even if Next.js keeps this route's tree warm across navigations.
 */
export default function HeroIntro({
  children,
  className,
  countLocale = "en-US",
}: {
  children: ReactNode;
  className?: string;
  countLocale?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const countUp = (el: HTMLElement) => {
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      const duration = 1400;
      const startTime = performance.now();
      const format = (n: number) => n.toLocaleString(countLocale);

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(Math.round(end * eased)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const play = () => {
      root.classList.remove("is-ready");
      // Force a reflow so the class removal is committed before re-adding it,
      // otherwise the browser coalesces both and the CSS animations never restart.
      void root.offsetWidth;
      root.classList.add("is-ready");
      if (reduced) return;
      timeouts.push(
        setTimeout(() => {
          root.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
        }, 1100)
      );
    };

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    fontsReady.then(play);

    return () => timeouts.forEach(clearTimeout);
  }, [countLocale]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
