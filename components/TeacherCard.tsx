import Media from './ui/Media'
import { rotAt } from '@/lib/style'
import type { Docente } from '@/lib/types'

const ROTATIONS = [-1.5, 1, -0.5]

export default function TeacherCard({ docente, index }: { docente: Docente; index: number }) {
  const { nome, ruolo, ritratto } = docente

  return (
    <article className="teacher" style={rotAt(ROTATIONS, index)}>
      <Media image={ritratto} alt={nome} placeholder="ritratto" sizes="(max-width: 700px) 100vw, 25vw" />
      <h3 className="label">{nome}</h3>
      {ruolo && <span className="teacher__role">{ruolo}</span>}
    </article>
  )
}
