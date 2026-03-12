import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { TrendingUp, Shield, AlertTriangle, Building2, Users, BookOpen } from "lucide-react"

export default async function PropFirmIndustryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const isVi = locale === "vi"

  const t = {
    hero: {
      badge: isVi ? "Kiến Thức Ngành" : "Industry Knowledge",
      title1: isVi ? "Ngành Công Nghiệp" : "The Proprietary",
      title2: isVi ? "Prop Firm" : "Trading Firm",
      title3: isVi ? "Toàn Cảnh" : "Industry",
      desc: isVi
        ? "Tổng quan toàn diện về proprietary trading firm — từ lịch sử hình thành, mô hình hoạt động đến những tranh luận hiện tại trong cộng đồng tài chính toàn cầu."
        : "A comprehensive overview of the proprietary trading firm industry — from its historical origins and operational models to the ongoing debates within the global financial community.",
    },
    what: {
      title: isVi ? "Prop Firm Là Gì?" : "What Is a Prop Firm?",
      p1: isVi
        ? "Proprietary trading firm (prop firm) là tổ chức tài chính sử dụng vốn của chính mình để giao dịch trên các thị trường tài chính, thay vì quản lý tài sản của khách hàng bên ngoài. Lợi nhuận thu được hoàn toàn thuộc về công ty và các trader được tuyển dụng hoặc cấp vốn."
        : "A proprietary trading firm (prop firm) is a financial organization that deploys its own capital across financial markets, rather than managing assets on behalf of external clients. Profits generated belong entirely to the firm and the traders it employs or funds.",
      p2: isVi
        ? "Trong thập kỷ gần đây, mô hình retail prop firm nổi lên — cho phép các trader độc lập tiếp cận nguồn vốn lớn thông qua quy trình đánh giá năng lực, mà không cần đặt cọc toàn bộ vốn giao dịch."
        : "In recent years, the retail prop firm model has emerged — allowing independent traders to access significant capital through a performance evaluation process, without committing their full personal capital.",
    },
    history: {
      title: isVi ? "Lịch Sử Hình Thành" : "Historical Background",
      p1: isVi
        ? "Prop trading xuất hiện từ những năm 1970–1980 tại Phố Wall, khi các ngân hàng đầu tư lớn như Goldman Sachs, Morgan Stanley bắt đầu dành một phần vốn để giao dịch cho chính mình."
        : "Proprietary trading emerged in the 1970s–1980s on Wall Street, as major investment banks like Goldman Sachs and Morgan Stanley began allocating capital to trade for their own accounts.",
      p2: isVi
        ? "Sau khủng hoảng 2008, đạo luật Dodd-Frank và quy tắc Volcker (2010) hạn chế nghiêm ngặt prop trading tại các ngân hàng, dẫn đến làn sóng trader tài năng thành lập các prop firm độc lập."
        : "After the 2008 crisis, the Dodd-Frank Act and Volcker Rule (2010) severely restricted prop trading at banks, prompting talented traders to establish independent prop firms.",
      p3: isVi
        ? "Từ 2015, mô hình funded trader / challenge-based bùng nổ với FTMO, The Funded Trader, MyForexFunds và hàng trăm công ty tương tự, mở rộng tiếp cận vốn đến trader cá nhân toàn cầu."
        : "From 2015, the funded trader / challenge-based model exploded with FTMO, The Funded Trader, MyForexFunds and hundreds of similar companies, democratizing capital access worldwide.",
    },
    models: {
      title: isVi ? "Mô Hình Hoạt Động" : "Operational Models",
      direct: isVi ? "Cấp Vốn Trực Tiếp" : "Direct Funding",
      directDesc: isVi
        ? "Công ty tuyển dụng trader chuyên nghiệp, cung cấp vốn thật và chia sẻ lợi nhuận (50–80% cho trader). Trader không bỏ vốn cá nhân nhưng chịu ràng buộc rủi ro nghiêm ngặt."
        : "The firm recruits professional traders, provides real capital, and shares profits (50–80% to the trader). Traders don't contribute personal capital but follow strict risk parameters.",
      challenge: isVi ? "Challenge / Evaluation" : "Challenge / Evaluation",
      challengeDesc: isVi
        ? "Trader trả phí tham gia đánh giá (1–2 giai đoạn) trên tài khoản mô phỏng. Đạt mục tiêu lợi nhuận trong khi tuân thủ giới hạn rủi ro → nhận tài khoản funded."
        : "Traders pay a fee to undertake an evaluation (1–2 phases) on a simulated account. Meet profit targets while respecting risk limits → receive a funded account.",
      note: isVi
        ? "Doanh thu chính đến từ phí challenge, không phải giao dịch thực tế — tạo ra xung đột lợi ích đáng chú ý."
        : "Primary revenue comes from challenge fees, not actual trading — creating notable conflicts of interest.",
    },
    eval: {
      title: isVi ? "Quy Trình Evaluation" : "Evaluation Process",
      phase1title: isVi ? "Phase 1" : "Phase 1",
      phase1: isVi
        ? "Đạt mục tiêu lợi nhuận 8–10% với giới hạn max daily drawdown 4–5% và max total drawdown 8–10%."
        : "Achieve 8–10% profit target with max daily drawdown 4–5% and max total drawdown 8–10%.",
      phase2title: isVi ? "Phase 2" : "Phase 2",
      phase2: isVi
        ? "Xác minh tính nhất quán với mục tiêu 5%, duy trì cùng quy tắc rủi ro. Tối thiểu 4–10 ngày giao dịch."
        : "Verify consistency with a 5% target, same risk rules. Minimum 4–10 trading days required.",
      fundedtitle: isVi ? "Funded Account" : "Funded Account",
      funded: isVi
        ? "Nhận tài khoản live hoặc simulated, chia sẻ lợi nhuận 70–90%. Một số firm áp dụng quy tắc consistency."
        : "Receive live or simulated account with 70–90% profit sharing. Some firms add consistency rules.",
    },
    risks: {
      title: isVi ? "Rủi Ro & Tranh Cãi" : "Risks & Controversies",
      legal: isVi ? "Vấn Đề Pháp Lý" : "Regulatory Issues",
      legalDesc: isVi
        ? "Năm 2023, MyForexFunds bị CFTC và ASIC kiện vì gian lận, buộc phải đóng cửa — đặt ra câu hỏi lớn về minh bạch và giám sát pháp lý toàn ngành."
        : "In 2023, MyForexFunds was sued by CFTC and ASIC for fraud and shut down — raising fundamental questions about transparency and oversight across the industry.",
      model: isVi ? "Mô Hình Kinh Doanh" : "Business Model",
      modelDesc: isVi
        ? "Nhiều nhà phân tích cho rằng một số prop firm hoạt động như B-book broker — hưởng lợi từ trader thua lỗ. Tỷ lệ vượt qua challenge thường dưới 10%."
        : "Many analysts argue certain prop firms operate like B-book brokers — profiting from trader failure. Challenge pass rates are typically below 10%.",
      trader: isVi ? "Rủi Ro Với Trader" : "Risks for Traders",
      traderItems: isVi
        ? ["Phí challenge không hoàn lại nếu thất bại", "Quy tắc thay đổi bất ngờ sau khi funded", "Một số firm trì hoãn hoặc từ chối chi trả lợi nhuận", "Thiếu bảo vệ pháp lý ở nhiều quốc gia"]
        : ["Non-refundable challenge fees upon failure", "Unexpected rule changes after being funded", "Some firms delay or deny profit payouts", "Limited legal protection in many jurisdictions"],
    },
    firms: {
      title: isVi ? "Các Prop Firm Nổi Tiếng" : "Notable Prop Firms",
      traditional: isVi ? "Prop Firm Truyền Thống" : "Traditional Prop Firms",
      retail: isVi ? "Retail Prop Firm" : "Retail Prop Firms",
      traditionalList: [
        { name: "Jane Street", desc: isVi ? "Chuyên arbitrage và market making trong ETF và trái phiếu." : "Specializes in arbitrage and market making in ETFs and fixed income." },
        { name: "Citadel Securities", desc: isVi ? "Một trong những market maker lớn nhất thế giới." : "One of the world's largest market makers across asset classes." },
        { name: "DRW Trading", desc: isVi ? "Hoạt động đa dạng từ crypto đến derivatives truyền thống." : "Operates across crypto, derivatives, and traditional instruments." },
      ],
      retailList: [
        { name: "FTMO", desc: isVi ? "Tiên phong mô hình challenge, thành lập Czech Republic 2015." : "Pioneer of the challenge model, founded in Czech Republic in 2015." },
        { name: "The Funded Trader", desc: isVi ? "Nổi tiếng với chương trình đa dạng và tỷ lệ chia sẻ lợi nhuận cao." : "Known for diverse programs and high profit-sharing ratios." },
        { name: "Apex Trader Funding", desc: isVi ? "Tập trung vào thị trường futures tại Mỹ." : "Focused on the U.S. futures market." },
        { name: "TopstepTrader", desc: isVi ? "Một trong những firm đầu tiên áp dụng evaluation cho futures." : "One of the first firms to apply the evaluation model to futures." },
      ],
    },
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar locale={locale} langDict={dict.language} navDict={dict.nav} />
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">{t.hero.badge}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            <span className="text-foreground">{t.hero.title1} </span>
            <span className="text-primary">{t.hero.title2}</span>
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
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t.what.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.what.p1}</p>
            <p className="text-muted-foreground leading-relaxed">{t.what.p2}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="space-y-4">
              {[
                { label: isVi ? "Vốn giao dịch" : "Trading Capital", value: isVi ? "Vốn công ty" : "Firm's own capital" },
                { label: isVi ? "Mục tiêu" : "Objective", value: isVi ? "Lợi nhuận độc lập" : "Independent returns" },
                { label: isVi ? "Chia sẻ lợi nhuận" : "Profit Split", value: "50–90% (trader)" },
                { label: isVi ? "Rủi ro cá nhân" : "Personal Risk", value: isVi ? "Thấp / Có giới hạn" : "Low / Limited" },
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
              <Building2 className="w-4 h-4 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t.history.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { year: "1970–1980s", text: t.history.p1 },
              { year: "2008–2010", text: t.history.p2 },
              { year: "2015–Present", text: t.history.p3 },
            ].map((item) => (
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
            <Users className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{t.models.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.models.direct}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{t.models.directDesc}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.models.challenge}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm mb-4">{t.models.challengeDesc}</p>
            <p className="text-xs text-muted-foreground italic border-t border-border pt-4">{t.models.note}</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t.eval.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: t.eval.phase1title, desc: t.eval.phase1 },
              { step: "02", title: t.eval.phase2title, desc: t.eval.phase2 },
              { step: "03", title: t.eval.fundedtitle, desc: t.eval.funded },
            ].map((item) => (
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
          <div className="w-8 h-8 rounded-md bg-rose-700/20 border border-rose-700/30 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-rose-700" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{t.risks.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-rose-700/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.risks.legal}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.risks.legalDesc}</p>
          </div>
          <div className="bg-card border border-rose-700/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.risks.model}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.risks.modelDesc}</p>
          </div>
          <div className="bg-card border border-rose-700/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.risks.trader}</h3>
            <ul className="space-y-2">
              {t.risks.traderItems.map((item) => (
                <li key={item} className="text-muted-foreground text-sm flex items-start gap-2">
                  <span className="text-rose-700 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t.firms.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">{t.firms.traditional}</h3>
              <div className="space-y-4">
                {t.firms.traditionalList.map((firm) => (
                  <div key={firm.name} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground text-sm">{firm.name} — </span>
                      <span className="text-muted-foreground text-sm">{firm.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">{t.firms.retail}</h3>
              <div className="space-y-4">
                {t.firms.retailList.map((firm) => (
                  <div key={firm.name} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground text-sm">{firm.name} — </span>
                      <span className="text-muted-foreground text-sm">{firm.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer dict={dict.common} navDict={dict.nav} locale={locale} />
    </main>
  )
}
