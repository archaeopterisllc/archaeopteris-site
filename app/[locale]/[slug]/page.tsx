import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function DynamicPage({ params }: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!page) notFound()

  const content = locale === 'vi' ? page.content_vi || page.content_en : page.content_en
  const title = locale === 'vi' ? page.title_vi || page.title_en : page.title_en

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="prose prose-invert max-w-none whitespace-pre-wrap text-muted-foreground">
        {content}
      </div>
    </div>
  )
}
