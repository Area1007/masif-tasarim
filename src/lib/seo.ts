/**
 * Sayfa metadata'sı ve yapılandırılmış veri (JSON-LD) için ortak yardımcılar.
 *
 * Not: Next.js, `openGraph` nesnesini segmentler arasında birleştirmez; bir sayfa kendi
 * `openGraph`'ını tanımladığında layout'takinin yerine geçer. Bu yüzden her sayfa
 * `openGraphFor` ile siteName/locale gibi ortak alanları yeniden alır.
 */
import type { Metadata } from "next";
import type { Img, SiteSettings } from "@/content/types";
import type { Project } from "@/lib/projects";
import { getHomeContent, getProjects, getSiteSettings } from "@/lib/content";
import { SHARE_IMAGE_SIZE } from "@/sanity/client";
import { brandName, schemaIds, siteUrl, toIntlNumber } from "@/lib/site";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

export const OG_LOCALE = "tr_TR";

/** Paylaşım görseli: 1200×630 kırpılmış sürüm varsa ölçüleriyle, yoksa olduğu gibi. */
export function shareImagesFor(image: Img | undefined, cropped: boolean) {
  if (!image) return undefined;
  return [{ url: image.src, alt: image.alt, ...(cropped && SHARE_IMAGE_SIZE) }];
}

/** Projenin paylaşım görseli: kırpılmış kapak, Sanity yoksa kapağın kendisi */
export function projectShareImages(project: Project) {
  return project.shareImage ? shareImagesFor(project.shareImage, true) : shareImagesFor(project.cover, false);
}

/**
 * Sitenin varsayılan paylaşım görseli: Site Ayarları'ndaki "Paylaşım görseli",
 * yüklenmemişse ana sayfada öne çıkan projenin kapağı.
 */
export async function getDefaultShareImages() {
  const settings = await getSiteSettings();
  if (settings.ogImage) return shareImagesFor(settings.ogImage, true);
  const [home, projects] = await Promise.all([getHomeContent(), getProjects()]);
  const project = projects.find((p) => p.slug === home.heroProjectSlug) ?? projects[0];
  return project ? projectShareImages(project) : undefined;
}

/** Tüm sayfalarda ortak Open Graph alanları + sayfaya özgü olanlar */
export function openGraphFor(settings: SiteSettings, og: OpenGraph): OpenGraph {
  return { type: "website", locale: OG_LOCALE, siteName: settings.name, ...og } as OpenGraph;
}

/** Site genelindeki varlıklar: WebSite (site adı) + işletme. Adres yalnızca girilmişse eklenir. */
export function siteJsonLd(settings: SiteSettings, services: string[], image?: string) {
  const logo = settings.logoDark ?? settings.logoLight;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": schemaIds.website,
        url: siteUrl,
        name: brandName,
        alternateName: [...new Set([settings.name, "Masif Tasarım ve Uygulama", "masiftasarim.com"])].filter(
          (n) => n !== brandName,
        ),
        inLanguage: "tr-TR",
        publisher: { "@id": schemaIds.business },
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": schemaIds.business,
        name: settings.name,
        alternateName: brandName,
        description: settings.seoDescription,
        url: siteUrl,
        slogan: settings.tagline,
        telephone: settings.phones,
        ...(logo && {
          logo: { "@type": "ImageObject", url: logo.src, width: logo.width, height: logo.height },
        }),
        ...(image && { image }),
        ...(services.length && { knowsAbout: services }),
        ...(settings.email && { email: settings.email }),
        ...(settings.address && { address: settings.address }),
        ...(settings.socialLinks.length && { sameAs: settings.socialLinks.map((s) => s.url) }),
        ...(settings.whatsapp && {
          contactPoint: {
            "@type": "ContactPoint",
            telephone: `+${toIntlNumber(settings.whatsapp)}`,
            contactType: "customer service",
            availableLanguage: "Turkish",
          },
        }),
      },
    ],
  };
}

/** Proje sayfası: sayfa konumu (breadcrumb) */
export function projectBreadcrumbJsonLd(project: Project) {
  const items = [
    { name: "Ana Sayfa", url: siteUrl },
    { name: "Projeler", url: `${siteUrl}/projeler` },
    { name: project.title, url: `${siteUrl}/projeler/${project.slug}` },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}
