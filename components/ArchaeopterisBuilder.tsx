"use client";

import { useState, useRef, useEffect } from "react";
import WebContainer, { WebContainerHandle } from "@/components/web-container";

type Tab = "Preview" | "Code" | "Console";
const TABS: Tab[] = ["Preview", "Code", "Console"];

// ─── FEATURE 2: PROJECT-LEVEL QUICK PROMPTS ───────────────────────────────────
const PROMPT_CATEGORIES = [
  {
    label: "Trading",
    icon: "📈",
    prompts: [
      "XAUUSD trading dashboard with candlestick chart and order panel",
      "EA performance stats with drawdown curve and trade history table",
      "Crypto portfolio tracker with P&L breakdown",
      "Forex heatmap with currency strength meter",
      "Options chain viewer with Greeks display",
    ],
  },
  {
    label: "SaaS",
    icon: "🚀",
    prompts: [
      "SaaS dashboard with MRR, churn, and user growth metrics",
      "Admin panel with sidebar navigation and data tables",
      "Pricing page with 3 tiers and feature comparison",
      "Onboarding flow with multi-step wizard",
      "User settings page with profile, billing, notifications tabs",
    ],
  },
  {
    label: "UI Components",
    icon: "🧩",
    prompts: [
      "Dark luxury hero section with animated gradient",
      "Command palette with fuzzy search",
      "Kanban board with drag-and-drop columns",
      "Data table with sorting, filtering, pagination",
      "Notification center with grouped alerts",
    ],
  },
  {
    label: "AI / Chat",
    icon: "🤖",
    prompts: [
      "AI chatbot interface with streaming response",
      "Prompt library manager with tags and search",
      "Model comparison side-by-side view",
      "Token usage dashboard with cost breakdown",
      "RAG document upload and query interface",
    ],
  },
];

