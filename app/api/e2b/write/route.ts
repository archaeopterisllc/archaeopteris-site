import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

function flattenFiles(tree: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}/${key}` : key
    if ((value as any)?.file?.contents) {
      result[path] = (value as any).file.contents
    } else if ((value as any)?.directory) {
      Object.assign(result, flattenFiles((value as any).directory, path))
    } else if (typeof value === 'string') {
      result[path] = value as string
    }
  }
  return result
}

export async function POST(req: Request) {
  try {
    const { sandboxId, files } = await req.json()
    console.log('raw files received:', JSON.stringify(files).slice(0, 200))

    const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })

    const flatFiles = flattenFiles(files)
    console.log('flat files:', Object.keys(flatFiles))
    for (const [path, content] of Object.entries(flatFiles)) {
      if (!path || !content || typeof content !== 'string') continue
      await sandbox.files.write(`/home/user/app/${path}`, content)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('WRITE ERROR:', err)
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}