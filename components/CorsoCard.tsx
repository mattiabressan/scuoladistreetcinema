import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/image'
import { formatData } from '@/lib/date'
import type { CorsoCard as CorsoCardType } from '@/lib/types'

export default function CorsoCard({ corso }: { corso: CorsoCardType }) {
  const { titolo, slug, descrizioneBreve, copertina, dataInizio, stato } = corso

  return (
    <article className="corso-card">
      <Link href={`/corsi/${slug}`}>
        {copertina && (
          <Image src={urlFor(copertina).width(600).height(400).url()} alt={copertina.alt ?? titolo} width={600} height={400} />
        )}
        <h3>{titolo}</h3>
        <p className="meta">
          Dal {formatData(dataInizio)}
          {stato === 'completo' && <span className="badge">Completo</span>}
        </p>
        {descrizioneBreve && <p>{descrizioneBreve}</p>}
      </Link>
    </article>
  )
}

export function CorsiGrid({ corsi, vuoto }: { corsi: CorsoCardType[]; vuoto: string }) {
  if (!corsi.length) return <p className="empty">{vuoto}</p>
  return (
    <div className="corsi-grid">
      {corsi.map((c) => <CorsoCard key={c._id} corso={c} />)}
    </div>
  )
}
