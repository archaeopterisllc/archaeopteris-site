"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Tab = "Preview" | "Code" | "Console";

// Strip export default, extract component name, re-render properly
const makeBootstrapHTML = (tsxCode: string): string => {
  // Replace "export default function Foo" -> "function Foo" and track name
  const cleaned = tsxCode
    .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, "")
    .replace(/export\s+default\s+function\s+(\w+)/, "function $1")
    .replace(/export\s+default\s+(\w+)/, "// export $1");

  // Try to find component name
  const match =
    tsxCode.match(/export\s+default\s+function\s+(\w+)/) ||
    tsxCode.match(/function\s+(Page|Component|App)\s*\(/) ||
    tsxCode.match(/const\s+(Page|Component|App)\s*=/) ||
    tsxCode.match(/export\s+default\s+(\w+)/);
  const componentName = match?.[1] ?? "Page";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { margin: 0; background: #0a0a0a; color: #fff; font-family: sans-serif; }
    #root { min-height: 100vh; }
    .error-box { padding: 24px; color: #f87171; font-family: monospace; font-size: 13px; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react,typescript">
    try {
      ${cleaned}
      const C = typeof ${componentName} !== 'undefined' ? ${componentName} : () => React.createElement('div', {style:{padding:32,color:'#f87171'}}, 'Component "${componentName}" not found');
      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(C));
    } catch(e) {
      document.getElementById('root').innerHTML = '<div class="error-box">⚠ ' + e.message + '</div>';
    }
  </script>
</body>
</html>`;
};

const TABS: Tab[] = ["Preview", "Code", "Console"];

const STARTER = `export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl font-bold text-emerald-400">Archaeopteris</div>
        <div className="text-gray-400 text-lg">Where Trading Meets Technology</div>
        <div className="mt-8 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-sm inline-block">
          Ready to build ✦
        </div>
      </div>
    </div>
  );
}`;

async function generateWithClaude(
  prompt: string,
  currentCode: string,
  onChunk: (chunk: string) => void
): Promise<void> {
  const system = `You are an expert React/TSX component generator for Archaeopteris LLC — a fintech/trading technology company.
