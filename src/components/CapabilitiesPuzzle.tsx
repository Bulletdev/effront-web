import type { CSSProperties } from "react";
import Image from "next/image";
import { CAP_PUZZLE } from "@/data/capPuzzle";

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
  const pieces = CAP_PUZZLE.pieces;

  return (
    <div
      className="cap-puzzle"
      style={
        {
          "--pz-w": `${CAP_PUZZLE.boxWidthPct}%`,
          "--pz-h": `${CAP_PUZZLE.boxHeightPct}%`,
        } as CSSProperties
      }
    >
      {/* clip shapes for each interlocking piece (objectBoundingBox = scales with size) */}
      <svg className="cap-puzzle__defs" width="0" height="0" aria-hidden="true">
        <defs>
          {pieces.map((p, i) => (
            <clipPath key={i} id={`capPiece-${i}`} clipPathUnits="objectBoundingBox">
              <path d={p.clip} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {items.map((it, i) => {
        const p = pieces[i % pieces.length];
        return (
          <article
            key={i}
            className="cap-piece"
            style={
              {
                "--accent": ACCENTS[i % ACCENTS.length],
                left: `${p.left}%`,
                top: `${p.top}%`,
                clipPath: `url(#capPiece-${i})`,
                WebkitClipPath: `url(#capPiece-${i})`,
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

      {/* crisp seams drawn on top so the interlock reads even when fills match */}
      <svg
        className="cap-puzzle__seams"
        viewBox={CAP_PUZZLE.viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {pieces.map((p, i) => (
          <path key={i} d={p.stroke} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}
