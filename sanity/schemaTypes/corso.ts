import { defineArrayMember, defineField, defineType } from 'sanity'

export const corso = defineType({
  name: 'corso',
  title: 'Corso',
  type: 'document',
  groups: [
    { name: 'base', title: 'Base', default: true },
    { name: 'info', title: 'Info pratiche' },
    { name: 'testi', title: 'Testi' },
  ],
  fields: [
    defineField({ name: 'titolo', type: 'string', group: 'base', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', group: 'base', options: { source: 'titolo' }, validation: (r) => r.required() }),
    defineField({
      name: 'copertina',
      type: 'image',
      group: 'base',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Testo alternativo', type: 'string' })],
    }),
    defineField({ name: 'dataInizio', title: 'Data inizio', type: 'date', group: 'base', validation: (r) => r.required() }),
    defineField({
      name: 'dataFine',
      title: 'Data fine',
      type: 'date',
      group: 'base',
      description: 'Dopo questa data il corso passa automaticamente in "Corsi passati"',
      validation: (r) => r.required().min(r.valueOfField('dataInizio')),
    }),
    defineField({
      name: 'stato',
      type: 'string',
      group: 'base',
      options: { list: [{ title: 'Iscrizioni aperte', value: 'aperto' }, { title: 'Completo', value: 'completo' }], layout: 'radio' },
      initialValue: 'aperto',
    }),

    defineField({ name: 'durata', type: 'string', group: 'info', description: 'es. "8 settimane"' }),
    defineField({ name: 'orario', type: 'string', group: 'info', description: 'es. "Giovedì 19–22"' }),
    defineField({ name: 'posti', type: 'number', group: 'info', validation: (r) => r.min(1).integer() }),
    defineField({ name: 'prezzo', title: 'Prezzo (€)', type: 'number', group: 'info', description: 'Vuoto = "da definire"', validation: (r) => r.min(0) }),
    defineField({ name: 'docenti', type: 'array', group: 'info', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'cortiUrl', title: 'Link ai corti', type: 'url', group: 'info', description: 'Per i corsi passati (YouTube, Vimeo…)' }),

    defineField({
      name: 'descrizioneBreve',
      title: 'Descrizione breve',
      type: 'text',
      rows: 2,
      group: 'testi',
      description: 'Card in home e corsi passati',
      validation: (r) => r.max(160),
    }),
    defineField({ name: 'intro', type: 'text', rows: 4, group: 'testi', description: 'Pagina "Nuovi corsi"', validation: (r) => r.max(400) }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione completa',
      type: 'array',
      group: 'testi',
      description: 'Pagina di dettaglio del corso',
      of: [defineArrayMember({ type: 'block' }), defineArrayMember({ type: 'image' })],
    }),
  ],
  orderings: [{ title: 'Data inizio', name: 'dataInizioDesc', by: [{ field: 'dataInizio', direction: 'desc' }] }],
  preview: { select: { title: 'titolo', subtitle: 'dataInizio', media: 'copertina' } },
})
