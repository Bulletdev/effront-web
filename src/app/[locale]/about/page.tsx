import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Statement } from "@/components/Statement";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("titleAbout") };
}

const TEAM = [
  {
    name: "Michael Douglas",
    role: "CEO & Founder",
    linkedin: "https://www.linkedin.com/in/michael-bullet",
    avatar: "/team/md.webp",
    initials: "MD",
  },
  {
    name: "Kevin Almeida",
    role: "UX Designer",
    linkedin: "https://www.linkedin.com/in/kevin-almeida-365601113",
    avatar: "/team/kev.webp",
    initials: "KA",
  },
  {
    name: "Maielin Hauschild",
    role: "VP of Marketing",
    linkedin: "https://www.linkedin.com/in/mai%C3%A9lin-hauschild",
    avatar: "/team/hausch.webp",
    initials: "MH",
  },
];

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");
  const tContact = await getTranslations("Contact");

  return (
    <>
      <SiteNav locale={locale as Locale} pathname="/about" />

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
        </div>
      </header>

      <section id="historia">
        <div className="wrap">
          <Reveal>
            <div className="sec-label">
              <span className="idx">01</span>
              <span>{t("sec1")}</span>
            </div>
            <Statement className="mission-statement mt-[52px]" text={t("lede")} />
            <Statement
              className="mission-note mt-10 max-w-[60ch] text-[15.5px] leading-[1.68] text-(--muted-fg)"
              text={t("note")}
            />
          </Reveal>
        </div>
      </section>

      <section id="marcos">
        <div className="wrap">
          <Reveal>
            <div className="sec-label">
              <span className="idx">02</span>
              <span>{t("tlSec")}</span>
            </div>
            <div className="cap-head">
              <h2>{t("tlH2")}</h2>
              <p>{t("tlIntro")}</p>
            </div>
            <div className="tl-row">
              <span className="tl-date">{t("tl1d")}</span>
              <h3>{t("tl1t")}</h3>
              <p>{t("tl1")}</p>
            </div>
            <div className="tl-row">
              <span className="tl-date">{t("tl2d")}</span>
              <h3>{t("tl2t")}</h3>
              <p>{t("tl2")}</p>
            </div>
            <div className="tl-row">
              <span className="tl-date">{t("tl3d")}</span>
              <h3>{t("tl3t")}</h3>
              <p>{t("tl3")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="time">
        <div className="wrap">
          <Reveal>
            <div className="sec-label">
              <span className="idx">03</span>
              <span>{t("tmSec")}</span>
            </div>
            <div className="cap-head">
              <h2>{t("tmH2")}</h2>
              <p>{t("tmIntro")}</p>
            </div>
            <div className="team-grid">
              {TEAM.map((member) => (
                <a
                  key={member.name}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-card"
                >
                  <Image
                    className="tm-avatar"
                    src={member.avatar}
                    alt={member.name}
                    width={56}
                    height={56}
                  />
                  <div>
                    <h3>{member.name}</h3>
                    <p className="tm-role">{member.role}</p>
                  </div>
                  <span className="tm-in">LinkedIn ↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contato" className="section-dark">
        <div className="wrap">
          <div className="sec-label">
            <span className="idx">04</span>
            <span>{tContact("sectionLabel")}</span>
          </div>
          <Reveal>
            <CtaBand
              heading={tContact("heading")}
              href="mailto:contato@effront.gg"
              cta="contato@effront.gg"
            />
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
