import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import CourseRow from '@/components/courses/CourseRow'
import { sanityFetch } from '@/sanity/client'
import { CORSO_QUERY, CORSI_SLUGS_QUERY, SETTINGS_QUERY } from '@/sanity/queries'
import { isPassato } from '@/lib/date'
import type { Corso, SiteSettings } from '@/lib/types'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = async () =>
  (await sanityFetch<string[]>(CORSI_SLUGS_QUERY, {}, [])).map((slug) => ({ slug }))

export const generateMetadata = async ({ params }: Props) => {
  const corso = await sanityFetch<Corso | null>(CORSO_QUERY, { slug: (await params).slug }, null)
  return { title: corso?.titolo, description: corso?.descrizioneBreve }
}

export default async function CorsoPage({ params }: Props) {
  const [corso, settings] = await Promise.all([
    sanityFetch<Corso | null>(CORSO_QUERY, { slug: (await params).slug }, null),
    sanityFetch<SiteSettings>(SETTINGS_QUERY, {}, {}),
  ])
  if (!corso) notFound()

  const passato = isPassato(corso)

  return (
    <div className="container page">
      <Link href={passato ? '/corsi-passati' : '/corsi'} className="link-under back-link">
        ← {passato ? 'CORSI PASSATI' : 'NUOVI CORSI'}
      </Link>

      <CourseRow corso={corso} index={0} email={settings.email} detail>
        {corso.descrizione ? (
          <PortableText value={corso.descrizione} />
        ) : (
          <>
            <p>{corso.intro ?? corso.descrizioneBreve}</p>
            {!!corso.docenti?.length && <p><strong>A cura di</strong> {corso.docenti.join(', ')}</p>}
          </>
        )}
      </CourseRow>
    </div>
  )
}
