'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Post = {
  slug?: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  accent?: 'green' | 'blue';
  content_en?: string;
  content_vi?: string;
  image?: string;
  author?: string;
  authorAvatar?: string;
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

// ── Gradient image placeholder per category ──────────────────────────────────
const CATEGORY_GRADIENTS: Record<string, string> = {
  Fintech: 'linear-gradient(135deg,#064e3b 0%,#065f46 50%,#0f172a 100%)',
  Crypto: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#0f172a 100%)',
  Forex: 'linear-gradient(135deg,#0c4a6e 0%,#075985 50%,#0f172a 100%)',
  Trading: 'linear-gradient(135deg,#3b0764 0%,#4c1d95 50%,#0f172a 100%)',
  Markets: 'linear-gradient(135deg,#1c1917 0%,#292524 50%,#0f172a 100%)',
  default: 'linear-gradient(135deg,#111827 0%,#1f2937 50%,#0f172a 100%)',
};

function PostImage({ post, height = 200 }: { post: Post; height?: number }) {
  const [imgError, setImgError] = useState(false);
  const gradient = CATEGORY_GRADIENTS[post.category] ?? CATEGORY_GRADIENTS.default;
  const accentHex = post.accent === 'blue' ? '#3b82f6' : '#10b981';

  if (post.image && !imgError) {
    return (
      <div style={{ position: 'relative', height, overflow: 'hidden', borderRadius: '6px 6px 0 0' }}>
        <img
          src={post.image}
          alt={post.title}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(13,17,23,0.9) 100%)',
        }} />
      </div>
    );
  }

  return (
    <div style={{
      height, background: gradient, borderRadius: '6px 6px 0 0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}>
        <defs>
          <pattern id={`grid-${post.slug}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={accentHex} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${post.slug})`} />
      </svg>
      {/* Category symbol */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem', letterSpacing: '0.2em',
        color: accentHex, opacity: 0.7, textTransform: 'uppercase',
        zIndex: 1,
      }}>
        {post.category}
      </div>
      {/* Glow orb */}
      <div style={{
        position: 'absolute', width: 120, height: 120, borderRadius: '50%',
        background: `radial-gradient(circle, ${accentHex}30 0%, transparent 70%)`,
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      }} />
    </div>
  );
}

function AuthorAvatar({ name, avatar }: { name?: string; avatar?: string }) {
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'A';
  if (avatar) {
    return <img src={avatar} alt={name} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />;
  }
  return (
    <div style={{
      width: 24, height: 24, borderRadius: '50%',
      background: 'linear-gradient(135deg,#10b981,#3b82f6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.55rem', fontWeight: 700, color: '#000', flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(Math.min(100, pct));
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 100, background: '#0f172a' }}>
      <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#10b981,#3b82f6)', transition: 'width 0.1s linear' }} />
    </div>
  );
}

// ── Simple markdown-ish renderer ─────────────────────────────────────────────
function MarkdownPreview({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', lineHeight: 1.75, color: '#cbd5e1' }}>
      {lines.map((line, i) => {
        if (line.startsWith('# ')) return <h1 key={i} style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', fontWeight: 700, color: '#f9fafb', margin: '1.2rem 0 0.6rem' }}>{line.slice(2)}</h1>;
        if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9', margin: '1rem 0 0.5rem' }}>{line.slice(3)}</h2>;
        if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize: '1rem', fontWeight: 600, color: '#e2e8f0', margin: '0.8rem 0 0.4rem' }}>{line.slice(4)}</h3>;
        if (line.startsWith('- ') || line.startsWith('* ')) return <div key={i} style={{ paddingLeft: '1.2rem', color: '#9ca3af', marginBottom: '0.3rem' }}>• {line.slice(2)}</div>;
        if (line.trim() === '') return <br key={i} />;
        return <p key={i} style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>{line}</p>;
      })}
    </div>
  );
}

