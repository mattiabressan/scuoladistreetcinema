# Scuola di Cinema

Next.js 16 (App Router) + Sanity (Studio integrato su `/studio`).

## Struttura

```
app/
  (site)/              header + footer condivisi
    page.tsx           home: hero, ultimi 3 nuovi corsi, descrizione
    about/
    corsi/             nuovi corsi (dataFine >= oggi)
    corsi/[slug]/      dettaglio corso (qui andrà il pagamento)
    corsi-passati/     dataFine < oggi
  studio/              pannello CMS
  api/revalidate/      webhook Sanity → rigenera il sito
sanity/
  schemaTypes/         corso + singleton (homePage, aboutPage, siteSettings)
  queries.ts           query GROQ
components/            Header, Footer, CorsoCard
```

Un corso passa da "Nuovi" a "Passati" da solo in base a `dataFine`.

## Setup locale

1. Crea un progetto su https://www.sanity.io/manage e copia il Project ID
2. `cp .env.example .env.local` e compila `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Su sanity.io/manage → API → CORS origins aggiungi `http://localhost:3000` (con credentials)
4. `npm install && npm run dev`
5. Apri http://localhost:3000/studio, compila "Impostazioni sito", "Homepage", "About" e crea un corso

Senza Project ID il sito builda lo stesso e mostra i fallback vuoti.

## Deploy (Netlify o Vercel)

1. Push su GitHub e importa il repo nell'hosting
2. Imposta le env var (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_REVALIDATE_SECRET`)
3. Aggiungi il dominio custom; su GoDaddy → DNS inserisci i record A/CNAME che ti dà l'hosting
4. Su Sanity aggiungi il dominio di produzione ai CORS origins
5. Sanity → API → Webhooks: URL `https://<dominio>/api/revalidate`, trigger su create/update/delete, secret = `SANITY_REVALIDATE_SECRET`

## TODO

- [ ] Layout punk (da Claude Design) → i token sono in `app/globals.css`
- [ ] Pagine `/privacy` e `/cookie` (linkate nel footer)
- [ ] Pagamenti: `app/api/checkout/route.ts` con Stripe Checkout + webhook di conferma
