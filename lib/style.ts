import type { CSSProperties } from 'react'

// Rotazione "ritaglio" via custom property, così l'hover può aggiungere la traslazione
export const rot = (deg: number) => ({ '--r': `${deg}deg` }) as CSSProperties

// Rotazione ciclica per liste (card, docenti…)
export const rotAt = (list: readonly number[], i: number) => rot(list[i % list.length])

export const pad2 = (n: number) => String(n).padStart(2, '0')
