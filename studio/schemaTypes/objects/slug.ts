import type {SanityClient, SlugRule, SlugValue, StringRule, ValidationContext} from 'sanity'

/** Sitenin kabul ettiği adres biçimi: küçük harf, rakam ve tek tire (ör. "mese-evi") */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const turkishMap: Record<string, string> = {ı: 'i', ş: 's', ğ: 'g', ü: 'u', ö: 'o', ç: 'c', â: 'a', î: 'i', û: 'u'}

/** "Meşe Evi & Bahçe" → "mese-evi-ve-bahce" */
export function turkishSlugify(input: string, maxLength = 80): string {
  return input
    .trim()
    .toLocaleLowerCase('tr')
    .replace(/[ışğüöçâîû]/g, (ch) => turkishMap[ch] ?? ch)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' ve ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLength)
    .replace(/-+$/g, '')
}

const API_VERSION = '2025-01-01'
const ADMIN_ROLE = 'administrator'

type MeResponse = {roles?: {name: string}[]}
let mePromise: Promise<MeResponse | null> | null = null

/** Oturumdaki kullanıcının rollerini bir kez sorgular (doğrulama her tuşta çalışabilir). */
function getCurrentUserRoles(client: SanityClient): Promise<MeResponse | null> {
  mePromise ??= client.request<MeResponse>({url: '/users/me', withCredentials: true}).catch(() => {
    mePromise = null // geçici hata: bir sonraki denemede tekrar sor
    return null
  })
  return mePromise
}

/** "drafts.x" veya "versions.<release>.x" → "x" */
const toPublishedId = (id: string) => id.replace(/^drafts\./, '').replace(/^versions\.[^.]+\./, '')

/**
 * Slug alanı doğrulaması:
 *   1. Zorunlu ve sitenin adres biçimine uygun olmalı.
 *   2. Yayınlanmış bir projenin adresi yalnızca yönetici (Administrator) tarafından
 *      değiştirilebilir. Bu kural Publish'i engeller; arayüzdeki kilit atlatılsa bile geçerlidir.
 */
export const slugValidation = (rule: SlugRule) =>
  rule.required().custom(async (value: SlugValue | undefined, context: ValidationContext) => {
    const current = value?.current
    if (!current) return true // "required" zaten yakalıyor
    if (!SLUG_PATTERN.test(current)) {
      const suggestion = turkishSlugify(current)
      return `Sayfa adresi yalnızca küçük harf (a-z), rakam ve tire içerebilir; boşluk, Türkçe karakter veya büyük harf kullanılamaz.${
        suggestion ? ` Önerilen: "${suggestion}" — ya da "Generate" düğmesine basın.` : ''
      }`
    }

    const documentId = context.document?._id
    if (!documentId) return true
    const client = context.getClient({apiVersion: API_VERSION})
    const publishedSlug = await client.fetch<string | null>(
      `*[_id == $id][0].slug.current`,
      {id: toPublishedId(documentId)},
      {perspective: 'raw'},
    )
    if (!publishedSlug || publishedSlug === current) return true

    const me = await getCurrentUserRoles(client)
    if (me?.roles?.some((role) => role.name === ADMIN_ROLE)) return true
    return `Yayınlanmış bir projenin adresini yalnızca yönetici değiştirebilir. Adresi eski haline getirin: "${publishedSlug}"`
  })

/** Zorunlu başlık; başında/sonunda yanlışlıkla bırakılan boşluklar için uyarı (yayını engellemez). */
export const trimmedStringValidation = (rule: StringRule) => [
  rule.required(),
  rule
    .custom((value: string | undefined) =>
      value && value !== value.trim() ? 'Başında veya sonunda boşluk var; silmeniz önerilir.' : true,
    )
    .warning(),
]
