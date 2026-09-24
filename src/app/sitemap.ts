import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projeler`, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({
      url: `${base}/projeler/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
