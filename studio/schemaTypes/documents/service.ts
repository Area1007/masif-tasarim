import {orderRankField, orderRankOrdering} from '../objects/orderRank'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Hizmet',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField('service'),
    defineField({name: 'title', title: 'Hizmet adı', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'text',
      title: 'Açıklama',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      description: 'Hizmetin yanında küçük kutucuklar halinde gösterilir.',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'showInFooter',
      title: 'Sayfa altında (footer) listele',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'shortTitle',
      title: 'Footer için kısa ad',
      type: 'string',
      description: 'Boş bırakılırsa hizmet adı kullanılır.',
      hidden: ({parent}) => !parent?.showInFooter,
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'text'}},
})