Brand: dark theme, emerald green (#10b981) and blue (#3b82f6) accents.
Rules:
- Output ONLY raw TSX code, absolutely no markdown fences, no backticks, no explanation text
- Use Tailwind CSS classes only (no imports needed, tailwind is loaded globally)
- Must have: export default function Page() { ... }
- No import statements at all (React, useState, useEffect are all available as globals)
- Use React.useState, React.useEffect etc if needed (React is global)
- Self-contained, no props required
- Production-quality UI, visually stunning dark design`;

  const res = await fetch("/api/page-generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system,
      messages: [
        {
          role: "user",
          content: currentCode && currentCode !== STARTER
            ? `Current code:\n${currentCode}\n\nModify/improve: ${prompt}`
            : `Generate: ${prompt}`,
        },
      ],
      stream: true,
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") return;
      try {
        const json = JSON.parse(data);
        const delta: string = json?.delta?.text ?? "";
        if (delta) onChunk(delta);
      } catch {}
    }
  }
}

export default function ArchaeopterisBuilder() {
  const [code, setCode] = useState<string>(STARTER);
  const [previewKey, setPreviewKey] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<Tab>("Preview");
  const [prompt, setPrompt] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>(["WebContainer ready ✓", "Claude API connected ✓"]);
  const [streamingCode, setStreamingCode] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const runPreview = useCallback((src: string) => {
    if (!iframeRef.current) return;
    const html = makeBootstrapHTML(src);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
    setTimeout(() => URL.revokeObjectURL(url), 8000);
  }, []);

  useEffect(() => {
    if (activeTab === "Preview") runPreview(code);
  }, [code, activeTab, runPreview, previewKey]);

  const addLog = (msg: string) =>
    setLogs((prev) => [...prev.slice(-99), `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const handleGenerate = async () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setActiveTab("Code");
    addLog(`Generating: "${prompt}"`);
    let accumulated = "";
    setStreamingCode("");

    try {
      await generateWithClaude(prompt, code, (chunk: string) => {
        accumulated += chunk;
        setStreamingCode(accumulated);
      });

      // Strip any accidental markdown fences
      const clean = accumulated
        .replace(/^```(?:tsx?|jsx?|typescript)?\n?/m, "")
        .replace(/\n?```\s*$/m, "")
        .trim();

      setCode(clean);
      setStreamingCode("");
      setPrompt("");
      addLog("Generation complete ✓");
      setTimeout(() => {
        setActiveTab("Preview");
        setPreviewKey((k) => k + 1);
      }, 200);
    } catch (e: unknown) {
      addLog(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setGenerating(false);
    }
  };

  const displayCode = streamingCode || code;

  const S = {
    panel: {
      width: 280, borderRight: "1px solid #1a2535",
      display: "flex", flexDirection: "column" as const,
      background: "#0a0f1a", flexShrink: 0,
    },
    section: { padding: 14, borderBottom: "1px solid #1a2535" },
    label: { fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 },
    btn: (active = false): React.CSSProperties => ({
      display: "block", width: "100%", padding: "7px 10px", marginBottom: 4,
      background: active ? "#10b98115" : "transparent",
      border: `1px solid ${active ? "#10b98140" : "#1a2535"}`,
      borderRadius: 6, color: active ? "#10b981" : "#5a7090",
      fontSize: 11, cursor: "pointer", textAlign: "left", fontFamily: "inherit",
      transition: "all 0.15s",
    }),
  };

  return (
    <div style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace", background: "#080c10", color: "#e2e8f0", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: "1px solid #1a2535", background: "#0d1420", flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#10b981,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#000" }}>A</div>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#10b981", letterSpacing: "0.05em" }}>ARCHAEOPTERIS BUILDER</span>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "#10b98115", border: "1px solid #10b98140", color: "#10b981", letterSpacing: "0.1em" }}>BETA</div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left */}
        <div style={S.panel}>
          <div style={S.section}>
            <div style={S.label}>✦ DESCRIBE YOUR COMPONENT</div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
              placeholder="e.g. XAUUSD trading dashboard with P&L..."
              style={{ width: "100%", height: 100, background: "#0d1420", border: "1px solid #1e3050", borderRadius: 8, color: "#c8d8e8", fontSize: 12, padding: "10px 12px", resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.6, boxSizing: "border-box" }}
            />
            <button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              style={{ width: "100%", marginTop: 8, padding: "10px 0", borderRadius: 8, border: "none", background: generating ? "#1a3020" : "linear-gradient(135deg,#10b981,#059669)", color: generating ? "#4a8060" : "#000", fontWeight: 700, fontSize: 12, cursor: generating ? "not-allowed" : "pointer", letterSpacing: "0.05em", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              {generating
                ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>◌</span> Generating...</>
                : <>✦ Generate <span style={{ opacity: 0.6, fontSize: 10 }}>⌘↵</span></>}
            </button>
          </div>

          <div style={S.section}>
            <div style={S.label}>QUICK PROMPTS</div>
            {["XAUUSD trading dashboard", "Hero section dark luxury", "Pricing table fintech", "EA performance stats", "Admin sidebar navigation"].map((q) => (
              <button key={q} onClick={() => setPrompt(q)} style={S.btn(prompt === q)}>{q}</button>
            ))}
          </div>

          <div style={S.section}>
            <div style={S.label}>ACTIONS</div>
            <button onClick={() => { navigator.clipboard?.writeText(code); addLog("Code copied ✓"); }} style={S.btn()}>⎘ Copy TSX</button>
            <button onClick={() => { setCode(STARTER); setStreamingCode(""); addLog("Reset ✓"); setActiveTab("Preview"); setPreviewKey(k => k + 1); }} style={S.btn()}>↺ Reset</button>
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
            <div style={S.label}>CONSOLE</div>
            <div style={{ fontSize: 10, lineHeight: 1.7 }}>
              {logs.map((log, i) => (
                <div key={i} style={{ color: log.includes("Error") ? "#f87171" : log.includes("✓") ? "#10b981" : "#4a6080", marginBottom: 2 }}>{log}</div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Tab bar */}
          <div style={{ display: "flex", borderBottom: "1px solid #1a2535", background: "#0a0f1a", flexShrink: 0 }}>
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 20px", background: "transparent", border: "none", borderBottom: activeTab === tab ? "2px solid #10b981" : "2px solid transparent", color: activeTab === tab ? "#10b981" : "#4a6080", fontSize: 11, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.08em" }}>
                {tab}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            {activeTab === "Preview" && (
              <button onClick={() => setPreviewKey((k) => k + 1)} style={{ padding: "10px 16px", background: "transparent", border: "none", color: "#4a6080", fontSize: 14, cursor: "pointer" }} title="Refresh">↻</button>
            )}
          </div>

          {/* Preview */}
          {activeTab === "Preview" && (
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              {generating && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#10b981,transparent)", animation: "slide 1.5s linear infinite", zIndex: 10 }} />}
              <iframe ref={iframeRef} style={{ width: "100%", height: "100%", border: "none" }} title="Preview" sandbox="allow-scripts allow-same-origin" />
            </div>
          )}

          {/* Code */}
          {activeTab === "Code" && (
            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flex: 1, overflow: "auto" }}>
                <div style={{ minWidth: 42, paddingTop: 16, textAlign: "right", paddingRight: 12, color: "#2a4060", fontSize: 12, lineHeight: "21px", userSelect: "none", borderRight: "1px solid #1a2535", background: "#080c10", flexShrink: 0 }}>
                  {displayCode.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                <textarea
                  ref={textareaRef}
                  value={displayCode}
                  onChange={(e) => { setCode(e.target.value); setStreamingCode(""); }}
                  readOnly={generating}
                  spellCheck={false}
                  style={{ flex: 1, background: "#080c10", border: "none", color: generating ? "#4a8060" : "#a8c8e8", fontSize: 12, lineHeight: "21px", padding: "16px", fontFamily: "'JetBrains Mono','Fira Code',monospace", resize: "none", outline: "none", whiteSpace: "pre", overflowWrap: "normal" }}
                />
              </div>
            </div>
          )}

          {/* Console */}
          {activeTab === "Console" && (
            <div style={{ flex: 1, overflow: "auto", padding: 20, fontFamily: "monospace", fontSize: 12, lineHeight: 1.8 }}>
              {logs.map((log, i) => (
                <div key={i} style={{ color: log.includes("Error") ? "#f87171" : log.includes("✓") ? "#10b981" : "#4a7090" }}>
                  <span style={{ color: "#2a4060", marginRight: 12 }}>$</span>{log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          )}
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
