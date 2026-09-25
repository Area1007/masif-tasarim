import { createClient, type QueryParams } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Img } from "@/content/types";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
};

export const isSanityConfigured = Boolean(sanityConfig.projectId);

// useCdn: false → her zaman en güncel yayınlanmış veri. Webhook sayfayı yayından hemen
// sonra yenilediğinde Sanity'nin API CDN'i birkaç saniye eski veri döndürebilir ve bu eski
// veri sayfada kalırdı. Sayfalar Next.js tarafından önbelleklendiği için API'ye yalnızca
// sayfa yeniden üretilirken istek gider; CDN'e ihtiyaç yok.
const client = isSanityConfigured
  ? createClient({ ...sanityConfig, useCdn: false, perspective: "published" })
  : null;

const builder = isSanityConfigured ? createImageUrlBuilder(sanityConfig) : null;

/**
 * Sanity'den veri çeker. Sanity yapılandırılmamışsa, erişilemiyorsa veya hata
 * oluşursa `null` döner; çağıran taraf yedek içeriğe geçer. Böylece CMS'teki bir
 * sorun sitenin çalışmasını engellemez.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.warn("[sanity] Veri alınamadı, yedek içerik kullanılıyor:", (error as Error).message);
    return null;
  }
}

/** Sorgulardan dönen ham Sanity görsel nesnesi */
export type SanityImage = {
  asset?: { _ref?: string; _id?: string };
  alt?: string;
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
} | null;

/** Sanity görselini sitenin kullandığı `{ src, alt, position }` biçimine çevirir. */
export function toImg(image: SanityImage | undefined, width = 2400): Img | undefined {
  if (!builder || !image?.asset) return undefined;
  return {
    src: builder.image(image).width(width).fit("max").auto("format").quality(80).url(),
    alt: image.alt ?? "",
    position: image.hotspot ? `${(image.hotspot.x * 100).toFixed(1)}% ${(image.hotspot.y * 100).toFixed(1)}%` : undefined,
  };
}
