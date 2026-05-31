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

  return NextResponse.json({ ok: true })
}

