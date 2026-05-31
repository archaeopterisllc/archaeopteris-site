// app/api/e2b/start/route.ts
import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })

    // Kill existing
    await sandbox.commands.run('pkill -f vite || true', { cwd: '/home/user/app' })

    // npm install first
    //await sandbox.commands.run('npm install', {
      //cwd: '/home/user/app',
      //timeoutMs: 120_000,
    //})

    // Start vite background
    await sandbox.commands.run('nohup npm run dev > /tmp/vite.log 2>&1 &', {
      cwd: '/home/user/app',
    })

    // Wait for vite
    await new Promise(r => setTimeout(r, 4000))

    const host = sandbox.getHost(3000)
    const previewUrl = `https://${host}`

    return NextResponse.json({ previewUrl })
  } catch (err) {
    console.error('Error in /api/e2b/start:', err)
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
