// Data odierna in fuso Europe/Rome, formato YYYY-MM-DD (confrontabile con i campi `date` di Sanity)
export const oggi = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Rome' })

export const formatData = (iso: string) =>
  new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })

// "Dal 9 novembre 2026" / "Dall'11 gennaio 2027"
export const dal = (iso: string) => {
  const giorno = new Date(iso).getDate()
  return `${[1, 8, 11].includes(giorno) ? "Dall'" : 'Dal '}${formatData(iso)}`
}

export const anno = (iso: string) => iso.slice(0, 4)
