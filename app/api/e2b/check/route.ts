import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })

    try {
      // Stage 1: Check npm install xong chưa
      const nm = await sandbox.commands.run(
        'test -d /home/user/app/node_modules && echo "ok" || echo "no"',
        { cwd: '/home/user/app', timeoutMs: 5000 }
      )

      if (nm.stdout.trim() !== 'ok') {
        // Trigger install nếu chưa chạy
        sandbox.commands.run('npm install', {
          cwd: '/home/user/app',
          timeoutMs: 300_000
        }).catch(() => {})
        return NextResponse.json({ ready: false, stage: 'installing' })
      }

      // Stage 2: Check vite running
      const port = await sandbox.commands.run(
        'curl -s -o /dev/null -w "%{http_code}" http://localhost:5173',
        { cwd: '/home/user/app', timeoutMs: 5000 }
      )

      if (port.stdout.trim() !== '200') {
        // Start vite nếu chưa chạy
        sandbox.commands.run(
          'nohup npm run dev > /tmp/vite.log 2>&1 &',
          { cwd: '/home/user/app' }
        ).catch(() => {})
        return NextResponse.json({ ready: false, stage: 'starting' })
      }

      return NextResponse.json({
        ready: true,
        previewUrl: `https://${sandboxId}-5173.e2b.app`
      })

    } catch (e) {
      console.log('inner catch:', e instanceof Error ? e.message : String(e))
      return NextResponse.json({ ready: false })
    }

  } catch (err) {
    console.log('outer catch:', err instanceof Error ? err.message : String(err))
    return NextResponse.json({ ready: false, expired: true })
  }
}
