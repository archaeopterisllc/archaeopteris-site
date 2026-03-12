import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Code2, Zap, Wrench, GitBranch, Users, AlertTriangle } from "lucide-react"

export default async function VibeCodingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const isVi = locale === "vi"

  const t = {
    hero: {
      badge: isVi ? "Xu Hướng Công Nghệ" : "Tech Trend",
      title1: isVi ? "Vibe" : "Vibe",
      title2: isVi ? "Coding" : "Coding",
      title3: isVi ? "Toàn Cảnh" : "Explained",
      desc: isVi
        ? "Tổng quan toàn diện về phong trào lập trình hỗ trợ bởi AI — từ nguồn gốc, công cụ phổ biến, workflow hiện đại đến những tranh luận trong cộng đồng developer toàn cầu."
        : "A comprehensive overview of AI-assisted programming — from its origins and popular tools to modern workflows and the ongoing debates within the global developer community.",
    },
    what: {
      title: isVi ? "Vibe Coding Là Gì?" : "What Is Vibe Coding?",
      p1: isVi
        ? "Vibe coding là phương pháp lập trình trong đó developer sử dụng AI (như Claude, GPT-4, Gemini) như một đối tác sáng tạo — mô tả ý định bằng ngôn ngữ tự nhiên và để AI tạo ra phần lớn code. Thay vì viết từng dòng code thủ công, developer tập trung vào kiến trúc, logic nghiệp vụ và review kết quả."
        : "Vibe coding is a programming approach where developers use AI (like Claude, GPT-4, Gemini) as a creative partner — describing intent in natural language and letting AI generate most of the code. Instead of writing every line manually, developers focus on architecture, business logic, and reviewing outputs.",
      p2: isVi
        ? "Thuật ngữ này được Andrej Karpathy phổ biến đầu năm 2025, mô tả trạng thái làm việc nơi bạn 'cảm nhận vibe' của codebase và để AI xử lý implementation details, trong khi developer giữ vai trò điều phối cấp cao."
        : "The term was popularized by Andrej Karpathy in early 2025, describing a state of working where you 'feel the vibe' of the codebase and let AI handle implementation details, while the developer maintains high-level orchestration.",
    },
    history: {
      title: isVi ? "Lịch Sử & Nguồn Gốc" : "History & Origins",
      items: [
        { year: "2021", text: isVi ? "GitHub Copilot ra mắt, lần đầu tiên đưa AI autocomplete vào editor — đặt nền móng cho AI-assisted coding." : "GitHub Copilot launched, introducing AI autocomplete into editors for the first time — laying the foundation for AI-assisted coding." },
        { year: "2023", text: isVi ? "ChatGPT và GPT-4 bùng nổ. Cursor IDE ra đời, tích hợp LLM trực tiếp vào editor với khả năng chat và edit toàn file." : "ChatGPT and GPT-4 exploded in popularity. Cursor IDE emerged, integrating LLMs directly into the editor with full-file chat and edit capabilities." },
        { year: "2024", text: isVi ? "Claude 3, Gemini, v0 by Vercel ra mắt. Bolt.new, Lovable và các AI builder cho phép tạo app hoàn chỉnh từ prompt." : "Claude 3, Gemini, v0 by Vercel launched. Bolt.new, Lovable and AI builders enabled complete app generation from a single prompt." },
        { year: "2025", text: isVi ? "Andrej Karpathy đặt tên 'vibe coding'. Claude Code, Gemini CLI ra đời. Agentic coding trở thành mainstream." : "Andrej Karpathy coined 'vibe coding'. Claude Code and Gemini CLI launched. Agentic coding went mainstream." },
      ],
    },
    tools: {
      title: isVi ? "Các Tool Phổ Biến" : "Popular Tools",
      categories: [
        {
          name: isVi ? "AI Editors & IDEs" : "AI Editors & IDEs",
          items: [
            { name: "Cursor", desc: isVi ? "IDE fork từ VS Code, tích hợp Claude/GPT sâu nhất hiện tại." : "VS Code fork with the deepest Claude/GPT integration available." },
            { name: "Windsurf", desc: isVi ? "IDE của Codeium với Cascade agent — tự động hoàn thành toàn bộ task." : "Codeium's IDE with Cascade agent — autonomously completes entire tasks." },
            { name: "GitHub Copilot", desc: isVi ? "Plugin phổ biến nhất, hỗ trợ mọi editor chính." : "Most widely used plugin, supports all major editors." },
          ],
        },
        {
          name: isVi ? "AI Builders & No-Code" : "AI Builders & No-Code",
          items: [
            { name: "Bolt.new", desc: isVi ? "Tạo full-stack app từ prompt, deploy trực tiếp." : "Generate full-stack apps from a prompt and deploy instantly." },
            { name: "Lovable", desc: isVi ? "Tập trung vào React app với UX đẹp, có GitHub sync." : "Focuses on beautiful React apps with GitHub sync." },
            { name: "v0 by Vercel", desc: isVi ? "Sinh UI components chuẩn shadcn/ui từ mô tả văn bản." : "Generates shadcn/ui components from text descriptions." },
          ],
        },
        {
          name: isVi ? "Agentic CLI Tools" : "Agentic CLI Tools",
          items: [
            { name: "Claude Code", desc: isVi ? "CLI của Anthropic — agent tự điều hướng codebase, viết và chạy code." : "Anthropic's CLI — agent that navigates codebases, writes and runs code." },
            { name: "Gemini CLI", desc: isVi ? "Agent dòng lệnh của Google với context window 1M token." : "Google's CLI agent with 1M token context window." },
            { name: "Aider", desc: isVi ? "Open-source CLI agent, hỗ trợ nhiều model, tích hợp git." : "Open-source CLI agent supporting multiple models with git integration." },
          ],
        },
      ],
    },
    workflow: {
      title: isVi ? "Workflow & Best Practices" : "Workflow & Best Practices",
      steps: [
        { step: "01", title: isVi ? "Thiết Kế Trước" : "Design First", desc: isVi ? "Viết rõ yêu cầu, kiến trúc và constraints trước khi prompt. AI cho kết quả tốt hơn khi có context đầy đủ." : "Clearly define requirements, architecture, and constraints before prompting. AI produces better results with full context." },
        { step: "02", title: isVi ? "Prompt Có Cấu Trúc" : "Structured Prompting", desc: isVi ? "Chia nhỏ task, cung cấp ví dụ, chỉ định tech stack và coding style. Tránh prompt mơ hồ." : "Break down tasks, provide examples, specify tech stack and coding style. Avoid vague prompts." },
        { step: "03", title: isVi ? "Review & Iterate" : "Review & Iterate", desc: isVi ? "Luôn đọc và hiểu code AI sinh ra. Không merge code chưa review. Treat AI như junior dev cần oversight." : "Always read and understand AI-generated code. Never merge unreviewed code. Treat AI like a junior dev needing oversight." },
        { step: "04", title: isVi ? "Test Nghiêm Túc" : "Test Rigorously", desc: isVi ? "AI hay bỏ sót edge cases. Viết tests, dùng AI để sinh test cases, và luôn verify logic quan trọng thủ công." : "AI often misses edge cases. Write tests, use AI to generate test cases, and always verify critical logic manually." },
      ],
    },
    impact: {
      title: isVi ? "Tác Động Đến Ngành Dev" : "Impact on the Dev Industry",
      stats: [
        { value: "55%", label: isVi ? "code tại GitHub được AI hỗ trợ (2024)" : "of code on GitHub AI-assisted (2024)" },
        { value: "10x", label: isVi ? "tăng tốc độ prototype theo khảo sát" : "faster prototyping reported" },
        { value: "~40%", label: isVi ? "developer dùng AI tools hàng ngày" : "of developers use AI tools daily" },
        { value: "2025", label: isVi ? "năm agentic coding mainstream" : "year agentic coding went mainstream" },
      ],
      p1: isVi
        ? "Vibe coding đang tái định nghĩa vai trò của developer — từ người viết code thủ công sang người điều phối AI systems. Kỹ năng quan trọng nhất không còn là syntax thuần thục mà là tư duy hệ thống và khả năng đánh giá output."
        : "Vibe coding is redefining the developer role — from manual code writer to AI systems orchestrator. The most valuable skill is no longer syntax mastery but systems thinking and output evaluation.",
      p2: isVi
        ? "Các công ty như Shopify, Stripe và Vercel báo cáo tăng năng suất đáng kể. Một số startup 2024–2025 được xây dựng gần như hoàn toàn bởi non-technical founder sử dụng AI builders."
        : "Companies like Shopify, Stripe, and Vercel report significant productivity gains. Some 2024–2025 startups were built almost entirely by non-technical founders using AI builders.",
    },
    debate: {
      title: isVi ? "Tranh Luận & Giới Hạn" : "Debates & Limitations",
      items: [
        { title: isVi ? "Chất Lượng Code" : "Code Quality", desc: isVi ? "AI thường sinh code hoạt động nhưng không tối ưu — thiếu error handling, security vulnerabilities, technical debt tích lũy nhanh nếu không review kỹ." : "AI often generates working but suboptimal code — missing error handling, security vulnerabilities, and technical debt accumulates quickly without thorough review." },
        { title: isVi ? "Phụ Thuộc & Deskilling" : "Dependency & Deskilling", desc: isVi ? "Nhiều developer lo ngại mất khả năng debug và hiểu sâu hệ thống khi quá phụ thuộc vào AI. 'Vibe coder' có thể gặp khó khi AI không giải quyết được vấn đề phức tạp." : "Many developers worry about losing debugging ability through over-reliance on AI. 'Vibe coders' may struggle when AI can't solve complex problems." },
        { title: isVi ? "Bảo Mật & Quyền Sở Hữu" : "Security & Ownership", desc: isVi ? "Code AI sinh ra có thể chứa lỗ hổng bảo mật tinh vi. Câu hỏi về intellectual property và liability với AI-generated code vẫn chưa được giải quyết rõ về mặt pháp lý." : "AI-generated code may contain subtle security vulnerabilities. Questions around IP and liability for AI-generated code remain legally unresolved." },
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

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t.what.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.what.p1}</p>
            <p className="text-muted-foreground leading-relaxed">{t.what.p2}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="space-y-4">
              {[
                { label: isVi ? "Phương pháp" : "Approach", value: "Prompt → Review → Ship" },
                { label: isVi ? "Vai trò developer" : "Developer role", value: isVi ? "Điều phối & kiến trúc" : "Orchestrator & architect" },
                { label: isVi ? "AI đảm nhận" : "AI handles", value: "Implementation details" },
                { label: isVi ? "Kỹ năng cốt lõi" : "Core skill", value: isVi ? "Tư duy hệ thống" : "Systems thinking" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-md bg-accent/20 border border-accent/30 flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t.history.title}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {t.history.items.map((item) => (
              <div key={item.year} className="bg-card border border-border rounded-xl p-6">
                <div className="text-primary font-bold text-sm mb-3">{item.year}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Wrench className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{t.tools.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.tools.categories.map((cat) => (
            <div key={cat.name} className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">{cat.name}</h3>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div key={item.name}>
                    <div className="text-sm font-semibold text-foreground mb-1">{item.name}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t.workflow.title}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {t.workflow.steps.map((item) => (
              <div key={item.step} className="bg-card border border-border rounded-xl p-6">
                <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{t.impact.title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {t.impact.stats.map((stat) => (
            <div key={stat.value} className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <p className="text-muted-foreground leading-relaxed">{t.impact.p1}</p>
          <p className="text-muted-foreground leading-relaxed">{t.impact.p2}</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-md bg-rose-700/20 border border-rose-700/30 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t.debate.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.debate.items.map((item) => (
              <div key={item.title} className="bg-card border border-rose-700/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer dict={dict.common} navDict={dict.nav} locale={locale} />
    </main>
  )
}
