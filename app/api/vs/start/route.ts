//## app/api/vs/start/route.ts

import { Sandbox } from '@vercel/sandbox'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.get({ name: sandboxId, token: process.env.VERCEL_TOKEN! })

    // Kill old vite
    try {
      await sandbox.runCommand('bash', ['-c', 'pkill -f vite || true'])
    } catch {}

    // Start vite in background
    sandbox.runCommand('bash', ['-c', 'cd /vercel/sandbox && npm run dev &']).catch(() => {})

    // Wait for vite to bind
    await new Promise(r => setTimeout(r, 3000))

    const previewUrl = sandbox.domain(5173)

    return NextResponse.json({ ok: true, previewUrl })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
