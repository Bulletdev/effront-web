import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { inter, bricolage } from "@/fonts";
import { RightClickGuard } from "@/components/RightClickGuard";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("titleLanding"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : locale}
      className={`${inter.variable} ${bricolage.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">
        <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
        <RightClickGuard />
      </body>
    </html>
  );
}
