import { CorsiGrid } from '@/components/CorsoCard'
import { sanityFetch } from '@/sanity/client'
import { CORSI_PASSATI_QUERY } from '@/sanity/queries'
import { oggi } from '@/lib/date'
import type { CorsoCard } from '@/lib/types'

export const metadata = { title: 'Corsi passati' }

export default async function CorsiPassati() {
  const corsi = await sanityFetch<CorsoCard[]>(CORSI_PASSATI_QUERY, { oggi: oggi() }, [])

  return (
    <section className="section">
      <h1>Corsi passati</h1>
      <CorsiGrid corsi={corsi} vuoto="Nessun corso passato." />
    </section>
  )
}
