import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Link2, ShieldCheck, ArrowRight } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface CaseStudiesProps { dict: Dictionary["caseStudies"] }

export function CaseStudies({ dict }: CaseStudiesProps) {
  const caseStudies = [
    {
      icon: Server, title: dict.tradingPlatform, description: dict.tradingPlatformDesc,
      tags: [dict.realTimeSystems, dict.orderManagement, dict.analytics], color: "primary" as const,
      metrics: [{ label: dict.latency, value: "<10ms" }, { label: dict.uptime, value: "99.99%" }]
    },
    {
      icon: Link2, title: dict.brokerAPI, description: dict.brokerAPIDesc,
      tags: [dict.apiDev, dict.multiBroker, dict.dataAggregation], color: "accent" as const,
      metrics: [{ label: dict.brokers, value: "12+" }, { label: dict.dailyTrades, value: "50K+" }]
    },
    {
      icon: ShieldCheck, title: dict.riskEngine, description: dict.riskEngineDesc,
      tags: [dict.riskAnalytics, dict.compliance, dict.monitoringTag], color: "primary" as const,
      metrics: [{ label: dict.riskChecks, value: dict.realTime }, { label: dict.reports, value: dict.automated }]
    },
  ]
  return (
    <section id="case-studies" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">{dict.title}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">{dict.heading}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">{dict.description}</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group flex flex-col">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg ${study.color === 'primary' ? 'bg-primary/10 border-primary/20' : 'bg-accent/10 border-accent/20'} border flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <study.icon className={`h-6 w-6 ${study.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                </div>
                <CardTitle className="text-xl text-card-foreground">{study.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <CardDescription className="text-muted-foreground text-base mb-6 flex-1">{study.description}</CardDescription>
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-secondary/50 border border-border">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className={`text-lg font-bold ${study.color === 'primary' ? 'text-primary' : 'text-accent'}`}>{metric.value}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag, i) => <Badge key={i} variant="secondary" className="text-xs font-medium">{tag}</Badge>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="#contact" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group">
            {dict.discussProject}<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
