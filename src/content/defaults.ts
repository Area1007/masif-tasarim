/**
 * Yedek (fallback) içerik.
 *
 * Sanity'ye ulaşılamadığında veya bir alan boş bırakıldığında site bu içerikle
 * çalışır. Aynı veri, `studio/scripts/build-seed.ts` ile Sanity'ye ilk aktarımın
 * kaynağıdır. Bu dosya Node tarafından da doğrudan çalıştırıldığı için yalnızca
 * göreli ve `.ts` uzantılı import kullanır.
 */
import { rich } from "./rich.ts";
import type { AboutContent, HomeContent, ProjectsPageContent, Service, SiteSettings } from "./types.ts";

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const defaultSettings: SiteSettings = {
  name: "Masif Tasarım ve Uygulama",
  tagline: "Tasarımdan Uygulamaya",
  footerStatement: rich("Mekânlar daha\n*fazlasını* anlatır.", "footer"),
  phones: ["0542 611 61 38", "0539 976 81 05"],
  whatsapp: "0542 611 61 38",
  email: "",
  address: "",
  mapUrl: "",
  socialLinks: [],
  seoTitle: "Masif Tasarım ve Uygulama | Mimari ve İç Mimari Tasarım, Uygulama",
  seoDescription:
    "Masif Tasarım ve Uygulama; konut, kafe, restoran ve ticari mekânlar için mimari tasarım, iç mimarlık, 3D görselleştirme ve anahtar teslim uygulama hizmetleri sunar.",
  seoKeywords: [
    "iç mimarlık",
    "mimari tasarım",
    "iç mekan tasarımı",
    "3D görselleştirme",
    "anahtar teslim uygulama",
    "kafe tasarımı",
    "restoran tasarımı",
    "konut tasarımı",
  ],
};

export const defaultHome: HomeContent = {
  heroEyebrow: "Mimari Tasarım · İç Mimarlık · Uygulama",
  heroTitle: rich("Hayalinizdeki mekânı tasarlıyor, *detaylarıyla* hayata geçiriyoruz.", "hero"),
  heroText:
    "Konut, kafe, restoran ve ticari mekânlar için fikir aşamasından anahtar teslimine uzanan bütüncül bir tasarım ve uygulama stüdyosu.",
  heroProjectSlug: "mese-evi",

  brandStatement: rich(
    "~Masif~; sağlam, dürüst ve özünden ödün vermeyen. Tasarladığımız her mekânda bu karakteri arıyoruz — *fikirden ilk çizgiye, ilk çizgiden son detaya kadar.*",
    "brand",
  ),
  brandPillars: [
    { title: "Tasarım", text: "Mekânın ihtiyaçlarını analiz ederek işlevsel ve özgün çözümler üretiriz." },
    { title: "Görselleştirme", text: "Gerçekçi 3D görsellerle mekânınızı uygulamadan önce deneyimlersiniz." },
    { title: "Uygulama", text: "Malzeme seçiminden üretime, montajdan teslimata her adımı yönetiriz." },
  ],

  servicesEyebrow: "Hizmetlerimiz",
  servicesTitle: "Tasarımdan uygulamaya, tek bir ekip.",
  servicesIntro:
    "Tasarım ve uygulamanın aynı ekip tarafından yürütülmesi, fikir ile sonuç arasındaki mesafeyi kısaltır. Süreç boyunca tek muhatapla çalışır, her kararın arkasındaki nedeni bilirsiniz.",

  featuredEyebrow: "Öne Çıkan Projeler",
  featuredTitle: "Her mekânın kendine ait bir hikâyesi var.",
  galleryEyebrow: "Proje Galerisi",
  galleryTitle: "Işık, doku ve detay.",
  galleryText: "Tamamlanan projelerimizden seçilmiş kareler. Büyütmek için görsele dokunun.",

  processEyebrow: "Çalışma Sürecimiz",
  processTitle: "İlk görüşmeden anahtar teslimine, şeffaf ve planlı bir süreç.",
  processSteps: [
    { title: "Tanışma & Keşif", text: "İhtiyaçlarınızı, beklentilerinizi ve bütçenizi dinler; mekânı yerinde inceler, ölçümleri alırız." },
    { title: "Konsept Tasarım", text: "Mekânın kimliğini belirleyen plan şemaları, malzeme paleti ve atmosfer önerileri hazırlarız." },
    { title: "3D Görselleştirme", text: "Tasarımı fotogerçekçi görsellerle sunar, birlikte son haline getiririz." },
    { title: "Teknik Proje", text: "Uygulama çizimleri, detaylar ve metrajla sahaya hazır eksiksiz bir proje dosyası oluştururuz." },
    { title: "Uygulama & Teslim", text: "Üretim ve montajı kendi ekibimizle yönetir, mekânı kullanıma hazır şekilde teslim ederiz." },
  ],

  whyEyebrow: "Neden Masif?",
  whyTitle: rich("Çizimde gördüğünüz, *teslim aldığınız* mekândır.", "why"),
  whyImage: { src: unsplash("1600573472550-8090b5e0745e", 1400), alt: "Doğal ışık alan sade iç mekân" },
  whyReasons: [
    {
      title: "Tek muhatap, bütüncül süreç",
      text: "Tasarım, proje ve uygulama aynı ekipte. Aradaki kopukluklar ve sorumluluk boşlukları ortadan kalkar.",
    },
    {
      title: "Uygulamadan önce görün",
      text: "Gerçekçi 3D görselleştirmelerle sürprizlere yer bırakmaz, kararlarınızı güvenle verirsiniz.",
    },
    {
      title: "Malzeme ve detay hassasiyeti",
      text: "Doğal ve dayanıklı malzemeleri özenli işçilikle bir araya getirir, her birleşimi ölçüyle çözeriz.",
    },
    {
      title: "Şeffaf bütçe, net takvim",
      text: "İş kalemleri ve süreler baştan belirlenir; süreç boyunca her aşamadan düzenli olarak haberdar olursunuz.",
    },
  ],

  contactEyebrow: "İletişim & Teklif",
  contactTitle: "Projenizi birlikte konuşalım.",
  contactText:
    "Aklınızdaki mekânı kısaca anlatın; ihtiyaçlarınızı değerlendirip size özel bir tasarım ve uygulama teklifiyle dönüş yapalım.",
};

