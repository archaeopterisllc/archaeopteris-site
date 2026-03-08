import { Shield, Lock, Clock, Award, Building2, FileCheck } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface TrustSignalsProps { dict: Dictionary["trust"] }

export function TrustSignals({ dict }: TrustSignalsProps) {
  const trustBadges = [
    { icon: Building2, title: dict.registeredLLC, description: dict.wyomingUSA },
    { icon: Lock, title: dict.secureInfrastructure, description: dict.enterpriseGrade },
    { icon: Clock, title: dict.monitoring, description: dict.roundTheClock },
    { icon: FileCheck, title: dict.ndaProtected, description: dict.confidentiality },
  ]
  const complianceItems = [dict.soc2, dict.gdpr, dict.financialBestPractices, dict.secureCodeReview]
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                <badge.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4 md:border-r md:border-border md:pr-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">{dict.securityCompliance}</h3>
                <p className="text-sm text-muted-foreground">{dict.builtForRegulated}</p>
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
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">{dict.clientConfidence}</p>
        </div>
      </div>
    </section>
  )
}
