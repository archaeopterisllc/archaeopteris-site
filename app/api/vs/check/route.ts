//## app/api/vs/check/route.ts

import { Sandbox } from '@vercel/sandbox'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.get({ name: sandboxId, token: process.env.VERCEL_TOKEN! })

    // Check node_modules exists
    let nmExists = false
    try {
      const result = await sandbox.runCommand('bash', ['-c', 'test -d /vercel/sandbox/node_modules && echo ok || echo no'])
      nmExists = (await result.stdout()).toString().trim() === 'ok'
    } catch {
      nmExists = false
    }

    if (!nmExists) {
      // Fire & forget install
      sandbox.runCommand('bash', ['-c', 'cd /vercel/sandbox && npm install']).catch(() => {})
      return NextResponse.json({ ready: false, stage: 'installing' })
    }

    // Check vite running
    let viteReady = false
    try {
      const r = await sandbox.runCommand('bash', ['-c', 'curl -s -o /dev/null -w "%{http_code}" http://localhost:5173'])
      viteReady = (await r.stdout()).toString().trim() === '200'
    } catch {
      viteReady = false
    }

    if (!viteReady) {
      sandbox.runCommand('bash', ['-c', 'cd /vercel/sandbox && npm run dev &']).catch(() => {})
      return NextResponse.json({ ready: false, stage: 'starting' })
    }

    const previewUrl = sandbox.domain(5173)
    return NextResponse.json({ ready: true, previewUrl })

  } catch (err) {
    return NextResponse.json({ ready: false })
  }
}