// ─── FEATURE 3: TEMPLATE LIBRARY ──────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "blank",
    label: "Blank",
    icon: "□",
    desc: "Empty React app",
    code: `export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-emerald-400 text-4xl font-bold">Archaeopteris</div>
    </div>
  )
}`,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "▦",
    desc: "Admin dashboard layout",
    code: `import { useState } from 'react'

const NAV = ['Overview', 'Analytics', 'Users', 'Settings']
const STATS = [
  { label: 'Revenue', value: '$48,295', change: '+12.5%', up: true },
  { label: 'Users', value: '3,842', change: '+8.2%', up: true },
  { label: 'Orders', value: '1,294', change: '-2.1%', up: false },
  { label: 'Churn', value: '2.4%', change: '-0.8%', up: true },
]

export default function App() {
  const [active, setActive] = useState('Overview')
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col p-4 gap-1">
        <div className="text-emerald-400 font-bold text-sm mb-6 px-2">ARCHAEOPTERIS</div>
        {NAV.map(n => (
          <button key={n} onClick={() => setActive(n)}
            className={\`px-3 py-2 rounded-lg text-sm text-left transition-colors \${active === n ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}\`}>
            {n}
          </button>
        ))}
      </aside>
      {/* Main */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-100 mb-8">{active}</h1>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {STATS.map(s => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="text-2xl font-bold text-gray-100">{s.value}</div>
              <div className={\`text-xs mt-1 \${s.up ? 'text-emerald-400' : 'text-red-400'}\`}>{s.change}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-64 flex items-center justify-center text-gray-600">
          Chart area
        </div>
      </main>
    </div>
  )
}`,
  },
  {
    id: "landing",
    label: "Landing",
    icon: "◈",
    desc: "Dark luxury landing page",
    code: `export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800/50">
        <div className="text-emerald-400 font-bold tracking-wider text-sm">ARCHAEOPTERIS</div>
        <div className="flex gap-8 text-sm text-gray-400">
          {['Product','Pricing','Docs'].map(n => <a key={n} href="#" className="hover:text-gray-100 transition-colors">{n}</a>)}
        </div>
        <button className="px-4 py-2 bg-emerald-500 text-black text-sm font-bold rounded-lg hover:bg-emerald-400 transition-colors">
          Get Started
        </button>
      </nav>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs mb-8">
          ✦ Now in Beta
        </div>
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-br from-gray-100 to-gray-500 bg-clip-text text-transparent max-w-2xl leading-tight">
          Where Trading Meets Technology
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          Build, test, and deploy trading interfaces at the speed of thought.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors">
            Start Building
          </button>
          <button className="px-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors">
            View Docs
          </button>
        </div>
      </section>
    </div>
  )
}`,
  },
  {
    id: "chat",
    label: "AI Chat",
    icon: "◎",
    desc: "Chat interface template",
    code: `import { useState } from 'react'

const INIT = [{ role: 'assistant', text: 'Hello! How can I help you today?' }]

export default function App() {
  const [messages, setMessages] = useState(INIT)
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages(p => [...p, { role: 'user', text: input }, { role: 'assistant', text: 'This is a placeholder response. Connect your AI API here.' }])
    setInput('')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col max-w-2xl mx-auto p-4">
      <div className="text-center py-4 text-emerald-400 font-bold text-sm border-b border-gray-800 mb-4">
        AI ASSISTANT
      </div>
      <div className="flex-1 overflow-auto space-y-4 pb-4">
        {messages.map((m, i) => (
          <div key={i} className={\`flex \${m.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
            <div className={\`max-w-xs px-4 py-2 rounded-2xl text-sm \${m.role === 'user' ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-100'}\`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-gray-800 pt-4">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-emerald-500" />
        <button onClick={send} className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors text-sm">
          Send
        </button>
      </div>
    </div>
  )
}`,
  },
  {
    id: "kanban",
    label: "Kanban",
    icon: "⊞",
    desc: "Task board layout",
    code: `import { useState } from 'react'

const INIT_COLS = {
  todo: { label: 'To Do', color: 'gray', cards: ['Research competitors', 'Setup CI/CD', 'Write tests'] },
  doing: { label: 'In Progress', color: 'emerald', cards: ['Build dashboard UI', 'API integration'] },
  done: { label: 'Done', color: 'blue', cards: ['Project setup', 'Design system', 'Auth flow'] },
}

export default function App() {
  const [cols, setCols] = useState(INIT_COLS)
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <h1 className="text-xl font-bold text-gray-100 mb-8">Project Board</h1>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Object.entries(cols).map(([key, col]) => (
          <div key={key} className="w-72 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <div className={\`w-2 h-2 rounded-full bg-\${col.color}-400\`} />
              <span className="text-sm font-medium text-gray-300">{col.label}</span>
              <span className="ml-auto text-xs text-gray-600">{col.cards.length}</span>
            </div>
            <div className="space-y-2">
              {col.cards.map((card, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm text-gray-300 hover:border-gray-700 cursor-pointer transition-colors">
                  {card}
                </div>
              ))}
              <button className="w-full py-2 text-xs text-gray-600 hover:text-gray-400 transition-colors">
                + Add card
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}`,
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: "◇",
    desc: "Pricing table with tiers",
    code: `import { useState } from 'react'

const PLANS = [
  { name: 'Starter', price: { monthly: 0, yearly: 0 }, desc: 'For individuals', features: ['5 projects', '10GB storage', 'Basic analytics', 'Email support'], cta: 'Get Started', highlight: false },
  { name: 'Pro', price: { monthly: 49, yearly: 39 }, desc: 'For growing teams', features: ['Unlimited projects', '100GB storage', 'Advanced analytics', 'Priority support', 'Custom domain', 'API access'], cta: 'Start Free Trial', highlight: true },
  { name: 'Enterprise', price: { monthly: 199, yearly: 159 }, desc: 'For large orgs', features: ['Everything in Pro', 'Unlimited storage', 'SSO / SAML', 'SLA 99.99%', 'Dedicated support', 'Custom contracts'], cta: 'Contact Sales', highlight: false },
]

export default function App() {
  const [yearly, setYearly] = useState(false)
  return (
    <div className="min-h-screen bg-gray-950 py-20 px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-100 mb-4">Simple Pricing</h1>
        <div className="flex items-center justify-center gap-3">
          <span className={\`text-sm \${!yearly ? 'text-gray-100' : 'text-gray-500'}\`}>Monthly</span>
          <button onClick={() => setYearly(p => !p)} className={\`relative w-10 h-5 rounded-full transition-colors \${yearly ? 'bg-emerald-500' : 'bg-gray-700'}\`}>
            <span className={\`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform \${yearly ? 'translate-x-5' : 'translate-x-0.5'}\`} />
          </button>
          <span className={\`text-sm \${yearly ? 'text-gray-100' : 'text-gray-500'}\`}>Yearly <span className="text-emerald-400">-20%</span></span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map(p => (
          <div key={p.name} className={\`rounded-2xl border p-6 flex flex-col \${p.highlight ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-gray-900 border-gray-800'}\`}>
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-1">{p.name}</div>
              <div className="text-3xl font-bold text-gray-100">{yearly ? p.price.yearly : p.price.monthly}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
              <div className="text-xs text-gray-500 mt-1">{p.desc}</div>
            </div>
            <ul className="space-y-2 flex-1 mb-6">
              {p.features.map(f => <li key={f} className="text-sm text-gray-400 flex gap-2"><span className="text-emerald-400">✓</span>{f}</li>)}
            </ul>
            <button className={\`w-full py-2.5 rounded-xl text-sm font-bold transition-colors \${p.highlight ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'border border-gray-700 text-gray-300 hover:bg-gray-800'}\`}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}`,
  },
];

