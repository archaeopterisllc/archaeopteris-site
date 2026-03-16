"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Code2 } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"

interface HeroProps {
  dict: Dictionary["hero"]
  locale: Locale
  langDict: Dictionary["language"]
}

export function Hero({ dict, locale, langDict }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        

{/* Logo + company name */}
<div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          
          <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-primary font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">Archaeopteris LLC</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
          <span className="text-foreground">{dict.where} </span>
          <span className="text-primary">{dict.trading}</span>
          <span className="text-foreground"> {dict.meets} </span>
          <span className="text-accent">{dict.technology}</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">{dict.description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
            {dict.exploreServices}<ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary px-8" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            {dict.getInTouch}
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{dict.tradingDivision}</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border">
            <Code2 className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-foreground">{dict.developmentDivision}</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
