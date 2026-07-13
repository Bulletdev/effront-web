import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Statement } from "@/components/Statement";
import { CopyHexButton } from "@/components/CopyHexButton";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("titleMediaKit") };
}

type Props = { params: Promise<{ locale: string }> };

const SWATCHES = [
  {
    hex: "#C89B3C",
    key: "c1" as const,
    style: "linear-gradient(135deg, #C89B3C, rgba(200,155,60,0))",
  },
  { hex: "#0A0E1A", key: "c2" as const, style: "#0A0E1A" },
  { hex: "#0C223F", key: "c3" as const, style: "#0C223F" },
  { hex: "#0596AA", key: "c4" as const, style: "#0596AA" },
];

// w/h are the intrinsic PNG dimensions so next/image reserves the right aspect
// ratio and the browser never distorts the box (CSS scales them into the slot).
const LOGOS = [
  { file: "prostaff-logo.png", name: "ProStaff", w: 332, h: 359 },
  { file: "arenabr-logo.png", name: "ArenaBR", w: 810, h: 251 },
  { file: "scrims-logo.png", name: "scrims.lol", cls: "is-scrims", w: 500, h: 500 },
  { file: "peneira-logo.png", name: "peneira.gg", w: 284, h: 312 },
];

export default async function MediaKitPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("MediaKit");

  return (
    <>
      <SiteNav locale={locale as Locale} pathname="/media-kit" />

      <header className="page-hero">
        <div className="wrap">
          <span className="page-kicker">
            <span className="diamond" />
            {t("kicker")}
          </span>
          <h1
            dangerouslySetInnerHTML={{
              __html: t
                .raw("h1")
                .replaceAll("<gold>", '<span class="gold">')
                .replaceAll("</gold>", "</span>"),
            }}
          />
          <Statement className="page-lede" text={t("lede")} />
        </div>
      </header>

      <section className="page-body">
        <div className="wrap">
          <div className="mk-block">
            <div className="sec-label">
              <span className="idx">01</span>
              <span>{t("s1")}</span>
            </div>
            <div className="mk-panel">
              <div className="mk-lockup">
                <Image
                  className="mk-logo"
                  src="/logos/effront-mark.png"
                  alt="Effront logo"
                  width={96}
                  height={102}
                />
                <span className="mk-wordmark">
                  Effront<span className="dot">.</span>
                </span>
              </div>
            </div>
            <p className="mk-note">{t("s1note")}</p>
          </div>

          <div className="mk-block">
            <div className="sec-label">
              <span className="idx">02</span>
              <span>{t("s2")}</span>
            </div>
            <div className="mk-card-grid">
              {SWATCHES.map((s) => (
                <div className="mk-card" key={s.hex}>
                  <div className="chip" style={{ background: s.style }} />
                  <div className="s-meta">
                    <span className="s-name">{t(s.key)}</span>
                    <span className="s-hex">{s.hex}</span>
                  </div>
                  <CopyHexButton hex={s.hex} label={t("copy")} />
                </div>
              ))}
            </div>
            <Statement className="mk-note" text={t("rules")} />
          </div>

          <div className="mk-block">
            <div className="sec-label">
              <span className="idx">03</span>
              <span>{t("s3")}</span>
            </div>
            <div className="type-row">
              <span
                className="t-specimen"
                style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
              >
                Aa
              </span>
              <h3>Bricolage Grotesque</h3>
              <p>{t("t1")}</p>
            </div>
            <div className="type-row">
              <span
                className="t-specimen"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 500 }}
              >
                Aa
              </span>
              <h3>Inter</h3>
              <p>{t("t2")}</p>
            </div>
          </div>

          <div className="mk-block">
            <div className="sec-label">
              <span className="idx">04</span>
              <span>{t("s4")}</span>
            </div>
            <div className="mk-card-grid">
              {LOGOS.map((logo) => (
                <div className="mk-card" key={logo.file}>
                  <div className="mk-logo-body">
                    <Image
                      src={`/logos/${logo.file}`}
                      alt={`${logo.name} logo`}
                      width={logo.w}
                      height={logo.h}
                      className={logo.cls}
                    />
                  </div>
                  <div className="mk-fmt">{logo.name} · PNG</div>
                  <a href={`/logos/${logo.file}`} download={logo.file} className="mk-card-action">
                    {t("download")}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
