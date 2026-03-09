"use client"

import { usePathname, useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { i18n, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface LanguageSwitcherProps {
  currentLocale: Locale
  dict: Dictionary["language"]
}

export function LanguageSwitcher({ currentLocale, dict }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")
    window.location.href = newPath
  }

  const languages = [
    { code: "en" as Locale, label: dict.english, flag: "🇺🇸" },
    { code: "vi" as Locale, label: dict.vietnamese, flag: "🇻🇳" },
  ]

  const currentLanguage = languages.find((l) => l.code === currentLocale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-border bg-card/50 text-foreground hover:bg-secondary gap-2"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.label}</span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLocale(language.code)}
            className={`cursor-pointer ${
              currentLocale === language.code
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            <span className="mr-2">{language.flag}</span>
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
