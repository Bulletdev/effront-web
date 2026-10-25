import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CapabilitiesPuzzle, type CapPiece } from "@/components/CapabilitiesPuzzle";
import { Icon, type IconName } from "@/components/Icon";
import { Accordion } from "@/components/Accordion";
import { Statement, withSentenceBreaks } from "@/components/Statement";
import { Reveal } from "@/components/Reveal";
import { Credentials } from "@/components/Credentials";
import { ClientLogos } from "@/components/ClientLogos";
import { HeroFx } from "@/components/HeroFx";
import { SERVICES } from "@/data/services";
import { CREDENTIALS } from "@/data/credentials";
import { CLIENTS } from "@/data/clients";
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
        {p.icon && <Icon name={p.icon} size={20} className="shrink-0" />}
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
  const tCred = await getTranslations("Credentials");
  const tClients = await getTranslations("Clients");
  const tContact = await getTranslations("Contact");

  // sections 01-03 are always shown; credentials/clients render only once
  // real data exists (see src/data/credentials.ts, src/data/clients.ts), so
  // the running index shifts to keep numbering contiguous either way
  const showCredentials = CREDENTIALS.length > 0;
  const showClients = CLIENTS.length > 0;
  let sectionIdx = 3;
  const credIdx = showCredentials ? ++sectionIdx : null;
  const clientsIdx = showClients ? ++sectionIdx : null;
  const contactIdx = ++sectionIdx;
  const pad = (n: number) => String(n).padStart(2, "0");

  const heroWord = (tHero.raw("words") as string[])[0];
  const capItems = tCap.raw("items") as { tag: string; title: string; body: string }[];

  const capIcons: IconName[] = ["search", "bug", "crosshair", "gauge", "clipboard", "shield-check"];
  const capPieces: CapPiece[] = capItems.map((item, i) => ({
    ...item,
    image: null,
    icon: capIcons[i],
  }));

  const servicePieces: CapPiece[] = SERVICES.map((meta) => {
    const copy = tServ.raw(meta.id) as { eyebrow: string; name: string; tagline: string };
    return {
      tag: copy.eyebrow,
      title: copy.name,
      body: copy.tagline,
      image: null,
      href: `/services#${meta.id}`,
      icon: meta.icon,
    };
  });

  return (
    <>
      <SiteNav locale={locale as Locale} pathname="/" />

      <header className="hero">
        <HeroFx />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>
              <span className="lead">{tHero("lead")}</span>{" "}
              <span className="gold glitch">
                {heroWord}
                <span className="glitch-layer glitch-a" aria-hidden="true">
                  {heroWord}
                </span>
                <span className="glitch-layer glitch-b" aria-hidden="true">
                  {heroWord}
                </span>
              </span>
            </h1>
            <p
              className="hero-sub"
              dangerouslySetInnerHTML={{ __html: withSentenceBreaks(tHero.raw("sub")) }}
            />
            <div className="hero-ctas">
              <Link href="/services" className="btn-tactical btn-tactical--ghost">
                {tHero("ctaLearn")}
              </Link>
            </div>
            <p
              className="hero-note"
              dangerouslySetInnerHTML={{ __html: withSentenceBreaks(tHero.raw("note")) }}
            />
          </div>
          {/* swap to /brandkit/effront_gargoyle_hero.svg (official hero mascot)
              once the file is restored — it vanished from public/brandkit */}
          <div className="hero-art" aria-hidden="true">
            <Image
              src="/brandkit/Gárgula Mecânica com Hologramas Cibernéticos.png"
              alt=""
              width={1374}
              height={1145}
              priority
            />
          </div>
        </div>
      </header>

      <section id="missao" className="mission-section section-band">
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

      <section id="servicos" className="has-ghost">
        <span className="ghost-word" aria-hidden="true">
          {tServ("sectionLabel")}
        </span>
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

      <section id="capacidades" className="has-ghost">
        <span className="ghost-word" aria-hidden="true">
          {tCap("sectionLabel")}
        </span>
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
            <a
              href="mailto:contato@effront.gg"
              className="btn-tactical mt-12"
              target="_blank"
              rel="noopener noreferrer"
            >
              {tServ("cta")}
            </a>
          </Reveal>
        </div>
      </section>

      {showCredentials && (
        <section id="credenciais">
          <div className="wrap">
            <Reveal>
              <div className="sec-label">
                <span className="idx">{pad(credIdx!)}</span>
                <span>{tCred("sectionLabel")}</span>
              </div>
              <Credentials heading={tCred("heading")} intro={tCred("intro")} />
            </Reveal>
          </div>
        </section>
      )}

      {showClients && (
        <section id="clientes">
          <div className="wrap">
            <Reveal>
              <div className="sec-label">
                <span className="idx">{pad(clientsIdx!)}</span>
                <span>{tClients("sectionLabel")}</span>
              </div>
              <div className="cap-head">
                <h2>{tClients("heading")}</h2>
                <p>{tClients("intro")}</p>
              </div>
              <div className="mt-10">
                <ClientLogos />
              </div>
            </Reveal>
          </div>
        </section>
      )}

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
            <div className="sec-label">
              <span className="idx">{pad(contactIdx)}</span>
              <span>{tContact("sectionLabel")}</span>
            </div>
            <h2>{tContact("heading")}</h2>
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
        <p className="contact-manifesto">{tContact("sub")}</p>
      </section>

      <div className="watermark" aria-hidden="true">
        <span>EFFRONT</span>
      </div>

      <SiteFooter />
    </>
  );
}
