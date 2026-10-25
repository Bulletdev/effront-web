"use client";

import { useEffect, useRef } from "react";

/** Mouse-tracked spotlight layer for the hero (Hakai-style). Renders an
 * absolutely-positioned div and drives `--hx`/`--hy` on the parent section;
 * the reveal itself is pure CSS (`.hero-spotlight`). Pointer-fine only. */
export function HeroFx() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--hx", `${e.clientX - r.left}px`);
        el.style.setProperty("--hy", `${e.clientY - r.top}px`);
        el.classList.add("hero-spot-on");
      });
    };
    const onLeave = () => el.classList.remove("hero-spot-on");

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ref} className="hero-spotlight" aria-hidden="true" />
      <div className="hero-techgrid" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
    </>
  );
}
