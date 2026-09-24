export const siteConfig = {
  name: "Masif Tasarım ve Uygulama",
  shortName: "Masif",
  tagline: "Tasarımdan Uygulamaya",
  description:
    "Masif Tasarım ve Uygulama; konut, kafe, restoran ve ticari mekânlar için mimari tasarım, iç mimarlık, 3D görselleştirme ve anahtar teslim uygulama hizmetleri sunar.",
  // Yayına alınırken gerçek alan adı NEXT_PUBLIC_SITE_URL ile verilmeli.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "tr_TR",
  phones: [
    { label: "0542 611 61 38", href: "tel:+905426116138" },
    { label: "0539 976 81 05", href: "tel:+905399768105" },
  ],
  whatsapp: "905426116138",
  // Gerçek bilgiler geldiğinde doldurulacak; boş bırakılan alanlar sitede gösterilmez.
  email: "",
  address: "",
  instagram: "",
} as const;

export const navItems = [
  { label: "Stüdyo", href: "/#hakkimizda" },
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "Projeler", href: "/projeler" },
  { label: "Süreç", href: "/#surec" },
  { label: "İletişim", href: "/#iletisim" },
] as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
