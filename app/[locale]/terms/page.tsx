import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { LegalPageLayout } from "@/components/legal-page-layout"

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const copyright = `© ${new Date().getFullYear()} Archaeopteris LLC. ${dict.common.copyright}`

  return (
    <LegalPageLayout title={locale === 'vi' ? 'Điều Khoản Dịch Vụ' : 'Terms of Service'} lastUpdated={locale === 'vi' ? 'Ngày hiệu lực: 9 tháng 3, 2026' : 'Effective Date: March 9, 2026'} backToHome={dict.common.backToHome} locale={locale} privacyLabel={dict.nav.privacyPolicy} termsLabel={dict.nav.termsOfService} disclaimerLabel={dict.nav.disclaimer} copyright={copyright}>

      {locale === 'vi' ? (
        <>
          <section className="mb-10">
            <p className="text-muted-foreground leading-relaxed italic">Điều khoản dịch vụ này cấu thành một thỏa thuận ràng buộc pháp lý. Vui lòng đọc kỹ trước khi sử dụng dịch vụ của chúng tôi.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Chấp Nhận Điều Khoản</h2>
            <p className="text-muted-foreground leading-relaxed">Bằng cách truy cập website (archaeopteris.us) hoặc sử dụng dịch vụ của Archaeopteris LLC (&quot;Công ty,&quot; &quot;chúng tôi&quot;), bạn (&quot;Khách hàng&quot;) đồng ý bị ràng buộc bởi các Điều khoản Dịch vụ này. Nếu bạn ký kết thay mặt cho một tổ chức, bạn xác nhận có thẩm quyền ràng buộc tổ chức đó.</p>
            <p className="text-muted-foreground leading-relaxed mt-4">Nếu bạn không đồng ý với các Điều khoản này, bạn không được sử dụng website hoặc dịch vụ của chúng tôi.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Mô Tả Công Ty và Dịch Vụ</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Archaeopteris LLC là công ty trách nhiệm hữu hạn tại Wyoming vận hành hai bộ phận dịch vụ:</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Bộ Phận Giao Dịch</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">Chúng tôi cung cấp giải pháp công nghệ cho các công ty giao dịch độc quyền, môi giới và tổ chức tài chính, bao gồm:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Hệ thống quản lý lệnh (OMS) và cơ sở hạ tầng thực thi</li>
              <li>Tích hợp giao thức FIX và kết nối đa môi giới</li>
              <li>Hệ thống quản lý rủi ro và giám sát tuân thủ</li>
              <li>Khung giao dịch thuật toán và cơ sở hạ tầng chiến lược</li>
              <li>Nền tảng đánh giá và phân tích hiệu suất trader</li>
            </ul>
            <p className="text-muted-foreground font-medium mb-4">QUAN TRỌNG: Chúng tôi chỉ là nhà cung cấp công nghệ. Chúng tôi không cung cấp tư vấn đầu tư, dịch vụ môi giới, hoặc hoạt động với tư cách là cố vấn đầu tư đã đăng ký, nhà môi giới-đại lý, CTA hoặc CPO theo định nghĩa của SEC hoặc CFTC.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Bộ Phận Phát Triển</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">Chúng tôi cung cấp dịch vụ phát triển phần mềm toàn diện, bao gồm:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Phát triển ứng dụng web và di động doanh nghiệp</li>
              <li>Hệ thống backend, API và kiến trúc microservices</li>
              <li>Cơ sở hạ tầng đám mây, DevOps và pipeline CI/CD</li>
              <li>Thiết kế cơ sở dữ liệu và kỹ thuật dữ liệu</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Điều Khoản Hợp Đồng và Dự Án</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.1 Phạm Vi Công Việc</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Các dịch vụ, sản phẩm bàn giao, thời hạn và giá cả cụ thể sẽ được xác định trong Phạm vi Công việc (SOW) hoặc Thỏa thuận Dịch vụ riêng được ký bởi cả hai bên. Trong trường hợp có xung đột, SOW sẽ được ưu tiên áp dụng.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.2 Điều Khoản Thanh Toán</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Hóa đơn đến hạn trong vòng 30 ngày kể từ ngày phát hành trừ khi có quy định khác trong SOW</li>
              <li>Thanh toán trễ hạn tích lũy lãi suất 1,5%/tháng (18%/năm) hoặc mức tối đa theo luật Wyoming</li>
              <li>Chúng tôi có quyền tạm dừng dịch vụ cho tài khoản quá hạn hơn 30 ngày</li>
              <li>Tất cả phí không hoàn lại trừ khi có thỏa thuận bằng văn bản</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.3 Lệnh Thay Đổi</h3>
            <p className="text-muted-foreground leading-relaxed">Bất kỳ thay đổi nào đối với SOW đã thống nhất phải được ghi lại trong Lệnh Thay đổi bằng văn bản được ký bởi cả hai bên. Chúng tôi không có nghĩa vụ thực hiện công việc ngoài phạm vi mà không có Lệnh Thay đổi đã ký.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Trách Nhiệm Của Khách Hàng</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Bạn đồng ý:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Cung cấp thông tin chính xác, đầy đủ và kịp thời cần thiết để chúng tôi thực hiện dịch vụ</li>
              <li>Chỉ định đầu mối liên hệ có thẩm quyền quyết định</li>
              <li>Xem xét và phê duyệt sản phẩm bàn giao trong thời hạn quy định trong SOW</li>
              <li>Đảm bảo nội dung, dữ liệu và tài liệu bạn cung cấp không vi phạm quyền của bên thứ ba</li>
              <li>Chỉ sử dụng dịch vụ cho các mục đích hợp pháp</li>
              <li>Bảo mật thông tin xác thực truy cập chúng tôi cung cấp</li>
              <li>Thông báo kịp thời về bất kỳ sự cố bảo mật hoặc truy cập trái phép nào</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Sở Hữu Trí Tuệ</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">5.1 Quyền Sở Hữu Sản Phẩm</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">Trừ khi có quy định khác trong SOW đã ký, sau khi nhận thanh toán đầy đủ:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Sản phẩm tùy chỉnh phát triển riêng cho dự án của bạn được chuyển nhượng cho bạn</li>
              <li>Chúng tôi giữ quyền sở hữu các công cụ, framework, thư viện và phương pháp luận có sẵn</li>
              <li>Chúng tôi giữ quyền sử dụng kiến thức và kỹ năng tích lũy trong quá trình hợp tác</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">5.2 Sở Hữu Trí Tuệ Công Ty</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Nội dung website, thương hiệu, công cụ độc quyền và phương pháp luận của chúng tôi được bảo vệ bởi luật bản quyền, nhãn hiệu và sở hữu trí tuệ. Bạn không được sao chép, phân phối hoặc tạo sản phẩm phái sinh mà không có sự cho phép bằng văn bản.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">5.3 Phần Mềm Mã Nguồn Mở</h3>
            <p className="text-muted-foreground leading-relaxed">Một số sản phẩm có thể tích hợp phần mềm mã nguồn mở. Chúng tôi sẽ xác định các thành phần đó và bạn đồng ý tuân thủ các điều khoản giấy phép mã nguồn mở tương ứng.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Bảo Mật</h2>
            <p className="text-muted-foreground leading-relaxed">Mỗi bên đồng ý bảo mật thông tin kinh doanh không công khai của bên kia được tiết lộ trong quá trình hợp tác. Nghĩa vụ này tồn tại sau khi chấm dứt quan hệ trong ba (3) năm, hoặc vô thời hạn đối với bí mật thương mại. Các yêu cầu bảo mật cụ thể có thể được điều chỉnh bởi Thỏa thuận Không tiết lộ (NDA) riêng.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Tuyên Bố và Bảo Đảm</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">7.1 Bảo Đảm Của Công Ty</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Chúng tôi có quyền ký kết và thực hiện theo các Điều khoản này</li>
              <li>Dịch vụ sẽ được thực hiện theo cách chuyên nghiệp</li>
              <li>Sản phẩm bàn giao sẽ phù hợp về cơ bản với các thông số kỹ thuật đã thỏa thuận trong SOW</li>
              <li>Theo hiểu biết của chúng tôi, sản phẩm sẽ không vi phạm quyền sở hữu trí tuệ của bên thứ ba</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">7.2 Tuyên Bố Miễn Trừ Bảo Đảm</h3>
            <p className="text-muted-foreground leading-relaxed">NGOẠI TRỪ NHỮNG GÌ ĐƯỢC NÊU RÕ RÀNG Ở TRÊN, DỊCH VỤ VÀ SẢN PHẨM CỦA CHÚNG TÔI ĐƯỢC CUNG CẤP &quot;NGUYÊN TRẠNG&quot; VÀ &quot;SẴN CÓ&quot; MÀ KHÔNG CÓ BẢO ĐẢM DƯỚI BẤT KỲ HÌNH THỨC NÀO, DÙ RÕ RÀNG, NGỤ Ý HAY THEO LUẬT ĐỊNH.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Giới Hạn Trách Nhiệm</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">TRONG PHẠM VI TỐI ĐA ĐƯỢC PHÁP LUẬT CHO PHÉP, ARCHAEOPTERIS LLC, CÁC THÀNH VIÊN, QUẢN LÝ, NHÂN VIÊN HOẶC NHÀ THẦU KHÔNG CHỊU TRÁCH NHIỆM VỀ BẤT KỲ THIỆT HẠI GIÁN TIẾP, NGẪU NHIÊN, ĐẶC BIỆT, HẬU QUẢ, ĐIỂN HÌNH HOẶC TRỪNG PHẠT NÀO, BAO GỒM LỢI NHUẬN BỊ MẤT, DOANH THU BỊ MẤT, MẤT DỮ LIỆU, GIÁN ĐOẠN KINH DOANH HOẶC TỔN THẤT GIAO DỊCH.</p>
            <p className="text-muted-foreground leading-relaxed">Tổng trách nhiệm pháp lý của chúng tôi đối với bạn cho bất kỳ khiếu nại nào không vượt quá tổng phí bạn đã trả cho chúng tôi trong ba (3) tháng trước sự kiện phát sinh khiếu nại.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Bồi Thường</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Bạn đồng ý bảo vệ, bồi thường và giữ vô hại cho Công ty và các thành viên, quản lý, nhân viên của công ty khỏi các khiếu nại phát sinh từ:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Vi phạm các Điều khoản này của bạn</li>
              <li>Sử dụng dịch vụ của chúng tôi vi phạm pháp luật</li>
              <li>Bất kỳ nội dung, dữ liệu hoặc tài liệu nào bạn cung cấp cho chúng tôi</li>
              <li>Hoạt động giao dịch hoặc quyết định tài chính của bạn</li>
              <li>Khiếu nại của bên thứ ba phát sinh từ hoạt động kinh doanh của bạn</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Chấm Dứt Hợp Đồng</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">10.1 Chấm Dứt Tự Nguyện</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Bất kỳ bên nào cũng có thể chấm dứt hợp đồng bằng cách thông báo bằng văn bản 30 ngày trước. Bạn vẫn chịu trách nhiệm thanh toán cho tất cả công việc đã hoàn thành đến ngày chấm dứt.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">10.2 Chấm Dứt Vì Lý Do</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Bất kỳ bên nào có thể chấm dứt ngay lập tức nếu bên kia: (a) vi phạm nghiêm trọng và không khắc phục trong 15 ngày; (b) mất khả năng thanh toán; hoặc (c) có hành vi gian lận hoặc bất hợp pháp.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">10.3 Hậu Quả Chấm Dứt</h3>
            <p className="text-muted-foreground leading-relaxed">Khi chấm dứt, bạn sẽ thanh toán tất cả các khoản phí còn lại cho công việc đã hoàn thành. Các điều khoản về bảo mật, quyền sở hữu trí tuệ, giới hạn trách nhiệm và bồi thường sẽ tiếp tục có hiệu lực.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Luật Điều Chỉnh và Giải Quyết Tranh Chấp</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Các Điều khoản này được điều chỉnh bởi luật pháp của Bang Wyoming, Hoa Kỳ.</p>
            <p className="text-muted-foreground leading-relaxed">Bất kỳ tranh chấp nào sẽ trước tiên được giải quyết thông qua đàm phán thiện chí. Nếu không giải quyết được trong 30 ngày, tranh chấp sẽ được đưa ra trọng tài ràng buộc do AAA quản lý theo Quy tắc Trọng tài Thương mại, tiến hành tại Wyoming.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Các Điều Khoản Chung</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Toàn bộ Thỏa thuận:</strong> Các Điều khoản này cùng với SOW hoặc NDA đã ký cấu thành toàn bộ thỏa thuận giữa các bên</li>
              <li><strong>Khả năng Tách rời:</strong> Nếu bất kỳ điều khoản nào không thể thực thi, các điều khoản còn lại vẫn có hiệu lực</li>
              <li><strong>Từ bỏ:</strong> Việc không thực thi bất kỳ điều khoản nào không cấu thành từ bỏ quyền thực thi trong tương lai</li>
              <li><strong>Bất khả kháng:</strong> Không bên nào chịu trách nhiệm về sự chậm trễ do hoàn cảnh ngoài tầm kiểm soát</li>
              <li><strong>Chuyển nhượng:</strong> Bạn không thể chuyển nhượng quyền hoặc nghĩa vụ mà không có sự đồng ý bằng văn bản của chúng tôi</li>
              <li><strong>Thông báo:</strong> Thông báo phải bằng văn bản và gửi qua email có xác nhận nhận</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Thay Đổi Điều Khoản</h2>
            <p className="text-muted-foreground leading-relaxed">Chúng tôi có quyền sửa đổi các Điều khoản này bất cứ lúc nào. Chúng tôi sẽ thông báo ít nhất 30 ngày về các thay đổi quan trọng. Việc tiếp tục sử dụng dịch vụ sau ngày có hiệu lực cấu thành sự chấp nhận các Điều khoản đã cập nhật.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. Thông Tin Liên Hệ</h2>
            <p className="text-muted-foreground leading-relaxed">Để giải đáp thắc mắc về các Điều khoản này:</p>
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
            <p className="text-muted-foreground leading-relaxed italic">These Terms of Service constitute a legally binding agreement. Please read carefully before using our services.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">By accessing our website (archaeopteris.us) or engaging Archaeopteris LLC (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) for any services, you (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;) agree to be bound by these Terms of Service (&quot;Terms&quot;). If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have authority to bind that entity.</p>
            <p className="text-muted-foreground leading-relaxed mt-4">If you do not agree to these Terms, you must not use our website or services.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Company Description and Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Archaeopteris LLC is a Wyoming limited liability company operating two service divisions:</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Trading Division</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Order Management Systems (OMS) and execution infrastructure</li>
              <li>FIX protocol integration and multi-broker connectivity</li>
              <li>Risk management and compliance monitoring systems</li>
              <li>Algorithmic trading frameworks and strategy infrastructure</li>
              <li>Trader evaluation and performance analytics platforms</li>
            </ul>
            <p className="text-muted-foreground font-medium mb-4">IMPORTANT: We are a technology provider only. We do not provide investment advice, brokerage services, or act as a registered investment advisor, broker-dealer, CTA, or CPO as defined by the SEC or CFTC.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Development Division</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Enterprise web and mobile application development</li>
              <li>Backend systems, APIs, and microservices architecture</li>
              <li>Cloud infrastructure, DevOps, and CI/CD pipelines</li>
              <li>Database design and data engineering</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Engagement and Project Terms</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.1 Statements of Work</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Specific services, deliverables, timelines, and pricing will be defined in a separate Statement of Work (SOW) or Service Agreement signed by both parties.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.2 Payment Terms</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Invoices are due within 30 days of issuance</li>
              <li>Late payments accrue interest at 1.5% per month (18% per annum)</li>
              <li>We reserve the right to suspend services for accounts more than 30 days past due</li>
              <li>All fees are non-refundable unless otherwise agreed in writing</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.3 Change Orders</h3>
            <p className="text-muted-foreground leading-relaxed">Any changes to an agreed SOW must be documented in a written Change Order signed by both parties.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Client Responsibilities</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide accurate, complete, and timely information</li>
              <li>Designate a qualified point of contact</li>
              <li>Review and approve deliverables within specified timelines</li>
              <li>Ensure materials do not infringe third-party rights</li>
              <li>Use our services only for lawful purposes</li>
              <li>Maintain confidentiality of access credentials</li>
              <li>Promptly notify us of any security incidents</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">5.1 Work Product Ownership</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Custom deliverables developed for your project are assigned to you upon full payment</li>
              <li>We retain ownership of pre-existing tools, frameworks, libraries, and methodologies</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">5.2 Company IP</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Our website content, brand, proprietary tools, and methodologies are protected by intellectual property laws.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">5.3 Open Source</h3>
            <p className="text-muted-foreground leading-relaxed">Some deliverables may incorporate open-source software subject to applicable license terms.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed">Each party agrees to maintain confidentiality of the other party&apos;s non-public business information for three (3) years after termination, or indefinitely for trade secrets.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Representations and Warranties</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">7.1 Company Warranties</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Services will be performed professionally and in a workmanlike manner</li>
              <li>Deliverables will materially conform to agreed specifications</li>
              <li>Work product will not infringe third-party intellectual property rights</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">7.2 Disclaimer of Warranties</h3>
            <p className="text-muted-foreground leading-relaxed">EXCEPT AS EXPRESSLY SET FORTH ABOVE, OUR SERVICES AND DELIVERABLES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ARCHAEOPTERIS LLC BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST REVENUE, LOSS OF DATA, BUSINESS INTERRUPTION, OR TRADING LOSSES.</p>
            <p className="text-muted-foreground leading-relaxed">Our total aggregate liability shall not exceed the total fees paid by you in the three (3) months preceding the event giving rise to the claim.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Indemnification</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Your breach of these Terms</li>
              <li>Your use of our services in violation of applicable law</li>
              <li>Any content, data, or materials you provide to us</li>
              <li>Your trading activities or financial decisions</li>
              <li>Third-party claims arising from your business operations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Termination</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">10.1 Termination for Convenience</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Either party may terminate with 30 days&apos; written notice. You remain responsible for payment for all work completed through the termination date.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">10.2 Termination for Cause</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Either party may terminate immediately for material breach (uncured within 15 days), insolvency, or fraudulent conduct.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">10.3 Effect of Termination</h3>
            <p className="text-muted-foreground leading-relaxed">Confidentiality, IP ownership, limitation of liability, and indemnification provisions survive termination.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law and Dispute Resolution</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">These Terms are governed by the laws of the State of Wyoming, United States.</p>
            <p className="text-muted-foreground leading-relaxed">Disputes shall be resolved through good-faith negotiation first, then binding arbitration by AAA under Commercial Arbitration Rules in Wyoming.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. General Provisions</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Entire Agreement:</strong> These Terms together with any SOW or NDA constitute the entire agreement</li>
              <li><strong>Severability:</strong> If any provision is unenforceable, remaining provisions continue in full force</li>
              <li><strong>Waiver:</strong> Failure to enforce any provision does not waive future enforcement</li>
              <li><strong>Force Majeure:</strong> Neither party liable for delays beyond reasonable control</li>
              <li><strong>Assignment:</strong> You may not assign rights without our prior written consent</li>
              <li><strong>Notices:</strong> Must be in writing via email with confirmation of receipt</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">We reserve the right to modify these Terms at any time with at least 30 days&apos; notice of material changes.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">For questions regarding these Terms:</p>
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
