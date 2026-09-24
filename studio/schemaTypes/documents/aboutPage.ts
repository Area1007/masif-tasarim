import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField} from '../objects/helpers'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Hakkımızda',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Üst etiket', type: 'string'}),
    defineField({name: 'title', title: 'Başlık', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'paragraphs',
      title: 'Metin',
      type: 'array',
      description: 'Her satır bir paragraftır.',
      of: [defineArrayMember({type: 'text', rows: 4})],
    }),
    imageField('mainImage', 'Ana görsel', {description: 'Dikey (4:5) oranında gösterilir.'}),
    imageField('detailImage', 'Detay görseli', {description: 'Ana görselin köşesinde kare olarak gösterilir.'}),
    defineField({name: 'linkLabel', title: 'Bağlantı yazısı', type: 'string', description: 'Projeler sayfasına giden bağlantı.'}),
  ],
  preview: {prepare: () => ({title: 'Hakkımızda'})},
})
