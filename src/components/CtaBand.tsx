import type { ReactNode } from "react";

/** Dark full-bleed pre-footer band. Wrap in a `<section className="section-dark">`.
 * Pass `art` (a path under /public) to switch from centered text to a
 * two-column layout with an illustration on the right. */
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
  art?: string;
}) {
  if (art) {
    return (
      <div className="cta-band cta-band--split">
        <div>
          <h2>{heading}</h2>
          {body}
          <div className="btn-row">
            <a href={href} className="btn-primary">
              {cta}
            </a>
          </div>
        </div>
        <div className="cta-band-art" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={art} alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="cta-band">
      <h2>{heading}</h2>
      {body}
      <div className="btn-row">
        <a href={href} className="btn-primary">
          {cta}
        </a>
      </div>
    </div>
  );
}
