import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Statement } from "@/components/Statement";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("titleNews") };
}

type Props = { params: Promise<{ locale: string }> };

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("News");
  const tAbout = await getTranslations("About");

  const milestones = [
    { date: "2026", title: tAbout("tl4t"), body: tAbout("tl4") },
    { date: "2026", title: tAbout("tl3t"), body: tAbout("tl3") },
    { date: "2026 Q1", title: tAbout("tl2t"), body: tAbout("tl2") },
    { date: "2024", title: tAbout("tl1t"), body: tAbout("tl1") },
  ];

  return (
    <>
      <SiteNav locale={locale as Locale} pathname="/news" />

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
          {milestones.map((m, i) => (
            <div className="tl-row" key={i}>
              <span className="tl-date">{m.date}</span>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
