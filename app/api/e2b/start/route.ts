import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { sandboxId } = await req.json()
  const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })

  // Fire & forget npm install
  sandbox.commands.run('npm install', {
    cwd: '/home/user/app',
    timeoutMs: 300_000
  }).catch(() => {})

  // Start vite
await sandbox.commands.run(
  'nohup npm run dev > /tmp/vite.log 2>&1 &',
  { cwd: '/home/user/app' }
).catch(() => {})

// Đợi vite bind port
await new Promise(r => setTimeout(r, 4000))




  return NextResponse.json({ ok: true })
}
