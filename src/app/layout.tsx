import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServices, getSiteSettings } from "@/lib/content";
import { getDefaultShareImages, openGraphFor, siteJsonLd } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
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

// Canonical burada tanımlanmaz: kök layout'ta verilen canonical tüm alt sayfalara
// (404 dahil) miras kalırdı. Her sayfa kendi canonical'ını tanımlar.
export async function generateMetadata(): Promise<Metadata> {
  const [settings, images] = await Promise.all([getSiteSettings(), getDefaultShareImages()]);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.seoTitle,
      template: `%s | ${settings.name}`,
    },
    description: settings.seoDescription,
    keywords: settings.seoKeywords,
    // Kendi openGraph'ını tanımlamayan sayfalar için varsayılan (ör. 404)
    openGraph: openGraphFor(settings, {
      title: settings.seoTitle,
      description: settings.seoDescription,
      images,
    }),
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#faf8f4",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, services, images] = await Promise.all([getSiteSettings(), getServices(), getDefaultShareImages()]);
  const jsonLd = siteJsonLd(
    settings,
    services.map((s) => s.title),
    images?.[0]?.url,
  );

  return (
    <html lang="tr" className={`${manrope.variable} ${instrument.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          İçeriğe geç
        </a>
        <Header phones={settings.phones} />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={jsonLd} />
      </body>
    </html>
  );
}
