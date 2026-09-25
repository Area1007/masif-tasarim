/**
 * Sanity'de bir belge yayınlandığında hangi sayfaların yenileneceği.
 *
 * `revalidatePath` iki biçimde kullanılır:
 *   - Sabit yol ("/projeler"): yalnızca o sayfa
 *   - Rota kalıbı + tür ("/projeler/[slug]", "page"): kalıba uyan tüm sayfalar
 *   - ("/", "layout"): kök layout ve altındaki tüm sayfalar (header/footer'ı etkileyen içerik)
 */
export type RevalidateTarget = { path: string; type?: "page" | "layout" };

const everything: RevalidateTarget[] = [{ path: "/", type: "layout" }, { path: "/sitemap.xml" }];

const targetsByType: Record<string, RevalidateTarget[]> = {
  // Header (telefon), footer (iletişim, sosyal medya) ve SEO bilgileri her sayfada
  siteSettings: everything,
  // Footer'daki hizmet listesi her sayfada
  service: everything,
  // Ana sayfa bölümleri; iletişim bölümü metinleri /projeler sayfasında da kullanılıyor
  homePage: [{ path: "/" }, { path: "/projeler" }],
  aboutPage: [{ path: "/" }],
  projectsPage: [{ path: "/projeler" }],
  // Projeler: ana sayfa (hero, öne çıkanlar, galeri), liste, tüm detay sayfaları
  // ("sonraki proje" bağlantısı ve adres değişiklikleri nedeniyle) ve sitemap
  project: [
    { path: "/" },
    { path: "/projeler" },
    { path: "/projeler/[slug]", type: "page" },
    { path: "/sitemap.xml" },
  ],
};

/** Bilinmeyen/yeni bir içerik türünde güvenli taraf: her şeyi yenile. */
export function revalidateTargetsFor(documentType: string | undefined): RevalidateTarget[] {
  return (documentType && targetsByType[documentType]) || everything;
}
