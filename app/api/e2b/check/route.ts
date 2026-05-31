import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
  const { sandboxId } = await req.json()
  const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })

  // Check node_modules exists = install done
  const check = await sandbox.commands.run(
    'test -d /home/user/app/node_modules && echo "ready" || echo "pending"',
    { cwd: '/home/user/app' }
  )

  const ready = check.stdout.trim() === 'ready'

  if (ready) {
    // Kill old vite, start new
    await sandbox.commands.run('pkill -f vite || true', { cwd: '/home/user/app' })
    sandbox.commands.run(
      'nohup npm run dev > /tmp/vite.log 2>&1 &',
      { cwd: '/home/user/app' }
    ).catch(() => {})

    await new Promise(r => setTimeout(r, 3000))
    const host = sandbox.getHost(5173)
    return NextResponse.json({ ready: true, previewUrl: `https://${host}` })
  }

  return NextResponse.json({ ready: false })
}
