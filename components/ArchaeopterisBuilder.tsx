"use client";

import { useState, useRef, useEffect } from "react";
import WebContainer, { WebContainerHandle } from "@/components/web-container";

type Tab = "Preview" | "Code" | "Console";

const TABS: Tab[] = ["Preview", "Code", "Console"];

const STARTER = [
  "function App() {",
  "  return (",
  "    <div className=\"min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-950 flex items-center justify-center\">",
  "      <div className=\"text-center space-y-4\">",
  "        <div className=\"text-6xl font-bold text-emerald-400\">Archaeopteris</div>",
  "        <div className=\"text-gray-400 text-lg\">Where Trading Meets Technology</div>",
  "        <div className=\"mt-8 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-sm inline-block\">",
  "          Ready to build \u2726",
  "        </div>",
  "      </div>",
  "    </div>",
  "  );",
  "}",
  "",
  "render(<App />)",
].join("\n");

function flattenFiles(tree: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}/${key}` : key
    if ((value as any).file) {
      result[path] = (value as any).file.contents
    } else if ((value as any).directory) {
      Object.assign(result, flattenFiles((value as any).directory, path))
    }
  }
  return result
}

async function generateProject(prompt: string): Promise<Record<string, string>> {
  const systemPrompt = [
    "You are an elite UI engineer for Archaeopteris LLC.",
    "Generate a React project as JSON. Response must be ONLY valid JSON, no markdown, no backticks.",
    "Schema: { \"name\": string, \"files\": { \"src/App.jsx\": string, ... } }",
    "Rules:",
    "- All files under src/",
    "- App.jsx must export default function App()",
    "- Use Tailwind classes for styling",
    "- Import from 'react' and '@radix-ui/themes' only",
    "- NO inline styles unless necessary",
    "- NO <style> tags",
    "- Each file is a complete valid JS/JSX module",
    "- Keep it simple, max 5 files",
    "- Import shadcn components từ '@/components/ui/button', '@/components/ui/card', '@/components/ui/badge', '@/components/ui/tabs', '@/components/ui/dialog', '@/components/ui/select', '@/components/ui/switch', '@/components/ui/avatar', '@/components/ui/progress', '@/components/ui/table', '@/components/ui/tooltip', '@/components/ui/dropdown-menu', '@/components/ui/toast'",
"- Ưu tiên dùng shadcn components thay vì tự viết HTML",

"CRITICAL: Only generate files inside src/ directory.",
"DO NOT generate: package.json, vite.config.js, postcss.config.js, tailwind.config.js, index.html, .npmrc",
"These config files are already set up in the environment.",

  ].join('\n')

  const res = await fetch("/api/page-generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      prompt: `${systemPrompt}\n\nGenerate project: ${prompt}` 
    }),
  })

  if (!res.ok) throw new Error(`API error ${res.status}`)
  const data = await res.json()
  if (data.error) throw new Error(data.error)

  const raw = data.code as string
  const clean = raw.replace(/^```json\n?/m, '').replace(/\n?```\s*$/m, '').trim()
  const parsed = JSON.parse(clean)
  return parsed.files as Record<string, string>
}


export default function ArchaeopterisBuilder() {
  const [code, setCode] = useState<string>(STARTER);
  const [activeTab, setActiveTab] = useState<Tab>("Preview");
  const [prompt, setPrompt] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>(["WebContainer ready \u2713", "Claude API connected \u2713"]);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const wcRef = useRef<WebContainerHandle>(null);
  
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [files, setFiles] = useState<Record<string, string>>({})
const [activeFile, setActiveFile] = useState<string>('src/App.jsx')

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  //const isMobile = window.innerWidth < 768  // iPad > 768px

const [isPortrait, setIsPortrait] = useState(
  typeof window !== 'undefined' 
    ? isMobile && window.innerHeight > window.innerWidth 
    : false
)

useEffect(() => {
  const handler = () => {
    const mobile = window.innerWidth < 768
    setIsPortrait(mobile && window.innerHeight > window.innerWidth)
  }
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}, [])



  const addLog = (msg: string) =>
    setLogs((p) => [...p.slice(-99), `[${new Date().toLocaleTimeString()}] ${msg}`]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleGenerate = async () => {
    if (!prompt.trim() || generating) return;
    const currentPrompt = prompt;
    setGenerating(true);
    setPrompt("");
    setActiveTab("Code");
    addLog(`Generating: "${currentPrompt}"`);

    try {
  const rawfiles = await generateProject(currentPrompt);
  addLog("Generation complete \u2713");
  setFiles(flattenFiles(rawfiles))
  await wcRef.current?.mountFiles(rawfiles);
  setTimeout(() => setActiveTab("Preview"), 150);

    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      addLog(`Error: ${msg}`);
    } finally {
      setGenerating(false);
    }
  };

  const btnBase: React.CSSProperties = {
    display: "block", width: "100%", padding: "7px 10px", marginBottom: 4,
    background: "transparent", border: "1px solid #1a2535", borderRadius: 6,
    color: "#5a7090", fontSize: 11, cursor: "pointer",
    textAlign: "left", fontFamily: "inherit",
  };

  // Files object for WebContainer — memoized so it doesn't re-trigger boot
  const wcFiles = {
    'package.json': {
      file: {
        contents: JSON.stringify({
          name: "archaeopteris-builder",
          type: "module",
          scripts: { dev: "vite --port 3000" },
          dependencies: {
            "react": "^18",
            "react-dom": "^18",
            "lucide-react": "latest",
            "clsx": "latest",
            "tailwind-merge": "latest",
            "@radix-ui/themes": "3.1.6",

          },
          devDependencies: {
            "vite": "6.3.5",
            "@vitejs/plugin-react": "4.5.2",
            "tailwindcss": "3.4.1",
            "autoprefixer": "10.4.17",
            "postcss": "8.4.35",
          },
        }),
      },
    },
    '.npmrc': {
      file: { contents: 'registry=http://registry.npmjs.org/' },
    },
    'index.html': {
      file: {
        contents: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`,
      },
    },
    'src': {
      directory: {
        'components': {
  directory: {
    'ui': {
      directory: {
        'button.jsx': {
          file: {
            contents: [
              "import { clsx } from 'clsx'",
              "import { twMerge } from 'tailwind-merge'",
              "const cn = (...c) => twMerge(clsx(c))",
              "const variants = {",
              "  default: 'bg-emerald-500 text-black hover:bg-emerald-400',",
              "  destructive: 'bg-red-500 text-white hover:bg-red-400',",
              "  outline: 'border border-gray-700 hover:bg-gray-800 text-gray-100',",
              "  secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700',",
              "  ghost: 'hover:bg-gray-800 text-gray-100',",
              "  link: 'text-emerald-400 underline-offset-4 hover:underline',",
              "}",
              "const sizes = {",
              "  default: 'h-9 px-4 py-2',",
              "  sm: 'h-7 px-3 text-xs',",
              "  lg: 'h-11 px-8',",
              "  icon: 'h-9 w-9',",
              "}",
              "export function Button({ className, variant='default', size='default', ...props }) {",
              "  return <button className={cn('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50', variants[variant], sizes[size], className)} {...props} />",
              "}",
            ].join('\n')
          }
        },
        'card.jsx': {
          file: {
            contents: [
              "import { clsx } from 'clsx'",
              "import { twMerge } from 'tailwind-merge'",
              "const cn = (...c) => twMerge(clsx(c))",
              "export function Card({ className, ...props }) {",
              "  return <div className={cn('rounded-xl border border-gray-800 bg-gray-900 text-gray-100', className)} {...props} />",
              "}",
              "export function CardHeader({ className, ...props }) {",
              "  return <div className={cn('flex flex-col space-y-1.5 p-4', className)} {...props} />",
              "}",
              "export function CardTitle({ className, ...props }) {",
              "  return <h3 className={cn('font-semibold leading-none tracking-tight', className)} {...props} />",
              "}",
              "export function CardContent({ className, ...props }) {",
              "  return <div className={cn('p-4 pt-0', className)} {...props} />",
              "}",
              "export function CardFooter({ className, ...props }) {",
              "  return <div className={cn('flex items-center p-4 pt-0', className)} {...props} />",
              "}",
            ].join('\n')
          }
        },
        'badge.jsx': {
          file: {
            contents: [
              "import { clsx } from 'clsx'",
              "import { twMerge } from 'tailwind-merge'",
              "const cn = (...c) => twMerge(clsx(c))",
              "const variants = {",
              "  default: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',",
              "  secondary: 'bg-gray-800 text-gray-400 border border-gray-700',",
              "  destructive: 'bg-red-500/20 text-red-400 border border-red-500/30',",
              "  outline: 'border border-gray-700 text-gray-300',",
              "  high: 'bg-red-500/20 text-red-400 border border-red-500/30',",
              "  medium: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',",
              "  low: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',",
              "  breaking: 'bg-red-500/20 text-red-400 border border-red-500/30 font-bold',",
              "  crypto: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',",
              "  markets: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',",
              "  forex: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',",
              "  macro: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',",
              "}",
              "export function Badge({ className, variant='default', ...props }) {",
              "  return <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', variants[variant] || variants.default, className)} {...props} />",
              "}",
            ].join('\n')
          }
        },
        'separator.jsx': {
          file: {
            contents: [
              "import { clsx } from 'clsx'",
              "import { twMerge } from 'tailwind-merge'",
              "const cn = (...c) => twMerge(clsx(c))",
              "export function Separator({ className, orientation='horizontal', ...props }) {",
              "  return <div className={cn('shrink-0 bg-gray-800', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)} {...props} />",
              "}",
            ].join('\n')
          }
        },
        'scroll-area.jsx': {
          file: {
            contents: [
              "import { clsx } from 'clsx'",
              "import { twMerge } from 'tailwind-merge'",
              "const cn = (...c) => twMerge(clsx(c))",
              "export function ScrollArea({ className, children, ...props }) {",
              "  return <div className={cn('overflow-auto', className)} {...props}>{children}</div>",
              "}",
            ].join('\n')
          }
        },
        'input.jsx': {
          file: {
            contents: [
              "import { clsx } from 'clsx'",
              "import { twMerge } from 'tailwind-merge'",
              "const cn = (...c) => twMerge(clsx(c))",
              "export function Input({ className, ...props }) {",
              "  return <input className={cn('flex h-9 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500', className)} {...props} />",
              "}",
            ].join('\n')
          }
        },
        'tabs.jsx': {
  file: {
    contents: [
      "import { clsx } from 'clsx'",
      "import { twMerge } from 'tailwind-merge'",
      "import { useState } from 'react'",
      "const cn = (...c) => twMerge(clsx(c))",
      "export function Tabs({ defaultValue, children, className }) {",
      "  const [active, setActive] = useState(defaultValue)",
      "  const ctx = { active, setActive }",
      "  return <div className={cn('w-full', className)} data-tabs>{children}</div>",
      "}",
      "export function TabsList({ children, className }) {",
      "  return <div className={cn('inline-flex h-9 items-center justify-center rounded-lg bg-gray-800/50 p-1 gap-1', className)}>{children}</div>",
      "}",
      "export function TabsTrigger({ value, children, className, onClick }) {",
      "  return <button onClick={onClick} className={cn('inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors text-gray-400 hover:text-gray-100 data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100', className)}>{children}</button>",
      "}",
      "export function TabsContent({ value, children, className }) {",
      "  return <div className={cn('mt-2', className)}>{children}</div>",
      "}",
    ].join('\n')
  }
},
'select.jsx': {
  file: {
    contents: [
      "import { clsx } from 'clsx'",
      "import { twMerge } from 'tailwind-merge'",
      "const cn = (...c) => twMerge(clsx(c))",
      "export function Select({ className, children, ...props }) {",
      "  return <select className={cn('flex h-9 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500', className)} {...props}>{children}</select>",
      "}",
      "export function SelectItem({ value, children }) {",
      "  return <option value={value}>{children}</option>",
      "}",
    ].join('\n')
  }
},
'switch.jsx': {
  file: {
    contents: [
      "import { clsx } from 'clsx'",
      "import { twMerge } from 'tailwind-merge'",
      "const cn = (...c) => twMerge(clsx(c))",
      "export function Switch({ checked, onCheckedChange, className }) {",
      "  return (",
      "    <button role='switch' aria-checked={checked} onClick={() => onCheckedChange?.(!checked)}",
      "      className={cn('relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors', checked ? 'bg-emerald-500' : 'bg-gray-700', className)}>",
      "      <span className={cn('pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform', checked ? 'translate-x-4' : 'translate-x-0')} />",
      "    </button>",
      "  )",
      "}",
    ].join('\n')
  }
},
'avatar.jsx': {
  file: {
    contents: [
      "import { clsx } from 'clsx'",
      "import { twMerge } from 'tailwind-merge'",
      "const cn = (...c) => twMerge(clsx(c))",
      "export function Avatar({ className, ...props }) {",
      "  return <span className={cn('relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full', className)} {...props} />",
      "}",
      "export function AvatarImage({ src, alt, className }) {",
      "  return <img src={src} alt={alt} className={cn('aspect-square h-full w-full object-cover', className)} />",
      "}",
      "export function AvatarFallback({ className, ...props }) {",
      "  return <span className={cn('flex h-full w-full items-center justify-center rounded-full bg-gray-800 text-xs font-medium text-gray-300', className)} {...props} />",
      "}",
    ].join('\n')
  }
},
'progress.jsx': {
  file: {
    contents: [
      "import { clsx } from 'clsx'",
      "import { twMerge } from 'tailwind-merge'",
      "const cn = (...c) => twMerge(clsx(c))",
      "export function Progress({ value = 0, className }) {",
      "  return (",
      "    <div className={cn('relative h-2 w-full overflow-hidden rounded-full bg-gray-800', className)}>",
      "      <div className='h-full bg-emerald-500 transition-all duration-300' style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />",
      "    </div>",
      "  )",
      "}",
    ].join('\n')
  }
},
'table.jsx': {
  file: {
    contents: [
      "import { clsx } from 'clsx'",
      "import { twMerge } from 'tailwind-merge'",
      "const cn = (...c) => twMerge(clsx(c))",
      "export function Table({ className, ...props }) {",
      "  return <div className='w-full overflow-auto'><table className={cn('w-full caption-bottom text-sm', className)} {...props} /></div>",
      "}",
      "export function TableHeader({ className, ...props }) {",
      "  return <thead className={cn('[&_tr]:border-b [&_tr]:border-gray-800', className)} {...props} />",
      "}",
      "export function TableBody({ className, ...props }) {",
      "  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />",
      "}",
      "export function TableRow({ className, ...props }) {",
      "  return <tr className={cn('border-b border-gray-800 transition-colors hover:bg-gray-800/50', className)} {...props} />",
      "}",
      "export function TableHead({ className, ...props }) {",
      "  return <th className={cn('h-10 px-4 text-left align-middle text-xs font-medium text-gray-500 uppercase tracking-wider', className)} {...props} />",
      "}",
      "export function TableCell({ className, ...props }) {",
      "  return <td className={cn('px-4 py-3 align-middle text-sm text-gray-300', className)} {...props} />",
      "}",
    ].join('\n')
  }
},
'tooltip.jsx': {
  file: {
    contents: [
      "import { clsx } from 'clsx'",
      "import { twMerge } from 'tailwind-merge'",
      "import { useState } from 'react'",
      "const cn = (...c) => twMerge(clsx(c))",
      "export function Tooltip({ children, content, className }) {",
      "  const [show, setShow] = useState(false)",
      "  return (",
      "    <div className='relative inline-flex' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>",
      "      {children}",
      "      {show && <div className={cn('absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-700 text-gray-100 whitespace-nowrap z-50 shadow-lg', className)}>{content}</div>}",
      "    </div>",
      "  )",
      "}",
    ].join('\n')
  }
},
'dialog.jsx': {
  file: {
    contents: [
      "import { clsx } from 'clsx'",
      "import { twMerge } from 'tailwind-merge'",
      "const cn = (...c) => twMerge(clsx(c))",
      "export function Dialog({ open, onOpenChange, children }) {",
      "  if (!open) return null",
      "  return (",
      "    <div className='fixed inset-0 z-50 flex items-center justify-center'>",
      "      <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={() => onOpenChange?.(false)} />",
      "      <div className='relative z-10'>{children}</div>",
      "    </div>",
      "  )",
      "}",
      "export function DialogContent({ className, children }) {",
      "  return <div className={cn('bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md', className)}>{children}</div>",
      "}",
      "export function DialogHeader({ className, ...props }) {",
      "  return <div className={cn('flex flex-col space-y-1.5 mb-4', className)} {...props} />",
      "}",
      "export function DialogTitle({ className, ...props }) {",
      "  return <h2 className={cn('text-lg font-semibold text-gray-100', className)} {...props} />",
      "}",
      "export function DialogFooter({ className, ...props }) {",
      "  return <div className={cn('flex justify-end gap-2 mt-4', className)} {...props} />",
      "}",
    ].join('\n')
  }
},
'toast.jsx': {
  file: {
    contents: [
      "import { useState, useEffect, useCallback } from 'react'",
      "let toastFn = null",
      "export function toast(msg, opts = {}) { toastFn?.({ msg, ...opts }) }",
      "export function Toaster() {",
      "  const [toasts, setToasts] = useState([])",
      "  useEffect(() => {",
      "    toastFn = (t) => {",
      "      const id = Date.now()",
      "      setToasts(p => [...p, { id, ...t }])",
      "      setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), t.duration || 3000)",
      "    }",
      "    return () => { toastFn = null }",
      "  }, [])",
      "  return (",
      "    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>",
      "      {toasts.map(t => (",
      "        <div key={t.id} className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-fade-in ${t.variant === 'destructive' ? 'bg-red-900 text-red-100 border border-red-700' : 'bg-gray-800 text-gray-100 border border-gray-700'}`}>",
      "          {t.msg}",
      "        </div>",
      "      ))}",
      "    </div>",
      "  )",
      "}",
    ].join('\n')
  }
},
'dropdown-menu.jsx': {
  file: {
    contents: [
      "import { useState, useRef, useEffect } from 'react'",
      "import { clsx } from 'clsx'",
      "import { twMerge } from 'tailwind-merge'",
      "const cn = (...c) => twMerge(clsx(c))",
      "export function DropdownMenu({ children }) {",
      "  const [open, setOpen] = useState(false)",
      "  const ref = useRef(null)",
      "  useEffect(() => {",
      "    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }",
      "    document.addEventListener('mousedown', handler)",
      "    return () => document.removeEventListener('mousedown', handler)",
      "  }, [])",
      "  return <div ref={ref} className='relative inline-block'>{typeof children === 'function' ? children({ open, setOpen }) : children}</div>",
      "}",
      "export function DropdownMenuTrigger({ children, onClick }) {",
      "  return <div onClick={onClick}>{children}</div>",
      "}",
      "export function DropdownMenuContent({ children, open, className }) {",
      "  if (!open) return null",
      "  return <div className={cn('absolute right-0 mt-1 min-w-40 z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-1', className)}>{children}</div>",
      "}",
      "export function DropdownMenuItem({ className, ...props }) {",
      "  return <div className={cn('px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-gray-100 cursor-pointer transition-colors', className)} {...props} />",
      "}",
      "export function DropdownMenuSeparator() {",
      "  return <div className='my-1 h-px bg-gray-800' />",
      "}",
    ].join('\n')
  }
},

      }
    }
  }
},
'lib': {
  directory: {
    'utils.js': {
      file: {
        contents: [
          "import { clsx } from 'clsx'",
          "import { twMerge } from 'tailwind-merge'",
          "export function cn(...inputs) {",
          "  return twMerge(clsx(inputs))",
          "}",
        ].join('\n')
      }
    }
  }
},

        'main.jsx': {
  file: {
    contents: [
      "import React from 'react'",
      "import ReactDOM from 'react-dom/client'",
      "import '@radix-ui/themes/styles.css'",
      "import './index.css'",
      "import { Theme } from '@radix-ui/themes'",
      "import App from './App'",
      "",
      "ReactDOM.createRoot(document.getElementById('root')).render(",
      "  React.createElement(Theme, { appearance: 'dark', accentColor: 'green', radius: 'medium' },",
      "    React.createElement(App)",
      "  )",
      ")",
    ].join('\n')
  }
},
'App.jsx': {
  file: {
    contents: [
      "export default function App() {",
      "  return (",
      "    <div className='min-h-screen bg-gray-950 flex items-center justify-center'>",
      "      <div className='text-emerald-400 text-4xl font-bold'>Archaeopteris</div>",
      "    </div>",
      "  )",
      "}",
    ].join('\n')
  }
},

          
        
        'index.css': {
          file: {
            contents: [
              "@tailwind base;",
              "@tailwind components;",
              "@tailwind utilities;",
              "html, body, #root {",
              "  background: #080c10;",
              "  min-height: 100vh;",
              "  margin: 0;",
              "}",
            ].join('\n'),
          },
        },
      },
    },
    'vite.config.js': {
      file: {
        contents: [
          "import { defineConfig } from 'vite'",
          "import react from '@vitejs/plugin-react'",
          "export default defineConfig({ plugins: [react()] })",
        ].join('\n'),
      },
    },
    'postcss.config.js': {
      file: {
        contents: [
          "export default {",
          "  plugins: {",
          "    tailwindcss: {},",
          "    autoprefixer: {},",
          "  }",
          "}",
        ].join('\n'),
      },
    },
    'tailwind.config.js': {
      file: {
        contents: [
          "export default {",
          "  content: ['./src/**/*.{js,jsx}', './index.html'],",
          "  theme: { extend: {} },",
          "  plugins: []",
          "}",
        ].join('\n'),
      },
    },
  };

  return (
    <div style={{
      fontFamily: "monospace",
      background: "#080c10",
      color: "#e2e8f0",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>

      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "10px 16px", borderBottom: "1px solid #1a2535",
        background: "#0d1420", flexShrink: 0,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: "linear-gradient(135deg,#10b981,#3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, color: "#000",
        }}>A</div>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#10b981", letterSpacing: "0.05em" }}>
          ARCHAEOPTERIS BUILDER
        </span>
       
        <div style={{ flex: 1 }} />
{isMobile && (
  <button onClick={() => setDrawerOpen(true)} style={{
    background: 'transparent', border: 'none',
    color: '#10b981', fontSize: 18, cursor: 'pointer', padding: '4px 8px',
    marginRight: 8
  }}>☰</button>
)}
        <span style={{
          fontSize: 10, padding: "3px 8px", borderRadius: 4,
          background: "#10b98115", border: "1px solid #10b98140", color: "#10b981",
        }}>BETA</span>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden",
      flexDirection: isPortrait ? "column" : "row",
       }}>

        {/* Overlay */}
{isMobile && drawerOpen && (
  <div onClick={() => setDrawerOpen(false)} style={{
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40
  }} />
)}

