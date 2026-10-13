import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitolo', title: 'Titolo hero', type: 'string' }),
    defineField({ name: 'heroSottotitolo', title: 'Sottotitolo hero', type: 'string' }),
    defineField({ name: 'descrizioneTitolo', title: 'Titolo sezione descrizione', type: 'string' }),
    defineField({ name: 'descrizione', title: 'Descrizione', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
  ],
})

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About',
  type: 'document',
  fields: [
    defineField({ name: 'titolo', type: 'string' }),
    defineField({ name: 'immagine', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'contenuto', type: 'array', of: [defineArrayMember({ type: 'block' }), defineArrayMember({ type: 'image' })] }),
  ],
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Impostazioni sito',
  type: 'document',
  fields: [
    defineField({ name: 'nomeScuola', title: 'Nome scuola', type: 'string' }),
    defineField({ name: 'ragioneSociale', title: 'Ragione sociale', type: 'string' }),
    defineField({ name: 'partitaIva', title: 'Partita IVA', type: 'string' }),
    defineField({ name: 'indirizzo', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'telefono', type: 'string' }),
    defineField({
      name: 'social',
      type: 'array',
      of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'nome', type: 'string' }), defineField({ name: 'url', type: 'url' })] })],
    }),
  ],
})

export const SINGLETONS = ['homePage', 'aboutPage', 'siteSettings']
