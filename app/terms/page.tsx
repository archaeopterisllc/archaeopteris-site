import { LegalPageLayout } from "@/components/legal-page-layout"

export const metadata = {
  title: "Terms of Service | Archaeopteris LLC",
  description: "Terms of Service for Archaeopteris LLC - Rules and guidelines for using our services.",
}

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="March 8, 2026">
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          By accessing or using the services provided by Archaeopteris LLC (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Description</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Archaeopteris LLC provides two primary service divisions:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li><strong className="text-foreground">Trading Division:</strong> Solutions for proprietary trading firms and brokers, including integration services, risk management tools, and algorithmic trading solutions.</li>
          <li><strong className="text-foreground">Development Division:</strong> Full-stack software development services, including web applications, mobile applications, backend systems, and cloud infrastructure.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          When using our services, you agree to:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li>Provide accurate and complete information</li>
          <li>Use our services only for lawful purposes</li>
          <li>Not interfere with or disrupt our services or servers</li>
          <li>Maintain the confidentiality of any account credentials</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          All content, features, and functionality of our website and services are owned by Archaeopteris LLC and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">5. Limitation of Liability</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To the maximum extent permitted by law, Archaeopteris LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, even if we have been advised of the possibility of such damages.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">6. Indemnification</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You agree to indemnify and hold harmless Archaeopteris LLC, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these terms.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">7. Termination</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for any reason, including breach of these Terms of Service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">8. Governing Law</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by updating the &quot;Last updated&quot; date at the top of this page.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Us</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you have questions about these Terms of Service, please contact us at:<br />
          <strong className="text-foreground">Email:</strong> contact@archaeopteris.us
        </p>
      </section>
    </LegalPageLayout>
  )
}
