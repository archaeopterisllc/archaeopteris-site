'use client'

import { useState, useEffect } from 'react'

type Post = {
  id: string
  title: string
  content: string
  status: 'draft' | 'published'
  locale: string
  keywords: string
  tone: string
  created_at: string
  updated_at: string
  content_en?: string
  content_vi?: string
}

export default function AdminPanel() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selected, setSelected] = useState<Post | null>(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all')

  useEffect(() => {
    fetchPosts()
  }, [filter])

  const fetchPosts = async () => {
    const url = filter === 'all' ? '/api/posts' : `/api/posts?status=${filter}`
    const res = await fetch(url)
    const data = await res.json()
    setPosts(data.posts || [])
  }

  const handleSelect = (post: Post) => {
    setSelected(post)
   // setContent(post.content)
   setContent(post.locale === 'vi' ? post.content_vi : post.content_en)

  }
const handleSave = async () => {
  if (!selected) return
  setLoading(true)
  
  // Auto translate sang locale còn lại
  const translateRes = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      content, 
      fromLocale: selected.locale 
    })
  })
  const { translated } = await translateRes.json()

  await fetch(`/api/posts/${selected.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      content_en: selected.locale === 'vi' ? translated : content,
      content_vi: selected.locale === 'vi' ? content : translated
    })
  })
  setLoading(false)
  fetchPosts()
}

 /* const handleSave = async () => {
    if (!selected) return
    setLoading(true)
    await fetch(`/api/posts/${selected.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify({ content }),
      body: JSON.stringify({ 
  content_en: post.locale === 'vi' ? undefined : content,
  content_vi: post.locale === 'vi' ? content : undefined
}),

    })
    setLoading(false)
    fetchPosts()
  }*/

  const handlePublish = async () => {
    if (!selected) return
    setLoading(true)
    await fetch(`/api/posts/${selected.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, status: 'published' }),
    })
    setSelected({ ...selected, status: 'published' })
    setLoading(false)
    fetchPosts()
  }

  const handleUnpublish = async () => {
    if (!selected) return
    setLoading(true)
    await fetch(`/api/posts/${selected.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'draft' }),
    })
    setSelected({ ...selected, status: 'draft' })
    setLoading(false)
    fetchPosts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Xóa bài này?')) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (selected?.id === id) setSelected(null)
    fetchPosts()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex gap-6">

      {/* Sidebar — danh sách posts */}
      <div className="w-80 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Blog Posts</h2>
          <select
            className="text-xs bg-muted border border-border rounded px-2 py-1"
            value={filter}
            onChange={e => setFilter(e.target.value as typeof filter)}
          >
            <option value="all">Tất cả</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="space-y-2">
          {posts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Chưa có bài viết nào
            </p>
          )}
          {posts.map(post => (
            <div
              key={post.id}
              onClick={() => handleSelect(post)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selected?.id === post.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium line-clamp-2">{post.title}</p>
                <button
                  onClick={e => { e.stopPropagation(); handleDelete(post.id) }}
                  className="text-muted-foreground hover:text-destructive shrink-0 text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  post.status === 'published'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {post.status === 'published' ? 'Published' : 'Draft'}
                </span>
                <span className="text-xs text-muted-foreground uppercase">{post.locale}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(post.created_at).toLocaleDateString('vi-VN')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-w-0">
        {!selected ? (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            Chọn bài viết để chỉnh sửa
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{selected.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {selected.keywords && `Keywords: ${selected.keywords}`}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                {selected.status === 'draft' ? (
                  <button
                    onClick={handlePublish}
                    disabled={loading}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {loading ? '...' : '✦ Publish'}
                  </button>
                ) : (
                  <button
                    onClick={handleUnpublish}
                    disabled={loading}
                    className="px-4 py-2 text-sm bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors disabled:opacity-50"
                  >
                    Unpublish
                  </button>
                )}
              </div>
            </div>

            <textarea
              className="w-full h-[calc(100vh-280px)] p-4 bg-muted border border-border rounded-lg text-sm font-mono resize-none outline-none focus:border-primary transition-colors"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Nội dung Markdown..."
            />
          </div>
        )}
      </div>
    </div>
  )
}
