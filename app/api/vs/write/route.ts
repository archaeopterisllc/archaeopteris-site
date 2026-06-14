//## app/api/vs/write/route.ts

import { Sandbox } from '@vercel/sandbox'
import { NextResponse } from 'next/server'

const UI_COMPONENT_MAP: Record<string, string> = {
  Button: 'button', Card: 'card', CardHeader: 'card', CardContent: 'card', CardTitle: 'card', CardFooter: 'card',
  Badge: 'badge', Input: 'input', Select: 'select', SelectItem: 'select',
  Switch: 'switch', Progress: 'progress',
  Table: 'table', TableHeader: 'table', TableBody: 'table', TableRow: 'table', TableHead: 'table', TableCell: 'table',
  Avatar: 'avatar', AvatarImage: 'avatar', AvatarFallback: 'avatar',
  Tabs: 'tabs', TabsList: 'tabs', TabsTrigger: 'tabs', TabsContent: 'tabs',
  Dialog: 'dialog', DialogContent: 'dialog', DialogHeader: 'dialog', DialogTitle: 'dialog', DialogFooter: 'dialog',
  Tooltip: 'tooltip', Separator: 'separator', ScrollArea: 'scroll-area',
  Toaster: 'toast', DropdownMenu: 'dropdown-menu', DropdownMenuTrigger: 'dropdown-menu',
  DropdownMenuContent: 'dropdown-menu', DropdownMenuItem: 'dropdown-menu', DropdownMenuSeparator: 'dropdown-menu',
}

function fixContent(content: string): string {
  // Fix import @/components/ui → split by component
  content = content.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]@\/components\/ui['"]/g,
    (_, imports) => {
      const names = imports.split(',').map((s: string) => s.trim()).filter(Boolean)
      const grouped: Record<string, string[]> = {}
      for (const name of names) {
        const file = UI_COMPONENT_MAP[name] || 'button'
        if (!grouped[file]) grouped[file] = []
        grouped[file].push(name)
      }
      return Object.entries(grouped)
        .map(([file, comps]) => `import { ${comps.join(', ')} } from '@/components/ui/${file}'`)
        .join('\n')
    }
  )

  // Fix Table dot notation
  content = content
    .replace(/<Table\.Head>/g, '<TableHeader>').replace(/<\/Table\.Head>/g, '</TableHeader>')
    .replace(/<Table\.Body>/g, '<TableBody>').replace(/<\/Table\.Body>/g, '</TableBody>')
    .replace(/<Table\.Row>/g, '<TableRow>').replace(/<\/Table\.Row>/g, '</TableRow>')
    .replace(/<Table\.Cell>/g, '<TableCell>').replace(/<\/Table\.Cell>/g, '</TableCell>')

  // Fix missing export default
  if (!content.includes('export default')) {
    content = content
      .replace(/^export function App/m, 'export default function App')
      .replace(/^function App/m, 'export default function App')
  }

  // Fix array of strings → join
  if (content.trim().startsWith('[') || content.trim().startsWith('"')) {
    try {
      const parsed = JSON.parse(`[${content}]`)
      if (Array.isArray(parsed)) content = parsed.join('\n')
    } catch {}
  }

  return content
}

function flattenTree(tree: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}/${key}` : key
    if ((value as any)?.file?.contents) result[path] = (value as any).file.contents
    else if ((value as any)?.directory) Object.assign(result, flattenTree((value as any).directory, path))
    else if (typeof value === 'string') result[path] = value
    else if (Array.isArray(value)) result[path] = (value as string[]).join('\n')
  }
  return result
}

export async function POST(req: Request) {
  try {
    const { sandboxId, files: rawFiles } = await req.json()
    const sandbox = await Sandbox.get({ name: sandboxId, token: process.env.VERCEL_TOKEN! })

    // Normalize files
    let files: Record<string, string> = {}
    const firstValue = Object.values(rawFiles)[0]

    if (typeof firstValue === 'string') {
      // Check if nested JSON
      for (const [key, value] of Object.entries(rawFiles)) {
        if (typeof value === 'string' && value.trim().startsWith('{')) {
          try {
            const inner = JSON.parse(value)
            if (inner.files) { Object.assign(files, flattenTree(inner.files)); continue }
          } catch {}
        }
        files[key] = Array.isArray(value) ? (value as string[]).join('\n') : value as string
      }
    } else {
      files = flattenTree(rawFiles)
    }

    // Fix and write all files
    const filesToWrite = Object.entries(files)
      .filter(([, content]) => content && typeof content === 'string')
      .map(([path, content]) => ({
        path: path.startsWith('/') ? path : `/vercel/sandbox/${path}`,
        content: Buffer.from(fixContent(content)),
      }))

    await sandbox.writeFiles(filesToWrite)
    console.log('wrote files:', filesToWrite.map(f => f.path))

    return NextResponse.json({ ok: true, count: filesToWrite.length })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