export default function BlogPage({ dict, locale = 'en' }: { dict: BlogDict; locale?: string }) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'browse' | 'write'>('browse');
  const [activeCategory, setActiveCategory] = useState(dict.catAll);
  const [topic, setTopic] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [tone, setTone] = useState('tone1');
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [dbPosts, setDbPosts] = useState<Post[]>([]);
  const draftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/posts?status=published')
      .then(r => r.json())
      .then(data => { if (data.posts?.length > 0) setDbPosts(data.posts); })
      .catch(() => {});
  }, []);

  const tones = [
    { key: 'tone1', label: dict.tone1 },
    { key: 'tone2', label: dict.tone2 },
    { key: 'tone3', label: dict.tone3 },
    { key: 'tone4', label: dict.tone4 },
  ];

  const posts: Post[] = (dbPosts.length > 0 ? dbPosts : dict.samplePosts).map((p: any, i) => ({
    slug: p.slug,
    title: p.title || '',
    category: p.category || 'Fintech',
    date: p.created_at
      ? new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : p.date || '',
    readTime: p.readTime || '5',
    excerpt: p.excerpt || (locale === 'vi' ? p.content_vi : p.content_en)
      ?.slice(0, 150).replace(/#+\s/g, '') + '...' || '',
    tags: p.tags || [],
    accent: i % 2 === 0 ? 'green' : 'blue',
    image: p.image,
    author: p.author,
    authorAvatar: p.authorAvatar,
  }));

  const allCategories = [dict.catAll, ...Object.values(dict.categories)];
  const accentColor = (a?: 'green' | 'blue') => a === 'blue' ? '#3b82f6' : '#10b981';

  const filtered = posts
    .filter(p => activeCategory === dict.catAll || p.category === activeCategory)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()));

  const handleGenerate = async () => {
    if (!topic.trim()) { setError(dict.topicRequired); return; }
    setError(''); setLoading(true); setDraft(''); setPreviewMode(false);
    try {
      const res = await fetch('/api/blog-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: topic, keywords, locale,
          tone: tones.find(t => t.key === tone)?.label ?? 'professional',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API error');
      setDraft(data.draft);
      setTimeout(() => draftRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const estReadTime = Math.ceil(wordCount / 200);

  return (
    <div style={s.page}>
      <style>{css}</style>
      <ReadingProgress />

      {/* ── Hero ── */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.heroBadgeRow}>
            <span style={s.badge}>{dict.badge}</span>
            <span style={s.liveIndicator}>
              <span style={s.liveDot} />
              LIVE
            </span>
          </div>
          <h1 style={s.heroTitle}>
            {dict.heroTitle1}{' '}
            <span style={s.gradientText}>{dict.heroTitle2}</span>
            <br />
            {dict.heroTitle3}{' '}
            <span style={{ color: '#3b82f6' }}>{dict.heroTitle4}</span>
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

      {/* ── Tabs + Search ── */}
      <div style={s.tabBar}>
        <div style={s.tabWrap}>
          <div style={{ display: 'flex', flex: 1 }}>
            {(['browse', 'write'] as const).map(tab => (
              <button
                key={tab}
                className={`arch-tab${activeTab === tab ? ' active' : ''}`}
                style={s.tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'browse' ? dict.tabBrowse : dict.tabWrite}
              </button>
            ))}
          </div>
          {activeTab === 'browse' && (
            <div style={s.searchWrap}>
              <span style={s.searchIcon}>⌕</span>
              <input
                style={s.searchInput}
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch('')} style={s.searchClear}>✕</button>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={s.container}>

        {/* ══ BROWSE ══ */}
        {activeTab === 'browse' && (
          <div className="fadein">
            {/* Category pills */}
            <div style={s.catRow}>
              {allCategories.map(c => (
                <button
                  key={c}
                  className={`arch-cat${activeCategory === c ? ' active' : ''}`}
                  style={s.catPill}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Search results count */}
            {search && (
              <div style={s.searchResults}>
                <span style={{ color: '#10b981' }}>{filtered.length}</span>{' '}
                result{filtered.length !== 1 ? 's' : ''} for "{search}"
              </div>
            )}

            {/* Featured post */}
            {filtered[0] && (
              <div
                className="arch-featured"
                style={s.featured}
                onClick={() => router.push(`/${locale}/industry/blog/${filtered[0].slug || ''}`)}
              >
                <PostImage post={filtered[0]} height={280} />
                <div style={s.featuredBody}>
                  <div style={s.featuredTop}>
                    <span style={{
                      ...s.featuredBadge,
                      color: accentColor(filtered[0].accent),
                      background: `${accentColor(filtered[0].accent)}18`,
                      border: `1px solid ${accentColor(filtered[0].accent)}44`,
                    }}>
                      {dict.featured}
                    </span>
                    <span style={{ ...s.catChip, color: accentColor(filtered[0].accent), borderColor: `${accentColor(filtered[0].accent)}40` }}>
                      {filtered[0].category}
                    </span>
                  </div>
                  <h2 style={s.featuredTitle}>{filtered[0].title}</h2>
                  <p style={s.excerpt}>{filtered[0].excerpt}</p>
                  <div style={s.featuredFooter}>
                    <div style={s.authorRow}>
                      <AuthorAvatar name={filtered[0].author} avatar={filtered[0].authorAvatar} />
                      <span style={s.authorName}>{filtered[0].author ?? 'Archaeopteris'}</span>
                      <span style={s.metaDot}>·</span>
                      <span style={s.meta}>{filtered[0].date}</span>
                      <span style={s.metaDot}>·</span>
                      <span style={s.meta}>{filtered[0].readTime} min</span>
                    </div>
                    <div style={s.tagRow}>
                      {filtered[0].tags.slice(0, 3).map(t => <span key={t} style={s.tag}>{t}</span>)}
                    </div>
                    <span style={{ ...s.readBtn, color: accentColor(filtered[0].accent), borderColor: `${accentColor(filtered[0].accent)}50` }}>
                      {dict.readMore} →
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Grid */}
            <div style={s.grid}>
              {filtered.slice(1).map(post => (
                <div
                  key={post.slug || post.title}
                  className="arch-card"
                  style={s.card}
                  onClick={() => router.push(`/${locale}/industry/blog/${post.slug || ''}`)}
                >
                  <PostImage post={post} height={160} />
                  <div style={s.cardBody}>
                    <div style={s.cardTop}>
                      <span style={{ ...s.catChip, color: accentColor(post.accent), borderColor: `${accentColor(post.accent)}40`, fontSize: '0.65rem' }}>
                        {post.category}
                      </span>
                      <span style={s.meta}>{post.readTime} min</span>
                    </div>
                    <h3 style={s.cardTitle}>{post.title}</h3>
                    <p style={s.cardExcerpt}>{post.excerpt}</p>
                    <div style={s.cardFooter}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <AuthorAvatar name={post.author} avatar={post.authorAvatar} />
                        <span style={{ ...s.meta, fontSize: '0.7rem' }}>{post.author ?? 'Archaeopteris'}</span>
                      </div>
                      <div style={s.tagRow}>
                        {post.tags.slice(0, 2).map(t => <span key={t} style={s.tag}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={s.emptyState}>
                <div style={s.emptyIcon}>◇</div>
                <p style={s.emptyText}>{dict.noArticles}</p>
                {search && (
                  <button onClick={() => setSearch('')} style={s.emptyBtn}>Clear search</button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ WRITE ══ */}
        {activeTab === 'write' && (
          <div className="fadein">
            <div style={s.writeHead}>
              <h2 style={s.writeTitle}>
                {dict.writeTitle1}{' '}
                <span style={s.gradientText}>{dict.writeTitle2}</span>{' '}
                {dict.writeTitle3}
              </h2>
              <p style={s.writeSub}>{dict.writeSub}</p>
            </div>

            <div style={s.writeCard}>
              <div style={s.field}>
                <label style={s.label}>
                  {dict.labelTopic}{' '}
                  <span style={{ color: '#10b981' }}>{dict.labelTopicRequired}</span>
                </label>
                <input
                  style={s.input}
                  placeholder={dict.placeholderTopic}
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                />
              </div>

              <div style={s.field}>
                <label style={s.label}>
                  {dict.labelKeywords}{' '}
                  <span style={{ color: '#374151', fontSize: '0.7rem' }}>{dict.labelKeywordsOptional}</span>
                </label>
                <input
                  style={s.input}
                  placeholder={dict.placeholderKeywords}
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                />
              </div>

              <div style={s.field}>
                <label style={s.label}>{dict.labelTone}</label>
                <div style={s.toneRow}>
                  {tones.map(({ key, label }) => (
                    <button
                      key={key}
                      className={`arch-tone${tone === key ? ' active' : ''}`}
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
                {loading
                  ? <span style={s.btnRow}><span style={s.spinner} /> {dict.generating}</span>
                  : <span style={s.btnRow}><span>✦</span> {dict.generateBtn}</span>}
              </button>
            </div>

            {loading && !draft && (
              <div style={s.loadingBox}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ ...s.dot, animationDelay: `${i * 0.2}s` }} />
                ))}
                <span style={s.loadingText}>{dict.writingDraft}</span>
              </div>
            )}

            {draft && (
              <div ref={draftRef} className="fadein" style={s.outputCard}>
                <div style={s.outputHead}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={s.outputLabel}>{dict.outputLabel}</span>
                    <span style={s.wordCount}>{wordCount} words · {estReadTime} min read</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <button
                      className="arch-act"
                      style={{ ...s.actBtn, color: previewMode ? '#10b981' : '#6b7280', borderColor: previewMode ? '#10b98150' : '#1f2937' }}
                      onClick={() => setPreviewMode(v => !v)}
                    >
                      {previewMode ? '✎ Edit' : '◉ Preview'}
                    </button>
                    <button className="arch-act" style={s.actBtn} onClick={handleCopy}>
                      {copied ? dict.copiedBtn : dict.copyBtn}
                    </button>
                    <button
                      className="arch-act"
                      style={{ ...s.actBtn, borderColor: '#1f2937' }}
                      onClick={() => { setDraft(''); setPreviewMode(false); }}
                    >
                      {dict.clearBtn}
                    </button>
                  </div>
                </div>

                {previewMode
                  ? (
                    <div style={{ ...s.draftArea, overflowY: 'auto' }}>
                      <MarkdownPreview text={draft} />
                    </div>
                  )
                  : (
                    <textarea
                      style={s.draftArea}
                      value={draft}
                      onChange={e => setDraft(e.target.value)}
                      spellCheck={false}
                    />
                  )}

                <div style={s.outputFoot}>{dict.outputFooter}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
@keyframes fadein { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes spin { to{transform:rotate(360deg)} }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
.fadein { animation: fadein 0.35s ease; }
.arch-tab { border-bottom:2px solid transparent; transition:all 0.2s; }
.arch-tab:hover { color:#e2e8f0 !important; }
.arch-tab.active { color:#10b981 !important; border-bottom-color:#10b981 !important; }
.arch-cat { transition:all 0.15s; cursor:pointer; }
.arch-cat:hover { border-color:#10b981 !important; color:#10b981 !important; }
.arch-cat.active { background:rgba(16,185,129,0.12) !important; border-color:#10b981 !important; color:#10b981 !important; }
.arch-card { transition:border-color 0.2s,transform 0.2s,box-shadow 0.2s; cursor:pointer; }
.arch-card:hover { border-color:#10b981 !important; transform:translateY(-3px); box-shadow:0 8px 24px rgba(16,185,129,0.08); }
.arch-featured { transition:border-color 0.2s,box-shadow 0.2s; cursor:pointer; }
.arch-featured:hover { border-color:#10b981 !important; box-shadow:0 12px 32px rgba(16,185,129,0.1); }
.arch-tone { transition:all 0.15s; cursor:pointer; }
.arch-tone:hover { border-color:#10b981 !important; color:#10b981 !important; }
.arch-tone.active { background:rgba(16,185,129,0.1) !important; border-color:#10b981 !important; color:#10b981 !important; }
.arch-gen { transition:all 0.2s; }
.arch-gen:not(:disabled):hover { background:linear-gradient(135deg,#059669,#047857) !important; transform:translateY(-1px); box-shadow:0 4px 12px rgba(16,185,129,0.3); }
.arch-gen:disabled { opacity:0.5; cursor:not-allowed; }
.arch-act { transition:all 0.15s; cursor:pointer; }
.arch-act:hover { border-color:#10b981 !important; color:#10b981 !important; }
input,textarea { transition:border-color 0.2s,box-shadow 0.2s; }
input:focus,textarea:focus { outline:none; border-color:#10b981 !important; box-shadow:0 0 0 3px rgba(16,185,129,0.1) !important; }
input::placeholder,textarea::placeholder { color:#374151; }
textarea { resize:vertical; }
::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-thumb { background:#1f2937; border-radius:2px; }
`;

// ── Styles ────────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page: { background: '#0a0a0a', minHeight: '100vh', color: '#e2e8f0', fontFamily: "'Inter',sans-serif" },

  // Hero
  hero: { padding: '72px 0 56px', borderBottom: '1px solid #111827', position: 'relative', overflow: 'hidden' },
  heroInner: { maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 },
  heroBadgeRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' },
  badge: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.1em', color: '#6b7280', textTransform: 'uppercase' },
  liveIndicator: { display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: '#10b981', letterSpacing: '0.12em' },
  liveDot: { width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s ease infinite' },
  heroTitle: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#f9fafb', marginBottom: '1.25rem' },
  gradientText: { background: 'linear-gradient(135deg,#10b981,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  heroSub: { fontSize: '1rem', color: '#9ca3af', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: 560 },
  stats: { display: 'flex', gap: '2.5rem' },
  stat: { display: 'flex', flexDirection: 'column', gap: 3 },
  statVal: { fontSize: '0.9rem', fontWeight: 600, color: '#10b981' },
  statLabel: { fontSize: '0.68rem', fontFamily: "'JetBrains Mono',monospace", color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.08em' },

  // Tab bar
  tabBar: { borderBottom: '1px solid #111827', background: '#0a0a0a', position: 'sticky', top: 0, zIndex: 10 },
  tabWrap: { maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: 16 },
  tab: { background: 'none', border: 'none', borderBottom: '2px solid transparent', padding: '1rem 0', marginRight: '2rem', fontSize: '0.85rem', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.04em', color: '#4b5563', cursor: 'pointer' },
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center', marginLeft: 'auto' },
  searchIcon: { position: 'absolute', left: 10, color: '#4b5563', fontSize: '1rem', pointerEvents: 'none' },
  searchInput: { background: '#0d1117', border: '1px solid #1f2937', borderRadius: 6, padding: '0.4rem 2rem 0.4rem 2rem', fontSize: '0.82rem', color: '#e2e8f0', fontFamily: "'Inter',sans-serif", width: 200 },
  searchClear: { position: 'absolute', right: 8, background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', fontSize: '0.75rem', padding: 2 },

  // Container
  container: { maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' },

  // Category
  catRow: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' },
  catPill: { padding: '0.35rem 0.9rem', fontSize: '0.78rem', fontFamily: "'JetBrains Mono',monospace", border: '1px solid #1f2937', borderRadius: 20, background: 'transparent', color: '#6b7280' },
  searchResults: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: '#4b5563', marginBottom: '1.25rem' },

  // Featured
  featured: { border: '1px solid #1f2937', borderRadius: 10, marginBottom: '1.5rem', background: '#0d1117', overflow: 'hidden' },
  featuredBody: { padding: '1.5rem 2rem 1.75rem' },
  featuredTop: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem', flexWrap: 'wrap' },
  featuredBadge: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.12em', padding: '0.2rem 0.6rem', borderRadius: 3 },
  catChip: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.08em', padding: '0.18rem 0.55rem', borderRadius: 3, border: '1px solid', background: 'transparent' },
  meta: { fontSize: '0.78rem', color: '#4b5563', fontFamily: "'JetBrains Mono',monospace" },
  metaDot: { color: '#1f2937' },
  featuredTitle: { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 700, color: '#f9fafb', lineHeight: 1.25, marginBottom: '0.85rem' },
  excerpt: { fontSize: '0.92rem', color: '#9ca3af', lineHeight: 1.7, marginBottom: '1.25rem' },
  featuredFooter: { display: 'flex', flexDirection: 'column', gap: 10 },
  authorRow: { display: 'flex', alignItems: 'center', gap: 8 },
  authorName: { fontSize: '0.78rem', color: '#6b7280', fontFamily: "'JetBrains Mono',monospace" },
  tagRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' },
  tag: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.67rem', color: '#4b5563', border: '1px solid #1f2937', padding: '0.18rem 0.5rem', borderRadius: 3 },
  readBtn: { display: 'inline-flex', alignItems: 'center', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.08em', border: '1px solid', padding: '0.3rem 0.8rem', borderRadius: 4, background: 'transparent', marginTop: 4, width: 'fit-content' },

  // Grid
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: '1rem' },
  card: { border: '1px solid #111827', borderRadius: 10, background: '#0d1117', overflow: 'hidden' },
  cardBody: { padding: '1.2rem 1.4rem 1.4rem' },
  cardTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' },
  cardTitle: { fontFamily: "'Playfair Display',serif", fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3, marginBottom: '0.65rem' },
  cardExcerpt: { fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.65, marginBottom: '1rem' },
  cardFooter: { display: 'flex', flexDirection: 'column', gap: 8 },

  // Empty state
  emptyState: { textAlign: 'center', padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  emptyIcon: { fontSize: '2rem', color: '#1f2937' },
  emptyText: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.85rem', color: '#374151' },
  emptyBtn: { padding: '0.4rem 1rem', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.78rem', border: '1px solid #1f2937', borderRadius: 4, background: 'transparent', color: '#10b981', cursor: 'pointer' },

  // Write
  writeHead: { marginBottom: '1.75rem' },
  writeTitle: { fontFamily: "'Playfair Display',serif", fontSize: '1.75rem', fontWeight: 700, color: '#f9fafb', letterSpacing: '-0.02em', marginBottom: '0.5rem' },
  writeSub: { fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6 },
  writeCard: { border: '1px solid #111827', borderRadius: 10, padding: '1.75rem', background: '#0d1117', marginBottom: '1.25rem' },
  field: { marginBottom: '1.4rem' },
  label: { display: 'block', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: '#4b5563', marginBottom: '0.55rem' },
  input: { width: '100%', padding: '0.7rem 0.9rem', background: '#111827', border: '1px solid #1f2937', borderRadius: 6, color: '#e2e8f0', fontSize: '0.92rem', fontFamily: "'Inter',sans-serif", boxSizing: 'border-box' },
  toneRow: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  tonePill: { padding: '0.38rem 0.9rem', fontSize: '0.78rem', fontFamily: "'Inter',sans-serif", fontWeight: 500, border: '1px solid #1f2937', borderRadius: 20, background: 'transparent', color: '#6b7280' },
  errorBox: { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 6, padding: '0.65rem 0.9rem', fontSize: '0.82rem', color: '#fca5a5', marginBottom: '1.25rem', fontFamily: "'JetBrains Mono',monospace" },
  genBtn: { width: '100%', padding: '0.82rem', background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', border: 'none', borderRadius: 6, fontSize: '0.9rem', fontFamily: "'Inter',sans-serif", fontWeight: 600, cursor: 'pointer' },
  btnRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' },
  spinner: { display: 'inline-block', width: 13, height: 13, border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' },
  loadingBox: { display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1.5rem', border: '1px solid #111827', borderRadius: 8, background: '#0d1117' },
  dot: { display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'blink 1.2s ease infinite' },
  loadingText: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.78rem', color: '#4b5563' },
  outputCard: { border: '1px solid #111827', borderRadius: 10, overflow: 'hidden', background: '#0d1117' },
  outputHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', borderBottom: '1px solid #111827', background: '#111827', flexWrap: 'wrap', gap: 8 },
  outputLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: '#10b981' },
  wordCount: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: '#4b5563' },
  actBtn: { padding: '0.28rem 0.7rem', fontSize: '0.72rem', fontFamily: "'JetBrains Mono',monospace", border: '1px solid #1f2937', borderRadius: 4, background: 'transparent', color: '#6b7280' },
  draftArea: { width: '100%', minHeight: 420, padding: '1.4rem', background: '#0d1117', border: 'none', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.75, fontFamily: "'Inter',sans-serif", boxSizing: 'border-box', display: 'block' },
  outputFoot: { padding: '0.6rem 1.25rem', borderTop: '1px solid #111827', fontSize: '0.7rem', color: '#374151', fontFamily: "'JetBrains Mono',monospace", background: '#0a0a0a' },
};