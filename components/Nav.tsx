'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { rot } from '@/lib/style'

const NAV = [
  { href: '/about', label: 'ABOUT', rotate: -2 },
  { href: '/corsi', label: 'NUOVI CORSI', rotate: 1.5 },
  { href: '/corsi-passati', label: 'CORSI PASSATI', rotate: -1 },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Principale">
      <ul className="nav">
        {NAV.map(({ href, label, rotate }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <li key={href}>
              <Link href={href} className={`nav__link ${active ? 't-ink' : 't-paper'}`} style={rot(rotate)} aria-current={active ? 'page' : undefined}>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
