"use client";

import { useState, useRef, useEffect } from "react";
import WebContainer from "@/components/web-container";

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

async function generateCode(prompt: string, currentCode: string): Promise<string> {
  const fullPrompt = [
    "You are an elite UI engineer for Archaeopteris LLC — a fintech/trading technology company.",
    "Brand colors: emerald #10b981 (primary), blue #3b82f6 (accent), background #080c10 (near-black).",
    "",
    "VISUAL QUALITY REQUIREMENTS — every component must have:",
    "- Rich dark backgrounds using bg-gray-900, bg-gray-950, or inline style with #080c10/#0d1420",
    "- Gradient text: use style={{background:'linear-gradient(135deg,#10b981,#3b82f6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}",
    "- Glowing effects: box-shadow with emerald/blue rgba values via inline style",
    "- Animated elements: CSS keyframes via <style> tag inside JSX, or Tailwind animate-pulse/animate-bounce",
    "- Glass cards: bg-white/5 backdrop-blur border border-white/10",
    "- Hover transitions: transition-all duration-300",
    "- At least one gradient background section",
    "- Realistic mock data (not empty placeholders)",
    "",
    "STRICT OUTPUT RULES:",
    "- Output ONLY raw JSX. Zero markdown, zero backticks, zero explanation.",
    "- No import statements. React, useState, useEffect, useRef, useCallback are globals.",
    "- Use React.useState(), React.useEffect() etc.",
    "- React hooks: const { useState, useEffect, useRef } = React; at top of App function",

    "- Tailwind CSS + inline styles for effects Tailwind cannot do (gradients, glows, animations).",
    "- Define function App(), last line must be: render(<App />)",
    "- Self-contained, no props, no external deps.",
    "",
    currentCode && currentCode !== STARTER
      ? `Current code:\n${currentCode}\n\nModify/improve: ${prompt}`
      : `Generate a visually stunning component: ${prompt}`,
  ].join("\n");

  const res = await fetch("/api/page-generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: fullPrompt }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.code as string;
}


export default function ArchaeopterisBuilder() {
  const [code, setCode] = useState<string>(STARTER);
  const [previewKey, setPreviewKey] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<Tab>("Preview");
  const [prompt, setPrompt] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>(["WebContainer ready \u2713", "Claude API connected \u2713"]);

  const logsEndRef = useRef<HTMLDivElement>(null);

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
      const raw = await generateCode(currentPrompt, code);
      const clean = raw
        .replace(/^```(?:tsx?|jsx?|javascript)?\n?/m, "")
        .replace(/\n?```\s*$/m, "")
        .trim();
      setCode(clean);
      addLog("Generation complete \u2713");
      setTimeout(() => {
        setActiveTab("Preview");
        setPreviewKey((k) => k + 1);
      }, 150);
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
    <div style={{ fontFamily: "monospace", background: "#080c10", color: "#e2e8f0", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: "1px solid #1a2535", background: "#0d1420", flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#10b981,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#000" }}>A</div>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#10b981", letterSpacing: "0.05em" }}>ARCHAEOPTERIS BUILDER</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "#10b98115", border: "1px solid #10b98140", color: "#10b981" }}>BETA</span>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left panel */}
        <div style={{ width: 280, borderRight: "1px solid #1a2535", display: "flex", flexDirection: "column", background: "#0a0f1a", flexShrink: 0 }}>

          {/* Prompt */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535" }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>✦ DESCRIBE YOUR COMPONENT</div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
              placeholder="e.g. XAUUSD trading dashboard..."
              style={{ width: "100%", height: 90, background: "#0d1420", border: "1px solid #1e3050", borderRadius: 8, color: "#c8d8e8", fontSize: 12, padding: "10px 12px", resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.6, boxSizing: "border-box" }}
            />
            <button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              style={{ width: "100%", marginTop: 8, padding: "10px 0", borderRadius: 8, border: "none", background: generating ? "#1a3020" : "linear-gradient(135deg,#10b981,#059669)", color: generating ? "#4a8060" : "#000", fontWeight: 700, fontSize: 12, cursor: generating ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              {generating
                ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>◌</span> Generating...</>
                : <>✦ Generate <span style={{ opacity: 0.5, fontSize: 10 }}>⌘↵</span></>}
            </button>
          </div>

          {/* Quick prompts */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535" }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>QUICK PROMPTS</div>
            {["XAUUSD trading dashboard", "Hero section dark luxury", "Pricing table fintech", "EA performance stats", "Admin sidebar navigation"].map((q) => (
              <button key={q} onClick={() => setPrompt(q)}
                style={{ ...btnBase, color: prompt === q ? "#10b981" : "#5a7090", border: `1px solid ${prompt === q ? "#10b98140" : "#1a2535"}`, background: prompt === q ? "#10b98115" : "transparent" }}>
                {q}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535" }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>ACTIONS</div>
            <button onClick={() => { navigator.clipboard?.writeText(code); addLog("Copied \u2713"); }} style={btnBase}>⎘ Copy TSX</button>
            <button onClick={() => { setCode(STARTER); addLog("Reset \u2713"); setActiveTab("Preview"); setPreviewKey(k => k + 1); }} style={btnBase}>↺ Reset</button>
          </div>

          {/* Logs */}
          <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>CONSOLE</div>
            {logs.map((log, i) => (
              <div key={i} style={{ fontSize: 10, lineHeight: 1.7, color: log.includes("Error") ? "#f87171" : log.includes("\u2713") ? "#10b981" : "#4a6080" }}>{log}</div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Tab bar */}
          <div style={{ display: "flex", borderBottom: "1px solid #1a2535", background: "#0a0f1a", flexShrink: 0 }}>
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "10px 20px", background: "transparent", border: "none", borderBottom: activeTab === tab ? "2px solid #10b981" : "2px solid transparent", color: activeTab === tab ? "#10b981" : "#4a6080", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                {tab}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            {activeTab === "Preview" && (
              <button onClick={() => setPreviewKey(k => k + 1)} style={{ padding: "10px 16px", background: "transparent", border: "none", color: "#4a6080", fontSize: 14, cursor: "pointer" }}>↻</button>
            )}
          </div>

          {/* Preview */}
<div style={{ display: activeTab === "Preview" ? "flex" : "none", flex: 1, overflow: "hidden", position: "relative" }}>

              {generating && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#10b981,transparent)", animation: "slide 1.5s linear infinite", zIndex: 10 }} />}
              <WebContainer
              
  files={{
  'package.json': {
    file: {
      contents: JSON.stringify({
        name: "archaeopteris-builder",
        scripts: { dev: "vite --port 3000" },
        dependencies: {
          "react": "^18",
          "react-dom": "^18",
          "lucide-react": "latest",
          "clsx": "latest",
          "tailwind-merge": "latest"
        },
        devDependencies: {
          "vite": "latest",
          "@vitejs/plugin-react": "latest",
          "tailwindcss": "latest",
          "autoprefixer": "latest",
          "postcss": "latest"
        }
      })
    }
  },
  '.npmrc': {
  file: {
    contents: 'registry=http://registry.npmjs.org/'
  }
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
</html>`
    }
  },
  'src': {
    directory: {
      'main.jsx': {
        file: { contents: `import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
${code}` }
      },
      'index.css': {
        file: { contents: `@tailwind base;\n@tailwind components;\n@tailwind utilities;` }
      }
    }
  },
  'vite.config.js': {
    file: {
      contents: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })`
    }
  },
  'tailwind.config.js': {
    file: {
      contents: `export default { content: ['./src/**/*.{js,jsx}'], theme: { extend: {} }, plugins: [] }`
    }
  },
  'postcss.config.js': {
    file: {
      contents: `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`
    }
  }
}}
startCommand={['npm', 'install']}


/>
            </div>
          

          {/* Code */}
          {activeTab === "Code" && (
            <div style={{ flex: 1, display: "flex", overflow: "auto" }}>
              <div style={{ minWidth: 40, paddingTop: 16, paddingRight: 10, textAlign: "right", color: "#2a4060", fontSize: 12, lineHeight: "21px", userSelect: "none", borderRight: "1px solid #1a2535", background: "#080c10", flexShrink: 0 }}>
                {(code || " ").split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>
              <textarea
                value={code}
                onChange={(e) => { setCode(e.target.value); }}
                readOnly={generating}
                spellCheck={false}
                style={{ flex: 1, background: "#080c10", border: "none", color: generating ? "#4a8060" : "#a8c8e8", fontSize: 12, lineHeight: "21px", padding: "16px", fontFamily: "monospace", resize: "none", outline: "none", whiteSpace: "pre", overflowWrap: "normal", minHeight: "100%" }}
              />
            </div>
          )}

          {/* Console */}
          {activeTab === "Console" && (
            <div style={{ flex: 1, overflow: "auto", padding: 20, fontFamily: "monospace", fontSize: 12, lineHeight: 1.8 }}>
              {logs.map((log, i) => (
                <div key={i} style={{ color: log.includes("Error") ? "#f87171" : log.includes("\u2713") ? "#10b981" : "#4a7090" }}>
                  <span style={{ color: "#2a4060", marginRight: 12 }}>$</span>{log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes slide{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:#1e3050;border-radius:2px}
        textarea::placeholder{color:#2a4060}
        button:hover:not(:disabled){opacity:0.8}
      `}</style>
    </div>
  );
}