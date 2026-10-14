import type { CorsoCard } from '@/lib/types'

interface Props {
  corso: CorsoCard
  email?: string
}

// Punto di aggancio per iscrizione + pagamento.
// TODO Stripe: sostituire il mailto con un <form action={checkout}> (Server Action / Route Handler che crea la Checkout Session)
export default function EnrollBox({ corso, email }: Props) {
  const completo = corso.stato === 'completo'
  const href = email && `mailto:${email}?subject=${encodeURIComponent(`Iscrizione: ${corso.titolo}`)}`

  return (
    <div className="enroll">
      <span className="enroll__note">
        {completo ? 'Posti esauriti. Scrivici per la lista d\'attesa.' : 'Iscrizioni via email — a breve il pagamento online.'}
      </span>
      {href && !completo ? (
        <a href={href} className="btn btn--pink">ISCRIVITI →</a>
      ) : (
        <span className="btn btn--pink is-disabled" aria-disabled>{completo ? 'COMPLETO' : 'ISCRIVITI →'}</span>
      )}
    </div>
  )
}
