// Popola Sanity con i contenuti di scripts/contenuti.mjs
// Uso: npm run seed  (serve SANITY_API_WRITE_TOKEN in .env.local, token "Editor" da sanity.io/manage → API → Tokens)
//
// - corsi e docenti: createOrReplace per _id (rilanciarlo è sicuro, non crea doppioni)
// - homePage / aboutPage / siteSettings: aggiorna solo i campi testuali, il resto (email, P.IVA, foto…) resta com'è

import { createClient } from '@sanity/client'
import { corsi, docenti, singletons } from './contenuti.mjs'

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset = 'production', SANITY_API_WRITE_TOKEN: token } = process.env

if (!projectId || !token) {
  console.error('Mancano NEXT_PUBLIC_SANITY_PROJECT_ID e/o SANITY_API_WRITE_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2026-10-01', useCdn: false })

const tx = client.transaction()
;[...corsi, ...docenti].forEach((doc) => tx.createOrReplace(doc))
Object.entries(singletons).forEach(([_id, fields]) => tx.createIfNotExists({ _id, _type: _id }).patch(_id, (p) => p.set(fields)))

await tx.commit().then(
  () => console.log(`✓ ${corsi.length} corsi, ${docenti.length} docenti, ${Object.keys(singletons).length} pagine aggiornate su "${dataset}"`),
  (err) => {
    console.error('✗ Seed fallito:', err.message)
    process.exit(1)
  }
)
