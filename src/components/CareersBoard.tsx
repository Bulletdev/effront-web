"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/routing";
import type { Vaga, VagaCategory } from "@/data/vagas";
import { Link } from "@/i18n/navigation";
import { Statement } from "@/components/Statement";

type Labels = {
  all: string;
  cat1: string;
  cat2: string;
  cat3: string;
  cat4: string;
  empty: string;
  detailsCta: string;
};

const CATS: VagaCategory[] = ["dev", "design", "content", "marketing"];

export function CareersBoard({
  vagas,
  locale,
  labels,
}: {
  vagas: Vaga[];
  locale: Locale;
  labels: Labels;
}) {
  const [active, setActive] = useState<VagaCategory | "all">("all");
  const catLabel: Record<VagaCategory, string> = {
    dev: labels.cat1,
    design: labels.cat2,
    content: labels.cat3,
    marketing: labels.cat4,
  };

  const filtered = useMemo(
    () => vagas.filter((v) => active === "all" || v.cat === active),
    [vagas, active],
  );

  return (
    <>
      <div className="cr-cats">
        <button
          type="button"
          className="cr-chip"
          data-active={active === "all"}
          onClick={() => setActive("all")}
        >
          <span>{labels.all}</span>
          <span className="n">{vagas.length}</span>
        </button>
        {CATS.map((cat) => (
          <button
            key={cat}
            type="button"
            className="cr-chip"
            data-active={active === cat}
            onClick={() => setActive(cat)}
          >
            <span>{catLabel[cat]}</span>
            <span className="n">{vagas.filter((v) => v.cat === cat).length}</span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="vg-grid">
          {filtered.map((v) => (
            <Link key={v.id} href={`/careers/${v.id}`} className="vg-card">
              <span className="vg-cat">{catLabel[v.cat]}</span>
              <h3>{v.title[locale]}</h3>
              <span className="vg-loc">{v.location}</span>
              <p>{v.summary[locale]}</p>
              <span className="vg-more">{labels.detailsCta}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="vg-empty">
          <Statement text={labels.empty} />
        </div>
      )}
    </>
  );
}
