import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { LegalPageLayout } from "@/components/legal-page-layout"

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const copyright = `© ${new Date().getFullYear()} Archaeopteris LLC. ${dict.common.copyright}`

  return (
    <LegalPageLayout title={locale === 'vi' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'} lastUpdated={locale === 'vi' ? 'Ngày hiệu lực: 9 tháng 3, 2026' : 'Effective Date: March 9, 2026'} backToHome={dict.common.backToHome} locale={locale} privacyLabel={dict.nav.privacyPolicy} termsLabel={dict.nav.termsOfService} disclaimerLabel={dict.nav.disclaimer} copyright={copyright}>

      {locale === 'vi' ? (
        <>
          <section className="mb-10">
            <p className="text-muted-foreground leading-relaxed italic">Chính sách bảo mật này tuân thủ luật liên bang Hoa Kỳ, Đạo luật bảo mật người tiêu dùng California (CCPA), và áp dụng các biện pháp xử lý dữ liệu tương thích GDPR cho khách truy cập quốc tế.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Về Chính Sách Này</h2>
            <p className="text-muted-foreground leading-relaxed">Archaeopteris LLC (&quot;Công ty,&quot; &quot;chúng tôi&quot;) là công ty trách nhiệm hữu hạn tại Wyoming cung cấp cơ sở hạ tầng công nghệ giao dịch và dịch vụ phát triển phần mềm toàn diện. Chính sách này mô tả cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin cá nhân thu thập qua website (archaeopteris.us) và trong quá trình cung cấp dịch vụ.</p>
            <p className="text-muted-foreground leading-relaxed mt-4">Bằng cách truy cập website hoặc sử dụng dịch vụ của chúng tôi, bạn xác nhận đã đọc và hiểu Chính sách Bảo mật này. Nếu không đồng ý, vui lòng ngừng sử dụng website và dịch vụ của chúng tôi.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Thông Tin Chúng Tôi Thu Thập</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Thông Tin Bạn Cung Cấp</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Họ tên và chức danh</li>
              <li>Email và số điện thoại doanh nghiệp</li>
              <li>Tên công ty và ngành nghề</li>
              <li>Thông tin yêu cầu dịch vụ và mô tả dự án</li>
              <li>Các liên lạc bạn gửi cho chúng tôi qua email hoặc biểu mẫu</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Thông Tin Thu Thập Tự Động</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Địa chỉ IP và vị trí địa lý gần đúng (cấp quốc gia/khu vực)</li>
              <li>Loại trình duyệt, phiên bản và hệ điều hành</li>
              <li>Các trang đã truy cập, thời gian và đường dẫn điều hướng</li>
              <li>URL giới thiệu và trang thoát</li>
              <li>Định danh thiết bị và độ phân giải màn hình</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.3 Cookie và Công Nghệ Theo Dõi</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Cookie Thiết Yếu:</strong> Cần thiết cho chức năng website. Không thể tắt.</li>
              <li><strong>Cookie Phân Tích:</strong> Giúp chúng tôi hiểu cách khách truy cập tương tác với website (ví dụ: Vercel Analytics). Không theo dõi cá nhân trên các trang bên thứ ba.</li>
              <li><strong>Cookie Tùy Chọn:</strong> Ghi nhớ ngôn ngữ và cài đặt hiển thị của bạn.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">Bạn có thể tắt cookie không thiết yếu qua cài đặt trình duyệt. Lưu ý điều này có thể ảnh hưởng đến chức năng website.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cách Chúng Tôi Sử Dụng Thông Tin</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Để phản hồi yêu cầu và đề nghị dịch vụ của bạn</li>
              <li>Để cung cấp, quản lý và cải thiện dịch vụ</li>
              <li>Để liên lạc về dự án, đề xuất và điều khoản hợp đồng</li>
              <li>Để gửi thông báo liên quan đến dịch vụ (không tiếp thị nếu không có sự đồng ý)</li>
              <li>Để phân tích việc sử dụng website và cải thiện trải nghiệm người dùng</li>
              <li>Để tuân thủ các nghĩa vụ pháp lý</li>
              <li>Để phát hiện và ngăn chặn gian lận hoặc mối đe dọa bảo mật</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cơ Sở Pháp Lý (GDPR/Người Dùng Quốc Tế)</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Sự Cần Thiết Theo Hợp Đồng:</strong> Xử lý cần thiết để thực hiện hợp đồng với bạn</li>
              <li><strong>Lợi Ích Hợp Pháp:</strong> Vận hành doanh nghiệp, cải thiện dịch vụ và ngăn chặn gian lận</li>
              <li><strong>Sự Đồng Ý:</strong> Khi chúng tôi đã có sự đồng ý rõ ràng của bạn</li>
              <li><strong>Nghĩa Vụ Pháp Lý:</strong> Khi việc xử lý được yêu cầu bởi pháp luật</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Chia Sẻ và Tiết Lộ Thông Tin</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Chúng tôi không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn. Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Nhà Cung Cấp Dịch Vụ:</strong> Với các nhà cung cấp bên thứ ba đáng tin cậy theo thỏa thuận xử lý dữ liệu</li>
              <li><strong>Chuyển Nhượng Doanh Nghiệp:</strong> Liên quan đến sáp nhập, mua lại hoặc bán tài sản, có thông báo trước</li>
              <li><strong>Yêu Cầu Pháp Lý:</strong> Khi được yêu cầu bởi pháp luật hoặc lệnh tòa án</li>
              <li><strong>Với Sự Đồng Ý Của Bạn:</strong> Cho bất kỳ mục đích nào khác với sự đồng ý rõ ràng của bạn</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Lưu Trữ Dữ Liệu</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Biểu mẫu liên hệ: Tối đa 2 năm kể từ lần tương tác cuối</li>
              <li>Hồ sơ dự án khách hàng: Theo yêu cầu hợp đồng hoặc pháp luật (thường 7 năm cho hồ sơ tài chính)</li>
              <li>Phân tích website: Dữ liệu tổng hợp lưu vô thời hạn; dữ liệu có thể nhận dạng xóa sau 26 tháng</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Bảo Mật Dữ Liệu</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức theo tiêu chuẩn ngành để bảo vệ thông tin cá nhân của bạn, bao gồm:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Mã hóa TLS/SSL cho dữ liệu truyền tải</li>
              <li>Kiểm soát truy cập và yêu cầu xác thực cho hệ thống nội bộ</li>
              <li>Đánh giá bảo mật và giám sát lỗ hổng định kỳ</li>
              <li>Đào tạo nhân viên về thực hành bảo vệ dữ liệu</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">Không có phương thức truyền tải nào qua Internet là an toàn 100%. Mặc dù chúng tôi cố gắng bảo vệ dữ liệu của bạn, chúng tôi không thể đảm bảo an toàn tuyệt đối.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Quyền Bảo Mật Của Bạn</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">8.1 Tất Cả Người Dùng</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Truy cập: Yêu cầu bản sao thông tin cá nhân chúng tôi lưu giữ về bạn</li>
              <li>Chỉnh sửa: Yêu cầu sửa thông tin không chính xác hoặc không đầy đủ</li>
              <li>Xóa: Yêu cầu xóa thông tin cá nhân, tùy thuộc yêu cầu lưu trữ pháp lý</li>
              <li>Phản đối: Phản đối việc xử lý dựa trên lợi ích hợp pháp</li>
              <li>Hạn chế: Yêu cầu hạn chế xử lý thông tin trong một số trường hợp</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">8.2 Cư Dân California (CCPA)</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Biết danh mục thông tin cá nhân được thu thập, nguồn, mục đích và bên thứ ba được chia sẻ</li>
              <li>Từ chối việc bán thông tin cá nhân (Lưu ý: chúng tôi không bán thông tin cá nhân)</li>
              <li>Không bị phân biệt đối xử khi thực hiện quyền CCPA</li>
              <li>Chỉ định đại lý được ủy quyền để gửi yêu cầu thay mặt bạn</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">8.3 Thực Hiện Quyền Của Bạn</h3>
            <p className="text-muted-foreground leading-relaxed">Để thực hiện bất kỳ quyền bảo mật nào, vui lòng liên hệ contact@archaeopteris.us. Chúng tôi sẽ phản hồi trong vòng 30 ngày (45 ngày cho các yêu cầu phức tạp).</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Quyền Riêng Tư Của Trẻ Em</h2>
            <p className="text-muted-foreground leading-relaxed">Website và dịch vụ của chúng tôi không dành cho người dưới 18 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em. Nếu phát hiện đã thu thập thông tin đó, chúng tôi sẽ xóa ngay lập tức.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Chuyển Dữ Liệu Quốc Tế</h2>
            <p className="text-muted-foreground leading-relaxed">Máy chủ của chúng tôi đặt tại Hoa Kỳ. Nếu bạn truy cập dịch vụ từ bên ngoài Hoa Kỳ, thông tin của bạn sẽ được chuyển đến và xử lý tại Hoa Kỳ, nơi luật bảo vệ dữ liệu có thể khác với khu vực của bạn.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Liên Kết Bên Thứ Ba</h2>
            <p className="text-muted-foreground leading-relaxed">Website của chúng tôi có thể chứa liên kết đến các website bên thứ ba. Chúng tôi không chịu trách nhiệm về các biện pháp bảo mật của các trang đó và khuyến khích bạn xem xét chính sách bảo mật của họ.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Thay Đổi Chính Sách Này</h2>
            <p className="text-muted-foreground leading-relaxed">Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Chúng tôi sẽ thông báo về các thay đổi quan trọng bằng cách cập nhật &quot;Ngày hiệu lực&quot; ở đầu tài liệu này.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Thông Tin Liên Hệ</h2>
            <p className="text-muted-foreground leading-relaxed">Để giải đáp thắc mắc hoặc thực hiện quyền bảo mật, vui lòng liên hệ:</p>
            <br />
            <strong className="text-foreground">Archaeopteris LLC</strong><br />
            <strong className="text-foreground">Email:</strong> contact@archaeopteris.us<br />
            <strong className="text-foreground">Website:</strong> archaeopteris.us<br />
            <strong className="text-foreground">Thẩm quyền:</strong> Wyoming, Hoa Kỳ
          </section>
        </>
      ) : (
        <>
          <section className="mb-10">
            <p className="text-muted-foreground leading-relaxed italic">This Privacy Policy complies with applicable U.S. federal law, the California Consumer Privacy Act (CCPA), and incorporates GDPR-compatible data handling practices for international visitors.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. About This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">Archaeopteris LLC (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is a Wyoming limited liability company providing trading technology infrastructure and full-stack software development services. This Privacy Policy describes how we collect, use, disclose, and safeguard personal information obtained through our website (archaeopteris.us) and in connection with our services.</p>
            <p className="text-muted-foreground leading-relaxed mt-4">By accessing our website or engaging our services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree, please discontinue use of our website and services.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Information You Provide Voluntarily</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Full name and job title</li>
              <li>Business email address and phone number</li>
              <li>Company name and industry</li>
              <li>Service inquiry details and project descriptions</li>
              <li>Communications you send us via email or contact forms</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Information Collected Automatically</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>IP address and approximate geolocation (country/region level)</li>
              <li>Browser type, version, and operating system</li>
              <li>Pages visited, time spent, and navigation paths</li>
              <li>Referring URLs and exit pages</li>
              <li>Device identifiers and screen resolution</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.3 Cookies and Tracking Technologies</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for website functionality. Cannot be disabled.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site. Do not track individuals across third-party sites.</li>
              <li><strong>Preference Cookies:</strong> Remember your language and display settings.</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>To respond to your inquiries and service requests</li>
              <li>To provide, manage, and improve our services</li>
              <li>To communicate about projects, proposals, and contract terms</li>
              <li>To send service-related notices and updates (not marketing without consent)</li>
              <li>To analyze website usage and improve user experience</li>
              <li>To comply with applicable legal obligations</li>
              <li>To detect and prevent fraud or security threats</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Legal Basis for Processing (GDPR/International Users)</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Contractual Necessity:</strong> Processing required to fulfill a contract with you</li>
              <li><strong>Legitimate Interests:</strong> Operating our business, improving our services, and preventing fraud</li>
              <li><strong>Consent:</strong> Where we have obtained your explicit consent</li>
              <li><strong>Legal Obligation:</strong> Where processing is required to comply with applicable law</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Information Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We do not sell, rent, or trade your personal information. We may share information only in the following circumstances:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Service Providers:</strong> With trusted third-party vendors under data processing agreements</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Legal Requirements:</strong> When required by law or court order</li>
              <li><strong>With Your Consent:</strong> For any other purpose with your explicit consent</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Contact form submissions: Up to 2 years from last interaction</li>
              <li>Client project records: As required by contract or applicable law (generally 7 years)</li>
              <li>Website analytics: Aggregated data retained indefinitely; identifiable data deleted after 26 months</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Security</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>TLS/SSL encryption for data in transit</li>
              <li>Access controls and authentication requirements for internal systems</li>
              <li>Regular security assessments and vulnerability monitoring</li>
              <li>Employee training on data protection practices</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Your Privacy Rights</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">8.1 All Users</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Access, correct, delete, or restrict processing of your personal information</li>
              <li>Object to processing based on legitimate interests</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">8.2 California Residents (CCPA)</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Know categories of personal information collected and shared</li>
              <li>Opt out of sale of personal information (we do not sell data)</li>
              <li>Non-discrimination for exercising CCPA rights</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">8.3 Exercising Your Rights</h3>
            <p className="text-muted-foreground leading-relaxed">Contact us at contact@archaeopteris.us. We will respond within 30 days.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">Our website and services are not directed to individuals under 18. We do not knowingly collect personal information from children.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">Our servers are located in the United States. If you access our services from outside the U.S., your information will be transferred to and processed in the U.S.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of material changes by updating the &quot;Effective Date&quot; at the top of this document.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">For questions, concerns, or to exercise your privacy rights, please contact us:</p>
            <br />
            <strong className="text-foreground">Archaeopteris LLC</strong><br />
            <strong className="text-foreground">Email:</strong> contact@archaeopteris.us<br />
            <strong className="text-foreground">Website:</strong> archaeopteris.us<br />
            <strong className="text-foreground">Jurisdiction:</strong> Wyoming, United States
          </section>
        </>
      )}

    </LegalPageLayout>
  )
}
