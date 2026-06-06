import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    
    const sandbox = await Sandbox.connect(sandboxId, { 
      apiKey: process.env.E2B_API_KEY 
    })

    try {
      const result = await sandbox.commands.run(
        'curl -s -o /dev/null -w "%{http_code}" http://localhost:5173',
        { cwd: '/home/user/app', timeoutMs: 5000 }
      )
      const isReady = result.stdout.trim() === '200'
      const vitelog = await sandbox.commands.run('cat /tmp/vite.log', { cwd: '/home/user/app' })
console.log('curl:', result.stdout.trim())
console.log('vite log:', vitelog.stdout.slice(-300))

      return NextResponse.json({
        ready: isReady,
        previewUrl: isReady ? `https://${sandboxId}-5173.e2b.app` : null
      })
    } catch {
      // sandbox exists but command failed
      return NextResponse.json({ ready: false })
    }

  } catch (err) {
    // sandbox expired or connect failed
    return NextResponse.json({ ready: false, expired: true })
  }
}

