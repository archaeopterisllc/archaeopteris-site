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
    const install = await sandbox.commands.run('npm install', { cwd: '/home/user/app', timeoutMs: 3000_000 })
    console.log(install.stdout)
    console.log(install.stderr)

    // Start vite in background
    const log =await sandbox.commands.run('cat /tmp/vite.log', {
      cwd: '/home/user/app'
    })

    // Wait for vite to be ready (~3s)
    await new Promise(r => setTimeout(r, 3500))

    const host = sandbox.getHost(5173)
    const previewUrl = `https://${host}`

    return NextResponse.json({ previewUrl })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
