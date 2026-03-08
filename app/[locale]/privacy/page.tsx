import { type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { LegalPageLayout } from "@/components/legal-page-layout"

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale)
  const p = dict.privacy
  const lastUpdatedText = `${dict.common.lastUpdated}: March 8, 2026`
  const copyright = `© ${new Date().getFullYear()} Archaeopteris LLC. ${dict.common.copyright}`
  return (
    <LegalPageLayout title={p.title} lastUpdated={lastUpdatedText} backToHome={dict.common.backToHome} locale={params.locale} privacyLabel={dict.nav.privacyPolicy} termsLabel={dict.nav.termsOfService} disclaimerLabel={dict.nav.disclaimer} copyright={copyright}>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{p.intro}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{p.introText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{p.infoCollect}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{p.infoCollectText}</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li><strong className="text-foreground">{p.personalData}</strong> {p.personalDataText}</li>
          <li><strong className="text-foreground">{p.usageData}</strong> {p.usageDataText}</li>
          <li><strong className="text-foreground">{p.cookies}</strong> {p.cookiesText}</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{p.howWeUse}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{p.howWeUseText}</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
          <li>{p.howWeUseItem1}</li><li>{p.howWeUseItem2}</li><li>{p.howWeUseItem3}</li><li>{p.howWeUseItem4}</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{p.infoSharing}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{p.infoSharingText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{p.dataSecurity}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{p.dataSecurityText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{p.yourRights}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{p.yourRightsText}</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{p.contactTitle}</h2>
        <p className="text-muted-foreground leading-relaxed">{p.contactText}<br /><strong className="text-foreground">Email:</strong> {dict.common.email}</p>
      </section>
    </LegalPageLayout>
  )
}
