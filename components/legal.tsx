import Link from "next/link"
import { FileText, Shield, AlertCircle } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"

interface LegalProps { dict: Dictionary["legal"]; locale: Locale; navDict: Dictionary["nav"] }

export function Legal({ dict, locale, navDict }: LegalProps) {
  const legalLinks = [
    { title: navDict.privacyPolicy, description: dict.privacyDesc, href: `/${locale}/privacy`, icon: Shield },
    { title: navDict.termsOfService, description: dict.termsDesc, href: `/${locale}/terms`, icon: FileText },
    { title: navDict.disclaimer, description: dict.disclaimerDesc, href: `/${locale}/disclaimer`, icon: AlertCircle },
  ]

  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-2">{dict.title}</h2>
          <p className="text-muted-foreground text-sm">{dict.description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group flex items-center gap-3 px-6 py-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300">
              <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">{link.title}</p>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
