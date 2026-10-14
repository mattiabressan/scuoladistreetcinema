import Cutout from '@/components/ui/Cutout'
import CourseRow from '@/components/courses/CourseRow'
import { sanityFetch } from '@/sanity/client'
import { NUOVI_CORSI_QUERY, SETTINGS_QUERY } from '@/sanity/queries'
import { oggi } from '@/lib/date'
import type { CorsoCard, SiteSettings } from '@/lib/types'

export const metadata = { title: 'Nuovi corsi' }

export default async function NuoviCorsi() {
  const [corsi, settings] = await Promise.all([
    sanityFetch<CorsoCard[]>(NUOVI_CORSI_QUERY, { oggi: oggi() }, []),
    sanityFetch<SiteSettings>(SETTINGS_QUERY, {}, {}),
  ])

  return (
    <div className="container page">
      <div className="section__head">
        <h1 className="title title--xl">
          <Cutout rotate={-2}>NUOVI</Cutout>
          <Cutout font="abril" tone="ink" rotate={2}>corsi</Cutout>
        </h1>
        {settings.notaStagione && <Cutout font="elite" rotate={1} className="season-note">{settings.notaStagione}</Cutout>}
      </div>

      {corsi.length ? (
        corsi.map((c, i) => <CourseRow key={c._id} corso={c} index={i} email={settings.email} />)
      ) : (
        <Cutout font="elite" rotate={-1} className="empty">Nuovi corsi in arrivo.</Cutout>
      )}
    </div>
  )
}
