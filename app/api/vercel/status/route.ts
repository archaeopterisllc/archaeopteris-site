import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { deploymentId } = await req.json()
    const token = process.env.VERCEL_TOKEN
    const teamId = process.env.VERCEL_TEAM_ID

    const res = await fetch(
      `https://api.vercel.com/v13/deployments/${deploymentId}?teamId=${teamId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (!res.ok) {
      return NextResponse.json({ error: true, status: 'ERROR', errorMessage: `API failed: ${res.status}` })
    }
    
    const data = await res.json()
    const ready = data.readyState === 'READY'
    const error = ['ERROR', 'CANCELED'].includes(data.readyState)

    return NextResponse.json({
      ready,
      error,
      status: data.readyState,
      previewUrl: ready ? `https://${data.url}` : null,
      errorMessage: error ? (data.errorMessage || 'Build failed') : null,
    })

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: true, status: 'ERROR', errorMessage: msg }, { status: 500 })
  }
}
