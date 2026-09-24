import {CogIcon} from '@sanity/icons/Cog'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {HomeIcon} from '@sanity/icons/Home'
import {ImagesIcon} from '@sanity/icons/Images'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {WrenchIcon} from '@sanity/icons/Wrench'
import type {ComponentType} from 'react'
import type {ConfigContext} from 'sanity'
import type {ItemChild, StructureBuilder, StructureResolver} from 'sanity/structure'

const singleton = (S: StructureBuilder, type: string, title: string, icon: ComponentType) =>
  S.listItem().title(title).id(type).icon(icon).child(S.document().schemaType(type).documentId(type).title(title))

/**
 * Sürükle-bırak sıralanabilir liste.
 *
 * Eklenti, CommonJS bir bağımlılık (lexorank) içerdiği için dosya başında import
 * edildiğinde Sanity CLI'nin şema doğrulama/dağıtım adımları hata veriyor. Bu yüzden
 * eklenti yalnızca liste açıldığında (tarayıcıda) yüklenir.
 */
const orderableList = (S: StructureBuilder, context: ConfigContext, type: string, title: string, icon: ComponentType) =>
  S.listItem()
    .title(title)
    .id(`orderable-${type}`)
    .icon(icon)
    .schemaType(type)
    .child(async () => {
      const {orderableDocumentListDeskItem} = await import('@sanity/orderable-document-list')
      // Eklenti burada hazır (serileştirilmiş) bir bileşen paneli döndürür.
      return orderableDocumentListDeskItem({type, title, icon, S, context}).child as ItemChild
    })

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('İçerik')
    .items([
      singleton(S, 'homePage', 'Ana Sayfa', HomeIcon),
      singleton(S, 'aboutPage', 'Hakkımızda', InfoOutlineIcon),
      S.divider(),
      orderableList(S, context, 'project', 'Projeler', ImagesIcon),
      singleton(S, 'projectsPage', 'Projeler Sayfası', DocumentsIcon),
      orderableList(S, context, 'service', 'Hizmetler', WrenchIcon),
      S.divider(),
      singleton(S, 'siteSettings', 'Site Ayarları', CogIcon),
    ])
