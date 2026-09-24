import { cache } from "react";
import { defaultAbout, defaultHome, defaultProjectsPage, defaultServices, defaultSettings } from "@/content/defaults";
import type { AboutContent, HomeContent, Img, ProjectsPageContent, Service, SiteSettings } from "@/content/types";
import { projects as fallbackProjects, type Project, type ProjectCategory } from "@/lib/projects";
import { sanityFetch, toImg, type SanityImage } from "@/sanity/client";
import {
  aboutQuery,
  homeQuery,
  projectsPageQuery,
  projectsQuery,
  servicesQuery,
  settingsQuery,
} from "@/sanity/queries";

/**
 * Sitenin tüm içerik erişimi buradan geçer. Her fonksiyon önce Sanity'yi dener;
 * boş bırakılan alanlar ve erişim hataları için yedek içeriğe döner.
 */

type Raw<T> = { [K in keyof T]?: unknown } | null;

const isFilled = (v: unknown) =>
  v !== null && v !== undefined && !(typeof v === "string" && v.trim() === "") && !(Array.isArray(v) && v.length === 0);

/** Sanity'den gelen dolu alanları yedek içeriğin üzerine yazar. */
function merge<T extends object>(fallback: T, data: Raw<T>, images: Partial<Record<keyof T, Img | undefined>> = {}): T {
  if (!data) return fallback;
  const result = { ...fallback } as Record<string, unknown>;
  for (const key of Object.keys(fallback) as (keyof T & string)[]) {
    if (key in images) {
      const img = images[key];
      if (img) result[key] = img;
    } else if (isFilled(data[key])) {
      result[key] = data[key];
    }
  }
  // Yedek içerikte olmayan isteğe bağlı alanlar (ör. heroImage, ogImage)
  for (const [key, img] of Object.entries(images)) if (img) result[key] = img;
  return result as T;
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await sanityFetch<Raw<SiteSettings> & { ogImage?: SanityImage }>(settingsQuery);
  return merge(defaultSettings, data, { ogImage: toImg(data?.ogImage, 1200) });
});

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const data = await sanityFetch<Raw<HomeContent> & { heroImage?: SanityImage; whyImage?: SanityImage }>(homeQuery);
  return merge(defaultHome, data, {
    heroImage: toImg(data?.heroImage),
    whyImage: toImg(data?.whyImage, 1400),
  });
});

export const getAboutContent = cache(async (): Promise<AboutContent> => {
  const data = await sanityFetch<Raw<AboutContent> & { mainImage?: SanityImage; detailImage?: SanityImage }>(aboutQuery);
  return merge(defaultAbout, data, {
    mainImage: toImg(data?.mainImage, 1600),
    detailImage: toImg(data?.detailImage, 1200),
  });
});

export const getProjectsPageContent = cache(async (): Promise<ProjectsPageContent> => {
  const data = await sanityFetch<Raw<ProjectsPageContent>>(projectsPageQuery);
  return merge(defaultProjectsPage, data);
});

export const getServices = cache(async (): Promise<Service[]> => {
  const data = await sanityFetch<Partial<Service>[]>(servicesQuery);
  const services = (data ?? [])
    .filter((s) => s.title)
    .map((s) => ({
      title: s.title!,
      text: s.text ?? "",
      tags: s.tags ?? [],
      showInFooter: s.showInFooter ?? true,
      shortTitle: s.shortTitle || undefined,
    }));
  return services.length ? services : defaultServices;
});

type RawProject = Omit<Partial<Project>, "cover" | "gallery"> & { cover?: SanityImage; gallery?: SanityImage[] };

export const getProjects = cache(async (): Promise<Project[]> => {
  const data = await sanityFetch<RawProject[]>(projectsQuery);
  const projects = (data ?? []).flatMap((p): Project[] => {
    const cover = toImg(p.cover);
    if (!p.title || !p.slug || !cover) return [];
    return [
      {
        slug: p.slug,
        title: p.title,
        category: (p.category ?? "Konut") as ProjectCategory,
        location: p.location ?? "",
        year: p.year ?? "",
        area: p.area ?? "",
        services: p.services ?? [],
        summary: p.summary ?? "",
        description: p.description ?? [],
        cover,
        gallery: (p.gallery ?? []).map((img) => toImg(img)).filter((img): img is Img => Boolean(img)),
        featured: Boolean(p.featured),
      },
    ];
  });
  return projects.length ? projects : fallbackProjects;
});

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getFeaturedProjects() {
  return (await getProjects()).filter((p) => p.featured);
}

export async function getAdjacentProject(slug: string) {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}

/** Ana sayfa galerisi: proje galerilerinden derlenen, tekrarsız en fazla 9 görsel */
export async function getGalleryImages() {
  const seen = new Set<string>();
  return (await getProjects())
    .flatMap((p) => p.gallery.map((img) => ({ ...img, project: p.title, slug: p.slug })))
    .filter((img) => !seen.has(img.src) && seen.add(img.src))
    .slice(0, 9);
}
