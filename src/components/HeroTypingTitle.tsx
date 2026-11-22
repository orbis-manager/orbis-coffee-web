"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Lead words fade/blur up in sequence, then the italic accent phrase is
 * typed out character by character with a blinking caret.
 * Mirrors sample/web/hero-title-animation.html; falls back to static
 * text immediately under prefers-reduced-motion.
 */
export default function HeroTypingTitle({
  lead,
  typed,
  as: Tag = "h1",
  className,
}: {
  lead: string;
  typed: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const words = lead.trim().split(/\s+/);
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [typedText, setTypedText] = useState(() => (reduced ? typed : ""));
  const [caretVisible, setCaretVisible] = useState(false);
  const [caretDone, setCaretDone] = useState(false);
  // Bumped on every effect run so the word spans remount and replay their
  // CSS animation even if this component's hook state survived (Next.js
  // keeps inactive route segments "warm" via cacheComponents, which can
  // re-run this effect without the state having been reset first).
  const [runId, setRunId] = useState(0);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reduced) return;

    // Clear any leftover state from a previous activation before scheduling
    // a fresh run, otherwise the old fully-typed text flashes until the
    // first character is (re)written.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTypedText("");
    setCaretVisible(false);
    setCaretDone(false);
    setRunId((id) => id + 1);

    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timeouts.current.push(id);
    };

    const start = words.length * 110 + 450;
    schedule(() => setCaretVisible(true), Math.max(start - 300, 0));

    let n = 0;
    const step = () => {
      n += 1;
      setTypedText(typed.slice(0, n));
      if (n < typed.length) {
        schedule(step, typed[n - 1] === " " ? 140 : 70 + Math.random() * 40);
      } else {
        schedule(() => setCaretDone(true), 3000);
      }
    };
    schedule(step, start);

    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lead, typed, reduced]);

  return (
    <Tag className={className} aria-label={`${lead}${typed}`}>
      {words.map((word, i) => (
        <span
          key={`${runId}-${i}`}
          aria-hidden="true"
          className={cn("hero-word inline-block", reduced && "opacity-100")}
          style={reduced ? undefined : ({ "--hero-word-delay": `${i * 110}ms` } as React.CSSProperties)}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}{" "}
      <span aria-hidden="true" className="italic font-normal text-primary">
        {typedText}
      </span>
      <span
        key={`caret-${runId}`}
        aria-hidden="true"
        className={cn("hero-caret", caretDone && "hero-caret-done")}
        style={{ visibility: reduced ? "hidden" : caretVisible ? "visible" : "hidden" }}
      />
    </Tag>
  );
}
