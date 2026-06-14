//# VsBuilder - Vercel Sandbox Routes

//## app/api/vs/create/route.ts

import { Sandbox } from '@vercel/sandbox'
import { NextResponse } from 'next/server'

const BASE_FILES = [
  {
    path: 'package.json',
    content: JSON.stringify({
      name: 'vs-builder-app',
      type: 'module',
      scripts: { dev: 'vite --host 0.0.0.0 --port 5173' },
      dependencies: {
        react: '^18', 'react-dom': '^18',
        'lucide-react': 'latest', clsx: 'latest', 'tailwind-merge': 'latest',
      },
      devDependencies: {
        vite: '6.3.5', '@vitejs/plugin-react': '4.5.2',
        tailwindcss: '3.4.1', autoprefixer: '10.4.17', postcss: '8.4.35',
      },
    }, null, 2),
  },
  {
    path: 'vite.config.js',
    content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: false,
    allowedHosts: 'all',
  }
})`,
  },
  {
    path: 'index.html',
    content: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body><div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
</body></html>`,
  },
  {
    path: 'postcss.config.js',
    content: `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`,
  },
  {
    path: 'tailwind.config.js',
    content: `export default {
  content: ['./src/**/*.{js,jsx}', './index.html'],
  theme: { extend: {} }, plugins: []
}`,
  },
  {
    path: 'src/main.jsx',
    content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
ReactDOM.createRoot(document.getElementById('root')).render(<App />)`,
  },
  {
    path: 'src/index.css',
    content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\nhtml,body,#root{background:#080c10;min-height:100vh;margin:0}`,
  },
  {
    path: 'src/App.jsx',
    content: `export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl font-bold text-emerald-400">Archaeopteris</div>
        <div className="text-gray-400 text-lg">Where Trading Meets Technology</div>
      </div>
    </div>
  )
}`,
  },
  // shadcn UI components
  {
    path: 'src/components/ui/button.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
const variants = { default: 'bg-emerald-500 text-black hover:bg-emerald-400', destructive: 'bg-red-500 text-white hover:bg-red-400', outline: 'border border-gray-700 hover:bg-gray-800 text-gray-100', secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700', ghost: 'hover:bg-gray-800 text-gray-100', link: 'text-emerald-400 underline-offset-4 hover:underline' }
const sizes = { default: 'h-9 px-4 py-2', sm: 'h-7 px-3 text-xs', lg: 'h-11 px-8', icon: 'h-9 w-9' }
export function Button({ className, variant='default', size='default', ...props }) {
  return <button className={cn('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50', variants[variant], sizes[size], className)} {...props} />
}`,
  },
  {
    path: 'src/components/ui/card.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function Card({ className, ...props }) { return <div className={cn('rounded-xl border border-gray-800 bg-gray-900 text-gray-100', className)} {...props} /> }
export function CardHeader({ className, ...props }) { return <div className={cn('flex flex-col space-y-1.5 p-4', className)} {...props} /> }
export function CardTitle({ className, ...props }) { return <h3 className={cn('font-semibold leading-none tracking-tight', className)} {...props} /> }
export function CardContent({ className, ...props }) { return <div className={cn('p-4 pt-0', className)} {...props} /> }
export function CardFooter({ className, ...props }) { return <div className={cn('flex items-center p-4 pt-0', className)} {...props} /> }`,
  },
  {
    path: 'src/components/ui/badge.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
const variants = { default: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30', secondary: 'bg-gray-800 text-gray-400 border border-gray-700', destructive: 'bg-red-500/20 text-red-400 border border-red-500/30', outline: 'border border-gray-700 text-gray-300', high: 'bg-red-500/20 text-red-400 border border-red-500/30', medium: 'bg-amber-500/20 text-amber-400 border border-amber-500/30', low: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' }
export function Badge({ className, variant='default', ...props }) { return <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', variants[variant] || variants.default, className)} {...props} /> }`,
  },
  {
    path: 'src/components/ui/input.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function Input({ className, ...props }) { return <input className={cn('flex h-9 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500', className)} {...props} /> }`,
  },
  {
    path: 'src/components/ui/table.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function Table({ className, ...props }) { return <div className='w-full overflow-auto'><table className={cn('w-full caption-bottom text-sm', className)} {...props} /></div> }
export function TableHeader({ className, ...props }) { return <thead className={cn('[&_tr]:border-b [&_tr]:border-gray-800', className)} {...props} /> }
export function TableBody({ className, ...props }) { return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} /> }
export function TableRow({ className, ...props }) { return <tr className={cn('border-b border-gray-800 transition-colors hover:bg-gray-800/50', className)} {...props} /> }
export function TableHead({ className, ...props }) { return <th className={cn('h-10 px-4 text-left align-middle text-xs font-medium text-gray-500 uppercase tracking-wider', className)} {...props} /> }
export function TableCell({ className, ...props }) { return <td className={cn('px-4 py-3 align-middle text-sm text-gray-300', className)} {...props} /> }`,
  },
  {
    path: 'src/components/ui/tabs.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
const cn = (...c) => twMerge(clsx(c))
export function Tabs({ defaultValue, children, className }) { const [active, setActive] = useState(defaultValue); return <div className={cn('w-full', className)}>{children}</div> }
export function TabsList({ children, className }) { return <div className={cn('inline-flex h-9 items-center justify-center rounded-lg bg-gray-800/50 p-1 gap-1', className)}>{children}</div> }
export function TabsTrigger({ value, children, className, onClick }) { return <button onClick={onClick} className={cn('inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors text-gray-400 hover:text-gray-100', className)}>{children}</button> }
export function TabsContent({ value, children, className }) { return <div className={cn('mt-2', className)}>{children}</div> }`,
  },
  {
    path: 'src/components/ui/select.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function Select({ className, children, ...props }) { return <select className={cn('flex h-9 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500', className)} {...props}>{children}</select> }
export function SelectItem({ value, children }) { return <option value={value}>{children}</option> }`,
  },
  {
    path: 'src/components/ui/switch.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function Switch({ checked, onCheckedChange, className }) { return (<button role='switch' aria-checked={checked} onClick={() => onCheckedChange?.(!checked)} className={cn('relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors', checked ? 'bg-emerald-500' : 'bg-gray-700', className)}><span className={cn('pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform', checked ? 'translate-x-4' : 'translate-x-0')} /></button>) }`,
  },
  {
    path: 'src/components/ui/progress.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function Progress({ value = 0, className }) { return (<div className={cn('relative h-2 w-full overflow-hidden rounded-full bg-gray-800', className)}><div className='h-full bg-emerald-500 transition-all duration-300' style={{ width: \`\${Math.min(100, Math.max(0, value))}%\` }} /></div>) }`,
  },
  {
    path: 'src/components/ui/avatar.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function Avatar({ className, ...props }) { return <span className={cn('relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full', className)} {...props} /> }
export function AvatarImage({ src, alt, className }) { return <img src={src} alt={alt} className={cn('aspect-square h-full w-full object-cover', className)} /> }
export function AvatarFallback({ className, ...props }) { return <span className={cn('flex h-full w-full items-center justify-center rounded-full bg-gray-800 text-xs font-medium text-gray-300', className)} {...props} /> }`,
  },
  {
    path: 'src/components/ui/dialog.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function Dialog({ open, onOpenChange, children }) { if (!open) return null; return (<div className='fixed inset-0 z-50 flex items-center justify-center'><div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={() => onOpenChange?.(false)} /><div className='relative z-10'>{children}</div></div>) }
export function DialogContent({ className, children }) { return <div className={cn('bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md', className)}>{children}</div> }
export function DialogHeader({ className, ...props }) { return <div className={cn('flex flex-col space-y-1.5 mb-4', className)} {...props} /> }
export function DialogTitle({ className, ...props }) { return <h2 className={cn('text-lg font-semibold text-gray-100', className)} {...props} /> }
export function DialogFooter({ className, ...props }) { return <div className={cn('flex justify-end gap-2 mt-4', className)} {...props} /> }`,
  },
  {
    path: 'src/components/ui/tooltip.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
const cn = (...c) => twMerge(clsx(c))
export function Tooltip({ children, content, className }) { const [show, setShow] = useState(false); return (<div className='relative inline-flex' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>{children}{show && <div className={cn('absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-700 text-gray-100 whitespace-nowrap z-50 shadow-lg', className)}>{content}</div>}</div>) }`,
  },
  {
    path: 'src/components/ui/separator.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function Separator({ className, orientation='horizontal', ...props }) { return <div className={cn('shrink-0 bg-gray-800', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)} {...props} /> }`,
  },
  {
    path: 'src/components/ui/scroll-area.jsx',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function ScrollArea({ className, children, ...props }) { return <div className={cn('overflow-auto', className)} {...props}>{children}</div> }`,
  },
  {
    path: 'src/components/ui/toast.jsx',
    content: `import { useState, useEffect } from 'react'
let toastFn = null
export function toast(msg, opts = {}) { toastFn?.({ msg, ...opts }) }
export function Toaster() { const [toasts, setToasts] = useState([]); useEffect(() => { toastFn = (t) => { const id = Date.now(); setToasts(p => [...p, { id, ...t }]); setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), t.duration || 3000) }; return () => { toastFn = null } }, []); return (<div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>{toasts.map(t => (<div key={t.id} className={\`px-4 py-3 rounded-lg shadow-lg text-sm font-medium \${t.variant === 'destructive' ? 'bg-red-900 text-red-100 border border-red-700' : 'bg-gray-800 text-gray-100 border border-gray-700'}\`}>{t.msg}</div>))}</div>) }`,
  },
  {
    path: 'src/components/ui/dropdown-menu.jsx',
    content: `import { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const cn = (...c) => twMerge(clsx(c))
export function DropdownMenu({ children }) { const [open, setOpen] = useState(false); const ref = useRef(null); useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h) }, []); return <div ref={ref} className='relative inline-block'>{typeof children === 'function' ? children({ open, setOpen }) : children}</div> }
export function DropdownMenuTrigger({ children, onClick }) { return <div onClick={onClick}>{children}</div> }
export function DropdownMenuContent({ children, open, className }) { if (!open) return null; return <div className={cn('absolute right-0 mt-1 min-w-40 z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-1', className)}>{children}</div> }
export function DropdownMenuItem({ className, ...props }) { return <div className={cn('px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-gray-100 cursor-pointer transition-colors', className)} {...props} /> }
export function DropdownMenuSeparator() { return <div className='my-1 h-px bg-gray-800' /> }`,
  },
  {
    path: 'src/lib/utils.js',
    content: `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs) { return twMerge(clsx(inputs)) }`,
  },
]

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()

    // Try reuse existing sandbox
    if (sandboxId) {
      try {
        const sandbox = await Sandbox.get({ name: sandboxId, token: process.env.VERCEL_TOKEN! })
        return NextResponse.json({ sandboxId: sandbox.name, isNew: false })
      } catch {
        // Sandbox expired, create new one
      }
    }

    // Create new sandbox
    const sandbox = await Sandbox.create({
      token: process.env.VERCEL_TOKEN!,
      teamId: process.env.VERCEL_TEAM_ID!,
      runtime: 'node22',
      ports: [5173],
      timeout: 30 * 60 * 1000, // 30 minutes
    })

    // Write all base files in parallel
    await sandbox.writeFiles(
      BASE_FILES.map(f => ({
        path: f.path,
        content: Buffer.from(f.content),
      }))
    )

    return NextResponse.json({ sandboxId: sandbox.name, isNew: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
