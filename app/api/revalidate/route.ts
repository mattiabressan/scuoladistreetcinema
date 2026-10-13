import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Webhook Sanity → POST https://<dominio>/api/revalidate
// Rigenera tutto il sito quando si pubblica un contenuto
export async function POST(req: NextRequest) {
  const { isValidSignature, body } = await parseBody<{ _type: string }>(req, process.env.SANITY_REVALIDATE_SECRET)

  if (!isValidSignature) return new NextResponse('Invalid signature', { status: 401 })

  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true, type: body?._type })
}
