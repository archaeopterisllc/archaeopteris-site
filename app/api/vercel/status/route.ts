// app/api/vercel/status/route.ts
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

    if (!res.ok) throw new Error(`Status check failed: ${res.status}`)
    const data = await res.json()

    const ready = data.readyState === 'READY'
const error = ['ERROR', 'CANCELED'].includes(data.readyState)

if (error) {
  return NextResponse.json({
    ready: false,
    error: true,
    status: data.readyState,
    errorMessage: data.errorMessage || 'Build failed',
  })
}

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
