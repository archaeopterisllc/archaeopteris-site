“use client”;

// components/blog-page.tsx
// Usage: pass `dict` from your getDictionary(locale) call

import { useState, useRef } from “react”;

type Post = {
title: string;
category: string;
date: string;
readTime: string;
excerpt: string;
tags: string[];
accent?: “green” | “blue”;
};

type BlogDict = {
badge: string;
heroTitle1: string; heroTitle2: string; heroTitle3: string; heroTitle4: string;
heroSub: string;
stat1Val: string; stat1Label: string;
stat2Val: string; stat2Label: string;
stat3Val: string; stat3Label: string;
tabBrowse: string; tabWrite: string;
catAll: string; featured: string; readMore: string; noArticles: string;
writeTitle1: string; writeTitle2: string; writeTitle3: string; writeSub: string;
labelTopic: string; labelTopicRequired: string;
labelKeywords: string; labelKeywordsOptional: string;
labelTone: string;
placeholderTopic: string; placeholderKeywords: string;
tone1: string; tone2: string; tone3: string; tone4: string;
generateBtn: string; generating: string; topicRequired: string;
outputLabel: string; copyBtn: string; copiedBtn: string; clearBtn: string;
outputFooter: string; writingDraft: string;
categories: Record<string, string>;
samplePosts: Post[];
};

