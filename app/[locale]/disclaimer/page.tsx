import { type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { LegalPageLayout } from "@/components/legal-page-layout"

export default async function DisclaimerPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const d = dict.disclaimer
  const lastUpdatedText = `${dict.common.lastUpdated}: March 8, 2026`
  const copyright = `© ${new Date().getFullYear()} Archaeopteris LLC. ${dict.common.copyright}`
  return (
    <LegalPageLayout title={d.title} lastUpdated={lastUpdatedText} backToHome={dict.common.backToHome} locale={locale} privacyLabel={dict.nav.privacyPolicy} termsLabel={dict.nav.termsOfService} disclaimerLabel={dict.nav.disclaimer} copyright={copyright}>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{d.general}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{d.generalText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{d.trading}</h2>
        <div className="bg-card border border-border rounded-lg p-6 mb-4">
          <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">{d.tradingImportant}</strong> {d.tradingWarning}</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>{d.tradingItem1}</li><li>{d.tradingItem2}</li><li>{d.tradingItem3}</li><li>{d.tradingItem4}</li>
          </ul>
        </div>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{d.software}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{d.softwareText}</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li>{d.softwareItem1}</li><li>{d.softwareItem2}</li><li>{d.softwareItem3}</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{d.thirdParty}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{d.thirdPartyText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{d.professional}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{d.professionalText}</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li>{d.professionalItem1}</li><li>{d.professionalItem2}</li><li>{d.professionalItem3}</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{d.noGuarantees}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{d.noGuaranteesText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{d.limitation}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{d.limitationText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{d.contactTitle}</h2>
        <p className="text-muted-foreground leading-relaxed">{d.contactText}<br /><strong className="text-foreground">Email:</strong> {dict.common.email}</p>
      </section>
    </LegalPageLayout>
  )
}
