import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { sanityFetch } from '@/sanity/client'
import { SETTINGS_QUERY } from '@/sanity/queries'
import type { SiteSettings } from '@/lib/types'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<SiteSettings>(SETTINGS_QUERY, {}, {})

  return (
    <div className="site">
      <Header />
      <main>{children}</main>
      <Footer settings={settings} />
    </div>
  )
}
