// ─────────────────────────────────────────────────────────
// app/api/e2b/exec/route.ts
// ─────────────────────────────────────────────────────────
import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId, cmd } = await req.json()
    const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })

    const result = await sandbox.commands.run(cmd, {
      cwd: '/home/user/app',
      timeoutMs: 60_000,
    })

    return NextResponse.json({ stdout: result.stdout, stderr: result.stderr })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
