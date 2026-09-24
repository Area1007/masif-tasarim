/**
 * Sitenin mevcut (yedek) içeriğini Sanity içe aktarma dosyasına çevirir.
 *
 *   npm run seed:build    → seed/seed.ndjson oluşturur
 *   npm run seed:import   → dosyayı "production" dataset'ine aktarır (sanity login gerekir)
 *
 * Görseller `_sanityAsset` ile bağlantıdan indirilip Sanity'ye yüklenir.
 * Belge ID'leri sabit olduğu için tekrar çalıştırmak kopya oluşturmaz (--replace).
 */
import {mkdirSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {
  defaultAbout,
  defaultHome,
  defaultProjectsPage,
  defaultServices,
  defaultSettings,
} from '../../src/content/defaults.ts'
import {projects} from '../../src/lib/projects.ts'

type Img = {src: string; alt: string}
type Doc = Record<string, unknown> & {_id: string; _type: string}

let keyCounter = 0
const key = () => `k${(keyCounter++).toString(36).padStart(4, '0')}`

const image = (img: Img) => ({_type: 'image', _sanityAsset: `image@${img.src}`, alt: img.alt})
const imageItem = (img: Img) => ({...image(img), _key: key()})
const titleTextItems = (items: {title: string; text: string}[]) =>
  items.map((i) => ({_type: 'item', _key: key(), title: i.title, text: i.text}))

/** @sanity/orderable-document-list ile uyumlu sıra değeri (LexoRank biçimi) */
const rank = (i: number) => `0|${((i + 1) * 100000).toString(36).padStart(6, '0')}:`

const {heroProjectSlug, whyImage, heroImage: _heroImage, ...homeTexts} = defaultHome
const {mainImage, detailImage, ...aboutTexts} = defaultAbout
const {ogImage: _ogImage, ...settingsTexts} = defaultSettings

const docs: Doc[] = [
  {_id: 'siteSettings', _type: 'siteSettings', ...settingsTexts},
  {
    _id: 'homePage',
    _type: 'homePage',
    ...homeTexts,
    brandPillars: titleTextItems(homeTexts.brandPillars),
    processSteps: titleTextItems(homeTexts.processSteps),
    whyReasons: titleTextItems(homeTexts.whyReasons),
    whyImage: image(whyImage),
    heroProject: {_type: 'reference', _ref: `project-${heroProjectSlug}`},
  },
  {
    _id: 'aboutPage',
    _type: 'aboutPage',
    ...aboutTexts,
    mainImage: image(mainImage),
    detailImage: image(detailImage),
  },
  {_id: 'projectsPage', _type: 'projectsPage', ...defaultProjectsPage},
  ...defaultServices.map((s, i) => ({
    _id: `service-${i + 1}`,
    _type: 'service',
    orderRank: rank(i),
    ...s,
  })),
  ...projects.map((p, i) => ({
    _id: `project-${p.slug}`,
    _type: 'project',
    orderRank: rank(i),
    title: p.title,
    slug: {_type: 'slug', current: p.slug},
    featured: Boolean(p.featured),
    summary: p.summary,
    description: p.description,
    cover: image(p.cover),
    gallery: p.gallery.map(imageItem),
    category: p.category,
    location: p.location,
    year: p.year,
    area: p.area,
    services: p.services,
  })),
]

/** Boş metin ve boş listeleri at (ör. henüz girilmemiş e-posta), Studio'da doğrulama hatası vermesin */
const clean = (doc: Doc): Doc =>
  Object.fromEntries(
    Object.entries(doc).filter(([, v]) => v !== '' && v !== undefined && !(Array.isArray(v) && v.length === 0)),
  ) as Doc

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'seed')
mkdirSync(outDir, {recursive: true})
const outFile = join(outDir, 'seed.ndjson')
writeFileSync(outFile, docs.map((d) => JSON.stringify(clean(d))).join('\n') + '\n', 'utf-8')

const imageCount = (JSON.stringify(docs).match(/_sanityAsset/g) ?? []).length
console.log(`${docs.length} belge, ${imageCount} görsel referansı → ${outFile}`)
