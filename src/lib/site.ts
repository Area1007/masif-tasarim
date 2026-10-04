/** Kodda sabit kalan site yapısı. Düzenlenebilir içerikler Sanity'den gelir (bkz. lib/content.ts). */

// Canonical, sitemap, robots ve Open Graph adreslerinin tabanı. NEXT_PUBLIC_SITE_URL ile
// değiştirilebilir (ör. test ortamı); tanımlı değilse yayındaki alan adı kullanılır.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.masiftasarim.com").replace(/\/+$/, "");

/** Google'ın site adı olarak göstermesi istenen kısa marka adı (WebSite şeması, H1). */
export const brandName = "Masif Tasarım";

/** Yapılandırılmış verideki (JSON-LD) varlıkların kalıcı kimlikleri */
export const schemaIds = {
  website: `${siteUrl}/#website`,
  business: `${siteUrl}/#business`,
};

export const navItems = [
  { label: "Stüdyo", href: "/#hakkimizda" },
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "Projeler", href: "/projeler" },
  { label: "Süreç", href: "/#surec" },
  { label: "İletişim", href: "/#iletisim" },
] as const;

/** "0542 611 61 38" → "905426116138" (uluslararası biçim, yalnızca rakam) */
export function toIntlNumber(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = `90${digits.slice(1)}`;
  if (digits.length === 10) digits = `90${digits}`;
  return digits;
}

export function telHref(phone: string) {
  return `tel:+${toIntlNumber(phone)}`;
}

export function whatsappLink(phone: string, message?: string) {
  const base = `https://wa.me/${toIntlNumber(phone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
