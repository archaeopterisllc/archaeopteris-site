"use client";

import { useState, useRef, useEffect } from "react";
import E2BContainer, { E2BContainerHandle } from "@/components/e2b-container";

type Tab = "Preview" | "Code" | "Console";
type Stack = "react" | "nextjs" | "express" | "hono";

const TABS: Tab[] = ["Preview", "Code", "Console"];

const STACKS: { id: Stack; label: string; desc: string; color: string }[] = [
  { id: "react",   label: "React",        desc: "Vite + Tailwind",         color: "#61dafb" },
  { id: "nextjs",  label: "Next.js",      desc: "Fullstack + API routes",  color: "#ffffff" },
  { id: "express", label: "Express",      desc: "Node API + React",        color: "#68d391" },
  { id: "hono",    label: "Hono",         desc: "Edge API + React",        color: "#f6ad55" },
];

const QUICK_PROMPTS: { label: string; prompt: string; stack: Stack }[] = [
  { label: "SaaS Dashboard",        prompt: "SaaS analytics dashboard with sidebar nav, KPI cards, charts, user table and dark theme", stack: "react" },
  { label: "E-commerce Storefront", prompt: "Modern e-commerce product listing with filters, cart, product cards and checkout flow",    stack: "react" },
  { label: "AI Chat Interface",     prompt: "AI chatbot interface with message history, streaming indicator, dark luxury theme",         stack: "react" },
  { label: "Landing Page",          prompt: "Startup landing page dark luxury with hero, features, pricing and CTA sections",            stack: "react" },
  { label: "REST API + Admin",      prompt: "Express REST API with /users /products /orders endpoints + React admin dashboard",         stack: "express" },
  { label: "Next.js Blog",          prompt: "Next.js blog with SSR, article list, detail page, dark mode and MDX support",              stack: "nextjs" },
  { label: "EA Performance Stats",  prompt: "Forex EA performance dashboard: equity curve, drawdown, win rate, trade history table",    stack: "react" },
  { label: "XAUUSD Trading View",   prompt: "XAUUSD trading dashboard with live ticker, order book, news feed, dark fintech theme",     stack: "react" },
];

const STACK_SYSTEM_PROMPTS: Record<Stack, string> = {
  react: `You are an elite UI engineer for Archaeopteris LLC.
Generate a React + Vite project as JSON. Response must be ONLY valid JSON, no markdown, no backticks.
Schema: { "name": string, "stack": "react", "files": { "src/App.jsx": string, ... } }
Rules:
- All source files under src/
- App.jsx must export default function App()
- Use Tailwind classes for styling
- Import shadcn components from '@/components/ui/button', '@/components/ui/card', '@/components/ui/badge', '@/components/ui/tabs', '@/components/ui/input', '@/components/ui/select', '@/components/ui/switch', '@/components/ui/avatar', '@/components/ui/progress', '@/components/ui/table', '@/components/ui/tooltip', '@/components/ui/dialog', '@/components/ui/toast', '@/components/ui/dropdown-menu', '@/components/ui/scroll-area', '@/components/ui/separator'
- Prefer shadcn components over raw HTML
- Max 8 files total
- NO package.json, vite.config.js, postcss.config.js, tailwind.config.js, index.html (already set up)
- Each file is a complete valid JS/JSX module`,

  nextjs: `You are an elite fullstack engineer for Archaeopteris LLC.
Generate a Next.js 14 App Router project as JSON. Response must be ONLY valid JSON, no markdown, no backticks.
Schema: { "name": string, "stack": "nextjs", "files": { "app/page.tsx": string, "app/api/...": string, ... } }
Rules:
- Use App Router (app/ directory)
- Tailwind for styling, shadcn/ui components
- API routes under app/api/
- Server components by default, 'use client' only when needed
- Max 10 files
- NO next.config.js, package.json, tailwind.config.js (already set up)`,

  express: `You are an elite fullstack engineer for Archaeopteris LLC.
Generate an Express + React project as JSON. Response must be ONLY valid JSON, no markdown, no backticks.
Schema: { "name": string, "stack": "express", "files": { "server/index.js": string, "src/App.jsx": string, ... } }
Rules:
- Backend under server/ (Express, Node.js)
- Frontend under src/ (React + Tailwind)
- server/index.js is the entry point, runs on port 4000
- CORS enabled, JSON middleware included
- Frontend fetches from /api/* (proxied via vite)
- Max 10 files
- NO package.json (already set up)`,

  hono: `You are an elite fullstack engineer for Archaeopteris LLC.
Generate a Hono + React project as JSON. Response must be ONLY valid JSON, no markdown, no backticks.
Schema: { "name": string, "stack": "hono", "files": { "server/index.js": string, "src/App.jsx": string, ... } }
Rules:
- Backend under server/ using Hono (runs on port 4000)
- Frontend under src/ (React + Tailwind)
- Hono routes under /api/*
- CORS enabled via hono/cors
- Max 10 files
- NO package.json (already set up)`,
};