export const defaultAbout: AboutContent = {
  eyebrow: "Hakkımızda",
  title: "Fikriniz mekâna dönüşsün.",
  paragraphs: [
    "Masif Tasarım ve Uygulama; konut, kafe, restoran ve ticari mekânlar için konsept tasarım, 3D görselleştirme, teknik proje ve uygulama hizmetlerini tek çatı altında sunan bir tasarım stüdyosudur.",
    "Her projeye mekânı kullanacak insanları dinleyerek başlarız. Ortaya çıkan tasarımı gerçekçi görsellerle birlikte netleştirir, ardından malzeme seçiminden üretime kadar sürecin tamamını kendi ekibimizle hayata geçiririz. Böylece çizimde gördüğünüz, teslim aldığınız mekânla birebir örtüşür.",
  ],
  mainImage: { src: unsplash("1503387762-592deb58ef4e"), alt: "Mimari çizimler ve proje çalışması" },
  detailImage: { src: unsplash("1600566752355-35792bedcfea", 1200), alt: "Ahşap ve doğal malzeme detayı" },
  linkLabel: "Projelerimizi inceleyin",
};

export const defaultProjectsPage: ProjectsPageContent = {
  eyebrow: "Projeler",
  title: rich("Tasarladık, *uyguladık.*", "projects"),
  intro:
    "Konuttan ticari mekâna, her ölçekte; fikir aşamasından teslimata kadar yürüttüğümüz projelerden bir seçki.",
  seoDescription: "Masif Tasarım ve Uygulama'nın konut, kafe, restoran, ofis ve mimari projelerinden seçkiler.",
};

export const defaultServices: Service[] = [
  {
    title: "Mimari Tasarım",
    text: "Arazi ve ihtiyaç analizinden başlayarak konut ve ticari yapılar için bağlamına uyumlu, işlevsel ve estetik mimari çözümler geliştiriyoruz.",
    tags: ["Konsept", "Avan proje", "Uygulama projesi"],
    showInFooter: true,
  },
  {
    title: "İç Mimari Tasarım",
    text: "Konut, kafe, restoran ve ofis gibi mekânlarda akışı, ışığı ve malzemeyi birlikte ele alan bütüncül iç mekân kurguları tasarlıyoruz.",
    tags: ["Mekân planlama", "Malzeme seçimi", "Özel mobilya"],
    showInFooter: true,
    shortTitle: "İç Mimarlık",
  },
  {
    title: "3D Görselleştirme",
    text: "Fotogerçekçi görsellerle tasarımı uygulama öncesinde görmenizi, kararlarınızı güvenle vermenizi sağlıyoruz.",
    tags: ["Fotogerçekçi render", "Malzeme alternatifleri", "Işık senaryoları"],
    showInFooter: true,
  },
  {
    title: "Teknik Proje",
    text: "Tasarımın sahaya eksiksiz aktarılması için ölçülü çizimler, detay paftaları ve üretim dokümanları hazırlıyoruz.",
    tags: ["Detay çizimleri", "Aydınlatma planı", "Metraj"],
    showInFooter: false,
  },
  {
    title: "Uygulama & Anahtar Teslim",
    text: "Üretim, montaj ve saha koordinasyonunu kendi ekibimizle yöneterek projeyi zamanında ve tasarlandığı gibi teslim ediyoruz.",
    tags: ["Saha yönetimi", "Üretim", "Teslimat"],
    showInFooter: true,
    shortTitle: "Uygulama",
  },
];
