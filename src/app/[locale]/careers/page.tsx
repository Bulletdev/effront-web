import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Statement } from "@/components/Statement";
import { CareersBoard } from "@/components/CareersBoard";
import { VAGAS } from "@/data/vagas";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("titleCareers") };
}

type Props = { params: Promise<{ locale: string }> };

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Careers");

  return (
    <>
      <SiteNav locale={locale as Locale} pathname="/careers" />

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
          <CareersBoard
            vagas={VAGAS}
            locale={locale as Locale}
            labels={{
              all: t("all"),
              cat1: t("cat1"),
              cat2: t("cat2"),
              cat3: t("cat3"),
              cat4: t("cat4"),
              empty: t("empty"),
              detailsCta: t("detailsCta"),
            }}
          />

          <div className="contact-block">
            <h2>{t("ctaH2")}</h2>
            <a href="mailto:contato@effront.gg" className="contact-mail">
              contato@effront.gg
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
