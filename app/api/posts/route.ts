import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET — lấy tất cả posts (admin) hoặc published (public)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) query.eq('status', status)

  const { data, error } = await query
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ posts: data })
}

// POST — tạo draft mới
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, keywords, tone, content, locale } = body

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80)

  const { data, error } = await supabase
    .from('posts')
    .insert({ title, slug, keywords, tone, content, locale, status: 'draft' })
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ post: data })
}
