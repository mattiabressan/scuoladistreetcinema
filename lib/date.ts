// Data odierna in fuso Europe/Rome, formato YYYY-MM-DD (confrontabile con i campi `date` di Sanity)
export const oggi = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Rome' })

export const formatData = (iso: string) =>
  new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
