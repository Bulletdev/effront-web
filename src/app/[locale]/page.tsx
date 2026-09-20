import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Search, Bug, Crosshair, Gauge, ClipboardCheck, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CapabilitiesPuzzle, type CapPiece } from "@/components/CapabilitiesPuzzle";
import { Accordion } from "@/components/Accordion";
import { Statement, withSentenceBreaks } from "@/components/Statement";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { SERVICES } from "@/data/services";
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

function toAccordionItems(pieces: CapPiece[]) {
  return pieces.map((p) => ({
    title: (
      <span className="flex items-center gap-3 text-left">
        {p.Icon && <p.Icon size={20} strokeWidth={1.75} className="shrink-0 text-(--gold)" />}
        <span className="flex flex-col gap-0.5">
          <span className="line-clamp-1 text-[10.5px] font-bold tracking-[0.1em] text-(--teal) uppercase">
            {p.tag}
          </span>
          <span className="text-[15px] font-bold">{p.title}</span>
        </span>
      </span>
    ),
    body: p.href ? (
      <>
        <p>{p.body}</p>
        <Link href={p.href} className="mission-link mt-3 inline-block">
          {p.title} →
        </Link>
      </>
    ) : (
      p.body
    ),
  }));
}

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Hero");
  const tMission = await getTranslations("Mission");
  const tCap = await getTranslations("Capabilities");
  const tServ = await getTranslations("Services");
  const tContact = await getTranslations("Contact");

  const heroWord = (tHero.raw("words") as string[])[0];
  const capItems = tCap.raw("items") as { tag: string; title: string; body: string }[];

  const capIcons = [Search, Bug, Crosshair, Gauge, ClipboardCheck, ShieldCheck];
  const capPieces: CapPiece[] = capItems.map((item, i) => ({
    ...item,
    image: null,
    Icon: capIcons[i],
  }));

  const servicePieces: CapPiece[] = SERVICES.map((meta) => {
    const copy = tServ.raw(meta.id) as { eyebrow: string; name: string; tagline: string };
    return {
      tag: copy.eyebrow,
      title: copy.name,
      body: copy.tagline,
      image: null,
      href: `/services#${meta.id}`,
      Icon: meta.Icon,
    };
  });

  return (
    <>
      <SiteNav locale={locale as Locale} pathname="/" />

      <header className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>
              <span className="lead">{tHero("lead")}</span>
              <span className="gold block">{heroWord}</span>
            </h1>
            <p
              className="hero-sub"
              dangerouslySetInnerHTML={{ __html: withSentenceBreaks(tHero.raw("sub")) }}
            />
            <p
              className="hero-note"
              dangerouslySetInnerHTML={{ __html: withSentenceBreaks(tHero.raw("note")) }}
            />
          </div>
          <div className="hero-art" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/sophistication.svg" alt="" />
          </div>
        </div>
      </header>

      <section id="missao" className="mission-section">
        <div className="mission-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/illustrations/hero.svg" alt="" />
        </div>
        <div className="wrap">
          <Reveal>
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
          </Reveal>
        </div>
      </section>

      <section id="servicos">
        <div className="wrap">
          <Reveal>
            <div className="sec-label">
              <span className="idx">02</span>
              <span>{tServ("sectionLabel")}</span>
            </div>
            <div className="cap-head">
              <h2>{tServ("heading")}</h2>
              <p>{tServ("pageIntro")}</p>
            </div>
            <div className="cap-puzzle-desktop">
              <CapabilitiesPuzzle items={servicePieces} />
            </div>
            <div className="cap-list-mobile">
              <Accordion items={toAccordionItems(servicePieces)} />
            </div>
            <Link href="/services" className="mission-link mt-10 inline-block">
              {tServ("viewAll")}
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="capacidades">
        <div className="wrap">
          <Reveal>
            <div className="sec-label">
              <span className="idx">03</span>
              <span>{tCap("sectionLabel")}</span>
            </div>
            <div className="cap-head">
              <h2>{tCap("heading")}</h2>
              <p>{tCap("intro")}</p>
            </div>
            <div className="cap-puzzle-desktop">
              <CapabilitiesPuzzle items={capPieces} />
            </div>
            <div className="cap-list-mobile">
              <Accordion items={toAccordionItems(capPieces)} />
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
              body={<Statement text={tContact("sub")} />}
              href="mailto:contato@effront.gg"
              cta="contato@effront.gg"
              art="/illustrations/contact.svg"
            />
          </Reveal>
        </div>
      </section>

      <div className="watermark" aria-hidden="true">
        <span>EFFRONT</span>
      </div>

      <SiteFooter />
    </>
  );
}
