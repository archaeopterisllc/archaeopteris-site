import { CheckCircle2, Users, Target, Award } from "lucide-react"

const stats = [
  { value: "1+", label: "Systems Built" },
  { value: "5+", label: "Trading Strategies" },
  { value: "99.9%", label: "System Uptime" },
  { value: "24/7", label: "Support Available" }
]

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every line of code, every trading system is built with meticulous attention to detail."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work as an extension of your team, aligned with your goals and timelines."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Industry-leading solutions backed by continuous innovation and improvement."
  }
]

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Built on Expertise, Driven by Innovation
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">Our Story</h3>
            <p className="text-muted-foreground text-lg mb-6 text-pretty">
              Archaeopteris LLC was founded by traders and engineers who saw a critical gap in the market. 
              With years of hands-on experience in financial infrastructure and full-stack development, 
              our founding team understood the unique challenges that prop firms, brokers, and technology 
              companies face when building reliable, high-performance systems.
            </p>
            <p className="text-muted-foreground text-lg mb-6 text-pretty">
              Our dual-division structure was born from this insight: trading technology demands both 
              deep financial expertise and cutting-edge software engineering. By combining these 
              disciplines under one roof, we deliver comprehensive solutions that other firms simply 
              cannot match.
            </p>
            <p className="text-muted-foreground text-lg mb-8 text-pretty">
              Whether you are a prop firm seeking robust infrastructure or a business looking for 
              a technology partner, our team brings deep domain expertise and a commitment to 
              delivering results that exceed expectations.
            </p>

            {/* Key points */}
            <div className="flex flex-col gap-3">
              {[
                "Institutional-grade trading systems",
                "Enterprise-ready web and mobile applications",
                "Dedicated support and maintenance",
                "Agile development methodology"
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Stats & Values */}
          <div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="flex flex-col gap-4">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="p-5 rounded-xl bg-card border border-border flex items-start gap-4"
                >
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
