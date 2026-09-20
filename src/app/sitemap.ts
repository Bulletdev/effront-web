import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://effront.gg";

const ROUTES = ["/", "/about", "/services", "/careers", "/news", "/privacy", "/media-kit"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${getPathname({ locale, href })}`,
      lastModified: new Date(),
    })),
  );
}
