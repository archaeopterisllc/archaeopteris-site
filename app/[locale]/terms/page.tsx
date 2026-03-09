import { type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { LegalPageLayout } from "@/components/legal-page-layout"

export default async function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const t = dict.terms
  const lastUpdatedText = `${dict.common.lastUpdated}: March 8, 2026`
  const copyright = `© ${new Date().getFullYear()} Archaeopteris LLC. ${dict.common.copyright}`
  return (
    <LegalPageLayout title={t.title} lastUpdated={lastUpdatedText} backToHome={dict.common.backToHome} locale={locale} privacyLabel={dict.nav.privacyPolicy} termsLabel={dict.nav.termsOfService} disclaimerLabel={dict.nav.disclaimer} copyright={copyright}>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.acceptance}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t.acceptanceText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.servicesDesc}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t.servicesDescText}</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li><strong className="text-foreground">{t.tradingDiv}</strong> {t.tradingDivText}</li>
          <li><strong className="text-foreground">{t.devDiv}</strong> {t.devDivText}</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.userResp}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t.userRespText}</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li>{t.userRespItem1}</li><li>{t.userRespItem2}</li><li>{t.userRespItem3}</li><li>{t.userRespItem4}</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.intellectualProperty}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t.intellectualPropertyText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.limitation}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t.limitationText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.indemnification}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t.indemnificationText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.termination}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t.terminationText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.governingLaw}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t.governingLawText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.changes}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{t.changesText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.contactTitle}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.contactText}<br /><strong className="text-foreground">Email:</strong> {dict.common.email}</p>
      </section>
    </LegalPageLayout>
  )
}
