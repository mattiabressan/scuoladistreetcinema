import Link from 'next/link'
import { PortableText } from 'next-sanity'
import Cutout from '@/components/ui/Cutout'
import RansomWord, { type Letter } from '@/components/ui/RansomWord'
import TornPanel from '@/components/ui/TornPanel'
import CourseCard from '@/components/courses/CourseCard'
import { sanityFetch } from '@/sanity/client'
import { HOME_QUERY, NUOVI_CORSI_QUERY } from '@/sanity/queries'
import { oggi } from '@/lib/date'
import type { CorsoCard, HomePage } from '@/lib/types'

const STREET: Letter[] = [
  ['S', 'archivo', 'ink', -3],
  ['t', 'abril', 'paper', 2],
  ['r', 'gothic', 'ink-pink', -1],
  ['E', 'anton', 'paper', 4],
  ['e', 'elite', 'ink', -2],
  ['T', 'archivo', 'paper', 1],
]

const CINEMA: Letter[] = [
  ['C', 'abril', 'paper', 2],
  ['I', 'anton', 'ink', -4],
  ['n', 'archivo', 'paper', 1],
  ['e', 'gothic', 'paper', -2],
  ['M', 'archivo', 'ink', 3],
  ['a', 'elite', 'paper', -1],
]

const DEFINIZIONE =
  "Realizzare un corto con attrici e attori presi dalla strada e testi di letterati famosi, con un 'neorealismo underground'."

export default async function Home() {
  const [home, corsi] = await Promise.all([
    sanityFetch<HomePage>(HOME_QUERY, {}, {}),
    sanityFetch<CorsoCard[]>(NUOVI_CORSI_QUERY, { oggi: oggi() }, []),
  ])

  return (
    <>
      <section className="container hero">
        <div className="hero__text">
          <h1>
            <span className="sr-only">Scuola di Street Cinema</span>
            <RansomWord letters={STREET} />
            <RansomWord letters={CINEMA} indent />
          </h1>
          <div className="hero__cta">
            <Link href="/corsi" className="btn btn--ink">VEDI I NUOVI CORSI →</Link>
          </div>
        </div>

        <TornPanel edge="a" rotate={2.5} className="definition">
          <p className="definition__word">street cinema</p>
          <p className="definition__pron">[strìt ʧìnema] · s.m.</p>
          <p className="definition__text">{home.heroDefinizione ?? DEFINIZIONE}</p>
        </TornPanel>
      </section>

      <section className="container section">
        <div className="section__head">
          <h2 className="title title--md">
            <Cutout rotate={-2}>NUOVI</Cutout>
            <Cutout font="abril" tone="ink" rotate={2}>corsi</Cutout>
          </h2>
          <Link href="/corsi" className="link-under">TUTTI I CORSI →</Link>
        </div>
        {corsi.length ? (
          <div className="grid grid--courses">
            {corsi.slice(0, 3).map((c, i) => <CourseCard key={c._id} corso={c} index={i} />)}
          </div>
        ) : (
          <Cutout font="elite" rotate={-1} className="empty">Nuovi corsi in arrivo.</Cutout>
        )}
      </section>

      <section className="container manifesto-wrap">
        <TornPanel edge="b" tone="ink" rotate={-1} className="manifesto">
           <p className="manifesto__words">
            <Cutout tone="pink" rotate={-2}>DARE VOCE</Cutout>
            <Cutout font="abril" rotate={1.5}>agli</Cutout>
            <Cutout tone="pink" rotate={-1}>INVISIBILI.</Cutout>
          </p>
          <div className="manifesto__text">
            {home.descrizione ? (
              <PortableText value={home.descrizione} />
            ) : (
              <>
                <p>
                  Fare cinema significa prima di tutto &lsquo;dare voce agli invisibili&rsquo;: attrici e attori reclutati dalla strada e
                  testi di letterati famosi per affrontare temi di attualità.
                </p>
                <p>
                  I corsi si rivolgono a tutte e tutti coloro che hanno il coraggio di mettersi in gioco, facendo &ldquo;cinema di
                  strada&rdquo; e trasformando un cortometraggio in un&apos;esperienza emozionante e unica.
                </p>
              </>
            )}
            <Link href="/about" className="manifesto__link">Chi siamo →</Link>
          </div>
        </TornPanel>
      </section>
    </>
  )
}
