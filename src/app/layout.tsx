import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/content";
import { siteUrl, toIntlNumber } from "@/lib/site";
import "./globals.css";

// Sanity'deki değişiklikler en geç 60 saniye içinde siteye yansır.
export const revalidate = 60;

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.seoTitle,
      template: `%s | ${settings.name}`,
    },
    description: settings.seoDescription,
    keywords: settings.seoKeywords,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: settings.name,
      title: settings.name,
      description: settings.seoDescription,
      ...(settings.ogImage && { images: [{ url: settings.ogImage.src, alt: settings.ogImage.alt }] }),
    },
    twitter: { card: "summary_large_image" },
    alternates: { canonical: "/" },
  };
}

export const viewport: Viewport = {
  themeColor: "#faf8f4",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: settings.name,
    description: settings.seoDescription,
    url: siteUrl,
    telephone: settings.phones,
    slogan: settings.tagline,
    ...(settings.email && { email: settings.email }),
    ...(settings.address && { address: settings.address }),
    ...(settings.socialLinks.length && { sameAs: settings.socialLinks.map((s) => s.url) }),
    ...(settings.whatsapp && { contactPoint: { "@type": "ContactPoint", telephone: `+${toIntlNumber(settings.whatsapp)}`, contactType: "customer service" } }),
  };

  return (
    <html lang="tr" className={`${manrope.variable} ${instrument.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          İçeriğe geç
        </a>
        <Header phones={settings.phones} logoLight={settings.logoLight} logoDark={settings.logoDark} />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
