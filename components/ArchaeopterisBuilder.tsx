"use client";

import { useState, useRef, useEffect } from "react";

type Tab = "Preview" | "Code" | "Console";
const TABS: Tab[] = ["Preview", "Code", "Console"];

// ─── iframe HTML wrapper ──────────────────────────────────────────────────────
function makeHTML(code: string): string {
  // Normalize: strip imports, convert export default function X -> function X
  const nameMatch = code.match(/export\s+default\s+function\s+(\w+)/);
  const componentName = nameMatch?.[1] ?? "App";
  let src = code
    .replace(/^import\s+[^\n]+\n?/gm, "")
    .replace(/export\s+default\s+function\s+(\w+)/, "function $1");

  // Encode for safe embedding
  const encoded = src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#080c10;color:#e2e8f0;font-family:system-ui,sans-serif;min-height:100vh}
  #root{min-height:100vh}
  .live-error{padding:24px;color:#f87171;font-family:monospace;font-size:13px;white-space:pre-wrap;background:#1a0a0a;border-left:3px solid #f87171;margin:16px}
  ::-webkit-scrollbar{width:6px;height:6px}
  ::-webkit-scrollbar-thumb{background:#1e3050;border-radius:3px}
</style>
</head>
<body>
<div id="root"></div>
<div id="raw-src" style="display:none">${encoded}</div>
<script>
  (function() {
    var el = document.getElementById("raw-src");
    var decoded = el.innerHTML
      .replace(/&amp;/g,"&")
      .replace(/&lt;/g,"<")
      .replace(/&gt;/g,">")
      .replace(/&quot;/g,"\"");

    var componentName = "${componentName}";
    var suffix = "\ntry{var C=typeof " + componentName + "!==\"undefined\"?" + componentName + ":App;ReactDOM.createRoot(document.getElementById(\"root\")).render(React.createElement(C));}catch(e){document.getElementById(\"root\").innerHTML=\"<div class=\\\"live-error\\\">\"+e.message+\"</div>\";}";

    var script = document.createElement("script");
    script.type = "text/babel";
    script.setAttribute("data-presets","react,typescript");
    script.textContent = decoded + suffix;
    document.body.appendChild(script);
    Babel.transformScriptTags();
  })();
</script>
</body>
</html>`;
}

// ─── STARTER ──────────────────────────────────────────────────────────────────
const STARTER = `export default function Page() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 50);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#080c10 0%,#0d1f15 50%,#080c10 100%)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:24}}>
      <div style={{fontSize:64,fontWeight:900,background:"linear-gradient(135deg,#10b981,#3b82f6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"-2px"}}>
        Archaeopteris
      </div>
      <div style={{color:"#4a9070",fontSize:18,letterSpacing:"0.2em",textTransform:"uppercase"}}>
        Where Trading Meets Technology
      </div>
      <div style={{width:200,height:2,background:"linear-gradient(90deg,transparent,#10b981,transparent)",marginTop:8,opacity: 0.5 + 0.5 * Math.sin(tick * 0.1)}} />
      <div style={{padding:"12px 28px",borderRadius:100,border:"1px solid #10b98140",color:"#10b981",fontSize:13,letterSpacing:"0.1em",background:"#10b98108",marginTop:8}}>
        Ready to build ✦
      </div>
    </div>
  );
}`;

// ─── API call ─────────────────────────────────────────────────────────────────
async function generate(prompt: string, currentCode: string): Promise<string> {
  const fullPrompt = [
    "You are an elite UI engineer for Archaeopteris LLC — fintech/trading technology.",
    "Brand: bg #080c10, emerald #10b981 (primary), blue #3b82f6 (accent).",
    "",
    "ENVIRONMENT: Browser with React 18, Tailwind CSS, GSAP 3 — all loaded as globals.",
    "Available globals: React, ReactDOM, gsap, window, document, fetch, Math, setTimeout, setInterval.",
    "",
    "VISUAL REQUIREMENTS — must have ALL of these:",
    "1. Dark bg: inline style background #080c10 or #0d1420 or multi-stop gradient",
    "2. Gradient text: style={{background:'linear-gradient(135deg,#10b981,#3b82f6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}",
    "3. Glow: style={{boxShadow:'0 0 30px #10b98140'}} or similar",
    "4. Animation: GSAP gsap.from/gsap.to in React.useEffect, OR CSS via <style> tag, OR React.useState ticker",
    "5. Glass cards: style={{background:'rgba(255,255,255,0.03)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.08)'}}",
    "6. Realistic mock data — no empty placeholders",
    "7. Hover effects via onMouseEnter/onMouseLeave state",
    "8. At least one animated/dynamic element",
    "",
    "CODE RULES:",
    "- export default function Page() { ... } — must use this signature",
    "- NO import statements",
    "- React.useState / React.useEffect / React.useRef / React.useCallback",
    "- Inline styles for gradients/glows, Tailwind for layout/spacing",
    "- Output ONLY raw TSX. Zero markdown. Zero backticks. Zero explanation.",
    "",
    currentCode && currentCode !== STARTER
      ? "Current code:\n" + currentCode + "\n\nModify/improve: " + prompt
      : "Generate visually stunning component: " + prompt,
  ].join("\n");

  const res = await fetch("/api/page-generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: fullPrompt }),
  });

  if (!res.ok) throw new Error("API error " + res.status);
  const data = await res.json();
  if (data.error) throw new Error(data.error);

  let code: string = data.code ?? "";
  // Strip accidental markdown fences
  code = code.replace(/^```[\w]*\n?/m, "").replace(/\n?```\s*$/m, "").trim();
  return code;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ArchaeopterisBuilder() {
  const [code, setCode] = useState<string>(STARTER);
  const [activeTab, setActiveTab] = useState<Tab>("Preview");
  const [prompt, setPrompt] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);
  const [previewKey, setPreviewKey] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>(["iframe runtime ready ✓", "GSAP + Tailwind CDN loaded ✓", "Claude API connected ✓"]);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) =>
    setLogs(p => [...p.slice(-99), "[" + new Date().toLocaleTimeString() + "] " + msg]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Update iframe whenever code or previewKey changes
  useEffect(() => {
    if (activeTab === "Preview" && iframeRef.current) {
      iframeRef.current.srcdoc = makeHTML(code);
    }
  }, [code, activeTab, previewKey]);

  const handleGenerate = async () => {
    if (!prompt.trim() || generating) return;
    const p = prompt;
    setPrompt("");
    setGenerating(true);
    addLog("Generating: \"" + p + "\"");
    try {
      const result = await generate(p, code);
      setCode(result);
      addLog("Complete ✓ — " + result.split("\n").length + " lines");
      setTimeout(() => { setActiveTab("Preview"); setPreviewKey(k => k + 1); }, 100);
    } catch (e: unknown) {
      addLog("Error: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setGenerating(false);
    }
  };

  const b: React.CSSProperties = {
    display: "block", width: "100%", padding: "7px 10px", marginBottom: 4,
    background: "transparent", border: "1px solid #1a2535", borderRadius: 6,
    color: "#5a7090", fontSize: 11, cursor: "pointer", textAlign: "left", fontFamily: "inherit",
  };

  return (
    <div style={{ fontFamily: "monospace", background: "#080c10", color: "#e2e8f0", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: "1px solid #1a2535", background: "#0d1420", flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#10b981,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#000", fontSize: 14 }}>A</div>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#10b981", letterSpacing: "0.05em" }}>ARCHAEOPTERIS BUILDER</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "#10b98115", border: "1px solid #10b98140", color: "#10b981" }}>BETA</span>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left panel */}
        <div style={{ width: 280, borderRight: "1px solid #1a2535", display: "flex", flexDirection: "column", background: "#0a0f1a", flexShrink: 0, overflow: "hidden" }}>

          {/* Prompt */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535" }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>✦ DESCRIBE YOUR COMPONENT</div>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
              placeholder="e.g. XAUUSD live trading dashboard with animations..."
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
            {[
              "XAUUSD trading dashboard",
              "Hero section dark luxury",
              "Pricing table fintech",
              "EA performance stats",
              "Admin sidebar navigation",
            ].map(q => (
              <button key={q} onClick={() => setPrompt(q)}
                style={{ ...b, color: prompt === q ? "#10b981" : "#5a7090", border: "1px solid " + (prompt === q ? "#10b98140" : "#1a2535"), background: prompt === q ? "#10b98115" : "transparent" }}>
                {q}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ padding: 14, borderBottom: "1px solid #1a2535" }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>ACTIONS</div>
            <button onClick={() => { navigator.clipboard?.writeText(code); addLog("Copied ✓"); }} style={b}>⎘ Copy TSX</button>
            <button onClick={() => { setCode(STARTER); addLog("Reset ✓"); setActiveTab("Preview"); setPreviewKey(k => k + 1); }} style={b}>↺ Reset</button>
          </div>

          {/* Logs */}
          <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
            <div style={{ fontSize: 10, color: "#4a6080", letterSpacing: "0.1em", marginBottom: 8 }}>CONSOLE</div>
            {logs.map((log, i) => (
              <div key={i} style={{ fontSize: 10, lineHeight: 1.8, color: log.includes("Error") ? "#f87171" : log.includes("✓") ? "#10b981" : "#4a6080" }}>{log}</div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #1a2535", background: "#0a0f1a", flexShrink: 0 }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "10px 20px", background: "transparent", border: "none", borderBottom: activeTab === tab ? "2px solid #10b981" : "2px solid transparent", color: activeTab === tab ? "#10b981" : "#4a6080", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                {tab}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            {activeTab === "Preview" && (
              <button onClick={() => setPreviewKey(k => k + 1)} style={{ padding: "10px 16px", background: "transparent", border: "none", color: "#4a6080", fontSize: 14, cursor: "pointer" }} title="Refresh">↻</button>
            )}
          </div>

          {/* Preview — full isolated iframe */}
          {activeTab === "Preview" && (
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              {generating && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#10b981,transparent)", animation: "slide 1.5s linear infinite", zIndex: 10 }} />
              )}
              <iframe
                ref={iframeRef}
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}

          {/* Code editor */}
          {activeTab === "Code" && (
            <div style={{ flex: 1, display: "flex", overflow: "auto" }}>
              <div style={{ minWidth: 40, paddingTop: 16, paddingRight: 10, textAlign: "right", color: "#2a4060", fontSize: 12, lineHeight: "21px", userSelect: "none", borderRight: "1px solid #1a2535", background: "#080c10", flexShrink: 0 }}>
                {(code || " ").split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                spellCheck={false}
                style={{ flex: 1, background: "#080c10", border: "none", color: "#a8c8e8", fontSize: 12, lineHeight: "21px", padding: "16px", fontFamily: "monospace", resize: "none", outline: "none", whiteSpace: "pre", overflowWrap: "normal" }}
              />
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
