"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  locale: Locale
  langDict: Dictionary["language"]
  navDict: Dictionary["nav"]
}

export function Navbar({ locale, langDict, navDict }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { href: `/${locale}`, label: locale === "vi" ? "Trang chủ" : "Home" },
    { href: `/${locale}/industry/propfirm`, label: "Prop Firm" },
    { href: `/${locale}/industry/vibecoding`, label: "Vibe Coding" },
  ]

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav
          className={`flex items-center justify-between gap-6 px-4 py-2.5 rounded-2xl border transition-all duration-300 w-full max-w-3xl ${
            scrolled
              ? "bg-background/80 backdrop-blur-md border-border shadow-lg shadow-black/10"
              : "bg-background/40 backdrop-blur-sm border-border/50"
          }`}
        >
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-primary font-bold text-xs">A</span>
            </div>
            <span className="text-sm font-semibold text-foreground ">Archaeopteris LLC</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-primary/15 text-primary font-semibold ring-1 ring-primary/40"
                    : "text-foreground hover:text-primary hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher currentLocale={locale} dict={langDict} />
            <button
              className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="absolute top-14 left-4 right-4 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-lg p-3 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-primary/15 text-primary font-semibold ring-1 ring-primary/40"
                    : "text-foreground hover:text-primary hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="h-16" />
    </>
  )
}
