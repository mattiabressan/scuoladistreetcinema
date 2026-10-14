import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroDefinizione',
      title: 'Definizione hero',
      type: 'text',
      rows: 3,
      description: 'Il testo nella card "da dizionario" accanto al titolo',
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione (blocco nero "GIRA. sbaglia. RIGIRA.")',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
  ],
})

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About',
  type: 'document',
  fields: [
    defineField({ name: 'immagine', title: 'Foto (gruppo / set)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'storia', title: 'La storia', type: 'text', rows: 6 }),
    defineField({ name: 'metodo', title: 'Il metodo', type: 'text', rows: 6 }),
  ],
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Impostazioni sito',
  type: 'document',
  fields: [
    defineField({ name: 'nomeScuola', title: 'Nome scuola', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline footer', type: 'text', rows: 2 }),
    defineField({ name: 'notaStagione', title: 'Nota pagina Nuovi corsi', type: 'string', description: 'es. "Stagione 2026/27 · posti limitati…"' }),
    defineField({ name: 'ragioneSociale', title: 'Ragione sociale', type: 'string' }),
    defineField({ name: 'partitaIva', title: 'Partita IVA', type: 'string' }),
    defineField({ name: 'indirizzo', type: 'string' }),
    defineField({ name: 'email', type: 'string', description: 'Usata anche per le iscrizioni finché non c\'è il pagamento online' }),
    defineField({ name: 'telefono', type: 'string' }),
    defineField({
      name: 'social',
      type: 'array',
      of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'nome', type: 'string' }), defineField({ name: 'url', type: 'url' })] })],
    }),
  ],
})

export const SINGLETONS = ['homePage', 'aboutPage', 'siteSettings']
