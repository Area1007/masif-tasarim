/**
 * Yedek (fallback) proje verileri.
 *
 * Projeler artık Sanity Studio'dan yönetilir. Bu liste yalnızca Sanity'ye
 * ulaşılamadığında kullanılır ve Sanity'ye ilk aktarımın kaynağıdır.
 */
import type { Img } from "../content/types.ts";

export type ProjectCategory = "Konut" | "Kafe & Restoran" | "Ticari" | "Mimari";

export type ProjectImage = Img;

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  area: string;
  services: string[];
  summary: string;
  description: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  featured?: boolean;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`;

export const projects: Project[] = [
  {
    slug: "mese-evi",
    title: "Meşe Evi",
    category: "Konut",
    location: "İstanbul",
    year: "2025",
    area: "210 m²",
    services: ["İç Mimari Tasarım", "3D Görselleştirme", "Uygulama"],
    summary:
      "Masif meşe, doğal taş ve yumuşak ışıkla kurgulanmış, sakin ve zamansız bir aile evi.",
    description: [
      "Meşe Evi, kalabalık bir aile için gündelik yaşamı sadeleştiren bir iç mekân kurgusu olarak tasarlandı. Yaşam, mutfak ve yemek alanları tek bir akış içinde birleşirken, masif meşe yüzeyler mekâna sıcak ve bütüncül bir karakter kazandırdı.",
      "Tüm sabit mobilyalar ölçüye özel üretildi. Depolama alanları duvar dokusunun içinde eritilerek yüzeylerin sade kalması sağlandı; aydınlatma ise gün boyunca değişen doğal ışığı destekleyecek şekilde katmanlı olarak planlandı.",
    ],
    cover: {
      src: unsplash("1600210492486-724fe5c67fb0"),
      alt: "Doğal ahşap detaylı, aydınlık oturma alanı",
    },
    gallery: [
      { src: unsplash("1600607687939-ce8a6c25118c"), alt: "Açık plan yaşam alanı" },
      { src: unsplash("1600121848594-d8644e57abab"), alt: "Ahşap dolaplı mutfak" },
      { src: unsplash("1616486338812-3dadae4b4ace"), alt: "Sade yatak odası" },
      { src: unsplash("1600566753190-17f0baa2a6c3"), alt: "Yemek alanı detayı" },
    ],
    featured: true,
  },
  {
    slug: "liman-kafe",
    title: "Liman Kafe",
    category: "Kafe & Restoran",
    location: "İzmir",
    year: "2025",
    area: "140 m²",
    services: ["Konsept Tasarım", "3D Görselleştirme", "Anahtar Teslim Uygulama"],
    summary:
      "Ham beton, ahşap ve pirinç detaylarla sahil kültürünü yorumlayan samimi bir kafe.",
    description: [
      "Liman Kafe için hedef, gün içinde farklı kullanıcı profillerine hitap eden, esnek ve akılda kalıcı bir mekân kurgusuydu. Bar tezgâhı mekânın merkezine yerleştirilerek hem servis akışı hem de sosyal etkileşim güçlendirildi.",
      "Malzeme paletinde dayanıklılık ve karakter bir arada düşünüldü. Ahşap oturma elemanları, ham beton yüzeyler ve pirinç detaylar zamanla güzelleşen, bakımı kolay bir bütün oluşturdu.",
    ],
    cover: {
      src: unsplash("1554995207-c18c203602cb"),
      alt: "Ahşap mobilyalı, aydınlık kafe iç mekânı",
    },
    gallery: [
      { src: unsplash("1517248135467-4c7edcad34c4"), alt: "Kafe oturma düzeni" },
      { src: unsplash("1586023492125-27b2c045efd7"), alt: "Mobilya ve aydınlatma detayı" },
      { src: unsplash("1493809842364-78817add7ffb"), alt: "Pencere önü oturma alanı" },
    ],
    featured: true,
  },
  {
    slug: "yamac-villa",
    title: "Yamaç Villa",
    category: "Mimari",
    location: "Bodrum",
    year: "2024",
    area: "380 m²",
    services: ["Mimari Tasarım", "Teknik Proje", "Uygulama"],
    summary:
      "Topoğrafyaya yaslanan, manzarayı her mekâna taşıyan yalın bir yazlık konut.",
    description: [
      "Yamaç Villa, arazinin eğimini bir kısıt değil tasarım girdisi olarak ele alır. Kademeli kütleler sayesinde her katta farklı bir manzara ilişkisi kurulurken, yapı çevresiyle ölçekli ve dengeli bir ilişki içinde kalır.",
      "Geniş cam yüzeyler, derin saçaklarla güneşten korunarak iç ve dış mekân arasında kesintisiz bir geçiş sağlandı. Yerel taş ve açık tonlu sıva, yapının bölgeye aidiyetini vurgular.",
    ],
    cover: {
      src: unsplash("1600585154340-be6161a56a0c"),
      alt: "Modern villa dış cephesi ve havuz",
    },
    gallery: [
      { src: unsplash("1600585154526-990dced4db0d"), alt: "Villa iç mekân ve manzara" },
      { src: unsplash("1600047509807-ba8f99d2cdde"), alt: "Villa cephe detayı" },
      { src: unsplash("1564013799919-ab600027ffc6"), alt: "Bahçe ve dış mekân" },
    ],
    featured: true,
  },
  {
    slug: "atolye-ofis",
    title: "Atölye Ofis",
    category: "Ticari",
    location: "Ankara",
    year: "2024",
    area: "320 m²",
    services: ["İç Mimari Tasarım", "Teknik Proje", "Uygulama"],
    summary:
      "Odaklanma ve iş birliği arasında denge kuran, doğal malzemeli bir çalışma ortamı.",
    description: [
      "Atölye Ofis, yaratıcı bir ekibin farklı çalışma biçimlerine yanıt verecek şekilde bölgelendi. Açık çalışma alanları, sessiz odaklanma odaları ve ortak buluşma alanları birbirine yumuşak geçişlerle bağlandı.",
      "Akustik performans, ergonomi ve doğal ışık tasarımın temel parametreleri oldu. Ahşap lamel paneller hem akustik çözüm sundu hem de mekâna sıcak bir kimlik kazandırdı.",
    ],
    cover: {
      src: unsplash("1497366216548-37526070297c"),
      alt: "Aydınlık, açık plan ofis",
    },
    gallery: [
      { src: unsplash("1604014237800-1c9102c219da"), alt: "Ofis toplantı alanı" },
      { src: unsplash("1615529182904-14819c35db37"), alt: "Ofis dinlenme köşesi" },
    ],
    featured: true,
  },
  {
    slug: "kirik-beyaz-daire",
    title: "Kırık Beyaz Daire",
    category: "Konut",
    location: "İstanbul",
    year: "2024",
    area: "125 m²",
    services: ["Renovasyon", "İç Mimari Tasarım", "Uygulama"],
    summary:
      "Eski bir apartman dairesinin ışık, sadelik ve işlevsellik odağında yeniden doğuşu.",
    description: [
      "Yıllar içinde bölünmüş ve karanlıklaşmış bir daire, yeniden planlanarak ferah ve akıcı bir yaşam alanına dönüştürüldü. Gereksiz duvarlar kaldırıldı, doğal ışık dairenin derinliklerine kadar taşındı.",
      "Kırık beyaz tonlar, açık meşe zeminler ve dokulu tekstiller mekâna huzurlu bir atmosfer verirken, özel üretim dolaplar küçük metrekareyi en verimli şekilde kullandı.",
    ],
    cover: {
      src: unsplash("1618221195710-dd6b41faaea6"),
      alt: "Kırık beyaz tonlarda sade oturma odası",
    },
    gallery: [
      { src: unsplash("1502672260266-1c1ef2d93688"), alt: "Aydınlık yaşam alanı" },
      { src: unsplash("1556228453-efd6c1ff04f6"), alt: "Mutfak detayı" },
      { src: unsplash("1631679706909-1844bbd07221"), alt: "Oturma grubu" },
    ],
  },
  {
    slug: "tas-firin-restoran",
    title: "Taş Fırın Restoran",
    category: "Kafe & Restoran",
    location: "Eskişehir",
    year: "2023",
    area: "260 m²",
    services: ["Konsept Tasarım", "3D Görselleştirme", "Anahtar Teslim Uygulama"],
    summary:
      "Açık mutfağı sahneye dönüştüren, sıcak ve loş bir restoran atmosferi.",
    description: [
      "Taş Fırın Restoran'da mutfak, saklanan bir servis alanı olmaktan çıkarılıp mekânın odak noktasına taşındı. Misafirler, yemeklerinin hazırlanışını izleyebilecekleri bir deneyimin parçası haline geldi.",
      "Koyu ahşap, el yapımı seramik ve dolaylı aydınlatma ile samimi ve sıcak bir atmosfer oluşturuldu. Oturma düzeni farklı grup büyüklüklerine göre esnek kurgulandı.",
    ],
    cover: {
      src: unsplash("1517248135467-4c7edcad34c4"),
      alt: "Sıcak ışıklı restoran iç mekânı",
    },
    gallery: [
      { src: unsplash("1554995207-c18c203602cb"), alt: "Restoran oturma alanı" },
      { src: unsplash("1600566752355-35792bedcfea"), alt: "Mekân detayı" },
    ],
  },
];

export const projectCategories: ProjectCategory[] = [
  "Konut",
  "Kafe & Restoran",
  "Ticari",
  "Mimari",
];
