'use client'

import { useState, useEffect, useRef } from 'react'
import LivePageRenderer from '@/components/live-page-renderer'
import {
  VIBES, STYLES, TECH, ANIMATIONS, COMPONENTS, INTERACTIONS,
  buildPromptClean, validateSelection,
  type Snippet,
} from '@/lib/prompt-libraryn'

type Page = {
  id: string
  slug: string
  status: 'draft' | 'published'
  title_en: string
  content_en: string | null
  title_vi: string | null
  content_vi: string | null
  tsx_content: string | null
  updated_at: string
}

export default function PagesPanel() {
  const [pages, setPages] = useState<Page[]>([])
  const [selected, setSelected] = useState<Page | null>(null)
  const [loading, setLoading] = useState(false)
  const [contentEn, setContentEn] = useState('')
  const [contentVi, setContentVi] = useState('')
  const [tab, setTab] = useState<'en' | 'vi'>('en')
  const [description, setDescription] = useState('')
  const [vibe, setVibe] = useState<string>('')

  const [showStylePicker, setShowStylePicker] = useState(false)
  const [showTechPicker, setShowTechPicker] = useState(false)
  // unified: replaces selectedStyles + selectedTechs
  const [selectedSnippets, setSelectedSnippets] = useState<string[]>([])

  const [previewMode, setPreviewMode] = useState<'code' | 'live'>('code')
  const previewRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const [generatedCode, setGeneratedCode] = useState('')
  const [showGenerate, setShowGenerate] = useState(false)
  const [showNewPage, setShowNewPage] = useState(false)
  const [newSlug, setNewSlug] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [validationWarnings, setValidationWarnings] = useState<string[]>([])

  useEffect(() => { fetchPages() }, [])

  const fetchPages = async () => {
    const res = await fetch('/api/pages')
    const data = await res.json()
    setPages(data.pages || [])
  }

  const handleSelect = (page: Page) => {
    setSelected(page)
    setContentEn(page.content_en || '')
    setContentVi(page.content_vi || '')
    setTab('en')
    setGeneratedCode(page.tsx_content || '')
    setShowGenerate(!!page.tsx_content)
  }

  const handleNewPage = async () => {
    if (!newSlug || !newTitle) return
    setLoading(true)
    await fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: newSlug, title_en: newTitle, status: 'draft' })
    })
    setNewSlug('')
    setNewTitle('')
    setShowNewPage(false)
    setLoading(false)
    fetchPages()
  }

  const handleSave = async () => {
    if (!selected) return
    setLoading(true)
    await fetch('/api/pages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, content_en: contentEn, content_vi: contentVi, title_en: selected.title_en })
    })
    setLoading(false)
    fetchPages()
  }

  const handleTranslate = async () => {
    if (!contentEn) return
    setLoading(true)
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: contentEn, fromLocale: 'en' })
    })
    const data = await res.json()
    setContentVi(data.translated || '')
    setTab('vi')
    setLoading(false)
  }

  // Build selected Snippet objects from IDs
  const getSelectedSnippetObjs = (): Snippet[] => {
    const allSnippets = [...VIBES, ...STYLES, ...TECH, ...ANIMATIONS, ...COMPONENTS, ...INTERACTIONS]
    const vibeObj = VIBES.find(v => v.id === vibe)
    const rest = allSnippets.filter(s => selectedSnippets.includes(s.id))
    return vibeObj ? [vibeObj, ...rest.filter(s => s.id !== vibe)] : rest
  }

  // Check if a snippet id is blocked by current selection
  const getBlockedIds = (): Set<string> => {
  const objs = getSelectedSnippetObjs()
  if (objs.length === 0) return new Set()
  const blocked = new Set<string>()
  objs.forEach(snippet => {
    snippet.conflicts?.forEach(c => blocked.add(c))
  })
  return blocked
}


  const toggleSnippet = (id: string) => {
    const next = selectedSnippets.includes(id)
      ? selectedSnippets.filter(x => x !== id)
      : [...selectedSnippets, id]

    setSelectedSnippets(next)

    // Re-validate and show warnings
    const allSnippets = [...VIBES, ...STYLES, ...TECH, ...ANIMATIONS, ...COMPONENTS, ...INTERACTIONS]
    const vibeObj = VIBES.find(v => v.id === vibe)
    const objs = [
      ...(vibeObj ? [vibeObj] : []),
      ...allSnippets.filter(s => next.includes(s.id))
    ]
    const { warnings } = validateSelection(objs)
    setValidationWarnings(warnings)
  }

  const handleGenerate = async () => {
    if (!selected || !description) return
    setLoading(true)

    const snippetObjs = getSelectedSnippetObjs()
    const { valid, removed } = validateSelection(snippetObjs)

    const prompt = buildPromptClean(valid, description, keywords)

    const res = await fetch('/api/page-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: selected.slug, prompt })
    })
    const data = await res.json()
    setGeneratedCode(data.code || '')
    setPreviewMode('code')
    setLoading(false)

    if (removed.length > 0) {
      setValidationWarnings(prev => [
        ...prev,
        `Auto-removed conflicts: ${removed.map(r => r.snippet.label).join(', ')}`
      ])
    }
  }

  const handlePublish = async () => {
    if (!selected) return
    setLoading(true)
    const cleanCode = generatedCode
      .replace(/```jsx|```tsx|```/g, '')
      .replace(/^import.*$/gm, '')
      .trim()
    await fetch('/api/pages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, status: 'published', tsx_content: cleanCode })
    })
    setSelected({ ...selected, status: 'published' })
    setLoading(false)
    fetchPages()
  }

  const handleUnpublish = async () => {
    if (!selected) return
    setLoading(true)
    await fetch('/api/pages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, status: 'draft' })
    })
    setSelected({ ...selected, status: 'draft' })
    setLoading(false)
    fetchPages()
  }

  useEffect(() => {
    if (!previewRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1280)
    })
    observer.observe(previewRef.current)
    return () => observer.disconnect()
  }, [previewMode])

  const blockedIds = getBlockedIds()
  const selectedStyleCount = [...STYLES, ...ANIMATIONS, ...COMPONENTS, ...INTERACTIONS]
    .filter(s => selectedSnippets.includes(s.id)).length
  const selectedTechCount = TECH.filter(s => selectedSnippets.includes(s.id)).length

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-10 gap-6">

      {/* Sidebar */}
      <div className="w-80 shrink-0 space-y-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Pages</h2>
          <button
            onClick={() => setShowNewPage(!showNewPage)}
            className="px-3 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            + New Page
          </button>
        </div>

        {showNewPage && (
          <div className="p-3 border rounded-lg bg-muted/30 space-y-2 mb-2">
            <input
              className="w-full bg-background border rounded px-3 py-1.5 text-sm outline-none"
              placeholder="slug (vd: test-page)"
              value={newSlug}
              onChange={e => setNewSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            />
            <input
              className="w-full bg-background border rounded px-3 py-1.5 text-sm outline-none"
              placeholder="Title (English)"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleNewPage}
                disabled={loading || !newSlug || !newTitle}
                className="px-3 py-1 text-xs bg-emerald-600 text-white rounded disabled:opacity-50"
              >
                Create
              </button>
              <button
                onClick={() => setShowNewPage(false)}
                className="px-3 py-1 text-xs border rounded hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {pages.length === 0 && (
          <p className="text-sm text-muted-foreground">Chưa có page nào</p>
        )}
        {pages.map(page => (
          <div
            key={page.id}
            onClick={() => handleSelect(page)}
            className={`p-3 rounded-lg border cursor-pointer ${
              selected?.id === page.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{page.title_en}</p>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                page.status === 'published' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {page.status === 'published' ? 'Published' : 'Draft'}
              </span>
              <button
                onClick={async (e) => {
                  e.stopPropagation()
                  if (!confirm('Xóa page này?')) return
                  await fetch('/api/pages', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: page.id })
                  })
                  fetchPages()
                }}
                className="text-xs px-1.5 py-0.5 rounded bg-red-900/50 text-red-400 hover:bg-red-800"
              >✕</button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">/{page.slug}</p>
            {page.title_vi && <span className="text-xs text-blue-500">🌐 VI</span>}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 min-w-0">
        {!selected ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Chọn page để chỉnh sửa
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <input
                  className="w-full bg-background border rounded px-3 py-1 text-xl font-bold mb-1"
                  value={selected.title_en}
                  onChange={e => setSelected({ ...selected, title_en: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">/{selected.slug}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button onClick={handleSave} disabled={loading} className="px-4 py-2 text-sm border rounded hover:bg-muted disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button onClick={handleTranslate} disabled={loading} className="px-4 py-2 text-sm border rounded hover:bg-muted disabled:opacity-50">
                  {loading ? '...' : '🌐 Translate VI'}
                </button>
                <button onClick={() => setShowGenerate(!showGenerate)} className="px-4 py-2 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700">
                  ✨ AI Generate
                </button>
                {selected.status === 'draft' ? (
                  <button onClick={handlePublish} disabled={loading} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded disabled:opacity-50">
                    {loading ? '...' : '✓ Publish'}
                  </button>
                ) : (
                  <button onClick={handleUnpublish} disabled={loading} className="px-4 py-2 text-sm border rounded hover:bg-muted disabled:opacity-50">
                    Unpublish
                  </button>
                )}
              </div>
            </div>

            {showGenerate && (
              <div className="p-4 border rounded-lg bg-muted/30 space-y-3">
                <p className="text-sm font-medium">✨ AI Generate Page Component</p>

                {/* Keywords */}
                <input
                  className="w-full bg-background border rounded px-3 py-1.5 text-sm outline-none"
                  placeholder="Keywords (e.g. trading, minimal, dark...)"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />

                {/* Vibe */}
                <div className="flex flex-wrap gap-2">
                  {VIBES.map((v) => (
                    <button key={v.id} onClick={() => setVibe(vibe === v.id ? '' : v.id)}
                      className={`px-3 py-1 text-xs rounded capitalize ${vibe === v.id ? 'bg-emerald-600 text-white' : 'border'}`}>
                      {v.label}
                    </button>
                  ))}
                </div>

                {/* Style + Tech pickers */}
                <div className="flex gap-2">
                  <button onClick={() => setShowStylePicker(!showStylePicker)}
                    className="flex-1 px-3 py-1.5 text-xs rounded border border-gray-600 text-gray-400">
                    🎨 Styles {selectedStyleCount > 0 && `(${selectedStyleCount})`}
                  </button>
                  <button onClick={() => setShowTechPicker(!showTechPicker)}
                    className="flex-1 px-3 py-1.5 text-xs rounded border border-gray-600 text-gray-400">
                    ⚡ Tech {selectedTechCount > 0 && `(${selectedTechCount})`}
                  </button>
                </div>

                {/* Style picker */}
                {showStylePicker && (
                  <div className="border border-gray-700 rounded-xl p-4 bg-gray-900">
                    <div className="flex justify-between mb-2">
                      <p className="text-xs text-gray-400">Select styles:</p>
                      <button onClick={() => setShowStylePicker(false)} className="text-xs text-gray-500">✕</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[...STYLES, ...ANIMATIONS, ...COMPONENTS, ...INTERACTIONS].map((s) => {
                        const isSelected = selectedSnippets.includes(s.id)
                        const isBlocked = !isSelected && blockedIds.has(s.id)
                        return (
                          <button key={s.id}
                            disabled={isBlocked}
                            onClick={() => toggleSnippet(s.id)}
                            className={`px-2 py-1 text-xs rounded transition-all ${
                              isSelected ? 'bg-emerald-600 text-white'
                              : isBlocked ? 'opacity-30 cursor-not-allowed border border-gray-700 text-gray-600'
                              : 'border border-gray-600 text-gray-400 hover:border-emerald-500'
                            }`}
                            title={isBlocked ? 'Conflicts with current selection' : ''}>
                            {s.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Tech picker */}
                {showTechPicker && (
                  <div className="border border-gray-700 rounded-xl p-4 bg-gray-900">
                    <div className="flex justify-between mb-2">
                      <p className="text-xs text-gray-400">Select tech:</p>
                      <button onClick={() => setShowTechPicker(false)} className="text-xs text-gray-500">✕</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TECH.map((t) => {
                        const isSelected = selectedSnippets.includes(t.id)
                        const isBlocked = !isSelected && blockedIds.has(t.id)
                        return (
                          <button key={t.id}
                            disabled={isBlocked}
                            onClick={() => toggleSnippet(t.id)}
                            className={`px-2 py-1 text-xs rounded transition-all ${
                              isSelected ? 'bg-emerald-600 text-white'
                              : isBlocked ? 'opacity-30 cursor-not-allowed border border-gray-700 text-gray-600'
                              : 'border border-gray-600 text-gray-400 hover:border-emerald-500'
                            }`}
                            title={isBlocked ? 'Conflicts with current selection' : ''}>
                            {t.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Validation warnings */}
                {validationWarnings.length > 0 && (
                  <div className="space-y-1">
                    {validationWarnings.map((w, i) => (
                      <p key={i} className="text-xs text-amber-400 bg-amber-900/20 px-3 py-1.5 rounded border border-amber-800">
                        ⚠️ {w}
                      </p>
                    ))}
                  </div>
                )}

                {/* Prompt preview */}
                {(keywords || vibe || selectedSnippets.length > 0) && (
                  <div className="p-2 rounded bg-black/40 border border-gray-800 text-xs text-gray-500 font-mono max-h-20 overflow-auto">
                    {buildPromptClean(getSelectedSnippetObjs(), description || '...', keywords).slice(0, 200)}...
                  </div>
                )}

                {/* Description */}
                <textarea
                  className="w-full h-24 bg-background border rounded p-3 text-sm resize-none outline-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả trang này..."
                />

                {/* Generate */}
                <button onClick={handleGenerate}
                  disabled={loading || !description}
                  className="w-full px-4 py-2.5 text-sm bg-emerald-600 text-white rounded disabled:opacity-50 font-medium">
                  {loading ? 'Generating...' : '✨ Generate TSX'}
                </button>
              </div>
            )}

            {(generatedCode || selected?.tsx_content) && (
              <div className="space-y-2">
                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() => setPreviewMode('code')}
                    className={`px-2 py-1 rounded border ${previewMode === 'code' ? 'bg-emerald-600 text-white' : 'hover:bg-muted'}`}
                  >Code</button>
                  <button
                    onClick={() => setPreviewMode('live')}
                    className={`px-2 py-1 rounded border ${previewMode === 'live' ? 'bg-emerald-600 text-white' : 'hover:bg-muted'}`}
                  >⚡ Live</button>
                </div>
                {previewMode === 'code'
                  ? <textarea className="w-full h-64 bg-background border rounded p-3 text-xs font-mono" value={generatedCode} onChange={e => setGeneratedCode(e.target.value)} />
                  : <div ref={previewRef} className="border rounded overflow-y-auto" style={{ height: '60vh' }}>
                    <div style={{
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                      width: `${100 / scale}%`,
                      height: `${100 / scale}%`,
                    }}>
                      <LivePageRenderer code={generatedCode} />
                    </div>
                  </div>
                }
              </div>
            )}

            <div className="flex gap-2 border-b">
              <button onClick={() => setTab('en')} className={`px-4 py-2 text-sm ${tab === 'en' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}>
                🇺🇸 English
              </button>
              <button onClick={() => setTab('vi')} className={`px-4 py-2 text-sm ${tab === 'vi' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}>
                🇻🇳 Tiếng Việt
              </button>
            </div>

            <textarea
              className="w-full h-[calc(100vh-320px)] bg-muted border rounded p-4 text-sm resize-none outline-none"
              value={tab === 'en' ? contentEn : contentVi}
              onChange={e => tab === 'en' ? setContentEn(e.target.value) : setContentVi(e.target.value)}
              placeholder={tab === 'en' ? 'English content...' : 'Nội dung tiếng Việt...'}
            />
          </div>
        )}
      </div>
    </div>
  )
}
