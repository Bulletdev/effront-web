"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export type AccordionItem = {
  title: ReactNode;
  body: ReactNode;
};

/**
 * One item open at a time. Height animates via a grid-template-rows
 * transition (0fr → 1fr) so arbitrary content length never needs JS
 * measurement.
 */
export function Accordion({
  items,
  defaultOpen,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="acc-item" key={i} data-open={isOpen}>
            <button
              type="button"
              className="acc-head"
              aria-expanded={isOpen}
              aria-controls={`acc-body-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.title}</span>
              <span className="acc-icon" aria-hidden />
            </button>
            <div id={`acc-body-${i}`} className="acc-body">
              <div className="acc-body-inner">{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
