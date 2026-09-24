import {defineField, defineType} from 'sanity'
import {headingField, imageField, titleTextList} from '../objects/helpers'

export const homePage = defineType({
  name: 'homePage',
  title: 'Ana Sayfa',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Giriş (Hero)', default: true},
    {name: 'brand', title: 'Marka Sunumu'},
    {name: 'services', title: 'Hizmetler Bölümü'},
    {name: 'projects', title: 'Projeler & Galeri'},
    {name: 'process', title: 'Süreç'},
    {name: 'why', title: 'Neden Biz'},
    {name: 'contact', title: 'İletişim Bölümü'},
  ],
  fields: [
    // Hero
    defineField({name: 'heroEyebrow', title: 'Üst etiket', type: 'string', group: 'hero'}),
    headingField('heroTitle', 'Ana başlık', {group: 'hero'}),
    defineField({name: 'heroText', title: 'Alt metin', type: 'text', rows: 3, group: 'hero'}),
    defineField({
      name: 'heroProject',
      title: 'Öne çıkan proje',
      type: 'reference',
      to: [{type: 'project'}],
      group: 'hero',
      description: 'Sağ altta bağlantı olarak gösterilir. Aşağıda ayrı bir görsel seçilmezse bu projenin kapak görseli kullanılır.',
    }),
    imageField('heroImage', 'Arka plan görseli (isteğe bağlı)', {group: 'hero'}),

    // Marka sunumu
    headingField('brandStatement', 'Marka cümlesi', {group: 'brand', accent: true}),
    titleTextList('brandPillars', 'Ana adımlar', {group: 'brand', max: 3}),

    // Hizmetler
    defineField({name: 'servicesEyebrow', title: 'Üst etiket', type: 'string', group: 'services'}),
    defineField({name: 'servicesTitle', title: 'Başlık', type: 'string', group: 'services'}),
    defineField({
      name: 'servicesIntro',
      title: 'Giriş metni',
      type: 'text',
      rows: 3,
      group: 'services',
      description: 'Hizmetlerin kendisi soldaki menüde "Hizmetler" altından düzenlenir.',
    }),

    // Projeler & galeri
    defineField({name: 'featuredEyebrow', title: 'Öne çıkan projeler — üst etiket', type: 'string', group: 'projects'}),
    defineField({
      name: 'featuredTitle',
      title: 'Öne çıkan projeler — başlık',
      type: 'string',
      group: 'projects',
      description: 'Gösterilecek projeleri seçmek için proje sayfasındaki "Ana sayfada öne çıkar" kutusunu işaretleyin.',
    }),
    defineField({name: 'galleryEyebrow', title: 'Galeri — üst etiket', type: 'string', group: 'projects'}),
    defineField({name: 'galleryTitle', title: 'Galeri — başlık', type: 'string', group: 'projects'}),
    defineField({
      name: 'galleryText',
      title: 'Galeri — açıklama',
      type: 'text',
      rows: 2,
      group: 'projects',
      description: 'Galeri görselleri projelerin galerilerinden otomatik derlenir.',
    }),

    // Süreç
    defineField({name: 'processEyebrow', title: 'Üst etiket', type: 'string', group: 'process'}),
    defineField({name: 'processTitle', title: 'Başlık', type: 'string', group: 'process'}),
    titleTextList('processSteps', 'Adımlar', {group: 'process'}),

    // Neden biz
    defineField({name: 'whyEyebrow', title: 'Üst etiket', type: 'string', group: 'why'}),
    headingField('whyTitle', 'Başlık', {group: 'why'}),
    imageField('whyImage', 'Görsel', {group: 'why'}),
    titleTextList('whyReasons', 'Nedenler', {group: 'why'}),

    // İletişim
    defineField({name: 'contactEyebrow', title: 'Üst etiket', type: 'string', group: 'contact'}),
    defineField({name: 'contactTitle', title: 'Başlık', type: 'string', group: 'contact'}),
    defineField({
      name: 'contactText',
      title: 'Açıklama',
      type: 'text',
      rows: 3,
      group: 'contact',
      description: 'Telefon, e-posta ve WhatsApp bilgileri "Site Ayarları"ndan gelir.',
    }),
  ],
  preview: {prepare: () => ({title: 'Ana Sayfa'})},
})
