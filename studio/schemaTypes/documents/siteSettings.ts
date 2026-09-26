import {defineArrayMember, defineField, defineType} from 'sanity'
import {headingField, imageField} from '../objects/helpers'

export const socialPlatforms = [
  {title: 'Instagram', value: 'instagram'},
  {title: 'Facebook', value: 'facebook'},
  {title: 'LinkedIn', value: 'linkedin'},
  {title: 'YouTube', value: 'youtube'},
  {title: 'Pinterest', value: 'pinterest'},
  {title: 'Behance', value: 'behance'},
  {title: 'X (Twitter)', value: 'x'},
  {title: 'TikTok', value: 'tiktok'},
]

/** Header logosu: kırpma/odak noktası yok (logo olduğu gibi, oranı korunarak gösterilir). */
function logoField(name: string, title: string, description: string) {
  return defineField({
    name,
    title,
    type: 'image',
    group: 'general',
    description,
    options: {accept: 'image/png,image/webp,image/svg+xml'},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternatif metin',
        type: 'string',
        description: 'Ekran okuyucular için, ör. "Masif Tasarım ve Uygulama logosu".',
        initialValue: 'Masif Tasarım ve Uygulama logosu',
        validation: (rule) => rule.required().error('Logo için kısa bir açıklama yazın.'),
      }),
    ],
  })
}

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  groups: [
    {name: 'general', title: 'Genel', default: true},
    {name: 'contact', title: 'İletişim'},
    {name: 'social', title: 'Sosyal Medya'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'name', title: 'Firma adı', type: 'string', group: 'general', validation: (r) => r.required()}),
    defineField({name: 'tagline', title: 'Slogan', type: 'string', group: 'general'}),
    logoField(
      'logoLight',
      'Site Logosu - Açık',
      'Ana sayfanın üst kısmında, fotoğrafın üzerinde BÜYÜK marka logosu olarak gösterilen AÇIK renkli logo. ' +
        'Şeffaf zeminli PNG, WebP veya SVG. Kenarlardaki şeffaf boşluk otomatik kırpılır; oran korunur. ' +
        'Boş bırakılırsa ana sayfada büyük logo gösterilmez.',
    ),
    logoField(
      'logoDark',
      'Site Logosu - Koyu',
      'Beyaz/açık zeminler için KOYU renkli logo. Şimdilik sitede kullanılmıyor; ileride açık zeminli alanlar için saklanıyor. ' +
        'Şeffaf zeminli PNG, WebP veya SVG.',
    ),
    headingField('footerStatement', 'Sayfa altı (footer) büyük cümle', {group: 'general'}),

    defineField({
      name: 'phones',
      title: 'Telefonlar',
      type: 'array',
      group: 'contact',
      description: 'İlk numara sayfanın üst kısmında da gösterilir.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (r) =>
            r.regex(/^[0-9 +()]{10,20}$/, {name: 'telefon'}).error('Yalnızca rakam ve boşluk kullanın (ör. 0542 611 61 38).'),
        }),
      ],
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp numarası',
      type: 'string',
      group: 'contact',
      description: 'Teklif formu ve WhatsApp butonları bu numaraya yönlenir. Ör. 0542 611 61 38',
    }),
    defineField({name: 'email', title: 'E-posta', type: 'string', group: 'contact', validation: (r) => r.email()}),
    defineField({name: 'address', title: 'Adres', type: 'text', rows: 3, group: 'contact'}),
    defineField({
      name: 'mapUrl',
      title: 'Harita bağlantısı',
      type: 'url',
      group: 'contact',
      description: 'Google Haritalar paylaşım bağlantısı (isteğe bağlı).',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Sosyal medya hesapları',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {list: socialPlatforms},
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'Profil bağlantısı',
              type: 'url',
              validation: (r) => r.required().uri({scheme: ['https', 'http']}),
            }),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),

    defineField({
      name: 'seoTitle',
      title: 'Ana sayfa başlığı (tarayıcı sekmesi)',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Site açıklaması',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Google arama sonuçlarında görünen açıklama.',
      validation: (r) => r.max(200).warning('160 karakter civarında tutulması önerilir.'),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Anahtar kelimeler',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    imageField('ogImage', 'Paylaşım görseli', {
      group: 'seo',
      description: 'Site WhatsApp veya sosyal medyada paylaşıldığında görünen görsel (1200×630 önerilir).',
    }),
  ],
  preview: {prepare: () => ({title: 'Site Ayarları'})},
})
