import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { urlFor } from '@/sanity/image'
import type { SanityImage } from '@/lib/types'

interface Props {
  image?: SanityImage
  alt: string
  placeholder: string
  sizes: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

// Immagine Sanity a riempimento, oppure il placeholder a righe del design se manca
export default function Media({ image, alt, placeholder, sizes, className = '', style, children }: Props) {
  return (
    <div className={`media ${className}`} style={style}>
      {image ? <Image src={urlFor(image).width(1400).url()} alt={image.alt ?? alt} fill sizes={sizes} /> : <span>[ {placeholder} ]</span>}
      {children}
    </div>
  )
}
