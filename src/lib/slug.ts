/**
 * Proje adresleri (slug) için yardımcılar.
 *
 * Studio'daki `studio/schemaTypes/objects/slug.ts` ile aynı kurallar: iki dosya
 * birlikte güncellenmelidir. Studio ayrı bir paket olduğu için kod paylaşılmıyor.
 */

/** Sitenin kabul ettiği adres biçimi: küçük harf, rakam ve tek tire (ör. "mese-evi") */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const turkishMap: Record<string, string> = { ı: "i", ş: "s", ğ: "g", ü: "u", ö: "o", ç: "c", â: "a", î: "i", û: "u" };

/** "Meşe Evi " → "mese-evi". Geçerli bir slug'ı değiştirmez. */
export function normalizeSlug(input: string): string {
  const trimmed = input.trim();
  if (SLUG_PATTERN.test(trimmed)) return trimmed;
  return trimmed
    .toLocaleLowerCase("tr")
    .replace(/[ışğüöçâîû]/g, (ch) => turkishMap[ch] ?? ch)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " ve ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Next.js dinamik parametreleri URL-kodlanmış halde verebilir (ör. "mese-evi%20").
 * Karşılaştırmadan önce çözülür; bozuk kodlamada ham değer kullanılır.
 */
export function decodeSlugParam(param: string): string {
  try {
    return decodeURIComponent(param);
  } catch {
    return param;
  }
}
