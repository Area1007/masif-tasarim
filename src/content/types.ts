/** Sitede kullanılan içerik tipleri. Veriler Sanity'den ya da yedek (fallback) içerikten gelir. */

export type Img = {
  src: string;
  alt: string;
  /** Sanity'de seçilen odak noktası (CSS object-position) */
  position?: string;
};

/** Başlıklar için sade zengin metin (Sanity Portable Text alt kümesi) */
export type RichSpan = { _type: "span"; _key: string; text: string; marks?: string[] };
export type RichBlock = { _type: "block"; _key: string; style?: string; markDefs?: unknown[]; children: RichSpan[] };
export type RichText = RichBlock[];

/** Site logosu: gerçek boyutlarıyla (en-boy oranını korumak için) */
export type LogoImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Sanity asset ID'si (ör. kenar kırpma için yeni görsel adresi üretmek) */
  assetId?: string;
};

export type TitleText = { title: string; text: string };

export type SocialLink = { platform: string; url: string };

export type SiteSettings = {
  name: string;
  tagline: string;
  footerStatement: RichText;
  phones: string[];
  whatsapp: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  socialLinks: SocialLink[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImage?: Img;
  /** Açık renkli logo — ana sayfa hero'sunda büyük marka logosu olarak kullanılır */
  logoLight?: LogoImage;
  /** Koyu renkli logo — şimdilik sitede kullanılmıyor (ileride açık zeminli alanlar için) */
  logoDark?: LogoImage;
};

export type HomeContent = {
  heroEyebrow: string;
  heroTitle: RichText;
  heroText: string;
  heroProjectSlug: string;
  heroImage?: Img;
  brandStatement: RichText;
  brandPillars: TitleText[];
  servicesEyebrow: string;
  servicesTitle: string;
  servicesIntro: string;
  featuredEyebrow: string;
  featuredTitle: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryText: string;
  processEyebrow: string;
  processTitle: string;
  processSteps: TitleText[];
  whyEyebrow: string;
  whyTitle: RichText;
  whyImage: Img;
  whyReasons: TitleText[];
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  mainImage: Img;
  detailImage: Img;
  linkLabel: string;
};

export type ProjectsPageContent = {
  eyebrow: string;
  title: RichText;
  intro: string;
  seoDescription: string;
};

export type Service = {
  title: string;
  text: string;
  tags: string[];
  showInFooter: boolean;
  shortTitle?: string;
};
