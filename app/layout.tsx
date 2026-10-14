import type { Metadata } from 'next'
import { Abril_Fatface, Anton, Archivo_Black, Courier_Prime, Special_Elite, UnifrakturMaguntia } from 'next/font/google'
import './globals.css'

const archivo = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--f-archivo' })
const abril = Abril_Fatface({ weight: '400', subsets: ['latin'], variable: '--f-abril' })
const gothic = UnifrakturMaguntia({ weight: '400', subsets: ['latin'], variable: '--f-gothic' })
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--f-anton' })
const elite = Special_Elite({ weight: '400', subsets: ['latin'], variable: '--f-elite' })
const courier = Courier_Prime({ weight: ['400', '700'], subsets: ['latin'], variable: '--f-courier' })

const fonts = [archivo, abril, gothic, anton, elite, courier].map((f) => f.variable).join(' ')

export const metadata: Metadata = {
  title: { default: 'Scuola di Street Cinema', template: '%s — Street Cinema' },
  description: 'Scuola di cinema indipendente. Corsi brevi e pratici per girare film con quello che hai.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={fonts}>
      <body>{children}</body>
    </html>
  )
}
