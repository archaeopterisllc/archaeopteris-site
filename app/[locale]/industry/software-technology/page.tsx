import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Code2, Zap, Brain, Terminal, ArrowRight } from "lucide-react"

export default async function SoftwareTechnologyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const isVi = locale === "vi"

  const t = {
    hero: {
      badge: isVi ? "Xu Hướng Công Nghệ 2025" : "Technology Trends 2025",
      title1: isVi ? "Software" : "Software",
      title2: isVi ? "Technology" : "Technology",
      title3: isVi ? "Toàn Cảnh" : "Landscape",
      desc: isVi
        ? "Ngành phần mềm đang trải qua cuộc cách mạng lớn nhất trong lịch sử — AI không chỉ hỗ trợ developer mà đang tái định nghĩa cách phần mềm được tạo ra, vận hành và phát triển."
        : "The software industry is undergoing its biggest revolution in history — AI is not just assisting developers but fundamentally redefining how software is created, operated, and evolved.",
    },
    stats: [
      { value: "55%", label: isVi ? "code GitHub được AI hỗ trợ" : "of GitHub code AI-assisted" },
      { value: "$1.8T", label: isVi ? "giá trị ngành software 2025" : "global software industry 2025" },
      { value: "10x", label: isVi ? "tăng tốc độ phát triển với AI" : "faster development with AI" },
      { value: "2025", label: isVi ? "năm agentic coding mainstream" : "year agentic coding mainstream" },
    ],
    trends: {
      title: isVi ? "Xu Hướng Định Hình 2025" : "Trends Shaping 2025",
      items: [
        {
          title: isVi ? "Vibe Coding & AI-Assisted Development" : "Vibe Coding & AI-Assisted Development",
          desc: isVi
            ? "Phương pháp lập trình mới nơi developer dùng ngôn ngữ tự nhiên để hướng dẫn AI tạo code. Năm 2025, hơn 55% code trên GitHub được AI hỗ trợ — không còn là tương lai mà là hiện tại."
            : "A new programming paradigm where developers use natural language to direct AI in generating code. In 2025, over 55% of code on GitHub is AI-assisted — no longer the future, but the present.",
          highlight: true,
          link: `/${locale}/industry/vibecoding`,
          linkLabel: isVi ? "Tìm hiểu về Vibe Coding →" : "Learn about Vibe Coding →",
        },
        {
          title: isVi ? "Agentic AI Systems" : "Agentic AI Systems",
          desc: isVi
            ? "AI agents tự động hoàn thành các tác vụ phức tạp — từ viết code, chạy tests, debug đến deploy. Claude Code, Gemini CLI, Devin đang dẫn đầu làn sóng này."
            : "AI agents autonomously complete complex tasks — from writing code and running tests to debugging and deploying. Claude Code, Gemini CLI, and Devin are leading this wave.",
          highlight: false,
        },
        {
          title: isVi ? "LLM-Native Applications" : "LLM-Native Applications",
          desc: isVi
            ? "Thế hệ ứng dụng mới được xây dựng từ đầu với AI là core — RAG, function calling, multi-agent workflows trở thành stack chuẩn."
            : "A new generation of apps built with AI as the core — RAG, function calling, and multi-agent workflows become the standard stack.",
          highlight: false,
        },
        {
          title: isVi ? "Edge Computing & Serverless" : "Edge Computing & Serverless",
          desc: isVi
            ? "Vercel Edge, Cloudflare Workers cho phép chạy code gần người dùng nhất — latency gần bằng 0, scale vô hạn, không cần quản lý server."
            : "Vercel Edge and Cloudflare Workers enable running code as close to users as possible — near-zero latency, infinite scale, zero server management.",
          highlight: false,
        },
      ],
    },
    stack: {
      title: isVi ? "Modern Tech Stack 2025" : "Modern Tech Stack 2025",
      categories: [
        { name: "Frontend", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
        { name: "Backend & API", items: ["Node.js", "Bun", "Hono", "tRPC", "GraphQL"] },
        { name: "AI & LLM", items: ["Claude API", "OpenAI API", "Vercel AI SDK", "LangChain", "LlamaIndex"] },
        { name: "Infrastructure", items: ["Vercel", "Cloudflare", "Supabase", "PlanetScale", "Upstash"] },
      ],
    },
    deepdives: {
      title: isVi ? "Khám Phá Chuyên Sâu" : "Deep Dives",
      items: [
        {
          title: "Vibe Coding",
          desc: isVi
            ? "AI-assisted programming — tools, workflow, best practices và tác động đến ngành dev."
            : "AI-assisted programming — tools, workflow, best practices and industry impact.",
          link: `/${locale}/industry/vibecoding`,
          badge: isVi ? "Nổi bật" : "Featured",
        },
      ],
    },
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar locale={locale} langDict={dict.language} navDict={dict.nav} />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">{t.hero.badge}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-primary">{t.hero.title1} </span>
            <span className="text-accent">{t.hero.title2}</span>
            <br />
            <span className="text-foreground">{t.hero.title3}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t.hero.desc}</p>
        </div>
      </section>

      <section className="py-10 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.stats.map((stat) => (
            <div key={stat.value} className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{t.trends.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {t.trends.items.map((item) => (
            <div key={item.title} className={`rounded-xl p-8 border ${item.highlight ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20" : "bg-card border-border"}`}>
              {item.highlight && (
                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
                  <Zap className="w-3 h-3" />
                  {isVi ? "Xu hướng nổi bật" : "Trending Now"}
                </div>
              )}
              <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
              {item.link && (
                <Link href={item.link} className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all">
                  {item.linkLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-md bg-accent/20 border border-accent/30 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t.stack.title}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {t.stack.categories.map((cat) => (
              <div key={cat.name} className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-primary mb-4 pb-2 border-b border-border">{cat.name}</h3>
                <div className="space-y-2">
                  {cat.items.map((item) => (
                    <div key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{t.deepdives.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.deepdives.items.map((item) => (
            <Link key={item.title} href={item.link} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                {item.badge && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{item.badge}</span>
                )}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
              <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                {isVi ? "Xem chi tiết" : "Read more"}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer dict={dict.common} navDict={dict.nav} locale={locale} />
    </main>
  )
}
