import { Shield, Lock, Clock, Award, Building2, FileCheck } from "lucide-react"

const trustBadges = [
  {
    icon: Building2,
    title: "Registered LLC",
    description: "Wyoming, USA"
  },
  {
    icon: Lock,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security"
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Round-the-clock systems"
  },
  {
    icon: FileCheck,
    title: "NDA Protected",
    description: "Confidentiality guaranteed"
  }
]

const complianceItems = [
  "SOC 2 compliant development practices",
  "GDPR-ready data handling",
  "Financial industry best practices",
  "Secure code review processes"
]

export function TrustSignals() {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {trustBadges.map((badge, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                <badge.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* Compliance & Security */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4 md:border-r md:border-border md:pr-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">Security & Compliance</h3>
                <p className="text-sm text-muted-foreground">Built for regulated industries</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 flex-1">
              {complianceItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client confidence statement */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Trusted by proprietary trading firms and fintech companies to deliver mission-critical 
            systems with the reliability and security their operations demand.
          </p>
        </div>
      </div>
    </section>
  )
}
