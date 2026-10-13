import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { sanityFetch } from '@/sanity/client'
import { SETTINGS_QUERY } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<SiteSettings>(SETTINGS_QUERY, {}, {})
  const nomeScuola = settings.nomeScuola ?? 'Scuola di Cinema'

  return (
    <>
      <Header nomeScuola={nomeScuola} />
      <main>{children}</main>
      <Footer settings={{ ...settings, nomeScuola }} />
    </>
  )
}
