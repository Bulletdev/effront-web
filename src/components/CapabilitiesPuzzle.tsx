import type { CSSProperties } from "react";
import Image from "next/image";
import { CAP_PUZZLE, CAP_PUZZLE_MOBILE } from "@/data/capPuzzle";

export type CapPiece = {
  tag: string;
  title: string;
  body: string;
  image: string | null;
};

// Restrained accents (r,g,b) — teal/gold family per the design tokens, kept low
// saturation so the hover glow reads as a tint, never a flood.
const ACCENTS = [
  "5, 150, 170", // teal
  "200, 155, 60", // gold
  "96, 170, 190", // soft cyan
  "124, 168, 120", // muted green
  "210, 150, 92", // warm amber
  "132, 150, 200", // slate blue
] as const;

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
        return (
          <article
            key={i}
            className="cap-piece"
            style={
              {
                "--accent": ACCENTS[i % ACCENTS.length],
                "--ld": `${pd.left}%`,
                "--td": `${pd.top}%`,
                "--lm": `${pm.left}%`,
                "--tm": `${pm.top}%`,
                "--cd": `url(#capPiece-${i})`,
                "--cm": `url(#capPieceM-${i})`,
              } as CSSProperties
            }
          >
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
              <span className="cap-piece__tag">{it.tag}</span>
              <h3 className="cap-piece__title">{it.title}</h3>
              <p className="cap-piece__body">{it.body}</p>
            </div>
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
