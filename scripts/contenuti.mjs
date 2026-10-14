// Contenuti reali del sito. Usati da `npm run seed` per popolare Sanity.
// Mini-markup nei testi: *corsivo* e [testo](url)

let k = 0
const key = () => `k${(++k).toString(36)}`

const spans = (text, markDefs) =>
  text
    .split(/(\*[^*]+\*|\[[^\]]+\]\([^)]+\))/)
    .filter(Boolean)
    .map((part) => {
      const link = part.match(/^\[(.+)\]\((.+)\)$/)
      if (link) {
        const _key = key()
        markDefs.push({ _key, _type: 'link', href: link[2] })
        return { _type: 'span', _key: key(), text: link[1], marks: [_key] }
      }
      const em = part.match(/^\*(.+)\*$/)
      return { _type: 'span', _key: key(), text: em ? em[1] : part, marks: em ? ['em'] : [] }
    })

const block = (text, style = 'normal', listItem) => {
  const markDefs = []
  return { _type: 'block', _key: key(), style, markDefs, children: spans(text, markDefs), ...(listItem && { listItem, level: 1 }) }
}
const p = (t) => block(t)
const h3 = (t) => block(t, 'h3')
const h4 = (t) => block(t, 'h4')
const li = (t) => block(t, 'normal', 'bullet')

const TEKLA = 'Tekla Taidelli'
const TEKLA_URL = 'https://cinema.fondazionemilano.eu/docenti/tekla-taidelli'
const PAGAMENTO_URL = 'https://cinema.fondazionemilano.eu/studenti-futuri/modalit%C3%A0-di-pagamento'

// ---------------------------------------------------------------- Corsi

const corso2026 = {
  _id: 'corso-summer-school-2026',
  _type: 'corso',
  titolo: 'Il sentiero dei nidi di ragno',
  slug: { _type: 'slug', current: 'summer-school-2026-il-sentiero-dei-nidi-di-ragno' },
  dataInizio: '2026-07-06',
  dataFine: '2026-07-10',
  stato: 'aperto',
  durata: '4 giornate',
  prezzo: 400,
  docenti: [TEKLA],
  descrizioneBreve: 'Summer School 2026 · con le ospiti di Progetto Aisha, tra violenza sulle donne e territori palestinesi.',
  intro:
    "A Scuola di Street Cinema, 24ª edizione. Due giornate di shooting in strada e due di montaggio per realizzare Il sentiero dei nidi di ragno con le ospiti di Progetto Aisha.",
  descrizione: [
    p("Il corso si rivolge a tutte e tutti coloro che hanno il coraggio di mettersi in gioco e fare di un cortometraggio un'esperienza emozionante e unica che vive attraverso testi di autrici e autori conosciuti."),
    p(`A cura di [${TEKLA}](${TEKLA_URL}).`),
    h3('Descrizione'),
    p(
      "Dopo aver vinto il primo premio per il corto sperimentale al Nòt Film Fest 2021 con *Il capitano è fuori a pranzo* – nel quale alcuni homeless di Milano recitano Charles Bukowski – dopo aver realizzato in Grecia, durante il Festival del Peloponneso, il corto *Poesie in forma di rosa* – dove i pescatori di Kalamata recitano le poesie di Pier Paolo Pasolini – con le allieve e gli allievi della Athens School of Fine Arts, e dopo essere stata alla Civica Scuola di Cinema Luchino Visconti per la Summer School 2022 realizzando il corto *La 12a notte* con gli immigrati di Stazione Centrale, per la Summer School 2023 realizzando il corto *Storia di una Passione* con gay lesbiche e trans per i diritti lgbtq+, per la Summer School 2024 realizzando il corto *Il Bar(b)one Rampante*, omaggio per il centenario di Calvino con gli homeless di Piazza Cadorna e per la Summer School 2025 realizzando *Il Pasto Nudo* di Burroughs con gli ex-tossicodipendenti della comunità L'Asilo di Milano, la Scuola di Street Cinema di Tekla Taidelli torna alla Summer School 2026."
    ),
    p(
      "La Scuola di Street Cinema, originale e unica, è stata fondata nel 2013 da Tekla Taidelli, la regista più underground in Italia, conosciuta per il film culto *Fuori Vena* (2004) e premio Siae per il talento creativo a Venezia 2025 con il nuovo film *6:06*."
    ),
    p(
      "Secondo Tekla fare cinema significa prima di tutto ‘dare voce agli invisibili’: nei suoi film coinvolge attrici e attori reclutati dalla strada e ricorrendo a testi di letterati famosi (Shakespeare, Bukowski, Kerouac, Baudelaire) affronta temi di attualità."
    ),
    p(
      'Il corso si rivolge a tutte e tutti coloro che hanno il coraggio di mettersi in gioco, facendo "cinema di strada" e trasformando un cortometraggio in un\'esperienza emozionante e unica.'
    ),
    p(
      'Per la ventiquattresima edizione si realizzerà il cortometraggio *Il sentiero dei nidi di ragno*, interpretato dalle ospiti di Progetto Aisha, associazione di via Palmanova impegnata nel contrasto alla violenza sulle donne con focus sulle donne musulmane, per creare un parallelo tra la violenza subita dalle donne e quella che colpisce i corpi e i territori palestinesi, portando consapevolezza attraverso un gesto artistico che parte dalle storie reali.'
    ),
    p(
      "Le prime due giornate saranno dedicate allo shooting. Dopo un'introduzione sulla Scuola di Street Cinema, la lettura dello script (che verrà mandato in precedenza alle allieve e agli allievi così che potranno esprimere le loro idee e decidere quale scena girare), qualche elemento di fotografia, suono, edizione, si va in strada a girare. Tutte e tutti i partecipanti, a turno, lavoreranno in ogni reparto (regia, fotografia, audio, edizione, direzione degli attori, back stage) girando con due camere Sony Alfa 7III e microfono Sennheiser."
    ),
    p('Le ultime due giornate saranno dedicate al montaggio. In due postazioni si monta il film con Premiere 2025, una terza postazione sarà dedicata al backstage.'),
    h3('Programma'),
    h4('Giorni 1 e 2'),
    li('Introduzione allo Street Cinema'),
    li('Lettura dello script, piano di lavorazione, piano regia'),
    li('Dettami di fotografia, audio in presa diretta, edizione'),
    li('Shooting in strada'),
    h4('Giorni 3 e 4'),
    li('Dettami di montaggio'),
    li('Editing delle scene'),
    li('Finalizzazione'),
    li('Back stage'),
    h3('Costo'),
    p('Il costo del corso è di 400 €. Sono previste quote agevolate:'),
    li('360 € per diplomate/i delle Scuole Civiche di Fondazione Milano'),
    li('320 € per studentesse e studenti in corso di studi delle Scuole Civiche di Fondazione Milano'),
    p(`È possibile pagare il corso con la Carta del docente, [verifica le modalità di utilizzo](${PAGAMENTO_URL}).`),
  ],
}

