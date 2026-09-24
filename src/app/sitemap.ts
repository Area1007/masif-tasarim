import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/site";

// Sanity'ye eklenen projeler sitemap'e de yansısın.
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projeler`, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({
      url: `${siteUrl}/projeler/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