// ─── STARTER ──────────────────────────────────────────────────────────────────
const STARTER = TEMPLATES[0].code;

function flattenFiles(tree: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}/${key}` : key;
    if ((value as any).file) result[path] = (value as any).file.contents;
    else if ((value as any).directory) Object.assign(result, flattenFiles((value as any).directory, path));
  }
  return result;
}

async function generateProject(prompt: string): Promise<Record<string, string>> {
  const systemPrompt = [
    "You are an elite UI engineer for Archaeopteris LLC.",
    "Generate a React project as JSON. Response must be ONLY valid JSON, no markdown, no backticks.",
    'Schema: { "name": string, "files": { "src/App.jsx": string, ... } }',
    "Rules:",
    "- All files under src/",
    "- App.jsx must export default function App()",
    "- Use Tailwind classes for styling",
    "- Import from 'react' and '@radix-ui/themes' only",
    "- NO inline styles unless necessary, NO <style> tags",
    "- Each file is a complete valid JS/JSX module, max 5 files",
    "- Import shadcn from '@/components/ui/button', '@/components/ui/card', '@/components/ui/badge', '@/components/ui/tabs', '@/components/ui/dialog', '@/components/ui/select', '@/components/ui/switch', '@/components/ui/avatar', '@/components/ui/progress', '@/components/ui/table', '@/components/ui/tooltip', '@/components/ui/dropdown-menu', '@/components/ui/toast'",
    "- Prefer shadcn components over raw HTML",
    "CRITICAL: Only generate files inside src/. DO NOT generate: package.json, vite.config.js, postcss.config.js, tailwind.config.js, index.html, .npmrc",
  ].join('\n');

  const res = await fetch("/api/page-generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: `${systemPrompt}\n\nGenerate project: ${prompt}` }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  const raw = data.code as string;
  const clean = raw.replace(/^```json\n?/m, '').replace(/\n?```\s*$/m, '').trim();
  const parsed = JSON.parse(clean);
  return flattenFiles(parsed.files) as Record<string, string>;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ArchaeopterisBuilder() {
  const [activeTab, setActiveTab]   = useState<Tab>("Preview");
  const [prompt, setPrompt]         = useState("");
  const [generating, setGenerating] = useState(false);
  const [logs, setLogs]             = useState<string[]>(["WebContainer ready ✓", "Claude API connected ✓"]);
  const [files, setFiles]           = useState<Record<string, string>>({ 'src/App.jsx': STARTER });
  const [activeFile, setActiveFile] = useState('src/App.jsx');

  // Feature 2: prompt category
  const [activeCategory, setActiveCategory] = useState(0);

  // Feature 3: template panel
  const [showTemplates, setShowTemplates] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const wcRef      = useRef<WebContainerHandle>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [isPortrait, setIsPortrait]   = useState(
    typeof window !== 'undefined' ? isMobile && window.innerHeight > window.innerWidth : false
  );
  useEffect(() => {
    const h = () => { const m = window.innerWidth < 768; setIsPortrait(m && window.innerHeight > window.innerWidth); };
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const addLog = (msg: string) => setLogs(p => [...p.slice(-99), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  const handleGenerate = async () => {
    if (!prompt.trim() || generating) return;
    const cur = prompt;
    setGenerating(true);
    setPrompt("");
    setActiveTab("Code");
    addLog(`Generating: "${cur}"`);
    try {
      const rawFiles = await generateProject(cur);
      addLog("Generation complete ✓");
      setFiles(rawFiles);
      const appFile = Object.keys(rawFiles).find(k => k.includes('App.jsx')) || Object.keys(rawFiles)[0];
      setActiveFile(appFile);
      await wcRef.current?.mountFiles(rawFiles);
      setTimeout(() => setActiveTab("Preview"), 150);
    } catch (e: unknown) {
      addLog(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleLoadTemplate = async (tpl: typeof TEMPLATES[0]) => {
    const newFiles = { 'src/App.jsx': tpl.code };
    setFiles(newFiles);
    setActiveFile('src/App.jsx');
    setShowTemplates(false);
    addLog(`Template loaded: ${tpl.label}`);
    await wcRef.current?.mountFiles(newFiles);
    setActiveTab("Preview");
  };

  const btnBase: React.CSSProperties = {
    display: "block", width: "100%", padding: "7px 10px", marginBottom: 4,
    background: "transparent", border: "1px solid #1a2535", borderRadius: 6,
    color: "#5a7090", fontSize: 11, cursor: "pointer", textAlign: "left", fontFamily: "inherit",
  };

  // ── wcFiles (unchanged from original) ──
  const wcFiles = {
    'package.json': { file: { contents: JSON.stringify({
      name: "archaeopteris-builder", type: "module",
      scripts: { dev: "vite --port 3000" },
      dependencies: { "react": "^18", "react-dom": "^18", "lucide-react": "latest", "clsx": "latest", "tailwind-merge": "latest", "@radix-ui/themes": "3.1.6" },
      devDependencies: { "vite": "6.3.5", "@vitejs/plugin-react": "4.5.2", "tailwindcss": "3.4.1", "autoprefixer": "10.4.17", "postcss": "8.4.35" },
    }) } },
    '.npmrc': { file: { contents: 'registry=http://registry.npmjs.org/' } },
    'index.html': { file: { contents: `<!DOCTYPE html><html><head><meta charset="utf-8"/></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>` } },
    'src': { directory: {
      'components': { directory: { 'ui': { directory: {
        'button.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","const variants = { default: 'bg-emerald-500 text-black hover:bg-emerald-400', destructive: 'bg-red-500 text-white hover:bg-red-400', outline: 'border border-gray-700 hover:bg-gray-800 text-gray-100', secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700', ghost: 'hover:bg-gray-800 text-gray-100', link: 'text-emerald-400 underline-offset-4 hover:underline' }","const sizes = { default: 'h-9 px-4 py-2', sm: 'h-7 px-3 text-xs', lg: 'h-11 px-8', icon: 'h-9 w-9' }","export function Button({ className, variant='default', size='default', ...props }) { return <button className={cn('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50', variants[variant], sizes[size], className)} {...props} /> }"].join('\n') } },
        'card.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function Card({ className, ...props }) { return <div className={cn('rounded-xl border border-gray-800 bg-gray-900 text-gray-100', className)} {...props} /> }","export function CardHeader({ className, ...props }) { return <div className={cn('flex flex-col space-y-1.5 p-4', className)} {...props} /> }","export function CardTitle({ className, ...props }) { return <h3 className={cn('font-semibold leading-none tracking-tight', className)} {...props} /> }","export function CardContent({ className, ...props }) { return <div className={cn('p-4 pt-0', className)} {...props} /> }","export function CardFooter({ className, ...props }) { return <div className={cn('flex items-center p-4 pt-0', className)} {...props} /> }"].join('\n') } },
        'badge.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","const variants = { default: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30', secondary: 'bg-gray-800 text-gray-400 border border-gray-700', destructive: 'bg-red-500/20 text-red-400 border border-red-500/30', outline: 'border border-gray-700 text-gray-300', high: 'bg-red-500/20 text-red-400 border border-red-500/30', medium: 'bg-amber-500/20 text-amber-400 border border-amber-500/30', low: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' }","export function Badge({ className, variant='default', ...props }) { return <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', variants[variant] || variants.default, className)} {...props} /> }"].join('\n') } },
        'input.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function Input({ className, ...props }) { return <input className={cn('flex h-9 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500', className)} {...props} /> }"].join('\n') } },
        'select.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function Select({ className, children, ...props }) { return <select className={cn('flex h-9 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500', className)} {...props}>{children}</select> }","export function SelectItem({ value, children }) { return <option value={value}>{children}</option> }"].join('\n') } },
        'switch.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function Switch({ checked, onCheckedChange, className }) { return (<button role='switch' aria-checked={checked} onClick={() => onCheckedChange?.(!checked)} className={cn('relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors', checked ? 'bg-emerald-500' : 'bg-gray-700', className)}><span className={cn('pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform', checked ? 'translate-x-4' : 'translate-x-0')} /></button>) }"].join('\n') } },
        'progress.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function Progress({ value = 0, className }) { return (<div className={cn('relative h-2 w-full overflow-hidden rounded-full bg-gray-800', className)}><div className='h-full bg-emerald-500 transition-all duration-300' style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>) }"].join('\n') } },
        'table.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function Table({ className, ...props }) { return <div className='w-full overflow-auto'><table className={cn('w-full caption-bottom text-sm', className)} {...props} /></div> }","export function TableHeader({ className, ...props }) { return <thead className={cn('[&_tr]:border-b [&_tr]:border-gray-800', className)} {...props} /> }","export function TableBody({ className, ...props }) { return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} /> }","export function TableRow({ className, ...props }) { return <tr className={cn('border-b border-gray-800 transition-colors hover:bg-gray-800/50', className)} {...props} /> }","export function TableHead({ className, ...props }) { return <th className={cn('h-10 px-4 text-left align-middle text-xs font-medium text-gray-500 uppercase tracking-wider', className)} {...props} /> }","export function TableCell({ className, ...props }) { return <td className={cn('px-4 py-3 align-middle text-sm text-gray-300', className)} {...props} /> }"].join('\n') } },
        'dialog.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function Dialog({ open, onOpenChange, children }) { if (!open) return null; return (<div className='fixed inset-0 z-50 flex items-center justify-center'><div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={() => onOpenChange?.(false)} /><div className='relative z-10'>{children}</div></div>) }","export function DialogContent({ className, children }) { return <div className={cn('bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md', className)}>{children}</div> }","export function DialogHeader({ className, ...props }) { return <div className={cn('flex flex-col space-y-1.5 mb-4', className)} {...props} /> }","export function DialogTitle({ className, ...props }) { return <h2 className={cn('text-lg font-semibold text-gray-100', className)} {...props} /> }","export function DialogFooter({ className, ...props }) { return <div className={cn('flex justify-end gap-2 mt-4', className)} {...props} /> }"].join('\n') } },
        'tooltip.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","import { useState } from 'react'","const cn = (...c) => twMerge(clsx(c))","export function Tooltip({ children, content, className }) { const [show, setShow] = useState(false); return (<div className='relative inline-flex' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>{children}{show && <div className={cn('absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-700 text-gray-100 whitespace-nowrap z-50 shadow-lg', className)}>{content}</div>}</div>) }"].join('\n') } },
        'avatar.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function Avatar({ className, ...props }) { return <span className={cn('relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full', className)} {...props} /> }","export function AvatarImage({ src, alt, className }) { return <img src={src} alt={alt} className={cn('aspect-square h-full w-full object-cover', className)} /> }","export function AvatarFallback({ className, ...props }) { return <span className={cn('flex h-full w-full items-center justify-center rounded-full bg-gray-800 text-xs font-medium text-gray-300', className)} {...props} /> }"].join('\n') } },
        'tabs.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","import { useState } from 'react'","const cn = (...c) => twMerge(clsx(c))","export function Tabs({ defaultValue, children, className }) { const [active, setActive] = useState(defaultValue); return <div className={cn('w-full', className)} data-tabs>{children}</div> }","export function TabsList({ children, className }) { return <div className={cn('inline-flex h-9 items-center justify-center rounded-lg bg-gray-800/50 p-1 gap-1', className)}>{children}</div> }","export function TabsTrigger({ value, children, className, onClick }) { return <button onClick={onClick} className={cn('inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium transition-colors text-gray-400 hover:text-gray-100', className)}>{children}</button> }","export function TabsContent({ value, children, className }) { return <div className={cn('mt-2', className)}>{children}</div> }"].join('\n') } },
        'separator.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function Separator({ className, orientation='horizontal', ...props }) { return <div className={cn('shrink-0 bg-gray-800', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)} {...props} /> }"].join('\n') } },
        'scroll-area.jsx': { file: { contents: ["import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function ScrollArea({ className, children, ...props }) { return <div className={cn('overflow-auto', className)} {...props}>{children}</div> }"].join('\n') } },
        'toast.jsx': { file: { contents: ["import { useState, useEffect } from 'react'","let toastFn = null","export function toast(msg, opts = {}) { toastFn?.({ msg, ...opts }) }","export function Toaster() { const [toasts, setToasts] = useState([]); useEffect(() => { toastFn = (t) => { const id = Date.now(); setToasts(p => [...p, { id, ...t }]); setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), t.duration || 3000) }; return () => { toastFn = null } }, []); return (<div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>{toasts.map(t => (<div key={t.id} className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${t.variant === 'destructive' ? 'bg-red-900 text-red-100 border border-red-700' : 'bg-gray-800 text-gray-100 border border-gray-700'}`}>{t.msg}</div>))}</div>) }"].join('\n') } },
        'dropdown-menu.jsx': { file: { contents: ["import { useState, useRef, useEffect } from 'react'","import { clsx } from 'clsx'","import { twMerge } from 'tailwind-merge'","const cn = (...c) => twMerge(clsx(c))","export function DropdownMenu({ children }) { const [open, setOpen] = useState(false); const ref = useRef(null); useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h) }, []); return <div ref={ref} className='relative inline-block'>{typeof children === 'function' ? children({ open, setOpen }) : children}</div> }","export function DropdownMenuTrigger({ children, onClick }) { return <div onClick={onClick}>{children}</div> }","export function DropdownMenuContent({ children, open, className }) { if (!open) return null; return <div className={cn('absolute right-0 mt-1 min-w-40 z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-1', className)}>{children}</div> }","export function DropdownMenuItem({ className, ...props }) { return <div className={cn('px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-gray-100 cursor-pointer transition-colors', className)} {...props} /> }","export function DropdownMenuSeparator() { return <div className='my-1 h-px bg-gray-800' /> }"].join('\n') } },
      } } } },
      'lib': { directory: { 'utils.js': { file: { contents: "import { clsx } from 'clsx'\nimport { twMerge } from 'tailwind-merge'\nexport function cn(...inputs) { return twMerge(clsx(inputs)) }" } } } },
      'main.jsx': { file: { contents: ["import React from 'react'","import ReactDOM from 'react-dom/client'","import '@radix-ui/themes/styles.css'","import './index.css'","import { Theme } from '@radix-ui/themes'","import App from './App'","ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Theme, { appearance: 'dark', accentColor: 'green', radius: 'medium' }, React.createElement(App)))"].join('\n') } },
      'App.jsx': { file: { contents: STARTER } },
      'index.css': { file: { contents: "@tailwind base;\n@tailwind components;\n@tailwind utilities;\nhtml, body, #root { background: #080c10; min-height: 100vh; margin: 0; }" } },
    } },
    'vite.config.js': { file: { contents: "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nexport default defineConfig({ plugins: [react()] })" } },
    'postcss.config.js': { file: { contents: "export default { plugins: { tailwindcss: {}, autoprefixer: {} } }" } },
    'tailwind.config.js': { file: { contents: "export default { content: ['./src/**/*.{js,jsx}', './index.html'], theme: { extend: {} }, plugins: [] }" } },
  };

  return (
    <div style={{ fontFamily: "monospace", background: "#080c10", color: "#e2e8f0", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── HEADER ── */}
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: "1px solid #1a2535", background: "#0d1420", flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#10b981,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#000" }}>A</div>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#10b981", letterSpacing: "0.05em" }}>ARCHAEOPTERIS BUILDER</span>
        <div style={{ flex: 1 }} />
        {isMobile && (
          <button onClick={() => setDrawerOpen(true)} style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: 18, cursor: 'pointer', padding: '4px 8px' }}>☰</button>
        )}
        <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "#10b98115", border: "1px solid #10b98140", color: "#10b981" }}>BETA</span>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden", flexDirection: isPortrait ? "column" : "row" }}>

        {isMobile && drawerOpen && <div onClick={() => setDrawerOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }} />}

        {/* ── LEFT PANEL ── */}
        <div style={{
          position: isMobile ? 'fixed' : 'relative',
          left: isMobile ? (drawerOpen ? 0 : -300) : 'auto',
          top: isMobile ? 0 : 'auto',
          height: isMobile ? '100vh' : '100%',
          zIndex: isMobile ? 50 : 'auto',
          transition: 'left 0.3s ease',
          width: isMobile ? 280 : isPortrait ? "100%" : 280,
          maxHeight: isMobile ? "100vh" : isPortrait ? "45vh" : "100%",
          overflow: "auto",
          borderRight: isPortrait ? "none" : "1px solid #1a2535",
          borderBottom: isPortrait ? "1px solid #1a2535" : "none",
          display: "flex", flexDirection: "column", background: "#0a0f1a", flexShrink: 0,
        }}>

          {/* Prompt */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535", flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>✦ DESCRIBE YOUR PROJECT</div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
              placeholder="e.g. XAUUSD trading dashboard..."
              style={{ width: "100%", height: 80, background: "#0d1420", border: "1px solid #1e3050", borderRadius: 8, color: "#c8d8e8", fontSize: 12, padding: "10px 12px", resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.6, boxSizing: "border-box" }}
            />
            <button onClick={handleGenerate} disabled={generating || !prompt.trim()}
              style={{ width: "100%", marginTop: 8, padding: "10px 0", borderRadius: 8, border: "none", background: generating ? "#1a3020" : "linear-gradient(135deg,#10b981,#059669)", color: generating ? "#4a8060" : "#000", fontWeight: 700, fontSize: 12, cursor: generating ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {generating ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>◌</span> Generating...</> : <>✦ Generate <span style={{ opacity: 0.5, fontSize: 10 }}>⌘↵</span></>}
            </button>
          </div>

          {/* ── FEATURE 2: Project-level quick prompts ── */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535", flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>QUICK PROMPTS</div>
            {/* Category tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
              {PROMPT_CATEGORIES.map((cat, i) => (
                <button key={i} onClick={() => setActiveCategory(i)}
                  style={{ padding: "3px 8px", borderRadius: 4, border: `1px solid ${activeCategory === i ? '#10b98140' : '#1a2535'}`, background: activeCategory === i ? "#10b98115" : "transparent", color: activeCategory === i ? "#10b981" : "#4a6080", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
            {/* Prompts for active category */}
            {PROMPT_CATEGORIES[activeCategory].prompts.map((q) => (
              <button key={q} onClick={() => setPrompt(q)}
                style={{ ...btnBase, color: prompt === q ? "#10b981" : "#5a7090", border: `1px solid ${prompt === q ? "#10b98140" : "#1a2535"}`, background: prompt === q ? "#10b98115" : "transparent" }}>
                {q}
              </button>
            ))}
          </div>

          {/* ── FEATURE 3: Template library ── */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em" }}>TEMPLATES</div>
              <button onClick={() => setShowTemplates(p => !p)}
                style={{ fontSize: 9, color: "#10b981", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                {showTemplates ? "▲ hide" : "▼ show"}
              </button>
            </div>
            {showTemplates && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {TEMPLATES.map((tpl) => (
                  <button key={tpl.id} onClick={() => handleLoadTemplate(tpl)}
                    style={{ padding: "8px", background: "#060a12", border: "1px solid #1a2535", borderRadius: 8, cursor: "pointer", textAlign: "left", fontFamily: "inherit", transition: "border-color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#10b98140')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a2535')}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{tpl.icon}</div>
                    <div style={{ fontSize: 11, color: "#c8d8e8", fontWeight: 600 }}>{tpl.label}</div>
                    <div style={{ fontSize: 9, color: "#3a5060", marginTop: 2 }}>{tpl.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535", flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>ACTIONS</div>
            <button onClick={() => { navigator.clipboard?.writeText(files[activeFile] || ''); addLog("Copied ✓"); }} style={btnBase}>⎘ Copy file</button>
            <button onClick={async () => { await handleLoadTemplate(TEMPLATES[0]); addLog("Reset ✓"); }} style={btnBase}>↺ Reset</button>
          </div>

          {/* Logs */}
          <div style={{ flex: 1, overflow: "auto", padding: 14, minHeight: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>CONSOLE</div>
            {logs.map((log, i) => (
              <div key={i} style={{ fontSize: 10, lineHeight: 1.7, color: log.includes("Error") ? "#f87171" : log.includes("✓") ? "#10b981" : "#4a6080" }}>{log}</div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Tab bar */}
          <div style={{ display: "flex", borderBottom: "1px solid #1a2535", background: "#0a0f1a", flexShrink: 0 }}>
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "10px 20px", background: "transparent", border: "none", borderBottom: activeTab === tab ? "2px solid #10b981" : "2px solid transparent", color: activeTab === tab ? "#10b981" : "#4a6080", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                {tab}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            {activeTab === "Code" && (
              <button onClick={async () => {
                if (Object.keys(files).length > 1) { await wcRef.current?.mountFiles(files); }
                else { wcRef.current?.restartDev(files['src/App.jsx'] || ''); }
              }} style={{ padding: "10px 16px", background: "transparent", border: "none", color: "#10b981", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                ▶ Run
              </button>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>
            {/* Preview */}
            <div style={{ position: "absolute", inset: 0, display: activeTab === "Preview" ? "flex" : "none", flexDirection: "column", overflow: "hidden" }}>
              {generating && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#10b981,transparent)", animation: "slide 1.5s linear infinite", zIndex: 10 }} />}
              <WebContainer ref={wcRef} files={wcFiles} startCommand={['npm', 'install']} style={{ flex: 1, minHeight: 0 }} />
            </div>

            {/* Code editor */}
            {activeTab === "Code" && (
              <div style={{ position: "absolute", inset: 0, display: "flex" }}>
                <div style={{ width: 160, background: "#040810", borderRight: "1px solid #1a2535", overflowY: "auto", flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: "#2a4060", padding: "8px 12px", letterSpacing: "0.1em" }}>FILES</div>
                  {Object.keys(files).map(path => (
                    <div key={path} onClick={() => setActiveFile(path)}
                      style={{ padding: "6px 12px", fontSize: 11, cursor: "pointer", color: activeFile === path ? "#10b981" : "#4a6080", background: activeFile === path ? "#10b98115" : "transparent", borderLeft: activeFile === path ? "2px solid #10b981" : "2px solid transparent", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {path.split('/').pop()}
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, display: "flex", overflow: "auto" }}>
                  <div style={{ minWidth: 40, paddingTop: 16, paddingRight: 10, textAlign: "right", color: "#2a4060", fontSize: 12, lineHeight: "21px", userSelect: "none", borderRight: "1px solid #1a2535", background: "#080c10", flexShrink: 0 }}>
                    {(files[activeFile] || " ").split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
                  </div>
                  <textarea value={files[activeFile] || ""} onChange={(e) => setFiles(prev => ({ ...prev, [activeFile]: e.target.value }))} readOnly={generating} spellCheck={false}
                    style={{ flex: 1, background: "#080c10", border: "none", color: generating ? "#4a8060" : "#a8c8e8", fontSize: 12, lineHeight: "21px", padding: "16px", fontFamily: "monospace", resize: "none", outline: "none", whiteSpace: "pre", overflowWrap: "normal", minHeight: "100%" }} />
                </div>
              </div>
            )}

            {/* Console */}
            {activeTab === "Console" && (
              <div style={{ position: "absolute", inset: 0, overflow: "auto", padding: 20, fontFamily: "monospace", fontSize: 12, lineHeight: 1.8 }}>
                {logs.map((log, i) => (
                  <div key={i} style={{ color: log.includes("Error") ? "#f87171" : log.includes("✓") ? "#10b981" : "#4a7090" }}>
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
        button:hover:not(:disabled) { opacity: 0.85 }
      `}</style>
    </div>
  );
}