export default function BlogPage({ dict }: { dict: BlogDict }) {
const [activeTab, setActiveTab] = useState<“browse” | “write”>(“browse”);
const [activeCategory, setActiveCategory] = useState(dict.catAll);
const [topic, setTopic] = useState(””);
const [keywords, setKeywords] = useState(””);
const [tone, setTone] = useState(“tone1”);
const [draft, setDraft] = useState(””);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(””);
const [copied, setCopied] = useState(false);
const draftRef = useRef<HTMLDivElement>(null);

const tones = [
{ key: “tone1”, label: dict.tone1 },
{ key: “tone2”, label: dict.tone2 },
{ key: “tone3”, label: dict.tone3 },
{ key: “tone4”, label: dict.tone4 },
];

// Assign alternating accents
const posts: Post[] = dict.samplePosts.map((p, i) => ({
…p,
accent: i % 2 === 0 ? “green” : “blue”,
}));

const allCategories = [dict.catAll, …Object.values(dict.categories)];

const filtered =
activeCategory === dict.catAll
? posts
: posts.filter((p) => p.category === activeCategory);

const accentColor = (a?: “green” | “blue”) =>
a === “blue” ? “#3b82f6” : “#10b981”;

const handleGenerate = async () => {
if (!topic.trim()) { setError(dict.topicRequired); return; }
setError(””); setLoading(true); setDraft(””);
try {
const res = await fetch(”/api/blog-draft”, {
method: “POST”,
headers: { “Content-Type”: “application/json” },
body: JSON.stringify({
title: topic,
keywords,
tone: tones.find((t) => t.key === tone)?.label ?? “professional”,
}),
});
const data = await res.json();
if (!res.ok) throw new Error(data.error || “API error”);
setDraft(data.draft);
setTimeout(() => draftRef.current?.scrollIntoView({ behavior: “smooth” }), 100);
} catch (e: unknown) {
setError(e instanceof Error ? e.message : “Error”);
} finally {
setLoading(false);
}
};

const handleCopy = () => {
navigator.clipboard.writeText(draft);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

return (
<div style={s.page}>
<style>{css}</style>

```
  {/* ── Hero ── */}
  <div style={s.hero}>
    <div style={s.heroInner}>
      <p style={s.badge}>{dict.badge}</p>
      <h1 style={s.heroTitle}>
        {dict.heroTitle1} <span style={s.green}>{dict.heroTitle2}</span>
        <br />
        {dict.heroTitle3} <span style={s.blue}>{dict.heroTitle4}</span>
      </h1>
      <p style={s.heroSub}>{dict.heroSub}</p>
      <div style={s.stats}>
        {[
          [dict.stat1Val, dict.stat1Label],
          [dict.stat2Val, dict.stat2Label],
          [dict.stat3Val, dict.stat3Label],
        ].map(([v, l]) => (
          <div key={l} style={s.stat}>
            <span style={s.statVal}>{v}</span>
            <span style={s.statLabel}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ── Tabs ── */}
  <div style={s.tabBar}>
    <div style={s.tabWrap}>
      {(["browse", "write"] as const).map((tab) => (
        <button
          key={tab}
          className={`arch-tab${activeTab === tab ? " active" : ""}`}
          style={s.tab}
          onClick={() => setActiveTab(tab)}
        >
          {tab === "browse" ? dict.tabBrowse : dict.tabWrite}
        </button>
      ))}
    </div>
  </div>

  <div style={s.container}>

    {/* ══ BROWSE ══ */}
    {activeTab === "browse" && (
      <div className="fadein">
        {/* Category pills */}
        <div style={s.catRow}>
          {allCategories.map((c) => (
            <button
              key={c}
              className={`arch-cat${activeCategory === c ? " active" : ""}`}
              style={s.catPill}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured */}
        {filtered[0] && (
          <div className="arch-card" style={s.featured}>
            <div style={s.featuredTop}>
              <span style={{
                ...s.featuredBadge,
                color: accentColor(filtered[0].accent),
                background: `${accentColor(filtered[0].accent)}18`,
                border: `1px solid ${accentColor(filtered[0].accent)}44`,
              }}>
                {dict.featured}
              </span>
              <span style={s.meta}>{filtered[0].date}</span>
              <span style={s.metaDot}>·</span>
              <span style={s.meta}>{filtered[0].readTime} {dict.readMore}</span>
            </div>
            <h2 style={s.featuredTitle}>{filtered[0].title}</h2>
            <p style={s.excerpt}>{filtered[0].excerpt}</p>
            <div style={s.tagRow}>
              {filtered[0].tags.map((t) => <span key={t} style={s.tag}>{t}</span>)}
              <span style={{ ...s.arrow, color: accentColor(filtered[0].accent) }}>→</span>
            </div>
          </div>
        )}

        {/* Grid */}
        <div style={s.grid}>
          {filtered.slice(1).map((post) => (
            <div key={post.title} className="arch-card" style={s.card}>
              <div style={s.cardTop}>
                <span style={{ ...s.catLabel, color: accentColor(post.accent) }}>
                  {post.category}
                </span>
                <span style={s.metaDot}>·</span>
                <span style={s.meta}>{post.readTime} {dict.readMore}</span>
              </div>
              <h3 style={s.cardTitle}>{post.title}</h3>
              <p style={s.cardExcerpt}>{post.excerpt}</p>
              <div style={s.tagRow}>
                {post.tags.slice(0, 2).map((t) => <span key={t} style={s.tag}>{t}</span>)}
                <span style={{ ...s.arrow, color: accentColor(post.accent), marginLeft: "auto" }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={s.empty}>{dict.noArticles}</p>
        )}
      </div>
    )}

    {/* ══ WRITE ══ */}
    {activeTab === "write" && (
      <div className="fadein">
        <div style={s.writeHead}>
          <h2 style={s.writeTitle}>
            {dict.writeTitle1} <span style={s.green}>{dict.writeTitle2}</span> {dict.writeTitle3}
          </h2>
          <p style={s.writeSub}>{dict.writeSub}</p>
        </div>

        <div style={s.writeCard}>
          {/* Topic */}
          <div style={s.field}>
            <label style={s.label}>
              {dict.labelTopic} <span style={{ color: "#10b981" }}>{dict.labelTopicRequired}</span>
            </label>
            <input
              style={s.input}
              placeholder={dict.placeholderTopic}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>

          {/* Keywords */}
          <div style={s.field}>
            <label style={s.label}>
              {dict.labelKeywords}{" "}
              <span style={{ color: "#374151", fontSize: "0.7rem" }}>{dict.labelKeywordsOptional}</span>
            </label>
            <input
              style={s.input}
              placeholder={dict.placeholderKeywords}
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          {/* Tone */}
          <div style={s.field}>
            <label style={s.label}>{dict.labelTone}</label>
            <div style={s.toneRow}>
              {tones.map(({ key, label }) => (
                <button
                  key={key}
                  className={`arch-tone${tone === key ? " active" : ""}`}
                  style={s.tonePill}
                  onClick={() => setTone(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {error && <div style={s.errorBox}>⚠ {error}</div>}

          <button
            className="arch-gen"
            style={s.genBtn}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <span style={s.btnRow}><span style={s.spinner} /> {dict.generating}</span>
            ) : (
              <span style={s.btnRow}>{dict.generateBtn}</span>
            )}
          </button>
        </div>

        {/* Loading */}
        {loading && !draft && (
          <div style={s.loadingBox}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ ...s.dot, animationDelay: `${i * 0.2}s` }} />
            ))}
            <span style={s.loadingText}>{dict.writingDraft}</span>
          </div>
        )}

        {/* Output */}
        {draft && (
          <div ref={draftRef} className="fadein" style={s.outputCard}>
            <div style={s.outputHead}>
              <span style={s.outputLabel}>{dict.outputLabel}</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="arch-act" style={s.actBtn} onClick={handleCopy}>
                  {copied ? dict.copiedBtn : dict.copyBtn}
                </button>
                <button className="arch-act" style={{ ...s.actBtn, borderColor: "#1f2937" }} onClick={() => setDraft("")}>
                  {dict.clearBtn}
                </button>
              </div>
            </div>
            <textarea
              style={s.draftArea}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              spellCheck={false}
            />
            <div style={s.outputFoot}>{dict.outputFooter}</div>
          </div>
        )}
      </div>
    )}
  </div>
</div>
```

);
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const css = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap'); @keyframes fadein { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} } @keyframes spin { to{transform:rotate(360deg)} } @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} } .fadein { animation: fadein 0.3s ease; } .arch-tab { border-bottom:2px solid transparent; transition:all 0.2s; } .arch-tab:hover { color:#e2e8f0 !important; } .arch-tab.active { color:#10b981 !important; border-bottom-color:#10b981 !important; } .arch-cat { transition:all 0.15s; cursor:pointer; } .arch-cat:hover { border-color:#10b981 !important; color:#10b981 !important; } .arch-cat.active { background:rgba(16,185,129,0.12) !important; border-color:#10b981 !important; color:#10b981 !important; } .arch-card { transition:border-color 0.2s,transform 0.2s; cursor:pointer; } .arch-card:hover { border-color:#10b981 !important; transform:translateY(-2px); } .arch-tone { transition:all 0.15s; cursor:pointer; } .arch-tone:hover { border-color:#10b981 !important; color:#10b981 !important; } .arch-tone.active { background:rgba(16,185,129,0.1) !important; border-color:#10b981 !important; color:#10b981 !important; } .arch-gen { transition:background 0.2s; } .arch-gen:not(:disabled):hover { background:#059669 !important; } .arch-gen:disabled { opacity:0.5; cursor:not-allowed; } .arch-act { transition:all 0.15s; cursor:pointer; } .arch-act:hover { border-color:#10b981 !important; color:#10b981 !important; } input,textarea { transition:border-color 0.2s; } input:focus,textarea:focus { outline:none; border-color:#10b981 !important; } input::placeholder,textarea::placeholder { color:#4b5563; } textarea { resize:vertical; }`;

// ─── Styles ──────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
page: { background:”#0a0a0a”, minHeight:“100vh”, color:”#e2e8f0”, fontFamily:”‘Inter’,sans-serif” },
hero: { padding:“72px 0 56px”, borderBottom:“1px solid #111827” },
heroInner: { maxWidth:860, margin:“0 auto”, padding:“0 1.5rem” },
badge: { fontFamily:”‘JetBrains Mono’,monospace”, fontSize:“0.72rem”, letterSpacing:“0.1em”, color:”#6b7280”, marginBottom:“1.25rem”, textTransform:“uppercase” },
heroTitle: { fontFamily:”‘Playfair Display’,serif”, fontSize:“clamp(2.4rem,6vw,4rem)”, fontWeight:800, lineHeight:1.1, letterSpacing:”-0.02em”, color:”#f9fafb”, marginBottom:“1.25rem” },
green: { color:”#10b981” },
blue: { color:”#3b82f6” },
heroSub: { fontSize:“1rem”, color:”#9ca3af”, lineHeight:1.65, marginBottom:“2.5rem” },
stats: { display:“flex”, gap:“2.5rem” },
stat: { display:“flex”, flexDirection:“column”, gap:3 },
statVal: { fontSize:“0.9rem”, fontWeight:600, color:”#10b981” },
statLabel: { fontSize:“0.68rem”, fontFamily:”‘JetBrains Mono’,monospace”, color:”#4b5563”, textTransform:“uppercase”, letterSpacing:“0.08em” },
tabBar: { borderBottom:“1px solid #111827”, background:”#0a0a0a”, position:“sticky”, top:0, zIndex:10 },
tabWrap: { maxWidth:860, margin:“0 auto”, padding:“0 1.5rem”, display:“flex” },
tab: { background:“none”, border:“none”, borderBottom:“2px solid transparent”, padding:“1rem 0”, marginRight:“2rem”, fontSize:“0.85rem”, fontFamily:”‘JetBrains Mono’,monospace”, letterSpacing:“0.04em”, color:”#4b5563”, cursor:“pointer” },
container: { maxWidth:860, margin:“0 auto”, padding:“2.5rem 1.5rem 5rem” },
catRow: { display:“flex”, gap:“0.5rem”, flexWrap:“wrap”, marginBottom:“1.75rem” },
catPill: { padding:“0.35rem 0.9rem”, fontSize:“0.78rem”, fontFamily:”‘JetBrains Mono’,monospace”, border:“1px solid #1f2937”, borderRadius:20, background:“transparent”, color:”#6b7280” },
featured: { border:“1px solid #1f2937”, borderRadius:8, padding:“1.75rem 2rem”, marginBottom:“1.25rem”, background:”#0d1117” },
featuredTop: { display:“flex”, alignItems:“center”, gap:“0.75rem”, marginBottom:“1rem” },
featuredBadge: { fontFamily:”‘JetBrains Mono’,monospace”, fontSize:“0.65rem”, letterSpacing:“0.12em”, padding:“0.2rem 0.6rem”, borderRadius:3 },
meta: { fontSize:“0.78rem”, color:”#4b5563”, fontFamily:”‘JetBrains Mono’,monospace” },
metaDot: { color:”#1f2937” },
featuredTitle: { fontFamily:”‘Playfair Display’,serif”, fontSize:“clamp(1.3rem,3vw,1.7rem)”, fontWeight:700, color:”#f9fafb”, lineHeight:1.25, marginBottom:“0.85rem” },
excerpt: { fontSize:“0.92rem”, color:”#9ca3af”, lineHeight:1.7, marginBottom:“1.25rem” },
tagRow: { display:“flex”, alignItems:“center”, gap:“0.5rem”, flexWrap:“wrap” },
tag: { fontFamily:”‘JetBrains Mono’,monospace”, fontSize:“0.67rem”, color:”#4b5563”, border:“1px solid #1f2937”, padding:“0.18rem 0.5rem”, borderRadius:3 },
arrow: { fontSize:“1rem”, transition:“color 0.2s”, marginLeft:“auto” },
grid: { display:“grid”, gridTemplateColumns:“repeat(auto-fill,minmax(260px,1fr))”, gap:“1rem” },
card: { border:“1px solid #111827”, borderRadius:8, padding:“1.4rem”, background:”#0d1117” },
cardTop: { display:“flex”, alignItems:“center”, gap:“0.5rem”, marginBottom:“0.75rem” },
catLabel: { fontSize:“0.72rem”, fontFamily:”‘JetBrains Mono’,monospace”, fontWeight:500, letterSpacing:“0.06em” },
cardTitle: { fontFamily:”‘Playfair Display’,serif”, fontSize:“1.05rem”, fontWeight:700, color:”#f1f5f9”, lineHeight:1.3, marginBottom:“0.65rem” },
cardExcerpt: { fontSize:“0.85rem”, color:”#6b7280”, lineHeight:1.65, marginBottom:“1rem” },
empty: { textAlign:“center”, color:”#374151”, padding:“4rem 0”, fontFamily:”‘JetBrains Mono’,monospace”, fontSize:“0.85rem” },
writeHead: { marginBottom:“1.75rem” },
writeTitle: { fontFamily:”‘Playfair Display’,serif”, fontSize:“1.75rem”, fontWeight:700, color:”#f9fafb”, letterSpacing:”-0.02em”, marginBottom:“0.5rem” },
writeSub: { fontSize:“0.9rem”, color:”#6b7280”, lineHeight:1.6 },
writeCard: { border:“1px solid #111827”, borderRadius:8, padding:“1.75rem”, background:”#0d1117”, marginBottom:“1.25rem” },
field: { marginBottom:“1.4rem” },
label: { display:“block”, fontFamily:”‘JetBrains Mono’,monospace”, fontSize:“0.65rem”, letterSpacing:“0.12em”, color:”#4b5563”, marginBottom:“0.55rem” },
input: { width:“100%”, padding:“0.7rem 0.9rem”, background:”#111827”, border:“1px solid #1f2937”, borderRadius:6, color:”#e2e8f0”, fontSize:“0.92rem”, fontFamily:”‘Inter’,sans-serif” },
toneRow: { display:“flex”, gap:“0.5rem”, flexWrap:“wrap” },
tonePill: { padding:“0.38rem 0.9rem”, fontSize:“0.78rem”, fontFamily:”‘Inter’,sans-serif”, fontWeight:500, border:“1px solid #1f2937”, borderRadius:20, background:“transparent”, color:”#6b7280” },
errorBox: { background:“rgba(239,68,68,0.08)”, border:“1px solid rgba(239,68,68,0.2)”, borderRadius:6, padding:“0.65rem 0.9rem”, fontSize:“0.82rem”, color:”#fca5a5”, marginBottom:“1.25rem”, fontFamily:”‘JetBrains Mono’,monospace” },
genBtn: { width:“100%”, padding:“0.82rem”, background:”#10b981”, color:”#fff”, border:“none”, borderRadius:6, fontSize:“0.9rem”, fontFamily:”‘Inter’,sans-serif”, fontWeight:600, cursor:“pointer” },
btnRow: { display:“flex”, alignItems:“center”, justifyContent:“center”, gap:“0.6rem” },
spinner: { display:“inline-block”, width:13, height:13, border:“2px solid rgba(255,255,255,0.25)”, borderTopColor:”#fff”, borderRadius:“50%”, animation:“spin 0.7s linear infinite” },
loadingBox: { display:“flex”, alignItems:“center”, gap:“0.85rem”, padding:“1.5rem”, border:“1px solid #111827”, borderRadius:8, background:”#0d1117” },
dot: { display:“inline-block”, width:6, height:6, borderRadius:“50%”, background:”#10b981”, animation:“blink 1.2s ease infinite” },
loadingText: { fontFamily:”‘JetBrains Mono’,monospace”, fontSize:“0.78rem”, color:”#4b5563” },
outputCard: { border:“1px solid #111827”, borderRadius:8, overflow:“hidden”, background:”#0d1117” },
outputHead: { display:“flex”, justifyContent:“space-between”, alignItems:“center”, padding:“0.85rem 1.25rem”, borderBottom:“1px solid #111827”, background:”#111827” },
outputLabel: { fontFamily:”‘JetBrains Mono’,monospace”, fontSize:“0.65rem”, letterSpacing:“0.12em”, color:”#10b981” },
actBtn: { padding:“0.28rem 0.7rem”, fontSize:“0.72rem”, fontFamily:”‘JetBrains Mono’,monospace”, border:“1px solid #1f2937”, borderRadius:4, background:“transparent”, color:”#6b7280” },
draftArea: { width:“100%”, minHeight:400, padding:“1.4rem”, background:”#0d1117”, border:“none”, color:”#cbd5e1”, fontSize:“0.9rem”, lineHeight:1.75, fontFamily:”‘Inter’,sans-serif” },
outputFoot: { padding:“0.6rem 1.25rem”, borderTop:“1px solid #111827”, fontSize:“0.7rem”, color:”#374151”, fontFamily:”‘JetBrains Mono’,monospace”, background:”#0a0a0a” },
};
