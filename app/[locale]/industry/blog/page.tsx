import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import BlogPage from "@/components/blog-page"

export default async function BlogRoute({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isVi = locale === "vi"
  const dict = getDictionary(locale)


  const t = {
    badge: isVi ? "AI Blog · Phân tích Fintech" : "AI Blog · Fintech Insights",
    heroTitle1: isVi ? "Giao dịch" : "Trading",
    heroTitle2: isVi ? "Thông minh" : "Intelligence",
    heroTitle3: isVi ? "Gặp gỡ" : "Meets",
    heroTitle4: isVi ? "Công nghệ" : "Technology",
    heroSub: isVi
      ? "Phân tích chuyên sâu về prop firm, hạ tầng giao dịch, hệ thống thuật toán và công nghệ tài chính."
      : "In-depth analysis on prop firms, trading infrastructure, algorithmic systems, and financial technology.",
    stat1Val: isVi ? "Hỗ trợ AI" : "AI-Powered",
    stat1Label: isVi ? "Viết Draft" : "Draft Writer",
    stat2Val: isVi ? "Cập nhật" : "Updated",
    stat2Label: isVi ? "Hàng tuần" : "Weekly",
    stat3Val: isVi ? "Tập trung" : "Focus",
    stat3Label: "Fintech",
    tabBrowse: isVi ? "Xem bài viết" : "Browse Articles",
    tabWrite: isVi ? "✦ AI Viết Draft" : "✦ AI Draft Writer",
    catAll: isVi ? "Tất cả" : "All",
    featured: isVi ? "NỔI BẬT" : "FEATURED",
    readMore: isVi ? "phút đọc" : "min read",
    noArticles: isVi ? "Chưa có bài viết trong chủ đề này." : "No articles in this category yet.",
    writeTitle1: "AI",
    writeTitle2: isVi ? "Viết" : "Draft",
    writeTitle3: isVi ? "Draft" : "Writer",
    writeSub: isVi
      ? "Tạo bản nháp blog fintech chuyên nghiệp, phù hợp với giọng văn và đối tượng của Archaeopteris."
      : "Generate professional fintech blog drafts tailored to Archaeopteris's voice and audience.",
    labelTopic: isVi ? "CHỦ ĐỀ / TIÊU ĐỀ" : "TOPIC / TITLE",
    labelTopicRequired: "*",
    labelKeywords: isVi ? "TỪ KHÓA" : "KEYWORDS",
    labelKeywordsOptional: isVi ? "(tùy chọn)" : "(optional)",
    labelTone: isVi ? "GIỌNG VĂN" : "TONE",
    placeholderTopic: isVi
      ? "VD: Cách AI đang định hình lại quản lý rủi ro prop firm"
      : "e.g. How AI is reshaping prop firm risk management",
    placeholderKeywords: isVi
      ? "VD: prop firm, risk engine, drawdown, AI"
      : "e.g. prop firms, risk engine, drawdown, AI",
    tone1: isVi ? "Chuyên nghiệp" : "Professional",
    tone2: isVi ? "Kỹ thuật" : "Technical",
    tone3: isVi ? "Phân tích" : "Analytical",
    tone4: isVi ? "Dễ hiểu" : "Accessible",
    generateBtn: isVi ? "✦ Tạo Draft" : "✦ Generate Draft",
    generating: isVi ? "Đang viết..." : "Generating...",
    topicRequired: isVi ? "Vui lòng nhập chủ đề." : "Topic is required.",
    outputLabel: isVi ? "KẾT QUẢ DRAFT" : "DRAFT OUTPUT",
    copyBtn: "Copy Markdown",
    copiedBtn: isVi ? "✓ Đã copy" : "✓ Copied",
    clearBtn: isVi ? "Xóa" : "Clear",
    outputFooter: isVi
      ? "✎ Chỉnh sửa trực tiếp trước khi đăng · Hỗ trợ Markdown"
      : "✎ Edit directly before publishing · Markdown supported",
    writingDraft: isVi
      ? "Claude đang viết draft cho bạn..."
      : "Claude is writing your draft...",
    categories: {
      propFirms: isVi ? "Prop Firm" : "Prop Firms",
      infrastructure: isVi ? "Hạ tầng" : "Infrastructure",
      tradingTech: "Trading Tech",
      risk: isVi ? "Rủi ro" : "Risk",
    },
    samplePosts: isVi ? [
      { title: "Các Prop Firm Đang Dùng AI Để Phát Hiện Hành Vi Trader", category: "Prop Firm", date: "14 Tháng 3, 2026", readTime: "6", excerpt: "Mô hình machine learning đang định hình lại cách các nền tảng đánh giá phát hiện vi phạm, dự đoán churn và tối ưu cơ chế chia lợi nhuận.", tags: ["AI", "Prop Firm", "Rủi ro"] },
      { title: "FIX Protocol 2026: Điều Gì Đã Thay Đổi Với Retail Broker", category: "Hạ tầng", date: "9 Tháng 3, 2026", readTime: "8", excerpt: "Hệ sinh thái FIX Protocol đã âm thầm phát triển. Đây là cách tích hợp broker hiện tại so với ba năm trước.", tags: ["FIX", "Broker", "Hạ tầng"] },
      { title: "Khớp Lệnh Độ Trễ Thấp: Micro-giây Trị Giá Hàng Triệu", category: "Trading Tech", date: "3 Tháng 3, 2026", readTime: "10", excerpt: "Phân tích sâu về chiến lược co-location, kernel bypass networking và những điểm tối ưu mà hầu hết team bỏ sót.", tags: ["Độ trễ", "Khớp lệnh", "HFT"] },
      { title: "Engine Quản Lý Rủi Ro: Real-Time Hay Real Risk?", category: "Rủi ro", date: "28 Tháng 2, 2026", readTime: "7", excerpt: "Cách các prop firm hiện đại cân bằng giới hạn exposure tự động với quyền tự chủ của trader — mà không làm mất alpha.", tags: ["Rủi ro", "Tự động hóa"] },
    ] : [
      { title: "How Prop Firms Are Using AI to Detect Trader Patterns", category: "Prop Firms", date: "Mar 14, 2026", readTime: "6", excerpt: "Machine learning models are reshaping how evaluation platforms flag rule violations, predict churn, and optimize profit-sharing structures.", tags: ["AI", "Prop Firms", "Risk"] },
      { title: "FIX Protocol in 2026: What's Changed for Retail Brokers", category: "Infrastructure", date: "Mar 9, 2026", readTime: "8", excerpt: "The FIX Protocol ecosystem has quietly evolved. Here's what broker integrations look like today versus three years ago.", tags: ["FIX", "Brokers", "Infrastructure"] },
      { title: "Low-Latency Execution: Microseconds That Cost Millions", category: "Trading Tech", date: "Mar 3, 2026", readTime: "10", excerpt: "A deep-dive into co-location strategies, kernel bypass networking, and where most teams leave performance on the table.", tags: ["Latency", "Execution", "HFT"] },
      { title: "Risk Management Engines: Real-Time or Real Risk?", category: "Risk", date: "Feb 28, 2026", readTime: "7", excerpt: "How modern prop firms balance automated exposure limits with trader autonomy — without killing alpha.", tags: ["Risk", "Automation"] },
    ],
  }

  /*return (
    <>
      <Navbar />
      <BlogPage dict={t} />
      <Footer />
    </>
  )*/
  return (
  <main className="min-h-screen bg-background">
    <Navbar locale={locale} langDict={dict.language} navDict={dict.nav} />
    <BlogPage dict={t} />
    <Footer dict={dict.common} navDict={dict.nav} locale={locale} />
  </main>
)

}
