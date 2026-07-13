import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductsShowcase, type ShowcaseProduct } from "@/components/ProductsShowcase";
import { CapabilitiesPuzzle, type CapPiece } from "@/components/CapabilitiesPuzzle";
import { Statement, withSentenceBreaks } from "@/components/Statement";
import { PRODUCTS } from "@/data/products";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("titleLanding") };
}

type Props = { params: Promise<{ locale: string }> };

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Hero");
  const tMission = await getTranslations("Mission");
  const tCap = await getTranslations("Capabilities");
  const tProd = await getTranslations("Products");
  const tContact = await getTranslations("Contact");

  const words = tHero.raw("words") as string[];
  const capItems = tCap.raw("items") as { tag: string; title: string; body: string }[];

  // Optional per-piece artwork: rendered only when the webp exists, so the
  // section works today and picks up art the moment it lands in /capabilities.
  const capIds = [
    "draft-intelligence",
    "real-time-matches",
    "multi-tenant",
    "competition",
    "scrim-matchmaking",
    "recruitment",
  ];
  const capPieces: CapPiece[] = capItems.map((item, i) => {
    const id = capIds[i];
    const art = id ? path.join(process.cwd(), "public", "capabilities", `${id}.webp`) : null;
    return {
      ...item,
      image: art && fs.existsSync(art) ? `/capabilities/${id}.webp` : null,
    };
  });

  const showcaseProducts: ShowcaseProduct[] = PRODUCTS.map((meta) => {
    const copy = tProd.raw(meta.id) as {
      eyebrow: string;
      body: string;
      features: string[];
      cta: string;
      status?: string;
    };
    const shot = path.join(process.cwd(), "public", "products", `${meta.id}.webp`);
    return {
      ...meta,
      eyebrow: copy.eyebrow,
      status: copy.status,
      body: copy.body,
      features: copy.features,
      cta: copy.cta,
      image: fs.existsSync(shot) ? `/products/${meta.id}.webp` : null,
    };
  });

  const productLabels = {
    stats: tProd("productStats"),
    clients: tProd("clients"),
    comingSoon: tProd("comingSoon"),
    previewSoon: tProd("previewSoon"),
  };

  return (
    <>
      <SiteNav locale={locale as Locale} pathname="/" />

      <header className="hero">
        <div className="wrap">
          <span className="hero-kicker">
            <span className="diamond" />
            {tHero("kicker")}
          </span>
          <h1>
            <span className="lead">{tHero("lead")}</span>
            <span className="rotate">
              {words.map((w, i) => (
                <span className="word" key={i}>
                  {w}
                </span>
              ))}
            </span>
          </h1>
          <div className="hero-below">
            <p
              className="hero-sub"
              dangerouslySetInnerHTML={{ __html: withSentenceBreaks(tHero.raw("sub")) }}
            />
            <p
              className="hero-note"
              dangerouslySetInnerHTML={{ __html: withSentenceBreaks(tHero.raw("note")) }}
            />
          </div>
        </div>
      </header>

      <section id="missao">
        <div className="wrap">
          <div className="sec-label">
            <span className="idx">01</span>
            <span>{tMission("sectionLabel")}</span>
          </div>
          <p className="mission-statement">
            <span className="dim">{tMission("statementPrefix")}</span>
            <span className="hi">{tMission("statementHighlight")}</span>
            <span className="dim">{tMission("statementSuffix")}</span>
          </p>
          <div className="mission-follow">
            <Statement text={tMission("follow")} />
            <Link href="/about" className="mission-link">
              {tMission("link")}
            </Link>
          </div>
        </div>
      </section>

      <section id="capacidades">
        <div className="wrap">
          <div className="sec-label">
            <span className="idx">02</span>
            <span>{tCap("sectionLabel")}</span>
          </div>
          <div className="cap-head">
            <h2>{tCap("heading")}</h2>
            <p>{tCap("intro")}</p>
          </div>
          <CapabilitiesPuzzle items={capPieces} />
        </div>
      </section>

      <section id="produtos">
        <div className="wrap">
          <div className="sec-label">
            <span className="idx">03</span>
            <span>{tProd("sectionLabel")}</span>
          </div>
          <div className="cap-head">
            <h2>{tProd("heading")}</h2>
            <p>{tProd("pageIntro")}</p>
          </div>
          <ProductsShowcase products={showcaseProducts} labels={productLabels} />
          <Link href="/products" className="mission-link mt-10 inline-block">
            {tProd("viewAll")}
          </Link>
        </div>
      </section>

      <section id="contato">
        <div className="wrap">
          <div className="sec-label">
            <span className="idx">04</span>
            <span>{tContact("sectionLabel")}</span>
          </div>
          <div className="contact-block">
            <h2>{tContact("heading")}</h2>
            <a href="mailto:contato@effront.gg" className="contact-mail">
              contato@effront.gg
            </a>
            <Statement className="contact-sub" text={tContact("sub")} />
          </div>
        </div>
      </section>

      <div className="watermark" aria-hidden="true">
        <span>EFFRONT</span>
      </div>

      <SiteFooter />
    </>
  );
}
