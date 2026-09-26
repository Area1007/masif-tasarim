import { createClient, type QueryParams } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Img, LogoImage } from "@/content/types";

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

/** Sorgudan dönen ham logo nesnesi (bkz. queries.ts → logo) */
export type SanityLogo = {
  alt?: string;
  asset?: { _id?: string; extension?: string; width?: number; height?: number } | null;
} | null;

/**
 * Sanity logosunu olduğu gibi (kırpmasız, orijinal boyut ve oranla) döndürür.
 * SVG logolar PNG'ye çevrilir (Next.js görsel optimizasyonu SVG kabul etmez).
 */
export function toLogo(logo: SanityLogo | undefined): LogoImage | undefined {
  const asset = logo?.asset;
  if (!builder || !asset?._id || !asset.width || !asset.height) return undefined;
  const url = builder.image(asset._id);
  return {
    src: (asset.extension === "svg" ? url.format("png") : url.auto("format")).url(),
    alt: logo?.alt ?? "",
    width: asset.width,
    height: asset.height,
    assetId: asset._id,
  };
}

/** PNG dosyasının başlığından (IHDR) genişlik ve yüksekliği okur. */
function readPngSize(bytes: Uint8Array): { width: number; height: number } | null {
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  if (bytes.length < 24 || signature.some((b, i) => bytes[i] !== b)) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const width = view.getUint32(16);
  const height = view.getUint32(20);
  return width > 0 && height > 0 ? { width, height } : null;
}

/**
 * Logonun etrafındaki şeffaf/tek renkli boşluğu Sanity görsel servisiyle kırpar
 * (`trim=auto`), böylece logo yanındaki metinlerle aynı hizaya oturur. Dosyanın
 * kendisi değişmez. Kırpılmış görselin boyutu PNG başlığından okunur (oran kesin olsun
 * diye); aynı adres her zaman aynı sonucu verdiği için bu istek önbelleğe alınır.
 * Herhangi bir sorunda kırpılmamış logo kullanılır.
 */
export async function trimLogo(logo: LogoImage): Promise<LogoImage> {
  if (!builder || !logo.assetId) return logo;
  const src = `${builder.image(logo.assetId).format("png").url()}&trim=auto`;
  try {
    const res = await fetch(src, { headers: { Range: "bytes=0-63" }, cache: "force-cache" });
    if (!res.ok) return logo;
    const size = readPngSize(new Uint8Array(await res.arrayBuffer()));
    return size ? { ...logo, src, ...size } : logo;
  } catch {
    return logo;
  }
}

/** Sanity görselini sitenin kullandığı `{ src, alt, position }` biçimine çevirir. */
export function toImg(image: SanityImage | undefined, width = 2400): Img | undefined {
  if (!builder || !image?.asset) return undefined;
  return {
    src: builder.image(image).width(width).fit("max").auto("format").quality(80).url(),
    alt: image.alt ?? "",
    position: image.hotspot ? `${(image.hotspot.x * 100).toFixed(1)}% ${(image.hotspot.y * 100).toFixed(1)}%` : undefined,
  };
}
