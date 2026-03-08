import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"

interface FooterProps {
  dict: Dictionary["common"]
  navDict: Dictionary["nav"]
  locale: Locale
}

export function Footer({ dict, navDict, locale }: FooterProps) {
  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">A</span>
              </div>
              <span className="text-sm font-medium text-foreground">{dict.companyName}</span>
            </div>
            <p className="text-sm text-muted-foreground">{dict.location}</p>
            <a href={`mailto:${dict.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{dict.email}</a>
          </div>
          <p className="text-sm text-muted-foreground text-center">© {new Date().getFullYear()} {dict.companyName}. {dict.copyright}</p>
          <nav className="flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{navDict.services}</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{navDict.about}</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{navDict.contact}</a>
            <a href={`/${locale}/privacy`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{navDict.privacyPolicy}</a>
            <a href={`/${locale}/terms`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{navDict.termsOfService}</a>
            <a href={`/${locale}/disclaimer`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{navDict.disclaimer}</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
