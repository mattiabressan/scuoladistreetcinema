import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import { sanityFetch } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { CORSO_QUERY, CORSI_SLUGS_QUERY } from '@/sanity/queries'
import { formatData, oggi } from '@/lib/date'
import type { Corso } from '@/lib/types'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = async () =>
  (await sanityFetch<string[]>(CORSI_SLUGS_QUERY, {}, [])).map((slug) => ({ slug }))

export const generateMetadata = async ({ params }: Props) => {
  const corso = await sanityFetch<Corso | null>(CORSO_QUERY, { slug: (await params).slug }, null)
  return { title: corso?.titolo, description: corso?.descrizioneBreve }
}

export default async function CorsoPage({ params }: Props) {
  const corso = await sanityFetch<Corso | null>(CORSO_QUERY, { slug: (await params).slug }, null)
  if (!corso) notFound()

  const { titolo, copertina, dataInizio, dataFine, docenti, descrizione, prezzo, stato } = corso
  const iscrizioniAperte = dataFine >= oggi() && stato !== 'completo'

  return (
    <article className="section corso">
      <h1>{titolo}</h1>
      <p className="meta">
        {formatData(dataInizio)} — {formatData(dataFine)}
      </p>

      {copertina && (
        <Image src={urlFor(copertina).width(1200).height(675).url()} alt={copertina.alt ?? titolo} width={1200} height={675} priority />
      )}

      {!!docenti?.length && <p>Docenti: {docenti.join(', ')}</p>}
      {descrizione && <PortableText value={descrizione} />}

      {prezzo != null && <p className="prezzo">€ {prezzo}</p>}

      {/* TODO pagamenti: bottone che chiama /api/checkout → Stripe Checkout */}
      {iscrizioniAperte && (
        <button className="cta" disabled>
          Iscriviti (presto disponibile)
        </button>
      )}
    </article>
  )
}
