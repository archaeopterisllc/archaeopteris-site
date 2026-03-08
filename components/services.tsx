import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  LineChart, 
  Shield, 
  Zap,
  Code2, 
  Database, 
  Globe, 
  Smartphone,
  Server,
  Layers
} from "lucide-react"

const tradingServices = [
  {
    icon: TrendingUp,
    title: "Prop Firm Infrastructure",
    description: "End-to-end trading infrastructure including order management systems, position tracking, P&L reporting, and trader evaluation platforms built to institutional standards."
  },
  {
    icon: LineChart,
    title: "Broker & Liquidity Integration",
    description: "FIX protocol integration, multi-broker connectivity, and liquidity aggregation solutions enabling seamless trade execution across global markets."
  },
  {
    icon: Shield,
    title: "Risk & Compliance Systems",
    description: "Real-time risk monitoring, automated position limits, exposure management, and regulatory reporting tools designed for financial industry compliance requirements."
  },
  {
    icon: Zap,
    title: "Execution & Algorithm Systems",
    description: "Low-latency execution engines, smart order routing, and algorithmic trading frameworks optimized for speed and reliability in live market conditions."
  }
]

const devServices = [
  {
    icon: Globe,
    title: "Enterprise Web Applications",
    description: "Production-grade web applications with modern architectures, optimized performance, and scalable infrastructure supporting thousands of concurrent users."
  },
  {
    icon: Smartphone,
    title: "Mobile Solutions",
    description: "Native and cross-platform mobile applications for iOS and Android, featuring offline capabilities, real-time sync, and enterprise security standards."
  },
  {
    icon: Database,
    title: "Backend & API Development",
    description: "RESTful and GraphQL APIs, microservices architectures, and high-throughput data pipelines engineered for reliability and horizontal scalability."
  },
  {
    icon: Server,
    title: "Cloud & DevOps",
    description: "Multi-cloud deployments on AWS, GCP, and Azure with automated CI/CD pipelines, infrastructure as code, and 24/7 monitoring solutions."
  }
]

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Trading Division */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Trading Division</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Financial Technology Solutions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 text-pretty">
            Empowering prop firms and brokers with institutional-grade technology, 
            from trading infrastructure to compliance systems.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {tradingServices.map((service, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:border-primary/50 transition-colors group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dev Division */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
              <Code2 className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Development Division</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Full-Stack Development
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 text-pretty">
            From concept to deployment, we build robust, scalable applications 
            that drive business growth and user engagement.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {devServices.map((service, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:border-accent/50 transition-colors group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-24 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Layers className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Our Tech Stack</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
