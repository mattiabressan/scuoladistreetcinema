import Cutout from '@/components/ui/Cutout'
import PastCourseCard from '@/components/courses/PastCourseCard'
import { sanityFetch } from '@/sanity/client'
import { CORSI_PASSATI_QUERY } from '@/sanity/queries'
import { oggi } from '@/lib/date'
import type { CorsoCard } from '@/lib/types'

export const metadata = { title: 'Corsi passati' }

export default async function CorsiPassati() {
  const corsi = await sanityFetch<CorsoCard[]>(CORSI_PASSATI_QUERY, { oggi: oggi() }, [])

  return (
    <div className="container page page--past">
      <h1 className="title title--lg">
        <Cutout tone="ink" rotate={-2}>CORSI</Cutout>
        <Cutout font="gothic" rotate={2}>passati</Cutout>
      </h1>

      {corsi.length ? (
        <div className="grid grid--past">
          {corsi.map((c, i) => <PastCourseCard key={c._id} corso={c} index={i} />)}
        </div>
      ) : (
        <Cutout font="elite" rotate={-1} className="empty">Ancora nessun corso concluso.</Cutout>
      )}
    </div>
  )
}