{/* Left panel */}
<div style={{
  position: isMobile ? 'fixed' : 'relative',
  left: isMobile ? (drawerOpen ? 0 : -300) : 'auto',
  top: isMobile ? 0 : 'auto',
  height: isMobile ? '100vh' : '100%',
  zIndex: isMobile ? 50 : 'auto',
  transition: 'left 0.3s ease',
  //width: 280,
  width: isMobile ? 280 : isPortrait ? "100%" : 280,
maxHeight: isMobile ? "100vh" : isPortrait ? "45vh" : "100%",
overflow: isMobile ? "auto" : isPortrait ? "auto" : "hidden",
borderRight: isMobile ? "none" : isPortrait ? "none" : "1px solid #1a2535",
borderBottom: isMobile ? "none" : isPortrait ? "1px solid #1a2535" : "none",

  display: "flex", flexDirection: "column",
  background: "#0a0f1a", flexShrink: 0,
}}>


          {/* Prompt */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535", flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>
              ✦ DESCRIBE YOUR COMPONENT
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
              placeholder="e.g. XAUUSD trading dashboard..."
              style={{
                width: "100%", height: 90, background: "#0d1420",
                border: "1px solid #1e3050", borderRadius: 8,
                color: "#c8d8e8", fontSize: 12, padding: "10px 12px",
                resize: "none", outline: "none", fontFamily: "inherit",
                lineHeight: 1.6, boxSizing: "border-box",
              }}
            />
            <button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              style={{
                width: "100%", marginTop: 8, padding: "10px 0", borderRadius: 8,
                border: "none",
                background: generating ? "#1a3020" : "linear-gradient(135deg,#10b981,#059669)",
                color: generating ? "#4a8060" : "#000",
                fontWeight: 700, fontSize: 12,
                cursor: generating ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              {generating
                ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>◌</span> Generating...</>
                : <>✦ Generate <span style={{ opacity: 0.5, fontSize: 10 }}>⌘↵</span></>}
            </button>
          </div>

          {/* Quick prompts */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535", flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>
              QUICK PROMPTS
            </div>
            {["XAUUSD trading dashboard", "Hero section dark luxury", "Pricing table fintech", "EA performance stats", "Admin sidebar navigation"].map((q) => (
              <button key={q} onClick={() => setPrompt(q)} style={{
                ...btnBase,
                color: prompt === q ? "#10b981" : "#5a7090",
                border: `1px solid ${prompt === q ? "#10b98140" : "#1a2535"}`,
                background: prompt === q ? "#10b98115" : "transparent",
              }}>
                {q}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535", flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>
              ACTIONS
            </div>
            <button onClick={() => { navigator.clipboard?.writeText(code); addLog("Copied \u2713"); }} style={btnBase}>
              ⎘ Copy TSX
            </button>
            <button onClick={() => {
              setCode(STARTER);
              addLog("Reset \u2713");
              setActiveTab("Preview");
            }} style={btnBase}>
              ↺ Reset
            </button>
          </div>

          {/* Logs */}
          <div style={{ flex: 1, overflow: "auto", padding: 14, minHeight: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>
              CONSOLE
            </div>
            {logs.map((log, i) => (
              <div key={i} style={{
                fontSize: 10, lineHeight: 1.7,
                color: log.includes("Error") ? "#f87171"
                  : log.includes("\u2713") ? "#10b981"
                  : "#4a6080",
              }}>
                {log}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* Tab bar */}
          <div style={{
            display: "flex", borderBottom: "1px solid #1a2535",
            background: "#0a0f1a", flexShrink: 0,
          }}>
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "10px 20px", background: "transparent", border: "none",
                borderBottom: activeTab === tab ? "2px solid #10b981" : "2px solid transparent",
                color: activeTab === tab ? "#10b981" : "#4a6080",
                fontSize: 11, cursor: "pointer", fontFamily: "inherit",
              }}>
                {tab}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            {activeTab === "Code" && (
  <button
    onClick={() => {
  // Multi-file mode (đã có files state)
  if (Object.keys(files).length > 0) {
    wcRef.current?.mountFiles(files)
    return
  }
  
  // JSON mode
  const trimmed = code.trim()
  if (trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed)
      wcRef.current?.mountFiles(parsed.files)
    } catch(e) {
      addLog('Error: Invalid JSON')
    }
    return
  }
  
  // JSX mode
  wcRef.current?.restartDev(code)
}}


    style={{ padding: "10px 16px", background: "transparent", border: "none", color: "#10b981", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
  >
    ▶ Run
  </button>
)}

          </div>

          {/* Content area — all 3 tabs share same space */}
          <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>

            {/* Preview — always mounted, visibility toggled via CSS */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: activeTab === "Preview" ? "flex" : "none",
              flexDirection: "column",
              overflow: "hidden",
            }}>
              {generating && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg,transparent,#10b981,transparent)",
                  animation: "slide 1.5s linear infinite", zIndex: 10,
                }} />
              )}
              <WebContainer
                ref={wcRef}
                files={wcFiles}
                startCommand={['npm', 'install']}
                style={{ flex: 1, minHeight: 0 }}
              />
            </div>

            {/* Code editor */}
            {activeTab === "Code" && (
  <div style={{ position: "absolute", inset: 0, display: "flex" }}>
    
    {/* File tree */}
    <div style={{
      width: 160, background: "#040810", borderRight: "1px solid #1a2535",
      overflowY: "auto", flexShrink: 0,
    }}>
      <div style={{ fontSize: 10, color: "#2a4060", padding: "8px 12px", letterSpacing: "0.1em" }}>FILES</div>
      {Object.keys(files).map(path => (
        <div key={path} onClick={() => setActiveFile(path)}
          style={{
            padding: "6px 12px", fontSize: 11, cursor: "pointer",
            color: activeFile === path ? "#10b981" : "#4a6080",
            background: activeFile === path ? "#10b98115" : "transparent",
            borderLeft: activeFile === path ? "2px solid #10b981" : "2px solid transparent",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
          {path.split('/').pop()}
        </div>
      ))}
    </div>

    {/* Editor */}
    <div style={{ flex: 1, display: "flex", overflow: "auto" }}>
      <div style={{
        minWidth: 40, paddingTop: 16, paddingRight: 10,
        textAlign: "right", color: "#2a4060", fontSize: 12,
        lineHeight: "21px", userSelect: "none",
        borderRight: "1px solid #1a2535", background: "#080c10", flexShrink: 0,
      }}>
        {(files[activeFile] || " ").split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
      </div>
      <textarea
        value={files[activeFile] || ""}
        onChange={(e) => setFiles(prev => ({ ...prev, [activeFile]: e.target.value }))}
        readOnly={generating}
        spellCheck={false}
        style={{
          flex: 1, background: "#080c10", border: "none",
          color: generating ? "#4a8060" : "#a8c8e8",
          fontSize: 12, lineHeight: "21px", padding: "16px",
          fontFamily: "monospace", resize: "none", outline: "none",
          whiteSpace: "pre", overflowWrap: "normal", minHeight: "100%",
        }}
      />
    </div>
  </div>
)}


            {/* Console */}
            {activeTab === "Console" && (
              <div style={{
                position: "absolute", inset: 0,
                overflow: "auto", padding: 20,
                fontFamily: "monospace", fontSize: 12, lineHeight: 1.8,
              }}>
                {logs.map((log, i) => (
                  <div key={i} style={{
                    color: log.includes("Error") ? "#f87171"
                      : log.includes("\u2713") ? "#10b981"
                      : "#4a7090",
                  }}>
                    <span style={{ color: "#2a4060", marginRight: 12 }}>$</span>{log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes slide { from { transform: translateX(-100%) } to { transform: translateX(100%) } }
        * { box-sizing: border-box }
        ::-webkit-scrollbar { width: 4px; height: 4px }
        ::-webkit-scrollbar-thumb { background: #1e3050; border-radius: 2px }
        textarea::placeholder { color: #2a4060 }
        button:hover:not(:disabled) { opacity: 0.8 }
      `}</style>
    </div>
  );
}