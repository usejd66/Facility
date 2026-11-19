import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/lib/data";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--font-bricolage" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Rambo.al | Pastrim profesional në Tiranë",
  description: "Pastrim shtëpish, zyrash dhe pas ndërtimit në Tiranë. Çmim i qartë, produkte të përfshira, ofertë falas brenda një ore.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rambo.al | Pastrim profesional në Tiranë",
    description: "Kërko ofertë falas për pastrim shtëpie, zyre ose pas ndërtimit.",
    url: site.url,
    locale: "sq_AL",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  name: "Rambo",
  url: site.url,
  telephone: `+${site.phone}`,
  email: site.email,
  areaServed: site.city,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "AL" },
  openingHours: "Mo-Su 08:00-20:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq">
      <body className={`${bricolage.variable} font-sans antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}