import { Hero } from "@/components/hero"
import { TrustSignals } from "@/components/trust-signals"
import { Services } from "@/components/services"
import { CaseStudies } from "@/components/case-studies"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Legal } from "@/components/legal"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <TrustSignals />
      <Services />
      <CaseStudies />
      <About />
      <Contact />
      <Legal />
      <Footer />
    </main>
  )
}
