import Link from 'next/link'

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/corsi', label: 'Nuovi corsi' },
  { href: '/corsi-passati', label: 'Corsi passati' },
]

export default function Header({ nomeScuola }: { nomeScuola: string }) {
  return (
    <header className="site-header">
      <Link href="/" className="logo">
        {nomeScuola}
      </Link>
      <nav>
        <ul>
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
