import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.connect(sandboxId, { 
      apiKey: process.env.E2B_API_KEY 
    })

    // Check vite thật sự running
    const result = await sandbox.commands.run(
      'curl -s -o /dev/null -w "%{http_code}" http://localhost:5173',
      { cwd: '/home/user/app' }
    )

    const isReady = result.stdout.trim() === '200'

    return NextResponse.json({
      ready: isReady,
      previewUrl: isReady 
        ? `https://${sandboxId}-5173.e2b.app`
        : null
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
