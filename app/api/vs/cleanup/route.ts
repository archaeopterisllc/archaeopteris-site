// app/api/vs/cleanup/route.ts
import { Sandbox } from '@vercel/sandbox'
import { NextResponse } from 'next/server'

export async function POST() {
  const paginator = await Sandbox.list({
    token: process.env.VERCEL_TOKEN!,
    teamId: process.env.VERCEL_TEAM_ID!,
    projectId: process.env.VERCEL_PROJECT_ID!,
  })

  const sandboxes = []
  for await (const s of paginator) {
    sandboxes.push(s)
  }

  await Promise.all(sandboxes.map(s => 
  fetch(`https://api.vercel.com/v1/sandboxes/${s.name}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
  })
))



  return NextResponse.json({ deleted: sandboxes.length })
}

