"use client";

import { useState } from "react";
import type { ReactNode } from "react";

/**
 * Clips content to a few lines on mobile only (desktop always shows it in
 * full via CSS), with a toggle to expand. Purely a CSS max-height clip, so
 * it works with arbitrary children (e.g. multiple <Statement> paragraphs).
 */
export function ReadMore({
  children,
  moreLabel,
  lessLabel,
}: {
  children: ReactNode;
  moreLabel: string;
  lessLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="readmore" data-open={open}>
      <div className="readmore-clip">{children}</div>
      <button type="button" className="readmore-btn" onClick={() => setOpen((o) => !o)}>
        {open ? lessLabel : moreLabel}
      </button>
    </div>
  );
}
