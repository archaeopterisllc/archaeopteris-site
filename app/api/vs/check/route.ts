//## app/api/vs/check/route.ts

import { Sandbox } from '@vercel/sandbox'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()
    const sandbox = await Sandbox.get({ name: sandboxId, token: process.env.VERCEL_TOKEN!,
        teamId: process.env.VERCEL_TEAM_ID!, projectId: process.env.VERCEL_PROJECT_ID!
     })

        // Check node_modules exists
    let nmExists = false
    try {
      const result = await sandbox.runCommand('bash', ['-c', 'test -d /vercel/sandbox/node_modules && echo ok || echo no'])
      nmExists = (await result.stdout()).toString().trim() === 'ok'
    } catch {}

    if (!nmExists) {
      const installing = await sandbox.runCommand('bash', ['-c', 'test -f /tmp/installing && echo yes || echo no'])
      const isInstalling = (await installing.stdout()).toString().trim() === 'yes'
      if (!isInstalling) {
        sandbox.runCommand('bash', ['-c',
          'touch /tmp/installing && cd /vercel/sandbox && npm install && rm /tmp/installing'
        ]).catch(() => {})
      }
      return NextResponse.json({ ready: false, stage: 'installing' })
    }

    // Check vite running
    let viteReady = false
    try {
      const r = await sandbox.runCommand('bash', ['-c', 'curl -s -o /dev/null -w "%{http_code}" http://localhost:5173'])
      viteReady = (await r.stdout()).toString().trim() === '200'
    } catch {}

    if (!viteReady) {
      const starting = await sandbox.runCommand('bash', ['-c', 'test -f /tmp/starting && echo yes || echo no'])
      const isStarting = (await starting.stdout()).toString().trim() === 'yes'
      if (!isStarting) {
        sandbox.runCommand('bash', ['-c',
          'touch /tmp/starting && cd /vercel/sandbox && npm run dev'
        ]).catch(() => {})
      }
      return NextResponse.json({ ready: false, stage: 'starting' })
    }

    sandbox.runCommand('bash', ['-c', 'rm -f /tmp/starting']).catch(() => {})
    const previewUrl = sandbox.domain(5173)
    return NextResponse.json({ ready: true, previewUrl })


  } catch (err) {
    return NextResponse.json({ ready: false })
  }
}
