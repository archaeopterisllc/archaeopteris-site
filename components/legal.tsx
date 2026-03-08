import Link from "next/link"
import { FileText, Shield, AlertCircle } from "lucide-react"

const legalLinks = [
  {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your data",
    href: "/privacy",
    icon: Shield,
  },
  {
    title: "Terms of Service",
    description: "Terms and conditions for using our services",
    href: "/terms",
    icon: FileText,
  },
  {
    title: "Disclaimer",
    description: "Important legal notices and limitations",
    href: "/disclaimer",
    icon: AlertCircle,
  },
]

export function Legal() {
  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Legal</h2>
          <p className="text-muted-foreground text-sm">
            Important legal information and policies
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {legalLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group flex items-center gap-3 px-6 py-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300"
            >
              <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {link.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
