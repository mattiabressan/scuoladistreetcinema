import { defineField, defineType } from 'sanity'

export const docente = defineType({
  name: 'docente',
  title: 'Docente',
  type: 'document',
  fields: [
    defineField({ name: 'nome', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'ruolo', type: 'string', description: 'es. "regia · fondatore"' }),
    defineField({ name: 'ritratto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ordine', type: 'number', description: 'Posizione nella pagina About (1, 2, 3…)' }),
  ],
  orderings: [{ title: 'Ordine', name: 'ordineAsc', by: [{ field: 'ordine', direction: 'asc' }] }],
  preview: { select: { title: 'nome', subtitle: 'ruolo', media: 'ritratto' } },
})
