import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  backToHome: string
  children: React.ReactNode
  locale: Locale
  privacyLabel: string
  termsLabel: string
  disclaimerLabel: string
  copyright: string
}

export function LegalPageLayout({ title, lastUpdated, backToHome, children, locale, privacyLabel, termsLabel, disclaimerLabel, copyright }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />{backToHome}
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
            <p className="text-muted-foreground">{lastUpdated}</p>
          </header>
          <div className="prose prose-invert max-w-none">{children}</div>
        </div>
      </div>
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>{copyright}</p>
            <div className="flex gap-6">
              <Link href={`/${locale}/privacy`} className="hover:text-primary transition-colors">{privacyLabel}</Link>
              <Link href={`/${locale}/terms`} className="hover:text-primary transition-colors">{termsLabel}</Link>
              <Link href={`/${locale}/disclaimer`} className="hover:text-primary transition-colors">{disclaimerLabel}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
