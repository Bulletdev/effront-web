"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Delay = "d1" | "d2" | "d3" | "d4";

/**
 * Fades/slides children in once they cross the viewport. Renders visible by
 * default when IntersectionObserver isn't available, so content is never
 * hidden without JS.
 */
export function Reveal({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay?: Delay;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const cls = ["reveal", visible && "in", delay, className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  );
}
