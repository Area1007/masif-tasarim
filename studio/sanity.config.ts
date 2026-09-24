import {trTRLocale} from '@sanity/locale-tr-tr'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes, singletonTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Masif Tasarım',

  projectId: 'ssg8wqv9',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    trTRLocale(),
    // Sorgu test aracı; yalnızca yerel geliştirmede görünür
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
    // "Yeni belge" menüsünde tek kayıtlık belgeleri gösterme
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Tek kayıtlık belgelerde silme/çoğaltma gibi işlemleri kapat
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
