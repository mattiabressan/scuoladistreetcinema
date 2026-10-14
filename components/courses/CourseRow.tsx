import Link from 'next/link'
import type { ReactNode } from 'react'
import Media from '../ui/Media'
import EnrollBox from './EnrollBox'
import { isPassato, quando } from '@/lib/date'
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
  const { titolo, slug, intro, descrizioneBreve, copertina, durata, orario, posti, prezzo } = corso
  const Title = detail ? 'h1' : 'h2'
  const passato = isPassato(corso)

  // Corsi in programma: sempre tutte e tre le voci ("da definire"); conclusi: solo quelle note
  const meta = ([
    ['ORARIO', orario],
    ['POSTI', posti],
    ['QUOTA', prezzo != null ? `€ ${prezzo}` : undefined],
  ] as const).filter(([, value]) => value != null || !passato)

  return (
    <article className={`card card--lg course-row t-paper${detail ? ' course-row--detail' : ''}`}>
      <Media image={copertina} alt={titolo} placeholder="still dal corso" sizes="(max-width: 760px) 100vw, 50vw" />

      <div className="course-row__body">
        <div className="course-row__top">
          <span className="badge">{pad2(index + 1)}</span>
          <span className="course-row__when">
            {quando(corso)}
            {durata && ` · ${durata}`}
          </span>
        </div>

        <Title className="label">{detail ? titolo : <Link href={`/${passato ? 'corsi-passati' : 'corsi'}/${slug}`}>{titolo}</Link>}</Title>

        <div className="course-row__text">{children ?? <p>{intro ?? descrizioneBreve}</p>}</div>

        {!!meta.length && (
          <dl className="meta">
            {meta.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value ?? 'da definire'}</dd></div>
            ))}
          </dl>
        )}

        {passato ? (
          <div className="enroll">
            <span className="enroll__note">Edizione conclusa.</span>
            <Link href="/corsi" className="btn btn--pink">PROSSIMI CORSI →</Link>
          </div>
        ) : (
          <EnrollBox corso={corso} email={email} />
        )}
      </div>
    </article>
  )
}
