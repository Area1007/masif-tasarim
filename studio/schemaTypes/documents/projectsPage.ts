import {defineField, defineType} from 'sanity'
import {headingField} from '../objects/helpers'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projeler Sayfası',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Üst etiket', type: 'string'}),
    headingField('title', 'Başlık'),
    defineField({name: 'intro', title: 'Giriş metni', type: 'text', rows: 3}),
    defineField({
      name: 'seoDescription',
      title: 'Arama motoru açıklaması',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(160).warning('160 karakteri geçmemesi önerilir.'),
    }),
  ],
  preview: {prepare: () => ({title: 'Projeler Sayfası'})},
})
