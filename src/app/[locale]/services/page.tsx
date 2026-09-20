import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Statement } from "@/components/Statement";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/data/services";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("titleServices") };
}

type Props = { params: Promise<{ locale: string }> };

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tServ = await getTranslations("Services");

  const overview = SERVICES.map((s) => ({
    ...s,
    eyebrow: (tServ.raw(s.id) as { eyebrow: string }).eyebrow,
    tagline: (tServ.raw(s.id) as { tagline: string }).tagline,
  }));

  return (
    <>
      <SiteNav locale={locale as Locale} pathname="/services" />

      <header className="page-hero page-hero--split">
        <div className="wrap page-hero-grid">
          <div>
            <span className="page-kicker">
              <span className="diamond" />
              {tServ("sectionLabel")}
            </span>
            <h1>{tServ("heading")}</h1>
            <Statement className="page-lede" text={tServ("pageIntro")} />
          </div>
          <div className="page-hero-art" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/servicehero.svg" alt="" />
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <Reveal>
            <div className="g3 grid">
              {overview.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="card card-pad card-interactive flex flex-col gap-3"
                >
                  <s.Icon size={22} strokeWidth={1.75} className="text-(--gold)" />
                  <span className="text-[12px] font-bold tracking-[0.1em] text-(--teal) uppercase">
                    {s.eyebrow}
                  </span>
                  <p className="text-[15px] leading-[1.5] text-(--fg)">{s.tagline}</p>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="prod-section">
        {overview.map((s, i) => {
          const copy = tServ.raw(s.id) as {
            eyebrow: string;
            name: string;
            body: string;
            features: string[];
            builtFor: string[];
          };
          const bandArt: Partial<Record<typeof s.id, string>> = {
            platformPentest: "/illustrations/penetration.svg",
            exploitSimulation: "/illustrations/red-team.svg",
          };
          const art = bandArt[s.id];
          return (
            <Reveal key={s.id}>
              <div className={`prod-band ${i % 2 === 1 ? "alt" : ""}`} id={s.id}>
                {art && (
                  <div className="prod-band-art" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={art} alt="" />
                  </div>
                )}
                <div className="wrap">
                  <span className="prod-eyebrow">{copy.eyebrow}</span>
                  <div className="prod-head">
                    <s.Icon size={40} strokeWidth={1.5} className="text-(--gold)" />
                    <h3 className="prod-name">{copy.name}</h3>
                  </div>
                  <div className="prod-cols">
                    <div>
                      <p className="p-body">{copy.body}</p>
                      <Link href="/#contato" className="prod-cta">
                        {tServ("cta")}
                      </Link>
                    </div>
                    <div>
                      <span className="prod-col-label">{tServ("whatItDoes")}</span>
                      <ul className="feature-list">
                        {copy.features.map((f, fi) => (
                          <li key={fi}>{f}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="prod-col-label">{tServ("builtFor")}</span>
                      <ul className="feature-list">
                        {copy.builtFor.map((f, fi) => (
                          <li key={fi}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      <SiteFooter />
    </>
  );
}
