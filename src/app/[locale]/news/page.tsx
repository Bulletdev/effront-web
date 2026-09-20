import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Statement } from "@/components/Statement";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
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
    { date: tAbout("tl3d"), title: tAbout("tl3t"), body: tAbout("tl3") },
    { date: tAbout("tl2d"), title: tAbout("tl2t"), body: tAbout("tl2") },
    { date: tAbout("tl1d"), title: tAbout("tl1t"), body: tAbout("tl1") },
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
          <Reveal>
            <Accordion
              defaultOpen={0}
              items={milestones.map((m) => ({
                title: (
                  <span className="flex items-center gap-4">
                    <span className="text-[12px] font-bold tracking-[0.1em] text-(--gold) uppercase tabular-nums">
                      {m.date}
                    </span>
                    <span>{m.title}</span>
                  </span>
                ),
                body: m.body,
              }))}
            />
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
