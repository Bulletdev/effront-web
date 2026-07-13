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
  return { title: t("titlePrivacy") };
}

type Props = { params: Promise<{ locale: string }> };

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Privacy");
  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <>
      <SiteNav locale={locale as Locale} pathname="/privacy" />

      <header className="page-hero">
        <div className="wrap">
          <span className="page-kicker">
            <span className="diamond" />
            {t("kicker")}
          </span>
          <h1>{t("h1")}</h1>
          <Statement className="page-lede" text={t("intro")} />
          <p className="legal-updated">{t("updated")}</p>
        </div>
      </header>

      <section className="page-body">
        <div className="wrap">
          <div className="legal-doc">
            {sections.map((sec, i) => (
              <div className="legal-section" key={i}>
                <h3>{sec.title}</h3>
                <Statement text={sec.body} />
              </div>
            ))}
          </div>

          <Statement className="legal-note" text={t("note")} />

          <div className="contact-block">
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
