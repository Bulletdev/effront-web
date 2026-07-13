import type { Metadata } from "next";
import Image from "next/image";
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
  return { title: t("titleProducts") };
}

type Props = { params: Promise<{ locale: string }> };

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tProd = await getTranslations("Products");

  const prostaff = tProd.raw("prostaff");
  const scrims = tProd.raw("scrims");
  const arenabr = tProd.raw("arenabr");
  const peneira = tProd.raw("peneira");

  return (
    <>
      <SiteNav locale={locale as Locale} pathname="/products" />

      <header className="page-hero">
        <div className="wrap">
          <span className="page-kicker">
            <span className="diamond" />
            {tProd("sectionLabel")}
          </span>
          <h1>{tProd("heading")}</h1>
          <Statement className="page-lede" text={tProd("pageIntro")} />
        </div>
      </header>

      <section className="prod-section">
        <div className="prod-band" id="prostaff">
          <div className="wrap">
            <span className="prod-eyebrow">{prostaff.eyebrow}</span>
            <div className="prod-head">
              <Image src="/logos/prostaff-logo.png" alt="ProStaff" width={64} height={64} />
              <h3 className="prod-name">ProStaff</h3>
            </div>
            <div className="prod-cols">
              <div>
                <p className="p-body">{prostaff.body}</p>
                <a
                  href="https://prostaff.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prod-cta"
                >
                  {prostaff.cta}
                </a>
              </div>
              <div>
                <span className="prod-col-label">{tProd("whatItDoes")}</span>
                <ul className="feature-list">
                  {(prostaff.features as string[]).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="prod-col-label">{tProd("builtFor")}</span>
                <ul className="feature-list">
                  {(prostaff.builtFor as string[]).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="prod-band alt" id="scrims">
          <div className="wrap">
            <span className="prod-eyebrow">{scrims.eyebrow}</span>
            <div className="prod-head">
              <Image
                src="/logos/scrims-logo.png"
                alt="scrims.lol"
                width={64}
                height={64}
                className="is-scrims"
              />
              <h3 className="prod-name">scrims.lol</h3>
            </div>
            <div className="prod-cols">
              <div>
                <p className="p-body">{scrims.body}</p>
                <a
                  href="https://scrims.lol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prod-cta"
                >
                  {scrims.cta}
                </a>
              </div>
              <div>
                <span className="prod-col-label">{tProd("whatItDoes")}</span>
                <ul className="feature-list">
                  {(scrims.features as string[]).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="prod-col-label">{tProd("builtFor")}</span>
                <ul className="feature-list">
                  {(scrims.builtFor as string[]).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="prod-band" id="arenabr">
          <div className="wrap">
            <span className="prod-eyebrow">{arenabr.eyebrow}</span>
            <div className="prod-head">
              <Image
                src="/logos/arenabr-logo.png"
                alt="ArenaBR"
                width={155}
                height={48}
                className="is-wordmark"
              />
            </div>
            <div className="prod-cols">
              <div>
                <p className="p-body">{arenabr.body}</p>
                <a
                  href="https://arena-br.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prod-cta"
                >
                  {arenabr.cta}
                </a>
              </div>
              <div>
                <span className="prod-col-label">{tProd("whatItDoes")}</span>
                <ul className="feature-list">
                  {(arenabr.features as string[]).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="prod-col-label">{tProd("builtFor")}</span>
                <ul className="feature-list">
                  {(arenabr.builtFor as string[]).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="prod-band alt" id="peneira">
          <div className="wrap">
            <span className="prod-eyebrow">{peneira.eyebrow}</span>
            <div className="prod-head">
              <Image src="/logos/peneira-logo.png" alt="peneira.gg" width={64} height={64} />
              <h3 className="prod-name">peneira.gg</h3>
              <span className="prod-status">{peneira.status}</span>
            </div>
            <div className="prod-cols">
              <div>
                <p className="p-body">{peneira.body}</p>
              </div>
              <div>
                <span className="prod-col-label">{tProd("whatItDoes")}</span>
                <ul className="feature-list">
                  {(peneira.features as string[]).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="prod-col-label">{tProd("builtFor")}</span>
                <ul className="feature-list">
                  {(peneira.builtFor as string[]).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
