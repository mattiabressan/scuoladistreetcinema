import Cutout, { type Font, type Tone } from './Cutout'

export type Letter = [char: string, font: Font, tone: Tone, rotate: number]

// Parola composta da lettere "lettera di riscatto". Decorativa: il testo leggibile va messo a parte (sr-only)
export default function RansomWord({ letters, indent }: { letters: Letter[]; indent?: boolean }) {
  return (
    <span className={`ransom${indent ? ' ransom--indent' : ''}`} aria-hidden>
      {letters.map(([char, font, tone, rotate], i) => (
        <Cutout key={i} font={font} tone={tone} rotate={rotate}>
          {char}
        </Cutout>
      ))}
    </span>
  )
}
