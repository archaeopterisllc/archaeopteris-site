import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, LineChart, Shield, Zap, Code2, Database, Globe, Smartphone, Server, Layers } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface ServicesProps { dict: Dictionary["services"] }

export function Services({ dict }: ServicesProps) {
  const tradingServices = [
    { icon: TrendingUp, title: dict.propFirmInfrastructure, description: dict.propFirmDesc },
    { icon: LineChart, title: dict.brokerIntegration, description: dict.brokerDesc },
    { icon: Shield, title: dict.riskCompliance, description: dict.riskDesc },
    { icon: Zap, title: dict.executionAlgorithm, description: dict.executionDesc },
  ]
  const devServices = [
    { icon: Globe, title: dict.webApps, description: dict.webAppsDesc },
    { icon: Smartphone, title: dict.mobileSolutions, description: dict.mobileDesc },
    { icon: Database, title: dict.backendAPI, description: dict.backendDesc },
    { icon: Server, title: dict.cloudDevOps, description: dict.cloudDesc },
  ]
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">{dict.tradingDivision}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{dict.financialTechSolutions}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 text-pretty">{dict.tradingDescription}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {tradingServices.map((service, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
              <Code2 className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">{dict.developmentDivision}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{dict.fullStackDev}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 text-pretty">{dict.devDescription}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {devServices.map((service, index) => (
              <Card key={index} className="bg-card border-border hover:border-accent/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-24 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Layers className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{dict.techStack}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
