import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque } from "next/font/google";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { isLocale, locales, messages } from "@/lib/i18n";
import { site } from "@/lib/data";
import "../globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--font-bricolage" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Rambo Facility Management", template: "%s" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  name: "Rambo Facility Management",
  url: site.url,
  telephone: `+${site.phone}`,
  email: site.email,
  areaServed: site.city,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "AL" },
  openingHours: "Mo-Su 08:00-20:00",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam;

  return (
    <html lang={locale}>
      <body className={`${bricolage.variable} font-sans antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header locale={locale} />
        {children}
        <WhatsAppButton locale={locale} />
      </body>
    </html>
  );
}
