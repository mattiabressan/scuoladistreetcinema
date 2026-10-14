'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { SINGLETONS } from './sanity/schemaTypes/singletons'

const singletonItem = (S: any, id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id))

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Scuola di Cinema',
  schema: {
    types: schemaTypes,
    // I singleton non si possono creare dal bottone "+"
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType) ? actions.filter(({ action }) => !['duplicate', 'delete', 'unpublish'].includes(action ?? '')) : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenuti')
          .items([
            S.documentTypeListItem('corso').title('Corsi'),
            S.documentTypeListItem('docente').title('Docenti'),
            S.divider(),
            singletonItem(S, 'homePage', 'Homepage'),
            singletonItem(S, 'aboutPage', 'About'),
            singletonItem(S, 'siteSettings', 'Impostazioni sito'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
