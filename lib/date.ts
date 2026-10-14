import type { CorsoCard } from './types'

type Date_ = Pick<CorsoCard, 'dataInizio' | 'dataFine' | 'anno'>

// Data odierna in fuso Europe/Rome, formato YYYY-MM-DD (confrontabile con i campi `date` di Sanity)
export const oggi = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Rome' })

export const formatData = (iso: string) =>
  new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })

// "Dal 9 novembre 2026" / "Dall'11 gennaio 2027"
export const dal = (iso: string) => {
  const giorno = new Date(iso).getDate()
  return `${[1, 8, 11].includes(giorno) ? "Dall'" : 'Dal '}${formatData(iso)}`
}

// Anno dell'edizione: campo esplicito o anno della data di inizio
export const annoCorso = ({ anno, dataInizio }: Date_) => String(anno ?? dataInizio?.slice(0, 4) ?? '')

// Concluso per data, oppure edizione d'archivio senza date
export const isPassato = ({ dataFine }: Date_) => !dataFine || dataFine < oggi()

// Corso in programma: "Dal 9 novembre 2026" · concluso: "6–10 luglio 2026" · archivio: "Edizione 2024"
export const quando = (corso: Date_) => {
  const { dataInizio, dataFine } = corso
  if (!dataInizio) return `Edizione ${annoCorso(corso)}`
  if (!isPassato(corso) || !dataFine) return dal(dataInizio)
  return dataInizio.slice(0, 7) === dataFine.slice(0, 7)
    ? `${new Date(dataInizio).getDate()}–${formatData(dataFine)}`
    : `${formatData(dataInizio)} – ${formatData(dataFine)}`
}
