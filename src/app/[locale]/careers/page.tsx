import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Statement } from "@/components/Statement";
import { CareersBoard } from "@/components/CareersBoard";
import { Reveal } from "@/components/Reveal";
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

      <header className="page-hero relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/brandkit/heroidea.png')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]"
          aria-hidden="true"
        />
        <div className="wrap relative z-10">
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
        </div>
      </section>

      <section id="contato" className="contact-banner">
        <Image
          src="/brandkit/Gárgula Cibernética e Matriz BináriaCOntact.png"
          alt=""
          width={1916}
          height={821}
          className="contact-banner-bg"
          aria-hidden="true"
        />
        <div className="contact-banner-overlay">
          <Reveal>
            <h2>{t("ctaH2")}</h2>
            <div className="btn-row">
              <a
                href="mailto:contato@effront.gg"
                className="btn-tactical"
                target="_blank"
                rel="noopener noreferrer"
              >
                contato@effront.gg
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
