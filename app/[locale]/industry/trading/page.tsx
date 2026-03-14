import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { TrendingUp, ArrowRight, Zap, BookOpen, BarChart2 } from "lucide-react"

export default async function TradingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const isVi = locale === "vi"

  const t = {
    hero: {
      badge: isVi ? "Ngành Tài Chính 2025" : "Financial Industry 2025",
      title1: isVi ? "Trading" : "Trading",
      title2: isVi ? "Industry" : "Industry",
      title3: isVi ? "Toàn Cảnh" : "Landscape",
      desc: isVi
        ? "Tổng quan toàn diện về ngành giao dịch tài chính — từ retail trading truyền thống đến prop firm hiện đại, phân loại instruments và hệ sinh thái trader toàn cầu."
        : "A comprehensive overview of the financial trading industry — from traditional retail trading to modern prop firms, instrument classifications, and the global trader ecosystem.",
    },
    stats: [
      { value: "$7.5T", label: isVi ? "khối lượng giao dịch forex/ngày" : "daily forex trading volume" },
      { value: "10M+", label: isVi ? "prop firm traders toàn cầu" : "prop firm traders worldwide" },
      { value: "500+", label: isVi ? "prop firm đang hoạt động" : "active prop firms globally" },
      { value: "2025", label: isVi ? "năm ngành bùng nổ nhất" : "industry's biggest boom year" },
    ],
    types: {
      title: isVi ? "Các Loại Hình Giao Dịch" : "Types of Trading",
      items: [
        {
          title: isVi ? "Prop Firm Trading" : "Prop Firm Trading",
          desc: isVi
            ? "Trader sử dụng vốn của công ty để giao dịch — thông qua quy trình evaluation hoặc cấp vốn trực tiếp. Không cần vốn lớn cá nhân, chia sẻ lợi nhuận 70–90%."
            : "Traders use firm capital to trade — through an evaluation process or direct funding. No large personal capital required, with 70–90% profit sharing.",
          highlight: true,
          link: `/${locale}/industry/propfirm`,
          linkLabel: isVi ? "Tìm hiểu về Prop Firm →" : "Learn about Prop Firms →",
        },
        {
          title: isVi ? "Retail Trading" : "Retail Trading",
          desc: isVi
            ? "Cá nhân giao dịch bằng vốn của chính mình thông qua broker — forex, stocks, futures, crypto. Linh hoạt nhưng đòi hỏi vốn đủ lớn và quản lý rủi ro nghiêm ngặt."
            : "Individuals trade with their own capital through a broker — forex, stocks, futures, crypto. Flexible but requires sufficient capital and strict risk management.",
          highlight: false,
        },
        {
          title: isVi ? "Institutional Trading" : "Institutional Trading",
          desc: isVi
            ? "Quỹ đầu tư, ngân hàng, hedge fund giao dịch với khối lượng lớn — có lợi thế về công nghệ, thông tin và phí giao dịch so với retail."
            : "Investment funds, banks, and hedge funds trade at large volumes — with advantages in technology, information access, and lower transaction costs vs retail.",
          highlight: false,
        },
      ],
    },
    instruments: {
      title: isVi ? "Phân Loại Instruments" : "Instrument Classification",
      desc: isVi
        ? "Thị trường tài chính được phân chia theo loại tài sản — mỗi loại có đặc điểm, rủi ro và cơ hội riêng."
        : "Financial markets are divided by asset class — each with its own characteristics, risks, and opportunities.",
      items: [
        {
          name: isVi ? "Forex & CFDs" : "Forex & CFDs",
          desc: isVi
            ? "Giao dịch các cặp tiền tệ (EUR/USD, GBP/JPY...) và hợp đồng chênh lệch giá (CFDs) trên hàng hóa, chỉ số. Thị trường OTC lớn nhất thế giới, hoạt động 24/5. CFDs bị cấm tại Mỹ."
            : "Trading currency pairs (EUR/USD, GBP/JPY...) and Contracts for Difference (CFDs) on commodities and indices. The world's largest OTC market, operating 24/5. CFDs are banned in the US.",
          stats: [
            { label: isVi ? "Volume/ngày" : "Daily volume", value: "$7.5T" },
            { label: isVi ? "Đòn bẩy tối đa" : "Max leverage", value: "1:500" },
            { label: isVi ? "Giờ giao dịch" : "Trading hours", value: "24/5" },
          ],
        },
        {
          name: isVi ? "Futures" : "Futures",
          desc: isVi
            ? "Hợp đồng tương lai — cam kết mua/bán tài sản ở mức giá xác định trong tương lai. Giao dịch trên sàn tập trung (CME, CBOT). Phổ biến với vàng (GC), dầu (CL), S&P 500 (ES), Nasdaq (NQ)."
            : "Futures contracts — an agreement to buy/sell an asset at a set price at a future date. Traded on centralized exchanges (CME, CBOT). Popular: Gold (GC), Oil (CL), S&P 500 (ES), Nasdaq (NQ).",
          stats: [
            { label: isVi ? "Sàn chính" : "Main exchange", value: "CME/CBOT" },
            { label: isVi ? "Margin thấp" : "Low margin", value: "✓" },
            { label: isVi ? "Regulated" : "Regulated", value: "CFTC" },
          ],
        },
        {
          name: isVi ? "Crypto" : "Crypto",
          desc: isVi
            ? "Giao dịch tiền điện tử — Bitcoin, Ethereum và hàng nghìn altcoins. Thị trường hoạt động 24/7, biến động cao, thanh khoản đang tăng mạnh. Nhiều prop firm đã thêm crypto vào danh mục instruments."
            : "Trading cryptocurrencies — Bitcoin, Ethereum, and thousands of altcoins. The market runs 24/7 with high volatility and growing liquidity. Many prop firms have added crypto to their instrument offerings.",
          stats: [
            { label: isVi ? "Giờ giao dịch" : "Trading hours", value: "24/7" },
            { label: isVi ? "Biến động" : "Volatility", value: isVi ? "Cao" : "High" },
            { label: isVi ? "Top pairs" : "Top pairs", value: "BTC, ETH" },
          ],
        },
        {
          name: isVi ? "Stocks & Equities" : "Stocks & Equities",
          desc: isVi
            ? "Giao dịch cổ phiếu trên NYSE, NASDAQ và các sàn toàn cầu. Thị trường có giờ cố định, được quản lý chặt chẽ bởi SEC. Một số prop firm chuyên về stocks (Trade The Pool) hoặc futures US (Apex, Topstep)."
            : "Trading stocks on NYSE, NASDAQ, and global exchanges. Fixed trading hours, strictly regulated by the SEC. Some prop firms specialize in stocks (Trade The Pool) or US futures (Apex, Topstep).",
          stats: [
            { label: isVi ? "Sàn chính" : "Main exchange", value: "NYSE/NASDAQ" },
            { label: isVi ? "Regulated" : "Regulated", value: "SEC" },
            { label: isVi ? "Giờ giao dịch" : "Trading hours", value: "9:30-16:00 ET" },
          ],
        },
      ],
    },
    propfirms: {
      title: isVi ? "Prop Firms Nổi Bật" : "Notable Prop Firms",
      noRules: {
        title: isVi ? "No Rules / Long-term" : "No Rules / Long-term",
        desc: isVi
          ? "Không có daily drawdown hay time pressure — trader giao dịch dài hạn, chia sẻ lợi nhuận thực tế."
          : "No daily drawdown or time pressure — traders trade long-term with real profit sharing.",
        firms: ["Darwinex Zero"],
      },
      challenge: {
        title: isVi ? "Challenge / Evaluation" : "Challenge / Evaluation",
        desc: isVi
          ? "Có rules về drawdown và profit target — phổ biến nhất hiện nay."
          : "Rules on drawdown and profit targets — the most common model today.",
        firms: [
          "FundingPips", "The5%ers", "Alpha Capital", "FundedNext", "E8 Markets",
          "Maven", "BrightFunded", "QT Funded", "Top One Trader", "Blueberry Funded",
          "Breakout", "Seacrest Markets", "Funding Traders", "OANDA Prop Trader",
          "Goat Funded Trader", "Blue Guardian", "Funded Trading Plus", "City Traders Imperium",
          "For Traders", "Instant Funding", "AquaFunded", "Fintokei", "ThinkCapital",
          "ATFunded", "Crypto Fund Trader", "Nordic Funder", "FXIFY", "Lark Funding",
          "Audacity Capital", "The Trading Pit", "Ment Funding", "Finotive Funding",
          "Hantec Trader", "Axi Select", "Funded Elite", "Trade The Pool",
        ],
      },
    },
    deepdives: {
      title: isVi ? "Khám Phá Chuyên Sâu" : "Deep Dives",
      items: [
        {
          title: isVi ? "Prop Firm Industry" : "Prop Firm Industry",
          desc: isVi
            ? "Lịch sử, mô hình hoạt động, evaluation process, rủi ro và các firm nổi tiếng trong ngành prop firm toàn cầu."
            : "History, operational models, evaluation process, risks, and notable firms in the global prop firm industry.",
          link: `/${locale}/industry/propfirm`,
          badge: isVi ? "Nổi bật" : "Featured",
        },
      ],
    },
    academy: {
      title: isVi ? "Trading Academy" : "Trading Academy",
      desc: isVi
        ? "Kiến thức trading chuyên sâu — risk management, psychology, strategy và phân tích kỹ thuật. Sắp ra mắt."
        : "In-depth trading knowledge — risk management, psychology, strategy, and technical analysis. Coming soon.",
      coming: isVi ? "Sắp ra mắt" : "Coming Soon",
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
          <h2 className="text-2xl font-bold text-foreground">{t.types.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.types.items.map((item) => (
            <div key={item.title} className={`rounded-xl p-8 border ${item.highlight ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20" : "bg-card border-border"}`}>
              {item.highlight && (
                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
                  <Zap className="w-3 h-3" />
                  {isVi ? "Ưu tiên" : "Featured"}
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-md bg-accent/20 border border-accent/30 flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t.instruments.title}</h2>
          </div>
          <p className="text-muted-foreground mb-10 ml-11">{t.instruments.desc}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {t.instruments.items.map((item) => (
              <div key={item.name} className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">{item.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                  {item.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-sm font-semibold text-primary">{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
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
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{t.propfirms.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.propfirms.noRules.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t.propfirms.noRules.desc}</p>
            <div className="flex flex-wrap gap-2">
              {t.propfirms.noRules.firms.map((firm) => (
                <span key={firm} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full border border-primary/20">{firm}</span>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.propfirms.challenge.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t.propfirms.challenge.desc}</p>
            <div className="flex flex-wrap gap-2">
              {t.propfirms.challenge.firms.map((firm) => (
                <span key={firm} className="bg-secondary text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border">{firm}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
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
            <div className="bg-card border border-dashed border-border rounded-xl p-6 opacity-60">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">{t.academy.title}</h3>
                <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full font-medium">{t.academy.coming}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.academy.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer dict={dict.common} navDict={dict.nav} locale={locale} />
    </main>
  )
}
