import Link from 'next/link'
import { PortableText } from 'next-sanity'
import { CorsiGrid } from '@/components/CorsoCard'
import { sanityFetch } from '@/sanity/client'
import { HOME_QUERY, NUOVI_CORSI_QUERY } from '@/sanity/queries'
import { oggi } from '@/lib/date'
import type { CorsoCard, HomePage } from '@/lib/types'

export default async function Home() {
  const [home, corsi] = await Promise.all([
    sanityFetch<HomePage>(HOME_QUERY, {}, {}),
    sanityFetch<CorsoCard[]>(NUOVI_CORSI_QUERY, { oggi: oggi() }, []),
  ])

  return (
    <>
      <section className="hero">
        <h1>{home.heroTitolo ?? 'Scuola di Cinema'}</h1>
        {home.heroSottotitolo && <p>{home.heroSottotitolo}</p>}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Nuovi corsi</h2>
          <Link href="/corsi">Tutti i corsi →</Link>
        </div>
        <CorsiGrid corsi={corsi.slice(0, 3)} vuoto="Nuovi corsi in arrivo." />
      </section>

      <section className="section">
        <h2>{home.descrizioneTitolo ?? 'Chi siamo'}</h2>
        {home.descrizione && <PortableText value={home.descrizione} />}
        <Link href="/about">Scopri di più →</Link>
      </section>
    </>
  )
}
