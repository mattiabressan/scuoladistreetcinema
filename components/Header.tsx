import Link from 'next/link'
import Cutout from './ui/Cutout'
import Nav from './Nav'

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="logo" aria-label="Scuola di Street Cinema — home">
        <Cutout font="elite" rotate={-4} className="logo__pre">scuola di</Cutout>
        <Cutout tone="ink" rotate={2} className="logo__main">STREET</Cutout>
        <Cutout font="abril" rotate={-2} className="logo__post">cinema</Cutout>
      </Link>
      <Nav />
    </header>
  )
}
