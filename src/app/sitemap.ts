import type { MetadataRoute } from "next";
import { getPageUpdates, getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/site";

// Sanity'ye eklenen projeler sitemap'e de yansısın.
export const revalidate = 60;

/** ISO tarihlerinden en yenisi (hiçbiri yoksa undefined → lastModified yazılmaz) */
function latest(...dates: (string | undefined)[]) {
  const times = dates.filter(Boolean).map((d) => Date.parse(d!)).filter((t) => !Number.isNaN(t));
  return times.length ? new Date(Math.max(...times)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, pages] = await Promise.all([getProjects(), getPageUpdates()]);
  const projectDates = projects.map((p) => p.updatedAt);
  // Ana sayfa ve proje listesi projeleri de gösterdiği için proje güncellemeleri de sayılır
  const entries: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: latest(pages.home, ...projectDates), changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/projeler`,
      lastModified: latest(pages.projectsPage, ...projectDates),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((p) => ({
      url: `${siteUrl}/projeler/${p.slug}`,
      lastModified: latest(p.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
  return entries.map(({ lastModified, ...entry }) => (lastModified ? { ...entry, lastModified } : entry));
}
