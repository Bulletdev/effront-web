import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer>
      <div className="wrap">
        <div className="foot-brand">
          <Link href="/" className="foot-logo-link">
            <Image
              className="foot-logo"
              src="/brandkit/Logo Emblema Cibernético do Gárgula Digital.png"
              alt="Effront"
              width={1254}
              height={1254}
            />
          </Link>
          <span className="foot-tagline">Offensive security for gaming</span>
        </div>
        <div className="foot-bottom">
          <nav className="foot-nav">
            <Link href="/careers">{t("careers")}</Link>
            <Link href="/news">{t("news")}</Link>
            <Link href="/privacy">{t("privacy")}</Link>
            <Link href="/media-kit">{t("mediaKit")}</Link>
          </nav>
          <span className="copyright">{t("copyright")}</span>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
