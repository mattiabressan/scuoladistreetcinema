import { defineQuery } from 'next-sanity'

const corsoCard = `_id, titolo, "slug": slug.current, descrizioneBreve, copertina, dataInizio, dataFine, prezzo, stato`

// $oggi = 'YYYY-MM-DD', passato da lib/date.ts
export const NUOVI_CORSI_QUERY = defineQuery(
  `*[_type == "corso" && dataFine >= $oggi] | order(dataInizio asc) { ${corsoCard} }`
)

export const CORSI_PASSATI_QUERY = defineQuery(
  `*[_type == "corso" && dataFine < $oggi] | order(dataInizio desc) { ${corsoCard} }`
)

export const CORSO_QUERY = defineQuery(
  `*[_type == "corso" && slug.current == $slug][0] { ${corsoCard}, descrizione, docenti }`
)

export const CORSI_SLUGS_QUERY = defineQuery(`*[_type == "corso" && defined(slug.current)].slug.current`)

export const HOME_QUERY = defineQuery(`*[_type == "homePage"][0]{ heroTitolo, heroSottotitolo, descrizioneTitolo, descrizione }`)

export const ABOUT_QUERY = defineQuery(`*[_type == "aboutPage"][0]{ titolo, contenuto, immagine }`)

export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{ nomeScuola, ragioneSociale, partitaIva, indirizzo, email, telefono, social }`)
