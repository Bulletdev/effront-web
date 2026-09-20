import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Statement } from "@/components/Statement";
import { CopyHexButton } from "@/components/CopyHexButton";
import { Reveal } from "@/components/Reveal";
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
    hex: "#F20024",
    key: "c1" as const,
    style: "linear-gradient(135deg, #F20024, rgba(242,0,36,0))",
  },
  { hex: "#060606", key: "c2" as const, style: "#060606" },
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
          <Reveal className="mk-block">
            <div className="sec-label">
              <span className="idx">01</span>
              <span>{t("s1")}</span>
            </div>
            <div className="mk-panel">
              <div className="mk-lockup">
                <Image
                  className="mk-logo"
                  src="/logos/effront-mark.png"
                  alt="Effront mark"
                  width={512}
                  height={512}
                />
                <span className="mk-wordmark">
                  Effront<span className="dot">.</span>
                </span>
              </div>
            </div>
            <div className="mk-panel">
              <div className="mk-lockup">
                <Image
                  className="mk-logo mk-logo-full"
                  src="/logos/effront-cybersecurity-lockup.png"
                  alt="Effront Cybersecurity logo"
                  width={1254}
                  height={1254}
                />
              </div>
            </div>
            <p className="mk-note">{t("s1note")}</p>
          </Reveal>

          <Reveal className="mk-block">
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
          </Reveal>

          <Reveal className="mk-block">
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
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
