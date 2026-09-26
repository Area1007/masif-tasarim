import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { RichText } from "@/components/ui/RichText";
import { getHomeContent, getProjects, getSiteSettings } from "@/lib/content";
import { trimLogo } from "@/sanity/client";

export async function Hero() {
  const [home, projects, settings] = await Promise.all([getHomeContent(), getProjects(), getSiteSettings()]);
  const heroProject = projects.find((p) => p.slug === home.heroProjectSlug) ?? projects[0];
  const image = home.heroImage ?? heroProject.cover;
  // Büyük marka logosu: Site Ayarları → "Site Logosu - Açık". Kenar boşlukları kırpılır ki
  // logo başlıkla aynı sol hizaya otursun. Logo yoksa bu alan hiç gösterilmez.
  const brandLogo = settings.logoLight ? await trimLogo(settings.logoLight) : undefined;

  return (
    <section aria-label="Giriş" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          preload
          sizes="100vw"
          quality={85}
          className="animate-hero-zoom object-cover"
          style={{ objectPosition: image.position }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/75" />
      </div>

      <Container className="flex flex-1 flex-col justify-end pb-10 pt-32 sm:pb-14 short-desktop:pb-5 short-desktop:pt-[104px]">
        {brandLogo && (
          /*
           * Mobil/tablet: sabit genişlik (200px / 264px), yükseklik orandan.
           * Masaüstü (lg): logo, hero'da başlık ve metinlerden arta kalan dikey alanı doldurur;
           * genişliği 210px ile 360px arasında kalır (sınırlar logonun kendi oranından yüksekliğe
           * çevrilir). Böylece kısa ekranlarda içerik ilk ekrana sığar, uzun ekranlarda 360px'e kadar büyür.
           */
          <div
            className="animate-fade-up mb-10 shrink-0 sm:mb-12 lg:mb-[clamp(24px,4svh,48px)] short-desktop:mb-6 lg:flex lg:min-h-0 lg:max-h-(--logo-max-h) short-desktop:max-h-(--logo-max-h-short) lg:grow lg:basis-(--logo-min-h)"
            style={
              {
                animationDelay: "100ms",
                "--logo-max-h": `${(360 * brandLogo.height) / brandLogo.width}px`,
                // Kısa-geniş masaüstünde (ör. 1366×768) logo en fazla 280px genişlikte kalır
                "--logo-max-h-short": `${(280 * brandLogo.height) / brandLogo.width}px`,
                "--logo-min-h": `${(210 * brandLogo.height) / brandLogo.width}px`,
              } as React.CSSProperties
            }
          >
            {/* Oran korunur: object-contain; masaüstünde yükseklik kutudan, genişlik orandan gelir */}
            <Image
              src={brandLogo.src}
              alt={brandLogo.alt || "Masif Tasarım ve Uygulama logosu"}
              width={brandLogo.width}
              height={brandLogo.height}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 264px, 200px"
              loading="eager"
              className="h-auto w-[200px] object-contain object-left sm:w-[264px] lg:h-full lg:w-auto lg:max-w-[360px]"
            />
          </div>
        )}
        <p
          className={`animate-fade-up mb-6 text-[11px] font-medium uppercase tracking-[0.32em] text-paper/80 short-desktop:mb-4 ${
            // Kısa-geniş masaüstünde logo varken gizlenir: logonun alt yazısıyla üst üste iki küçük
            // satır oluşmasın ve açılan alan logoyu büyütsün. Logo yoksa etiket her yerde görünür.
            brandLogo ? "short-desktop:hidden" : ""
          }`}
          style={{ animationDelay: "200ms" }}
        >
          {home.heroEyebrow}
        </p>
        <h1
          className="animate-fade-up max-w-5xl font-display text-[clamp(2.5rem,6vw,5.75rem)] leading-[0.98] tracking-[-0.02em]"
          style={{ animationDelay: "350ms" }}
        >
          <RichText value={home.heroTitle} emClassName="text-bone/90" />
        </h1>

        <div
          className="animate-fade-up mt-12 flex flex-col gap-8 border-t border-paper/25 pt-8 sm:mt-16 sm:flex-row sm:items-end sm:justify-between short-desktop:mt-8 short-desktop:pt-5"
          style={{ animationDelay: "600ms" }}
        >
          <p className="max-w-md text-[15px] leading-relaxed text-paper/80">
            {home.heroText}
          </p>
          <div className="flex items-center gap-8">
            <Link
              href={`/projeler/${heroProject.slug}`}
              className="group text-right text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
            >
              <span className="block text-paper/50">Öne çıkan proje</span>
              <span className="mt-1 block text-paper">
                {heroProject.title} — {heroProject.location}
              </span>
            </Link>
            <Link
              href="#marka"
              aria-label="Aşağı kaydır"
              className="hidden size-14 shrink-0 items-center justify-center rounded-full border border-paper/40 transition-colors duration-500 hover:bg-paper hover:text-ink sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="size-5" aria-hidden>
                <path d="M12 4v15M6 13l6 6 6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
