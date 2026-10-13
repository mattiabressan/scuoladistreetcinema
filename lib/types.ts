import type { PortableTextBlock } from 'next-sanity'
import type { SanityImageSource } from '@sanity/image-url'

export interface CorsoCard {
  _id: string
  titolo: string
  slug: string
  descrizioneBreve?: string
  copertina?: SanityImageSource & { alt?: string }
  dataInizio: string
  dataFine: string
  prezzo?: number
  stato?: 'aperto' | 'completo'
}

export interface Corso extends CorsoCard {
  descrizione?: PortableTextBlock[]
  docenti?: string[]
}

export interface HomePage {
  heroTitolo?: string
  heroSottotitolo?: string
  descrizioneTitolo?: string
  descrizione?: PortableTextBlock[]
}

export interface AboutPage {
  titolo?: string
  immagine?: SanityImageSource
  contenuto?: PortableTextBlock[]
}

export interface SiteSettings {
  nomeScuola?: string
  ragioneSociale?: string
  partitaIva?: string
  indirizzo?: string
  email?: string
  telefono?: string
  social?: { nome: string; url: string }[]
}
