import { CheckCircle2, Users, Target, Award } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface AboutProps { dict: Dictionary["about"] }

export function About({ dict }: AboutProps) {
  const stats = [
    { value: "1+", label: dict.systemsBuilt },
    { value: "5+", label: dict.tradingStrategies },
    { value: "99.9%", label: dict.systemUptime },
    { value: "24/7", label: dict.supportAvailable },
  ]
  const values = [
    { icon: Target, title: dict.precision, description: dict.precisionDesc },
    { icon: Users, title: dict.partnership, description: dict.partnershipDesc },
    { icon: Award, title: dict.excellence, description: dict.excellenceDesc },
  ]
  const keyPoints = [dict.institutionalGrade, dict.enterpriseReady, dict.dedicatedSupport, dict.agile]
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">{dict.aboutUs}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{dict.heading}</h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">{dict.ourStory}</h3>
            <p className="text-muted-foreground text-lg mb-6 text-pretty">{dict.story1}</p>
            <p className="text-muted-foreground text-lg mb-6 text-pretty">{dict.story2}</p>
            <p className="text-muted-foreground text-lg mb-8 text-pretty">{dict.story3}</p>
            <div className="flex flex-col gap-3">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 rounded-xl bg-card border border-border text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {values.map((value, index) => (
                <div key={index} className="p-5 rounded-xl bg-card border border-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
