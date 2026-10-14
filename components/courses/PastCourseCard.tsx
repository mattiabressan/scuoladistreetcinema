import Link from 'next/link'
import Media from '../ui/Media'
import { anno } from '@/lib/date'
import { rotAt } from '@/lib/style'
import type { CorsoCard } from '@/lib/types'

const ROTATIONS = [-1, 1.2, -0.6, 0.8, -1.4, 0.5]

export default function PastCourseCard({ corso, index }: { corso: CorsoCard; index: number }) {
  const { titolo, slug, descrizioneBreve, copertina, dataInizio, cortiUrl } = corso

  return (
    <article className="card past-card t-paper" style={rotAt(ROTATIONS, index)}>
      <Media image={copertina} alt={titolo} placeholder="fotogramma del corto finale" sizes="(max-width: 700px) 100vw, 33vw">
        <span className="year">{anno(dataInizio)}</span>
      </Media>
      <h2 className="label">{titolo}</h2>
      {descrizioneBreve && <p className="past-card__desc">{descrizioneBreve}</p>}
      {cortiUrl ? (
        <a href={cortiUrl} target="_blank" rel="noopener noreferrer" className="link-under link-under--pink">GUARDA I CORTI →</a>
      ) : (
        <Link href={`/corsi/${slug}`} className="link-under link-under--pink">DETTAGLI →</Link>
      )}
    </article>
  )
}
