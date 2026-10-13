import { CorsiGrid } from '@/components/CorsoCard'
import { sanityFetch } from '@/sanity/client'
import { NUOVI_CORSI_QUERY } from '@/sanity/queries'
import { oggi } from '@/lib/date'
import type { CorsoCard } from '@/lib/types'

export const metadata = { title: 'Nuovi corsi' }

export default async function NuoviCorsi() {
  const corsi = await sanityFetch<CorsoCard[]>(NUOVI_CORSI_QUERY, { oggi: oggi() }, [])

  return (
    <section className="section">
      <h1>Nuovi corsi</h1>
      <CorsiGrid corsi={corsi} vuoto="Nuovi corsi in arrivo." />
    </section>
  )
}
