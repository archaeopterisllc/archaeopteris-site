import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })

    try {
      const check = await sandbox.commands.run(
        'test -d /home/user/app/node_modules && echo "ready" || echo "pending"',
        { cwd: '/home/user/app' }
      )
      const ready = check.stdout.trim() === 'ready'

      if (ready) {
        await sandbox.commands.run('pkill -f vite || true', { cwd: '/home/user/app' })
        sandbox.commands.run('nohup npm run dev > /tmp/vite.log 2>&1 &', { cwd: '/home/user/app' }).catch(() => {})
        await new Promise(r => setTimeout(r, 3000))
        return NextResponse.json({ ready: true, previewUrl: `https://${sandboxId}-5173.e2b.app` })
      }

      return NextResponse.json({ ready: false })

    } catch {
      return NextResponse.json({ ready: false })
    }

  } catch {
    return NextResponse.json({ ready: false, expired: true })
  }
}