import {defineArrayMember, defineField} from 'sanity'

/** Alt metni zorunlu, odak noktası seçilebilir görsel alanı */
export function imageField(name: string, title: string, options: {description?: string; required?: boolean; group?: string} = {}) {
  return defineField({
    name,
    title,
    type: 'image',
    group: options.group,
    description: options.description,
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternatif metin',
        type: 'string',
        description: 'Görseli kısaca tarif edin. Arama motorları ve ekran okuyucular için gereklidir.',
        validation: (rule) => rule.required().error('Görsel için kısa bir açıklama yazın.'),
      }),
    ],
    validation: options.required ? (rule) => rule.required() : undefined,
  })
}

/** Galeri gibi listelerde kullanılan görsel öğesi */
export const imageMember = defineArrayMember({
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternatif metin',
      type: 'string',
      validation: (rule) => rule.required().error('Görsel için kısa bir açıklama yazın.'),
    }),
  ],
})

/**
 * Başlıklar için sade metin editörü: yalnızca italik vurgu ve (isteğe bağlı) marka rengi.
 * Satır atlamak için Shift+Enter kullanılabilir.
 */
export function headingField(
  name: string,
  title: string,
  options: {description?: string; group?: string; accent?: boolean} = {},
) {
  const decorators = [{title: 'İtalik vurgu', value: 'em'}]
  if (options.accent) decorators.push({title: 'Ahşap rengi', value: 'accent'})

  return defineField({
    name,
    title,
    type: 'array',
    group: options.group,
    description:
      options.description ??
      'Vurgulamak istediğiniz kelimeleri seçip italik düğmesine basın. Yeni satır için Shift+Enter.',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [{title: 'Normal', value: 'normal'}],
        lists: [],
        marks: {decorators, annotations: []},
      }),
    ],
    validation: (rule) => rule.required().max(1).error('Başlık tek paragraf olmalıdır.'),
  })
}

/** Başlık + açıklama çiftlerinden oluşan liste (süreç adımları, nedenler vb.) */
export function titleTextList(name: string, title: string, options: {group?: string; min?: number; max?: number} = {}) {
  return defineField({
    name,
    title,
    type: 'array',
    group: options.group,
    of: [
      defineArrayMember({
        type: 'object',
        name: 'item',
        fields: [
          defineField({name: 'title', title: 'Başlık', type: 'string', validation: (r) => r.required()}),
          defineField({name: 'text', title: 'Açıklama', type: 'text', rows: 3, validation: (r) => r.required()}),
        ],
        preview: {select: {title: 'title', subtitle: 'text'}},
      }),
    ],
    validation: (rule) => {
      let r = rule
      if (options.min) r = r.min(options.min)
      if (options.max) r = r.max(options.max)
      return r
    },
  })
}
