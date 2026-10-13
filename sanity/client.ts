import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, isConfigured, projectId } from './env'

export const client = createClient({ projectId, dataset, apiVersion, useCdn: true })

// Ritorna `fallback` finché Sanity non è configurato, così il sito builda anche vuoto
export const sanityFetch = async <T>(query: string, params: QueryParams = {}, fallback: T): Promise<T> => {
  if (!isConfigured) return fallback
  return await client
    .fetch<T>(query, params, { next: { revalidate: 3600 } })
    .then((res) => res ?? fallback, () => fallback)
}
