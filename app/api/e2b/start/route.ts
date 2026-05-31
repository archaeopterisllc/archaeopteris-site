// app/api/e2b/start/route.ts
import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })

    // Kill any existing dev server
    await sandbox.commands.run('pkill -f vite || true', { cwd: '/home/user/app' })

    // npm install first
    sandbox.commands.run('npm install', { cwd: '/home/user/app', timeoutMs: 3000_000 })

    // Start vite in background
    sandbox.commands.run('nohup npm run dev > /tmp/vite.log 2>&1 &', {
      cwd: '/home/user/app'
    }).catch(() => {})

    // Wait for vite to be ready (~3s)
    await new Promise(r => setTimeout(r, 4000))

    // Optional: check log
    const log = await sandbox.commands.run('cat /tmp/vite.log', { cwd: '/home/user/app' })
    console.log(log.stdout)
    
    const host = sandbox.getHost(5173)
    const previewUrl = `https://${host}`

    return NextResponse.json({ previewUrl })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
