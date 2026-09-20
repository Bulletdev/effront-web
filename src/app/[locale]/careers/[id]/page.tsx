import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Link } from "@/i18n/navigation";
import { CtaBand } from "@/components/CtaBand";
import { VAGAS } from "@/data/vagas";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return VAGAS.map((v) => ({ id: v.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("titleCareers") };
}

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function VagaPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Vaga");
  const tCareers = await getTranslations("Careers");
  const vaga = VAGAS.find((v) => v.id === id);

  if (!vaga) {
    return (
      <>
        <SiteNav locale={locale as Locale} pathname="/careers" />
        <header className="page-hero">
          <div className="wrap">
            <span className="page-kicker">
              <span className="diamond" />
              {tCareers("kicker")}
            </span>
            <h1>{t("notFound")}</h1>
          </div>
        </header>
        <section className="page-body">
          <div className="wrap">
            <Link href="/careers" className="vg-back">
              {t("back")}
            </Link>
          </div>
        </section>
        <SiteFooter />
      </>
    );
  }

  const catLabels: Record<string, string> = {
    dev: tCareers("cat1"),
    design: tCareers("cat2"),
    content: tCareers("cat3"),
    marketing: tCareers("cat4"),
  };

  const loc = locale as "pt" | "en" | "es" | "ko";

  return (
    <>
      <SiteNav locale={locale as Locale} pathname={`/careers/${id}`} />

      <header className="page-hero">
        <div className="wrap">
          <span className="page-kicker">
            <span className="diamond" />
            {catLabels[vaga.cat]}
          </span>
          <h1>{vaga.title[loc]}</h1>
          <p className="page-lede">{vaga.location}</p>
        </div>
      </header>

      <section className="page-body">
        <div className="wrap">
          <Link href="/careers" className="vg-back">
            {t("back")}
          </Link>
          <div className="vg-body" dangerouslySetInnerHTML={{ __html: vaga.body[loc] }} />
          <CtaBand
            heading={t("apply")}
            href={`mailto:contato@effront.gg?subject=${encodeURIComponent("[Vaga] " + vaga.title[loc])}`}
            cta="contato@effront.gg"
          />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
