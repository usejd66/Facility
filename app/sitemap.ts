import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { locales } from "@/lib/i18n";

const paths = ["", "/rreth-nesh", "/kontakt"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, `${site.url}/${locale}${path}`]));
    return locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path ? 0.8 : 1,
      alternates: { languages },
    }));
  });
}
