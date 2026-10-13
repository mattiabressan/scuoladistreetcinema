import { defineArrayMember, defineField, defineType } from 'sanity'

export const corso = defineType({
  name: 'corso',
  title: 'Corso',
  type: 'document',
  fields: [
    defineField({ name: 'titolo', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'titolo' }, validation: (r) => r.required() }),
    defineField({ name: 'descrizioneBreve', title: 'Descrizione breve', type: 'text', rows: 3, validation: (r) => r.max(200) }),
    defineField({ name: 'copertina', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string' })] }),
    defineField({ name: 'dataInizio', title: 'Data inizio', type: 'date', validation: (r) => r.required() }),
    defineField({
      name: 'dataFine',
      title: 'Data fine',
      type: 'date',
      description: 'Dopo questa data il corso passa automaticamente in "Corsi passati"',
      validation: (r) => r.required().min(r.valueOfField('dataInizio')),
    }),
    defineField({ name: 'docenti', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'descrizione', type: 'array', of: [defineArrayMember({ type: 'block' }), defineArrayMember({ type: 'image' })] }),
    defineField({ name: 'prezzo', title: 'Prezzo (€)', type: 'number', validation: (r) => r.min(0) }),
    defineField({
      name: 'stato',
      type: 'string',
      options: { list: [{ title: 'Iscrizioni aperte', value: 'aperto' }, { title: 'Completo', value: 'completo' }], layout: 'radio' },
      initialValue: 'aperto',
    }),
  ],
  orderings: [{ title: 'Data inizio', name: 'dataInizioDesc', by: [{ field: 'dataInizio', direction: 'desc' }] }],
  preview: { select: { title: 'titolo', subtitle: 'dataInizio', media: 'copertina' } },
})
