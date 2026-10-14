import Cutout from '@/components/ui/Cutout'
import Media from '@/components/ui/Media'
import TornPanel from '@/components/ui/TornPanel'
import TeacherCard from '@/components/TeacherCard'
import { sanityFetch } from '@/sanity/client'
import { ABOUT_QUERY, DOCENTI_QUERY } from '@/sanity/queries'
import { rot } from '@/lib/style'
import type { AboutPage, Docente } from '@/lib/types'

export const metadata = { title: 'Chi siamo' }

export default async function About() {
  const [about, docenti] = await Promise.all([
    sanityFetch<AboutPage>(ABOUT_QUERY, {}, {}),
    sanityFetch<Docente[]>(DOCENTI_QUERY, {}, []),
  ])

  return (
    <div className="container page page--about">
      <section className="about-intro">
        <h1 className="title title--xl title--nowrap">
          <Cutout rotate={-2}>CHI</Cutout>
          <Cutout font="gothic" tone="ink-pink" rotate={3}>s</Cutout>
          <Cutout font="abril" rotate={-1}>iamo</Cutout>
        </h1>
        <Media image={about.immagine} alt="La scuola" placeholder="foto di gruppo / set in strada" sizes="(max-width: 860px) 100vw, 50vw" className="about-photo" style={rot(2)} />
      </section>

      <section className="about-cards">
        <TornPanel edge="c" rotate={-1.5} className="panel">
          <h2 className="panel__title">LA STORIA</h2>
          <p className="panel__text">
            {about.storia ??
              'La scuola nasce da un gruppo di filmmaker indipendenti stanchi di sentirsi dire che per fare cinema servono soldi e permessi. Abbiamo iniziato girando nei cortili, poi abbiamo cominciato a insegnarlo.'}
          </p>
        </TornPanel>
        <div className="panel panel--ink t-ink" style={rot(1)}>
          <h2 className="panel__title">IL METODO</h2>
          <p className="panel__text">
            {about.metodo ??
              "Poca teoria, tanto girato. Ogni corso finisce con un corto vero, proiettato in pubblico. Si lavora in piccoli gruppi, con l'attrezzatura che ognuno ha già in tasca."}
          </p>
        </div>
      </section>

      {!!docenti.length && (
        <section className="section section--flush">
          <h2 className="title title--md">
            <Cutout tone="ink" rotate={-2}>I</Cutout>
            <Cutout font="abril" rotate={1.5}>docenti</Cutout>
          </h2>
          <div className="grid grid--teachers">
            {docenti.map((d, i) => <TeacherCard key={d._id} docente={d} index={i} />)}
          </div>
        </section>
      )}
    </div>
  )
}
