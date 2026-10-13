import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { sanityFetch } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { ABOUT_QUERY } from '@/sanity/queries'
import type { AboutPage } from '@/lib/types'

export const metadata = { title: 'About' }

export default async function About() {
  const about = await sanityFetch<AboutPage>(ABOUT_QUERY, {}, {})

  return (
    <section className="section">
      <h1>{about.titolo ?? 'About'}</h1>
      {about.immagine && <Image src={urlFor(about.immagine).width(1200).url()} alt="" width={1200} height={700} />}
      {about.contenuto && <PortableText value={about.contenuto} />}
    </section>
  )
}
