//## app/api/vs/check/route.ts

import { Sandbox } from '@vercel/sandbox'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.get({ name: sandboxId, token: process.env.VERCEL_TOKEN!,
        teamId: process.env.VERCEL_TEAM_ID!, projectId: process.env.VERCEL_PROJECT_ID!
     })

            // Check node_modules
    let nmExists = false
    try {
      const result = await sandbox.runCommand('bash', ['-c', 'test -d /vercel/sandbox/node_modules && echo ok || echo no'])
      nmExists = (await result.stdout()).toString().trim() === 'ok'
    } catch {}

    if (!nmExists) {
      sandbox.runCommand('bash', ['-c', 'cd /vercel/sandbox && npm install']).catch(() => {})
      return NextResponse.json({ ready: false, stage: 'installing' })
    }

    let viteReady = false
    try {
      const r = await sandbox.runCommand('bash', ['-c', 'nc -z localhost 5173 && echo ok || echo no'])
      viteReady = (await r.stdout()).toString().trim() === 'ok'
    } catch {}

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
