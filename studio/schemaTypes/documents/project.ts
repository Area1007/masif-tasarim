import {orderRankField, orderRankOrdering} from '../objects/orderRank'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField, imageMember} from '../objects/helpers'
import {LockedSlugInput} from '../../components/LockedSlugInput'
import {SLUG_PATTERN, slugValidation, trimmedStringValidation, turkishSlugify} from '../objects/slug'

export const projectCategories = ['Konut', 'Kafe & Restoran', 'Ticari', 'Mimari']

export const project = defineType({
  name: 'project',
  title: 'Proje',
  type: 'document',
  orderings: [orderRankOrdering],
  groups: [
    {name: 'content', title: 'İçerik', default: true},
    {name: 'media', title: 'Görseller'},
    {name: 'details', title: 'Künye'},
  ],
  fields: [
    orderRankField('project'),
    defineField({
      name: 'title',
      title: 'Proje adı',
      type: 'string',
      group: 'content',
      validation: trimmedStringValidation,
    }),
    defineField({
      name: 'slug',
      title: 'Sayfa adresi',
      type: 'slug',
      group: 'content',
      description:
        'Proje sayfasının adresi (ör. /projeler/mese-evi). Yeni projede "Generate" ile addan oluşturun. Proje yayınlandıktan sonra adres kilitlenir; proje adını değiştirmek adresi etkilemez.',
      options: {source: 'title', maxLength: 80, slugify: (input: string) => turkishSlugify(input, 80)},
      components: {input: LockedSlugInput},
      validation: slugValidation,
    }),
    defineField({
      name: 'previousSlugs',
      title: 'Önceki adresler',
      type: 'array',
      group: 'content',
      description:
        'Adres değiştirildiğinde eski adres buraya otomatik eklenir; site eski adresi yeni adrese yönlendirir. Elle düzenlenmez.',
      of: [defineArrayMember({type: 'string'})],
      readOnly: true,
      hidden: ({value}) => !value?.length,
      validation: (r) =>
        r.custom((value: string[] | undefined) =>
          (value ?? []).every((s) => SLUG_PATTERN.test(s)) ? true : 'Önceki adreslerde geçersiz bir değer var.',
        ),
    }),
    defineField({
      name: 'featured',
      title: 'Ana sayfada öne çıkar',
      type: 'boolean',
      group: 'content',
      description: 'Ana sayfadaki "Öne Çıkan Projeler" bölümünde gösterilir (en fazla 4 proje).',
      initialValue: false,
    }),
    defineField({
      name: 'summary',
      title: 'Kısa özet',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'Proje sayfasının kapağında ve arama sonuçlarında görünen tek cümlelik özet.',
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Proje açıklaması',
      type: 'array',
      group: 'content',
      description: 'Her satır bir paragraftır. İlk paragraf büyük puntoyla gösterilir.',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (r) => r.required().min(1),
    }),
    imageField('cover', 'Kapak görseli', {
      group: 'media',
      required: true,
      description: 'Proje kartlarında ve proje sayfasının üst kısmında kullanılır. Yatay ve yüksek çözünürlüklü olmalı.',
    }),
    defineField({
      name: 'gallery',
      title: 'Proje galerisi',
      type: 'array',
      group: 'media',
      description: 'Sürükleyerek sıralayabilirsiniz. 1., 4., 7. ... görseller tam genişlikte gösterilir.',
      of: [imageMember],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      group: 'details',
      options: {list: projectCategories, layout: 'radio'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'location', title: 'Konum', type: 'string', group: 'details', validation: (r) => r.required()}),
    defineField({name: 'year', title: 'Yıl', type: 'string', group: 'details', validation: (r) => r.required()}),
    defineField({
      name: 'area',
      title: 'Alan',
      type: 'string',
      group: 'details',
      description: 'Ör. 210 m²',
    }),
    defineField({
      name: 'services',
      title: 'Verilen hizmetler',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
  ],
  preview: {
    select: {title: 'title', category: 'category', location: 'location', media: 'cover', featured: 'featured'},
    prepare: ({title, category, location, media, featured}) => ({
      title: featured ? `★ ${title}` : title,
      subtitle: [category, location].filter(Boolean).join(' · '),
      media,
    }),
  },
})
