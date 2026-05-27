"use client";

import { useState, useRef, useEffect } from "react";

const TEST_HTML = `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #080c10; color: #10b981; font-family: monospace; 
         display: flex; align-items: center; justify-content: center; 
         min-height: 100vh; margin: 0; font-size: 24px; }
</style>
</head>
<body>
  <div>✓ iframe works</div>
</body>
</html>`;

export default function IframeTest() {
  const [method, setMethod] = useState<"srcdoc" | "blob" | "dataurl">("srcdoc");
  const [status, setStatus] = useState("waiting...");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const load = (m: typeof method) => {
    const el = iframeRef.current;
    if (!el) { setStatus("no iframe ref"); return; }
    setStatus("loading...");

    if (m === "srcdoc") {
      el.removeAttribute("src");
      el.srcdoc = TEST_HTML;
      setStatus("srcdoc set");
    } else if (m === "blob") {
      const blob = new Blob([TEST_HTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      el.removeAttribute("srcdoc");
      el.src = url;
      setStatus("blob url: " + url.slice(0, 40));
    } else {
      const b64 = btoa(unescape(encodeURIComponent(TEST_HTML)));
      el.removeAttribute("srcdoc");
      el.src = "data:text/html;base64," + b64;
      setStatus("data url set");
    }
  };

  useEffect(() => { load(method); }, []);

  return (
    <div style={{ background: "#080c10", minHeight: "100vh", padding: 24, color: "#e2e8f0", fontFamily: "monospace" }}>
      <div style={{ marginBottom: 16, fontSize: 13 }}>
        <strong style={{ color: "#10b981" }}>iframe debug — status: </strong>
        <span style={{ color: "#f87171" }}>{status}</span>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["srcdoc", "blob", "dataurl"] as const).map(m => (
          <button key={m} onClick={() => { setMethod(m); load(m); }}
            style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid #1a2535",
              background: method === m ? "#10b981" : "transparent",
              color: method === m ? "#000" : "#5a7090", cursor: "pointer", fontFamily: "monospace" }}>
            {m}
          </button>
        ))}
        <button onClick={() => load(method)}
          style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid #10b98140",
            background: "transparent", color: "#10b981", cursor: "pointer", fontFamily: "monospace" }}>
          retry
        </button>
      </div>

      {/* Test 1: no sandbox */}
      <div style={{ marginBottom: 8, fontSize: 11, color: "#4a6080" }}>NO SANDBOX</div>
      <iframe ref={iframeRef} style={{ width: "100%", height: 120, border: "1px solid #1a2535", borderRadius: 8, marginBottom: 16 }} title="no-sandbox" />

      {/* Test 2: with sandbox */}
      <div style={{ marginBottom: 8, fontSize: 11, color: "#4a6080" }}>WITH sandbox=allow-scripts</div>
      <iframe
        srcDoc={method === "srcdoc" ? TEST_HTML : undefined}
        style={{ width: "100%", height: 120, border: "1px solid #1a2535", borderRadius: 8 }}
        title="with-sandbox"
        sandbox="allow-scripts"
      />
    </div>
  );
}
