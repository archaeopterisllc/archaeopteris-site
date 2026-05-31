// ─────────────────────────────────────────────────────────
// app/api/e2b/write/route.ts
// ─────────────────────────────────────────────────────────
import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId, files } = await req.json()
    const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })

    for (const [path, content] of Object.entries(files as Record<string, string>)) {
      const fullPath = `/home/user/app/${path}`
      const dir = fullPath.split('/').slice(0, -1).join('/')
      await sandbox.commands.run(`mkdir -p "${dir}"`)
      await sandbox.files.write(fullPath, content as string)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
