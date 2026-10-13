import Link from 'next/link'
import type { SiteSettings } from '@/lib/types'

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { nomeScuola, ragioneSociale, partitaIva, indirizzo, email, telefono, social } = settings

  return (
    <footer className="site-footer">
      <div>
        <strong>{nomeScuola}</strong>
        {indirizzo && <p>{indirizzo}</p>}
        {email && <p><a href={`mailto:${email}`}>{email}</a></p>}
        {telefono && <p><a href={`tel:${telefono}`}>{telefono}</a></p>}
      </div>

      {!!social?.length && (
        <ul>
          {social.map(({ nome, url }) => (
            <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{nome}</a></li>
          ))}
        </ul>
      )}

      <div className="legal">
        <p>
          © {new Date().getFullYear()} {ragioneSociale ?? nomeScuola}
          {partitaIva && ` — P.IVA ${partitaIva}`}
        </p>
        <p>
          <Link href="/privacy">Privacy policy</Link> · <Link href="/cookie">Cookie policy</Link>
        </p>
      </div>
    </footer>
  )
}
