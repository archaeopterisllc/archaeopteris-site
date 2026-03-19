import type { Locale } from '@/lib/i18n/config'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const dict = getDictionary(locale)

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Navbar locale={locale} langDict={dict.language} navDict={dict.nav} />
      <article className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-8">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            {post.title}
          </h1>
          {post.keywords && (
            <p className="text-sm text-muted-foreground">Keywords: {post.keywords}</p>
          )}
        </div>
        <div className="prose prose-invert prose-green max-w-none">
          {post.content.split('\n').map((line: string, i: number) => {
            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-8 mb-3 text-foreground">{line.replace('## ', '')}</h2>
            if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mt-8 mb-3 text-foreground">{line.replace('# ', '')}</h1>
            if (line.startsWith('- ')) return <li key={i} className="ml-4 text-muted-foreground">{line.replace('- ', '')}</li>
            if (line === '') return <br key={i} />
            return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{line}</p>
          })}
        </div>
      </article>
      <Footer dict={dict.common} navDict={dict.nav} locale={locale} />
    </main>
  )
}