function flattenFiles(tree: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}/${key}` : key;
    if ((value as any).file) {
      result[path] = (value as any).file.contents;
    } else if ((value as any).directory) {
      Object.assign(result, flattenFiles((value as any).directory, path));
    } else if (typeof value === 'string') {
      result[path] = value;
    }
  }
  return result;
}

async function generateProject(prompt: string, stack: Stack): Promise<Record<string, string>> {
  const systemPrompt = STACK_SYSTEM_PROMPTS[stack];

  const res = await fetch("/api/page-generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: `${systemPrompt}\n\nGenerate project: ${prompt}`,
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);

  const raw = data.code as string;
  const clean = raw.replace(/^```json\n?/m, '').replace(/\n?```\s*$/m, '').trim();
  const parsed = JSON.parse(clean);

  // Support both flat files object and FileSystemTree format
  if (parsed.files && typeof Object.values(parsed.files)[0] === 'string') {
    return parsed.files as Record<string, string>;
  }
  return flattenFiles(parsed.files);
}

export default function ArchaeopterisBuilderE2B() {
  const [activeTab, setActiveTab] = useState<Tab>("Preview");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [selectedStack, setSelectedStack] = useState<Stack>("react");
  const [logs, setLogs] = useState<string[]>(["E2B ready ✓", "Claude API connected ✓"]);
  //const [files, setFiles] = useState<Record<string, string>>({});
  //const [files, setFiles] = useState({ 'src/App.jsx': STARTER })
  const [files, setFiles] = useState<Record<string, string>>({ 'src/App.jsx': '' })


  //const [activeFile, setActiveFile] = useState<string>("");
  const [activeFile, setActiveFile] = useState('src/App.jsx')

  const [showTemplates, setShowTemplates] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const e2bRef = useRef<E2BContainerHandle>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isPortrait, setIsPortrait] = useState(
    typeof window !== 'undefined' ? isMobile && window.innerHeight > window.innerWidth : false
  );

  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < 768;
      setIsPortrait(mobile && window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (msg: string) =>
    setLogs(p => [...p.slice(-99), `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const handleGenerate = async (overridePrompt?: string, overrideStack?: Stack) => {
    const p = overridePrompt ?? prompt;
    const s = overrideStack ?? selectedStack;
    if (!p.trim() || generating) return;

    setGenerating(true);
    setPrompt("");
    setActiveTab("Code");
    setShowTemplates(false);
    addLog(`Generating [${s}]: "${p}"`);

    try {
      const generated = await generateProject(p, s);
      //const generated = await generateProject(p, s)
const flatted = flattenFiles(generated) // ← thêm dòng này
setFiles(flatted)
console.log('flatted keys:', JSON.stringify(Object.keys(flatted)))

//console.log('files state:', JSON.stringify(Object.keys(files)))
//await e2bRef.current?.mountFiles(files)

await e2bRef.current?.mountFiles(flatted) // ← dùng flatted

      addLog(`Generated ${Object.keys(generated).length} files ✓`);
      //setFiles(generated);
      const firstFile = Object.keys(generated)[0] ?? "";
      setActiveFile(firstFile);
      //await e2bRef.current?.mountFiles(generated);
      setTimeout(() => setActiveTab("Preview"), 200);
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
          fontWeight: 700, color: "#000", fontSize: 14,
        }}>A</div>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#10b981", letterSpacing: "0.05em" }}>
          ARCHAEOPTERIS BUILDER
        </span>
        <div style={{ flex: 1 }} />
        {isMobile && (
          <button onClick={() => setDrawerOpen(true)} style={{
            background: 'transparent', border: 'none',
            color: '#10b981', fontSize: 18, cursor: 'pointer', padding: '4px 8px',
          }}>☰</button>
        )}
        <span style={{
          fontSize: 10, padding: "3px 8px", borderRadius: 4,
          background: "#10b98115", border: "1px solid #10b98140", color: "#10b981",
        }}>BETA</span>
      </header>

      <div style={{
        display: "flex", flex: 1, minHeight: 0, overflow: "hidden",
        flexDirection: isPortrait ? "column" : "row",
      }}>

        {/* Overlay mobile */}
        {isMobile && drawerOpen && (
          <div onClick={() => setDrawerOpen(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40,
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
          width: isMobile ? 280 : isPortrait ? "100%" : 280,
          maxHeight: isMobile ? "100vh" : isPortrait ? "45vh" : "100%",
          overflow: "auto",
          borderRight: isMobile ? "none" : isPortrait ? "none" : "1px solid #1a2535",
          borderBottom: isPortrait ? "1px solid #1a2535" : "none",
          display: "flex", flexDirection: "column",
          background: "#0a0f1a", flexShrink: 0,
        }}>

          {/* Prompt */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535", flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>
              ✦ DESCRIBE YOUR PROJECT
            </div>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
              placeholder="e.g. SaaS dashboard with auth, analytics..."
              style={{
                width: "100%", height: 90, background: "#0d1420",
                border: "1px solid #1e3050", borderRadius: 8,
                color: "#c8d8e8", fontSize: 12, padding: "10px 12px",
                resize: "none", outline: "none", fontFamily: "inherit",
                lineHeight: 1.6, boxSizing: "border-box",
              }}
            />

            {/* Stack selector */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, margin: "8px 0" }}>
              {STACKS.map(s => (
                <button key={s.id} onClick={() => setSelectedStack(s.id)} style={{
                  padding: "6px 8px", borderRadius: 6, border: "1px solid",
                  borderColor: selectedStack === s.id ? s.color + "60" : "#1a2535",
                  background: selectedStack === s.id ? s.color + "15" : "transparent",
                  color: selectedStack === s.id ? s.color : "#4a6080",
                  fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                  textAlign: "left",
                }}>
                  <div style={{ fontWeight: 700 }}>{s.label}</div>
                  <div style={{ opacity: 0.6, fontSize: 9 }}>{s.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={generating || !prompt.trim()}
              style={{
                width: "100%", marginTop: 4, padding: "10px 0", borderRadius: 8,
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
            <div style={{
              fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span>QUICK PROMPTS</span>
              <button
                onClick={() => setShowTemplates(v => !v)}
                style={{
                  background: showTemplates ? "#10b98115" : "transparent",
                  border: "1px solid " + (showTemplates ? "#10b98140" : "#1a2535"),
                  borderRadius: 4, color: showTemplates ? "#10b981" : "#4a6080",
                  fontSize: 9, padding: "2px 6px", cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {showTemplates ? "✕ Close" : "⊞ Templates"}
              </button>
            </div>

            {!showTemplates ? (
              QUICK_PROMPTS.filter(q => q.stack === selectedStack || q.stack === "react").slice(0, 5).map(q => (
                <button key={q.label} onClick={() => {
                  setSelectedStack(q.stack);
                  handleGenerate(q.prompt, q.stack);
                }} style={{
                  ...btnBase,
                  color: "#5a7090",
                }}>
                  <span style={{ opacity: 0.5, fontSize: 9, marginRight: 6 }}>
                    {STACKS.find(s => s.id === q.stack)?.label}
                  </span>
                  {q.label}
                </button>
              ))
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {QUICK_PROMPTS.map(q => (
                  <button key={q.label} onClick={() => {
                    setSelectedStack(q.stack);
                    handleGenerate(q.prompt, q.stack);
                  }} style={{
                    ...btnBase,
                    marginBottom: 0,
                    borderColor: STACKS.find(s => s.id === q.stack)?.color + "30",
                  }}>
                    <span style={{
                      color: STACKS.find(s => s.id === q.stack)?.color,
                      fontSize: 9, marginRight: 6,
                    }}>
                      {STACKS.find(s => s.id === q.stack)?.label}
                    </span>
                    {q.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535", flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>ACTIONS</div>
            <button onClick={() => {
              const content = files[activeFile] ?? "";
              navigator.clipboard?.writeText(content);
              addLog("Copied ✓");
            }} style={btnBase}>⎘ Copy File</button>
            <button onClick={() => {
              // Export ZIP via API
              addLog("Export ZIP coming soon...");
            }} style={btnBase}>↓ Export ZIP</button>
          </div>

          {/* Console */}
          <div style={{ flex: 1, overflow: "auto", padding: 14, minHeight: 0 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>CONSOLE</div>
            {logs.map((log, i) => (
              <div key={i} style={{
                fontSize: 10, lineHeight: 1.7,
                color: log.includes("Error") ? "#f87171"
                  : log.includes("✓") ? "#10b981"
                  : "#4a6080",
              }}>{log}</div>
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
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "10px 20px", background: "transparent", border: "none",
                borderBottom: activeTab === tab ? "2px solid #10b981" : "2px solid transparent",
                color: activeTab === tab ? "#10b981" : "#4a6080",
                fontSize: 11, cursor: "pointer", fontFamily: "inherit",
              }}>{tab}</button>
            ))}
            <div style={{ flex: 1 }} />

            {/* Stack badge */}
            <div style={{
              display: "flex", alignItems: "center", padding: "0 12px",
              fontSize: 10, color: STACKS.find(s => s.id === selectedStack)?.color ?? "#10b981",
              opacity: 0.7,
            }}>
              {STACKS.find(s => s.id === selectedStack)?.label}
            </div>

            {activeTab === "Code" && Object.keys(files).length > 0 && (
              <button
                onClick={() => e2bRef.current?.mountFiles(files)}
                style={{
                  padding: "10px 16px", background: "transparent", border: "none",
                  color: "#10b981", fontSize: 11, cursor: "pointer", fontFamily: "inherit",
                }}
              >▶ Run</button>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>

            {/* Preview */}
            <div style={{
              position: "absolute", inset: 0,
              display: activeTab === "Preview" ? "flex" : "none",
              flexDirection: "column", overflow: "hidden",
            }}>
              {generating && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg,transparent,#10b981,transparent)",
                  animation: "slide 1.5s linear infinite", zIndex: 10,
                }} />
              )}
              <E2BContainer ref={e2bRef} style={{ flex: 1, minHeight: 0 }} />
            </div>

            {/* Code editor */}
            {activeTab === "Code" && (
              <div style={{ position: "absolute", inset: 0, display: "flex" }}>

                {/* File tree */}
                <div style={{
                  width: 160, background: "#040810",
                  borderRight: "1px solid #1a2535",
                  overflowY: "auto", flexShrink: 0,
                }}>
                  <div style={{ fontSize: 10, color: "#2a4060", padding: "8px 12px", letterSpacing: "0.1em" }}>FILES</div>
                  {Object.keys(files).length === 0 ? (
                    <div style={{ fontSize: 10, color: "#2a4060", padding: "8px 12px" }}>No files yet</div>
                  ) : Object.keys(files).map(path => (
                    <div key={path} onClick={() => setActiveFile(path)} style={{
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
                    value={files[activeFile] || "// Generate a project to see code"}
                    onChange={e => setFiles(prev => ({ ...prev, [activeFile]: e.target.value }))}
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
                      : log.includes("✓") ? "#10b981"
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