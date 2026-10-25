import type { ReactNode } from "react";
import Image from "next/image";

/** Dark full-bleed pre-footer band. Wrap in a `<section className="section-dark">`.
 * Pass `art` (a path under /public plus intrinsic size) to switch from centered
 * text to a two-column layout with an illustration on the right. */
export function CtaBand({
  heading,
  body,
  href,
  cta,
  art,
}: {
  heading: string;
  body?: ReactNode;
  href: string;
  cta: string;
  art?: { src: string; width: number; height: number };
}) {
  if (art) {
    return (
      <div className="cta-band cta-band--split">
        <div>
          <h2>{heading}</h2>
          {body}
          <div className="btn-row">
            <a href={href} className="btn-primary" target="_blank" rel="noopener noreferrer">
              {cta}
            </a>
          </div>
        </div>
        <div className="cta-band-art" aria-hidden="true">
          <Image src={art.src} alt="" width={art.width} height={art.height} />
        </div>
      </div>
    );
  }

  return (
    <div className="cta-band">
      <h2>{heading}</h2>
      {body}
      <div className="btn-row">
        <a href={href} className="btn-primary" target="_blank" rel="noopener noreferrer">
          {cta}
        </a>
      </div>
    </div>
  );
}
