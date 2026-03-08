import { LegalPageLayout } from "@/components/legal-page-layout"

export const metadata = {
  title: "Disclaimer | Archaeopteris LLC",
  description: "Disclaimer for Archaeopteris LLC - Important notices regarding our services and information.",
}

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer" lastUpdated="March 8, 2026">
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">1. General Information</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The information provided by Archaeopteris LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) on our website and through our services is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Trading and Financial Disclaimer</h2>
        <div className="bg-card border border-border rounded-lg p-6 mb-4">
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong className="text-foreground">IMPORTANT:</strong> Trading in financial markets involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Our trading solutions and services are tools to assist in trading operations; they do not guarantee profits or prevent losses.</li>
            <li>We do not provide financial, investment, legal, or tax advice.</li>
            <li>You should consult with qualified professionals before making any trading or investment decisions.</li>
            <li>Any trading strategies, algorithms, or systems we develop are provided without guarantee of performance.</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">3. Software and Development Disclaimer</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Software and applications developed by Archaeopteris LLC are provided on an &quot;as is&quot; and &quot;as available&quot; basis. While we strive for excellence in our development services:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li>We do not warrant that our software will be error-free or uninterrupted.</li>
          <li>We are not responsible for any data loss, system failures, or damages resulting from the use of our software.</li>
          <li>Clients are responsible for maintaining backups and implementing appropriate security measures.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Links</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our website may contain links to third-party websites or services that are not owned or controlled by Archaeopteris LLC. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">5. Professional Advice Disclaimer</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The content on our website and in our communications does not constitute professional advice. Before taking any actions based on information provided by us, you should:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li>Consult with appropriate licensed professionals</li>
          <li>Conduct your own due diligence and research</li>
          <li>Consider your own personal circumstances and risk tolerance</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">6. No Guarantees</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We do not guarantee any specific results from using our services. Success depends on many factors, including but not limited to market conditions, individual skill, and proper implementation.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Under no circumstance shall Archaeopteris LLC be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your use of our services or reliance on any information provided by us.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you have questions about this Disclaimer, please contact us at:<br />
          <strong className="text-foreground">Email:</strong> contact@archaeopteris.us
        </p>
      </section>
    </LegalPageLayout>
  )
}
