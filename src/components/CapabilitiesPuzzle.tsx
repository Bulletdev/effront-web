import type { CSSProperties, ComponentType } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CAP_PUZZLE, CAP_PUZZLE_MOBILE } from "@/data/capPuzzle";

export type CapPiece = {
  tag: string;
  title: string;
  body: string;
  image: string | null;
  href?: string;
  Icon?: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
};

// Single red accent per the brand tokens — every piece hovers the same tint,
// no rainbow of unrelated colors.
const ACCENTS = ["242, 0, 36"] as const;

export function CapabilitiesPuzzle({ items }: { items: CapPiece[] }) {
  const d = CAP_PUZZLE;
  const m = CAP_PUZZLE_MOBILE;

  return (
    <div
      className="cap-puzzle"
      style={
        {
          "--pz-ar-d": d.aspect,
          "--pz-ar-m": m.aspect,
          "--pz-wd": `${d.boxWidthPct}%`,
          "--pz-hd": `${d.boxHeightPct}%`,
          "--pz-wm": `${m.boxWidthPct}%`,
          "--pz-hm": `${m.boxHeightPct}%`,
        } as CSSProperties
      }
    >
      {/* clip shapes for each piece, both layouts (objectBoundingBox = scales with size) */}
      <svg className="cap-puzzle__defs" width="0" height="0" aria-hidden="true">
        <defs>
          {d.pieces.map((p, i) => (
            <clipPath key={`d${i}`} id={`capPiece-${i}`} clipPathUnits="objectBoundingBox">
              <path d={p.clip} />
            </clipPath>
          ))}
          {m.pieces.map((p, i) => (
            <clipPath key={`m${i}`} id={`capPieceM-${i}`} clipPathUnits="objectBoundingBox">
              <path d={p.clip} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {items.map((it, i) => {
        const pd = d.pieces[i % d.pieces.length];
        const pm = m.pieces[i % m.pieces.length];
        const style = {
          "--accent": ACCENTS[i % ACCENTS.length],
          "--ld": `${pd.left}%`,
          "--td": `${pd.top}%`,
          "--lm": `${pm.left}%`,
          "--tm": `${pm.top}%`,
          "--cd": `url(#capPiece-${i})`,
          "--cm": `url(#capPieceM-${i})`,
        } as CSSProperties;
        const content = (
          <>
            {it.image && (
              <Image
                className="cap-piece__img"
                src={it.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            )}
            <div className="cap-piece__inner">
              {it.Icon && <it.Icon size={22} strokeWidth={1.75} className="cap-piece__icon" />}
              <span className="cap-piece__tag">{it.tag}</span>
              <h3 className="cap-piece__title">{it.title}</h3>
              <p className="cap-piece__body">{it.body}</p>
            </div>
          </>
        );
        return it.href ? (
          <Link key={i} href={it.href} className="cap-piece" style={style}>
            {content}
          </Link>
        ) : (
          <article key={i} className="cap-piece" style={style}>
            {content}
          </article>
        );
      })}

      {/* crisp seams on top so the interlock reads even when fills match */}
      <svg
        className="cap-puzzle__seams cap-puzzle__seams--d"
        viewBox={d.viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {d.pieces.map((p, i) => (
          <path key={i} d={p.stroke} />
        ))}
      </svg>
      <svg
        className="cap-puzzle__seams cap-puzzle__seams--m"
        viewBox={m.viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {m.pieces.map((p, i) => (
          <path key={i} d={p.stroke} />
        ))}
      </svg>
    </div>
  );
}
