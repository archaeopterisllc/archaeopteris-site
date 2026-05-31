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


// ─────────────────────────────────────────────────────────
// app/api/e2b/start/route.ts
// ─────────────────────────────────────────────────────────
// import { Sandbox } from 'e2b'
// import { NextResponse } from 'next/server'
//
// export async function POST(req: Request) {
//   try {
//     const { sandboxId } = await req.json()
//     const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })
//
//     // Kill any existing dev server
//     await sandbox.commands.run('pkill -f vite || true', { cwd: '/home/user/app' })
//
//     // Start vite in background
//     await sandbox.commands.run('nohup npm run dev > /tmp/vite.log 2>&1 &', {
//       cwd: '/home/user/app',
//     })
//
//     // Wait for vite to be ready
//     await new Promise(r => setTimeout(r, 3000))
//
//     const previewUrl = sandbox.getHost(3000)
//     return NextResponse.json({ previewUrl: `https://${previewUrl}` })
//   } catch (err) {
//     const msg = err instanceof Error ? err.message : 'Unknown error'
//     return NextResponse.json({ error: msg }, { status: 500 })
//   }
// }