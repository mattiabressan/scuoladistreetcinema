import type { PortableTextBlock } from 'next-sanity'
import type { SanityImageSource } from '@sanity/image-url'

export type SanityImage = SanityImageSource & { alt?: string }

export interface CorsoCard {
  _id: string
  titolo: string
  slug: string
  descrizioneBreve?: string
  intro?: string
  copertina?: SanityImage
  dataInizio: string
  dataFine: string
  durata?: string
  orario?: string
  posti?: number
  prezzo?: number
  stato?: 'aperto' | 'completo'
  cortiUrl?: string
}

export interface Corso extends CorsoCard {
  descrizione?: PortableTextBlock[]
  docenti?: string[]
}

export interface Docente {
  _id: string
  nome: string
  ruolo?: string
  ritratto?: SanityImage
}

export interface HomePage {
  heroDefinizione?: string
  descrizione?: PortableTextBlock[]
}

export interface AboutPage {
  immagine?: SanityImage
  storia?: string
  metodo?: string
}

export interface SiteSettings {
  nomeScuola?: string
  tagline?: string
  notaStagione?: string
  ragioneSociale?: string
  partitaIva?: string
  indirizzo?: string
  email?: string
  telefono?: string
  social?: { nome: string; url: string }[]
}
