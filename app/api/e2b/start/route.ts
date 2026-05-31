import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })

    await sandbox.commands.run('pkill -f vite || true', { cwd: '/home/user/app' })

    // Chạy install + dev background, không chờ
    await sandbox.commands.run(
      'nohup sh -c "npm install && npm run dev" > /tmp/app.log 2>&1 &',
      { cwd: '/home/user/app' }
    )

    // Wait 20s cho install + vite start
    await new Promise(r => setTimeout(r, 20000))

    const host = sandbox.getHost(3000)
    return NextResponse.json({ previewUrl: `https://${host}` })

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
