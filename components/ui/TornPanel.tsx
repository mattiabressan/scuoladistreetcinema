import type { ReactNode } from 'react'
import { rot } from '@/lib/style'

interface Props {
  children: ReactNode
  edge: 'a' | 'b' | 'c' // tre forme di carta strappata, vedi .torn-* in globals.css
  tone?: 'paper' | 'ink'
  rotate?: number
  className?: string
}

export default function TornPanel({ children, edge, tone = 'paper', rotate = 0, className = '' }: Props) {
  return (
    <div className={`torn torn-${edge} t-${tone} ${className}`} style={rot(rotate)}>
      {children}
    </div>
  )
}
