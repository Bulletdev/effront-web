"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LangSwitch } from "./LangSwitch";
import { MenuIcon } from "./MenuIcon";
import type { Locale } from "@/i18n/routing";

export function SiteNav({ locale, pathname }: { locale: Locale; pathname: string }) {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  const linkClass = "text-[14px] font-medium text-(--muted-fg) transition-colors hover:text-(--fg)";

  return (
    <nav className="site-nav">
      <div className="wrap flex h-[72px] items-center justify-between">
        <Link href="/" className="wordmark" onClick={() => setOpen(false)}>
          Effront<span className="dot">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/services" className={linkClass}>
            {t("services")}
          </Link>
          <Link href="/careers" className={linkClass}>
            {t("careers")}
          </Link>
          <Link href="/about" className={linkClass}>
            {t("about")}
          </Link>
          <LangSwitch locale={locale} pathname={pathname} />
          <Link href="/#contato" className="btn-primary">
            {t("talk")}
          </Link>
        </div>

        <button
          type="button"
          className="grid h-9 w-9 place-content-center text-(--fg) md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <div className="mobile-nav-panel md:hidden">
          <div className="wrap flex flex-col gap-1 py-4">
            <Link href="/services" className="mobile-nav-link" onClick={() => setOpen(false)}>
              {t("services")}
            </Link>
            <Link href="/careers" className="mobile-nav-link" onClick={() => setOpen(false)}>
              {t("careers")}
            </Link>
            <Link href="/about" className="mobile-nav-link" onClick={() => setOpen(false)}>
              {t("about")}
            </Link>
            <div className="mt-3 flex items-center justify-between gap-4">
              <LangSwitch locale={locale} pathname={pathname} />
              <Link href="/#contato" className="btn-primary" onClick={() => setOpen(false)}>
                {t("talk")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
