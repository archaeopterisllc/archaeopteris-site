'use client'

import { useState, useEffect } from 'react'

type Page = {
  id: string
  slug: string
  status: 'draft' | 'published'
  title_en: string
  content_en: string | null
  title_vi: string | null
  content_vi: string | null
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
  const [generatedCode, setGeneratedCode] = useState('')
  const [showGenerate, setShowGenerate] = useState(false)
  const [showNewPage, setShowNewPage] = useState(false)
  const [newSlug, setNewSlug] = useState('')
  const [newTitle, setNewTitle] = useState('')

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
    setGeneratedCode('')
    setShowGenerate(false)
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
      body: JSON.stringify({ id: selected.id, content_en: contentEn, content_vi: contentVi })
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

  const handleGenerate = async () => {
    if (!selected || !description) return
    setLoading(true)
    const res = await fetch('/api/page-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: selected.slug, description })
    })
    const data = await res.json()
    setGeneratedCode(data.code || '')
    setLoading(false)
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

  return (
    <div className="flex max-w-7xl mx-auto px-4 py-10 gap-6">
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
                <h2 className="text-xl font-bold">{selected.title_en}</h2>
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
                <textarea
                  className="w-full h-24 bg-background border rounded p-3 text-sm resize-none outline-none"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Mô tả page này..."
                />
                <button
                  onClick={handleGenerate}
                  disabled={loading || !description}
                  className="px-4 py-2 text-sm bg-emerald-600 text-white rounded disabled:opacity-50"
                >
                  {loading ? 'Generating...' : '✨ Generate TSX'}
                </button>
                {generatedCode && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Copy và paste vào file page:</p>
                    <textarea
                      className="w-full h-64 bg-background border rounded p-3 text-xs font-mono resize-none outline-none"
                      value={generatedCode}
                      readOnly
                    />
                  </div>
                )}
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
