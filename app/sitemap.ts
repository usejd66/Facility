import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((locale) => [locale, `${site.url}/${locale}`]));
  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
