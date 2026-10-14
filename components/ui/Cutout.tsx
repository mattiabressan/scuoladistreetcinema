import type { ReactNode } from 'react'
import { rot } from '@/lib/style'

export type Font = 'archivo' | 'abril' | 'gothic' | 'anton' | 'elite'
export type Tone = 'paper' | 'ink' | 'pink' | 'ink-pink'

interface Props {
  children: ReactNode
  font?: Font
  tone?: Tone
  rotate?: number
  className?: string
}

// Etichetta "ritaglio di giornale": blocco pieno, ruotato
export default function Cutout({ children, font = 'archivo', tone = 'paper', rotate = 0, className = '' }: Props) {
  return (
    <span className={`cut f-${font} t-${tone} ${className}`} style={rot(rotate)}>
      {children}
    </span>
  )
}
