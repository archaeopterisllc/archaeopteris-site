import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Server, 
  Link2, 
  ShieldCheck,
  ArrowRight
} from "lucide-react"

const caseStudies = [
  {
    icon: Server,
    title: "Trading Infrastructure Platform",
    description: "Built a comprehensive trading infrastructure platform for a growing prop firm, enabling real-time order routing, position management, and performance analytics across multiple asset classes.",
    tags: ["Real-time Systems", "Order Management", "Analytics"],
    color: "primary" as const,
    metrics: [
      { label: "Latency", value: "<10ms" },
      { label: "Uptime", value: "99.99%" },
    ]
  },
  {
    icon: Link2,
    title: "Broker API Integration",
    description: "Developed a unified API layer integrating multiple broker connections, providing seamless trade execution and data aggregation for institutional clients with diverse trading requirements.",
    tags: ["API Development", "Multi-Broker", "Data Aggregation"],
    color: "accent" as const,
    metrics: [
      { label: "Brokers", value: "12+" },
      { label: "Daily Trades", value: "50K+" },
    ]
  },
  {
    icon: ShieldCheck,
    title: "Risk Management Engine",
    description: "Engineered an advanced risk management system with real-time exposure monitoring, automated position limits, and compliance reporting for regulatory requirements.",
    tags: ["Risk Analytics", "Compliance", "Monitoring"],
    color: "primary" as const,
    metrics: [
      { label: "Risk Checks", value: "Real-time" },
      { label: "Reports", value: "Automated" },
    ]
  }
]

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
            Case Studies
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
            Proven Solutions, Real Results
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Explore how we have helped trading firms and technology companies 
            build robust systems that drive their success.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group flex flex-col"
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg ${study.color === 'primary' ? 'bg-primary/10 border-primary/20' : 'bg-accent/10 border-accent/20'} border flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <study.icon className={`h-6 w-6 ${study.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                </div>
                <CardTitle className="text-xl text-card-foreground">{study.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <CardDescription className="text-muted-foreground text-base mb-6 flex-1">
                  {study.description}
                </CardDescription>
                
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-secondary/50 border border-border">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className={`text-lg font-bold ${study.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group"
          >
            Discuss your project with us
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