// Edizioni precedenti: date non note, solo l'anno → finiscono direttamente in "Corsi passati"
const archivio = (anno, titolo, slug, breve, intro) => ({
  _id: `corso-summer-school-${anno}`,
  _type: 'corso',
  titolo,
  slug: { _type: 'slug', current: `summer-school-${anno}-${slug}` },
  anno,
  docenti: [TEKLA],
  descrizioneBreve: `Summer School ${anno} · ${breve}`,
  intro,
})

export const corsi = [
  corso2026,
  archivio(2025, 'Il Pasto Nudo', 'il-pasto-nudo', "da Burroughs, con gli ex-tossicodipendenti della comunità L'Asilo di Milano.",
    "Summer School 2025 alla Civica Scuola di Cinema Luchino Visconti: Il Pasto Nudo di Burroughs, interpretato dagli ex-tossicodipendenti della comunità L'Asilo di Milano."),
  archivio(2024, 'Il Bar(b)one Rampante', 'il-barbone-rampante', 'omaggio a Calvino con gli homeless di Piazza Cadorna.',
    'Summer School 2024 alla Civica Scuola di Cinema Luchino Visconti: Il Bar(b)one Rampante, omaggio per il centenario di Calvino con gli homeless di Piazza Cadorna.'),
  archivio(2023, 'Storia di una Passione', 'storia-di-una-passione', 'con gay, lesbiche e trans per i diritti LGBTQ+.',
    'Summer School 2023 alla Civica Scuola di Cinema Luchino Visconti: Storia di una Passione, girato con gay, lesbiche e trans per i diritti LGBTQ+.'),
  archivio(2022, 'La 12a notte', 'la-12a-notte', 'con gli immigrati di Stazione Centrale.',
    'Summer School 2022 alla Civica Scuola di Cinema Luchino Visconti: La 12a notte, girato con gli immigrati di Stazione Centrale.'),
]

// ---------------------------------------------------------------- Docenti

export const docenti = [
  { _id: 'docente-tekla-taidelli', _type: 'docente', nome: TEKLA, ruolo: 'regia · fondatrice', link: TEKLA_URL, ordine: 1 },
]

// ---------------------------------------------------------------- Singleton (solo i campi di testo, il resto resta com'è)

export const singletons = {
  homePage: {
    heroDefinizione:
      "Fare cinema per dare voce agli invisibili: attrici e attori presi dalla strada, testi di grandi autori, temi di attualità. Originale e unica, dal 2013.",
    descrizione: [
      p(
        "La Scuola di Street Cinema è stata fondata nel 2013 da Tekla Taidelli, la regista più underground in Italia, conosciuta per il film culto *Fuori Vena* (2004) e premio Siae per il talento creativo a Venezia 2025 con *6:06*."
      ),
      p("I corsi si rivolgono a tutte e tutti coloro che hanno il coraggio di mettersi in gioco, facendo cinema di strada e trasformando un cortometraggio in un'esperienza emozionante e unica."),
    ],
  },
  aboutPage: {
    storia:
      "Fondata nel 2013 da Tekla Taidelli – regista del film culto Fuori Vena (2004) e premio Siae per il talento creativo a Venezia 2025 con 6:06 – la Scuola di Street Cinema porta il set dove il cinema di solito non arriva.\n\nCon Il capitano è fuori a pranzo gli homeless di Milano recitano Bukowski (primo premio per il corto sperimentale al Nòt Film Fest 2021); in Grecia i pescatori di Kalamata recitano Pasolini in Poesie in forma di rosa. Dal 2022 la scuola torna ogni estate alla Summer School della Civica Scuola di Cinema Luchino Visconti.",
    metodo:
      "Fare cinema significa prima di tutto dare voce agli invisibili: attrici e attori reclutati dalla strada e testi di letterati famosi – Shakespeare, Bukowski, Kerouac, Baudelaire – per affrontare temi di attualità.\n\nTutte e tutti, a turno, lavorano in ogni reparto: regia, fotografia, audio, edizione, direzione degli attori, backstage. Prima si gira in strada, poi si monta: ogni corso finisce con un cortometraggio vero.",
  },
  siteSettings: {
    nomeScuola: 'Scuola di Street Cinema',
    tagline: 'Dare voce agli invisibili.\nCinema di strada dal 2013.',
  },
}
