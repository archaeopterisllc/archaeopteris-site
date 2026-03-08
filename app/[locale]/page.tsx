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

export default function Home({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale)
  return (
    <main className="min-h-screen bg-background">
      <Hero dict={dict.hero} locale={params.locale} langDict={dict.language} />
      <TrustSignals dict={dict.trust} />
      <Services dict={dict.services} />
      <CaseStudies dict={dict.caseStudies} />
      <About dict={dict.about} />
      <Contact dict={dict.contact} />
      <Legal dict={dict.legal} locale={params.locale} />
      <Footer dict={dict.common} navDict={dict.nav} locale={params.locale} />
    </main>
  )
}
