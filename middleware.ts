import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "@/lib/i18n/config"

function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname
  
  // Check if pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) return ""
  
  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().substring(0, 2))
      .find((lang) => i18n.locales.includes(lang as typeof i18n.locales[number]))
    
    if (preferredLocale) return preferredLocale
  }
  
  return i18n.defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip static files and api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }
  
  const locale = getLocale(request)
  
  if (locale) {
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|favicon|.*\\..*).*)"],
}
