import type { Locale } from "@/lib/i18n/config"
import { LegalPageLayout } from "@/components/legal-page-layout"

export const metadata = {
  title: "Privacy Policy | Archaeopteris LLC",
  description: "Privacy Policy for Archaeopteris LLC - How we collect, use, and protect your information.",
}

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  return (
    <LegalPageLayout locale={params.locale} title="Privacy Policy" lastUpdated="March 8, 2026">
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Archaeopteris LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We may collect information about you in a variety of ways, including:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li><strong className="text-foreground">Personal Data:</strong> Name, email address, company name, and other contact information you voluntarily provide through our contact form.</li>
          <li><strong className="text-foreground">Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, and pages visited.</li>
          <li><strong className="text-foreground">Cookies:</strong> We may use cookies and similar tracking technologies to enhance your experience on our website.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li>Respond to your inquiries and provide customer support</li>
          <li>Improve our website and services</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services or as required by law.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal information. To exercise these rights, please contact us at contact@archaeopteris.us.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you have questions about this Privacy Policy, please contact us at:<br />
          <strong className="text-foreground">Email:</strong> contact@archaeopteris.us
        </p>
      </section>
    </LegalPageLayout>
  )
}
