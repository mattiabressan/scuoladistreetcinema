import Link from 'next/link'
import Cutout from './ui/Cutout'
import type { SiteSettings } from '@/lib/types'

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { nomeScuola, tagline, ragioneSociale, partitaIva, indirizzo, email, telefono, social } = settings

  return (
    <footer className="site-footer">
      <div className="footer-col">
        <Cutout tone="pink" rotate={-2} className="footer-brand">STREET CINEMA</Cutout>
        <p className="footer-tagline">{tagline ?? 'Dare voce agli invisibili.'}</p>
      </div>

      <div className="footer-col">
        <span className="footer-head">PAGINE</span>
        <Link href="/about">About</Link>
        <Link href="/corsi">Nuovi corsi</Link>
        <Link href="/corsi-passati">Corsi passati</Link>
      </div>

      <div className="footer-col">
        <span className="footer-head">CONTATTI</span>
        {email && <a href={`mailto:${email}`}>{email}</a>}
        {telefono && <a href={`tel:${telefono}`}>{telefono}</a>}
        {!!social?.length && (
          <span>
            {social.map(({ nome, url }, i) => (
              <span key={url}>
                {i > 0 && ' · '}
                <a href={url} target="_blank" rel="noopener noreferrer">{nome}</a>
              </span>
            ))}
          </span>
        )}
        {indirizzo && <span>{indirizzo}</span>}
      </div>

      <div className="footer-legal">
        © {new Date().getFullYear()} {ragioneSociale ?? nomeScuola ?? 'Scuola di Street Cinema'}
        {partitaIva && ` · P.IVA ${partitaIva}`}
        {' · '}
        <Link href="/privacy">Privacy</Link> · <Link href="/cookie">Cookie</Link>
      </div>
    </footer>
  )
}
