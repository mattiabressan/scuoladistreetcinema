import Link from 'next/link'
import Media from '../ui/Media'
import { dal } from '@/lib/date'
import { rotAt } from '@/lib/style'
import type { CorsoCard } from '@/lib/types'

const ROTATIONS = [-1.5, 1.2, -0.8]

// Card compatta della home
export default function CourseCard({ corso, index }: { corso: CorsoCard; index: number }) {
  const { titolo, slug, descrizioneBreve, copertina, dataInizio, durata } = corso

  return (
    <article className="card course-card t-paper" style={rotAt(ROTATIONS, index)}>
      <Media image={copertina} alt={titolo} placeholder="still dal corso" sizes="(max-width: 700px) 100vw, 33vw" />
      <h3 className="label">{titolo}</h3>
      {descrizioneBreve && <p className="course-card__desc">{descrizioneBreve}</p>}
      <p className="course-card__when">
        {dal(dataInizio)}
        {durata && <><br />{durata}</>}
      </p>
      <Link href={`/corsi/${slug}`} className="btn btn--pink">SCOPRI →</Link>
    </article>
  )
}
