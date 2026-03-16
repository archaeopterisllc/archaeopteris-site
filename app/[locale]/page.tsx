import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Hero } from '@/components/hero'
import { TrustSignals } from '@/components/trust-signals'
import { Services } from '@/components/services'
import { CaseStudies } from '@/components/case-studies'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Legal } from '@/components/legal'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Announcement } from '@/components/announcement'

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  return (
    <main className="min-h-screen bg-background">
      <Navbar locale={locale} langDict={dict.language} navDict={dict.nav} />
      <Announcement text={dict.notice.building} />
      <Hero dict={dict.hero} locale={locale} langDict={dict.language} />
      <TrustSignals dict={dict.trust} />
      <Services dict={dict.services} />
      <CaseStudies dict={dict.caseStudies} />
      <About dict={dict.about} />
      <Contact dict={dict.contact} />
      <Legal dict={dict.legal} locale={locale} navDict={dict.nav} />
      <Footer dict={dict.common} navDict={dict.nav} locale={locale} />
    </main>
  )
}
