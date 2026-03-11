import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { LegalPageLayout } from "@/components/legal-page-layout"

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const copyright = `© ${new Date().getFullYear()} Archaeopteris LLC. ${dict.common.copyright}`

  return (
    <LegalPageLayout title={locale === 'vi' ? 'Tuyên Bố Miễn Trừ Trách Nhiệm' : 'Disclaimer'} lastUpdated={locale === 'vi' ? 'Ngày hiệu lực: 9 tháng 3, 2026' : 'Effective Date: March 9, 2026'} backToHome={dict.common.backToHome} locale={locale} privacyLabel={dict.nav.privacyPolicy} termsLabel={dict.nav.termsOfService} disclaimerLabel={dict.nav.disclaimer} copyright={copyright}>

      {locale === 'vi' ? (
        <>
          <section className="mb-10">
            <p className="text-muted-foreground font-medium">ĐỌC KỸ TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM NÀY. TÀI LIỆU NÀY CHỨA CÁC GIỚI HẠN QUAN TRỌNG VỀ TRÁCH NHIỆM PHÁP LÝ CỦA CHÚNG TÔI VÀ QUYỀN CỦA BẠN. BẰNG CÁCH SỬ DỤNG WEBSITE HOẶC DỊCH VỤ CỦA CHÚNG TÔI, BẠN XÁC NHẬN VÀ CHẤP NHẬN CÁC ĐIỀU KHOẢN NÀY.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Tuyên Bố Miễn Trừ Chung</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Thông tin được cung cấp bởi Archaeopteris LLC (&quot;Công ty,&quot; &quot;chúng tôi&quot;) trên website (archaeopteris.us) và qua các dịch vụ chỉ nhằm mục đích thông tin chung và thương mại. Không có nội dung nào trên website cấu thành tư vấn chuyên nghiệp, pháp lý, tài chính, đầu tư hoặc thuế.</p>
            <p className="text-muted-foreground leading-relaxed">Tất cả thông tin được cung cấp với thiện chí; tuy nhiên, chúng tôi không đảm bảo về tính chính xác, đầy đủ, hợp lệ, đáng tin cậy, sẵn có hoặc hoàn chỉnh của bất kỳ thông tin nào.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Tuyên Bố Miễn Trừ Dịch Vụ Giao Dịch và Tài Chính</h2>
            <p className="text-muted-foreground font-medium mb-4">THÔNG BÁO QUY ĐỊNH QUAN TRỌNG: Archaeopteris LLC KHÔNG phải là nhà môi giới-đại lý đã đăng ký, cố vấn đầu tư, cố vấn giao dịch hàng hóa (CTA), người điều hành quỹ hàng hóa (CPO) hoặc doanh nghiệp dịch vụ tiền tệ. Chúng tôi không có giấy phép từ SEC, CFTC, FINRA hoặc bất kỳ cơ quan quản lý chứng khoán tiểu bang nào.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Bản Chất Dịch Vụ Công Nghệ Giao Dịch</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">Bộ phận Giao dịch của chúng tôi cung cấp cơ sở hạ tầng phần mềm và công cụ công nghệ cho các công ty giao dịch độc quyền và tổ chức tài chính. Cụ thể:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Chúng tôi xây dựng và duy trì hệ thống công nghệ giao dịch, không phải chiến lược giao dịch</li>
              <li>Chúng tôi không quản lý quỹ khách hàng, nhận tiền gửi hoặc thực hiện giao dịch thay mặt khách hàng</li>
              <li>Chúng tôi không cung cấp tín hiệu, khuyến nghị hoặc tư vấn đầu tư</li>
              <li>Công nghệ chúng tôi phát triển là công cụ — việc sử dụng và kết quả hoàn toàn thuộc trách nhiệm của khách hàng</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Tiết Lộ Rủi Ro</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">Nếu bạn hoặc khách hàng của bạn tham gia giao dịch công cụ tài chính, bạn xác nhận và chấp nhận rằng:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Giao dịch chứng khoán, hợp đồng tương lai, ngoại hối, tiền điện tử và các công cụ tài chính khác có rủi ro thua lỗ đáng kể</li>
              <li>Hiệu suất quá khứ của bất kỳ hệ thống, thuật toán hoặc chiến lược giao dịch nào không phản ánh kết quả tương lai</li>
              <li>Không có hệ thống hoặc công nghệ giao dịch nào có thể đảm bảo lợi nhuận hoặc ngăn chặn thua lỗ</li>
              <li>Giao dịch thuật toán và tự động mang thêm rủi ro bao gồm lỗi hệ thống, sự cố kết nối và điều kiện thị trường bất ngờ</li>
              <li>Giao dịch có đòn bẩy có thể dẫn đến thua lỗ vượt quá khoản đầu tư ban đầu của bạn</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">Bạn nên cân nhắc kỹ tình hình tài chính, khả năng chịu rủi ro và mục tiêu đầu tư trước khi tham gia giao dịch. Chúng tôi khuyến nghị tham khảo ý kiến cố vấn tài chính được cấp phép hoặc CTA đã đăng ký với CFTC trước khi đưa ra bất kỳ quyết định giao dịch hoặc đầu tư nào.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.3 Công Nghệ Không Đảm Bảo Tuân Thủ</h3>
            <p className="text-muted-foreground leading-relaxed">Mặc dù chúng tôi thiết kế hệ thống với các cân nhắc về quy định, trách nhiệm tuân thủ các quy định giao dịch (bao gồm SEC, CFTC, FINRA và các quy định tiểu bang) hoàn toàn thuộc về bạn và các cán bộ tuân thủ được cấp phép. Các giải pháp công nghệ không cấu thành tư vấn pháp lý hoặc tuân thủ.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Tuyên Bố Miễn Trừ Dịch Vụ Phần Mềm và Phát Triển</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.1 Cung Cấp Nguyên Trạng</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">Phần mềm, ứng dụng và hệ thống được phát triển bởi chúng tôi được cung cấp trên cơ sở &quot;nguyên trạng&quot; và &quot;sẵn có&quot;. Chúng tôi không đảm bảo rằng:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Phần mềm sẽ không có lỗi, bug hoặc lỗ hổng bảo mật</li>
              <li>Phần mềm sẽ hoạt động liên tục hoặc không mất dữ liệu</li>
              <li>Phần mềm sẽ đáp ứng tất cả yêu cầu hoặc phù hợp cho bất kỳ mục đích cụ thể nào không được quy định trong SOW</li>
              <li>Lỗi hoặc khiếm khuyết sẽ được khắc phục trong bất kỳ khung thời gian cụ thể nào</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.2 Trách Nhiệm Của Khách Hàng Đối Với Hệ Thống Sản Xuất</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">Bạn hoàn toàn chịu trách nhiệm:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Kiểm tra kỹ lưỡng tất cả phần mềm trong môi trường staging trước khi triển khai sản xuất</li>
              <li>Duy trì sao lưu đầy đủ tất cả dữ liệu và hệ thống</li>
              <li>Triển khai các biện pháp an ninh mạng phù hợp cho môi trường sản xuất</li>
              <li>Giám sát hệ thống sản xuất và báo cáo sự cố kịp thời</li>
              <li>Đảm bảo phần mềm được sử dụng tuân thủ tất cả luật và quy định hiện hành</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.3 Tích Hợp Bên Thứ Ba</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">Dịch vụ của chúng tôi có thể tích hợp với API, dịch vụ hoặc nền tảng bên thứ ba. Chúng tôi không chịu trách nhiệm về:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Sự cố, lỗi hoặc thay đổi đối với dịch vụ bên thứ ba</li>
              <li>Độ chính xác hoặc tính sẵn có của dữ liệu từ nguồn bên thứ ba</li>
              <li>Chi phí hoặc thiệt hại phát sinh từ sự cố dịch vụ bên thứ ba</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Không Đảm Bảo Kết Quả</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">Chúng tôi không đảm bảo bất kỳ kết quả kinh doanh, tài chính, chỉ số hiệu suất hoặc lợi tức đầu tư cụ thể nào. Sự thành công phụ thuộc vào nhiều yếu tố ngoài tầm kiểm soát của chúng tôi, bao gồm:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Điều kiện thị trường và thanh khoản</li>
              <li>Quy trình vận hành và nhân sự của bạn</li>
              <li>Hiệu suất mạng và cơ sở hạ tầng</li>
              <li>Thay đổi quy định</li>
              <li>Độ tin cậy của dịch vụ bên thứ ba</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Giới Hạn Trách Nhiệm</h2>
            <p className="text-muted-foreground leading-relaxed">TRONG PHẠM VI TỐI ĐA ĐƯỢC PHÁP LUẬT CHO PHÉP, ARCHAEOPTERIS LLC VÀ CÁC THÀNH VIÊN, QUẢN LÝ, NHÂN VIÊN VÀ NHÀ THẦU KHÔNG CHỊU TRÁCH NHIỆM VỀ BẤT KỲ THIỆT HẠI TRỰC TIẾP, GIÁN TIẾP, NGẪU NHIÊN, HẬU QUẢ, ĐẶC BIỆT, ĐIỂN HÌNH HOẶC TRỪNG PHẠT NÀO PHÁT SINH TỪ VIỆC SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI, BAO GỒM NHƯNG KHÔNG GIỚI HẠN: TỔN THẤT GIAO DỊCH, MẤT LỢI NHUẬN, NGỪNG HOẠT ĐỘNG HỆ THỐNG, MẤT DỮ LIỆU HOẶC PHẠT QUY ĐỊNH.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Bồi Thường</h2>
            <p className="text-muted-foreground leading-relaxed">Bằng cách sử dụng dịch vụ của chúng tôi, bạn đồng ý bồi thường, bảo vệ và giữ vô hại cho Công ty khỏi bất kỳ khiếu nại, thiệt hại, tổn thất hoặc chi phí nào phát sinh từ hoạt động giao dịch của bạn, việc sử dụng phần mềm của chúng tôi, vi phạm pháp luật hoặc sự phụ thuộc vào thông tin chúng tôi cung cấp.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Liên Kết và Tham Chiếu Bên Thứ Ba</h2>
            <p className="text-muted-foreground leading-relaxed">Website của chúng tôi có thể chứa liên kết đến các website, tài nguyên hoặc dịch vụ bên thứ ba. Chúng tôi không xác nhận, kiểm soát hoặc chịu trách nhiệm về nội dung, độ chính xác hoặc thực hành của bất kỳ trang bên thứ ba nào. Việc sử dụng liên kết bên thứ ba là rủi ro của bạn.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Giới Hạn Thẩm Quyền</h2>
            <p className="text-muted-foreground leading-relaxed">Dịch vụ của chúng tôi được cung cấp từ Hoa Kỳ và dành cho các khách hàng doanh nghiệp có khả năng ký kết hợp đồng ràng buộc pháp lý. Chúng tôi không đảm bảo rằng dịch vụ phù hợp hoặc có sẵn ở tất cả các khu vực. Bạn chịu trách nhiệm tuân thủ luật địa phương áp dụng.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Thay Đổi Tuyên Bố Này</h2>
            <p className="text-muted-foreground leading-relaxed">Chúng tôi có quyền cập nhật Tuyên bố này bất cứ lúc nào. Các thay đổi có hiệu lực khi được đăng lên website. Việc tiếp tục sử dụng dịch vụ cấu thành sự chấp nhận Tuyên bố đã cập nhật.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Thông Tin Liên Hệ</h2>
            <p className="text-muted-foreground leading-relaxed">Để giải đáp thắc mắc về Tuyên bố này:</p>
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
            <p className="text-muted-foreground font-medium">READ THIS DISCLAIMER CAREFULLY. THIS DOCUMENT CONTAINS IMPORTANT LIMITATIONS ON OUR LIABILITY AND YOUR RIGHTS. BY USING OUR WEBSITE OR SERVICES, YOU ACKNOWLEDGE AND ACCEPT THESE TERMS.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. General Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">The information provided by Archaeopteris LLC (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) on our website (archaeopteris.us) and through our services is for general informational and commercial purposes only. Nothing on our website constitutes professional, legal, financial, investment, or tax advice.</p>
            <p className="text-muted-foreground leading-relaxed">All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Trading and Financial Services Disclaimer</h2>
            <p className="text-muted-foreground font-medium mb-4">IMPORTANT REGULATORY NOTICE: Archaeopteris LLC is NOT a registered broker-dealer, investment advisor, commodity trading advisor (CTA), commodity pool operator (CPO), or money services business. We do not hold any license from the SEC, CFTC, FINRA, or any state securities regulator.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Nature of Our Trading Technology Services</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>We build and maintain trading technology systems, not trading strategies</li>
              <li>We do not manage client funds, accept deposits, or execute trades on behalf of clients</li>
              <li>We do not provide signals, recommendations, or investment advice</li>
              <li>Technology we develop is a tool — its use and output are the sole responsibility of the client</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Risk Disclosure</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Trading in securities, futures, forex, cryptocurrencies, and other financial instruments involves substantial risk of loss</li>
              <li>Past performance of any trading system, algorithm, or strategy is not indicative of future results</li>
              <li>No trading system or technology can guarantee profits or prevent losses</li>
              <li>Algorithmic and automated trading carries additional risks including system failures and unexpected market conditions</li>
              <li>Leveraged trading can result in losses exceeding your initial investment</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">We strongly recommend consulting with a licensed financial advisor or CTA registered with the CFTC before making any trading or investment decisions.</p>
            <h3 className="text-xl font-semibold text-foreground mb-2">2.3 Technology Does Not Guarantee Compliance</h3>
            <p className="text-muted-foreground leading-relaxed">The ultimate responsibility for compliance with applicable trading regulations rests solely with you and your licensed compliance officers.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Software and Development Services Disclaimer</h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.1 As-Is Provision</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Software will be error-free, bug-free, or free from security vulnerabilities</li>
              <li>Software will operate without interruption or without data loss</li>
              <li>Software will meet all requirements not specified in the SOW</li>
              <li>Errors or defects will be corrected within any specific timeframe</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.2 Client Responsibility for Production Systems</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Thoroughly test all software in staging before production deployment</li>
              <li>Maintain adequate backups of all data and systems</li>
              <li>Implement appropriate cybersecurity measures</li>
              <li>Monitor production systems and promptly report issues</li>
              <li>Ensure software is used in compliance with all applicable laws</li>
            </ul>
            <h3 className="text-xl font-semibold text-foreground mb-2">3.3 Third-Party Integrations</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Outages, errors, or changes to third-party services</li>
              <li>Data accuracy or availability from third-party sources</li>
              <li>Costs or damages arising from third-party service failures</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. No Guarantee of Results</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Market conditions and liquidity</li>
              <li>Your operational procedures and personnel</li>
              <li>Network and infrastructure performance</li>
              <li>Regulatory changes</li>
              <li>Third-party service reliability</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ARCHAEOPTERIS LLC AND ITS MEMBERS, MANAGERS, EMPLOYEES, AND CONTRACTORS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OUR SERVICES, INCLUDING BUT NOT LIMITED TO: TRADING LOSSES, LOST PROFITS, SYSTEM DOWNTIME, DATA LOSS, OR REGULATORY PENALTIES.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">By using our services, you agree to indemnify, defend, and hold harmless the Company from any claims, damages, losses, or expenses arising from your trading activities, use of our software, violations of applicable law, or reliance on information provided by us.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Third-Party Links and References</h2>
            <p className="text-muted-foreground leading-relaxed">Our website may contain links to third-party websites for informational purposes. We do not endorse, control, or assume responsibility for the content or practices of any third-party sites. Use of third-party links is at your own risk.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Jurisdictional Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">Our services are provided from the United States and are intended for business clients capable of entering into legally binding contracts. You are responsible for compliance with local laws applicable to your use of our services.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to This Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">We reserve the right to update this Disclaimer at any time. Changes become effective upon posting to our website. Continued use of our services constitutes acceptance of the updated Disclaimer.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">For questions regarding this Disclaimer:</p>
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
