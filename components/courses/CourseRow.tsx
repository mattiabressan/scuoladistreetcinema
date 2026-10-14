import Link from 'next/link'
import type { ReactNode } from 'react'
import Media from '../ui/Media'
import EnrollBox from './EnrollBox'
import { dal } from '@/lib/date'
import { pad2 } from '@/lib/style'
import type { CorsoCard } from '@/lib/types'

interface Props {
  corso: CorsoCard
  index: number
  email?: string
  detail?: boolean // pagina /corsi/[slug]: titolo h1, niente link, testo completo in children
  children?: ReactNode
}

// Card orizzontale della pagina Nuovi corsi (e del dettaglio)
export default function CourseRow({ corso, index, email, detail, children }: Props) {
  const { titolo, slug, intro, descrizioneBreve, copertina, dataInizio, durata, orario, posti, prezzo } = corso
  const Title = detail ? 'h1' : 'h2'

  return (
    <article className={`card card--lg course-row t-paper${detail ? ' course-row--detail' : ''}`}>
      <Media image={copertina} alt={titolo} placeholder="still dal corso" sizes="(max-width: 760px) 100vw, 50vw" />

      <div className="course-row__body">
        <div className="course-row__top">
          <span className="badge">{pad2(index + 1)}</span>
          <span className="course-row__when">
            {dal(dataInizio)}
            {durata && ` · ${durata}`}
          </span>
        </div>

        <Title className="label">{detail ? titolo : <Link href={`/corsi/${slug}`}>{titolo}</Link>}</Title>

        <div className="course-row__text">{children ?? <p>{intro ?? descrizioneBreve}</p>}</div>

        <dl className="meta">
          <div><dt>ORARIO</dt><dd>{orario ?? 'da definire'}</dd></div>
          <div><dt>POSTI</dt><dd>{posti ?? 'da definire'}</dd></div>
          <div><dt>QUOTA</dt><dd>{prezzo != null ? `€ ${prezzo}` : 'da definire'}</dd></div>
        </dl>

        <EnrollBox corso={corso} email={email} />
      </div>
    </article>
  )
}
