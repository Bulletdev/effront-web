"use client";

import { useEffect } from "react";

const CHARS = "!@#$%&*<>{}[]=/\\|?~^";
const DURATION = 500;

function scramble(el: HTMLElement) {
  const original = el.textContent ?? "";
  if (!original.trim()) return;

  const start = performance.now();
  let raf: number;

  const tick = (now: number) => {
    const progress = Math.min((now - start) / DURATION, 1);
    const resolved = Math.floor(progress * original.length);

    el.textContent = original
      .split("")
      .map((ch, i) => {
        if (ch === " ") return " ";
        if (i < resolved) return original[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join("");

    if (progress < 1) {
      raf = requestAnimationFrame(tick);
    } else {
      el.textContent = original;
    }
  };

  raf = requestAnimationFrame(tick);

  const cleanup = () => {
    cancelAnimationFrame(raf);
    el.textContent = original;
    el.removeEventListener("mouseleave", cleanup);
  };
  el.addEventListener("mouseleave", cleanup);
}

export function ScrambleFx() {
  useEffect(() => {
    const onEnter = (e: Event) => {
      const target = (e.target as HTMLElement).closest(".btn-tactical");
      if (target instanceof HTMLElement) scramble(target);
    };

    document.addEventListener("mouseenter", onEnter, true);
    return () => document.removeEventListener("mouseenter", onEnter, true);
  }, []);

  return null;
}
