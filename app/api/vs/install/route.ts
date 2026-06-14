//## app/api/vs/install/route.ts

import { Sandbox } from '@vercel/sandbox'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.get({ name: sandboxId, token: process.env.VERCEL_TOKEN! })

    // npm install (blocking - but fire from client as fire & forget)
    const result = await sandbox.runCommand('bash', ['-c', 'cd /vercel/sandbox && npm install'])
    

    if (result.exitCode !== 0) {
      throw new Error('npm install failed')
    }

    // Snapshot after install — skip install next time!
    await sandbox.snapshot()

    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
