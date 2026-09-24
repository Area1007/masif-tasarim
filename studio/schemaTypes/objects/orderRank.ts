import {defineField} from 'sanity'

/**
 * @sanity/orderable-document-list ile uyumlu sıralama alanı.
 *
 * Eklentinin kendi `orderRankField` yardımcısı, CommonJS olan `lexorank`
 * paketini dosya başında yüklediği için Sanity CLI'nin şema doğrulama/dağıtım
 * adımlarında hata veriyor. Burada `lexorank` yalnızca yeni belge oluşturulurken
 * (tarayıcıda) dinamik olarak yüklenir. Davranış eklentiyle aynıdır: yeni belge
 * listenin sonuna eklenir.
 */
export function orderRankField(type: string) {
  return defineField({
    name: 'orderRank',
    title: 'Sıra',
    type: 'string',
    readOnly: true,
    hidden: true,
    initialValue: async (_value, {getClient}) => {
      const {LexoRank} = await import('lexorank')
      const last: unknown = await getClient({apiVersion: '2025-01-01'}).fetch(
        `*[_type == $type && defined(orderRank)] | order(orderRank desc)[0].orderRank`,
        {type},
      )
      let rank = LexoRank.min()
      if (typeof last === 'string') {
        try {
          rank = LexoRank.parse(last)
        } catch {
          // geçersiz değer: en baştan başla
        }
      }
      return rank.genNext().genNext().toString()
    },
  })
}

export const orderRankOrdering = {
  title: 'Sıralama',
  name: 'ordered',
  by: [{field: 'orderRank', direction: 'asc' as const}],
}
