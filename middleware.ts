import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "@/lib/i18n/config"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  // Check admin route
  const isAdminPath = pathname.includes("/admin") && !pathname.includes("/admin/login")

  if (isAdminPath) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {},
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      const locale = pathname.split('/')[1] || 'en'
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url))
    }
  }

  // i18n redirect
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  return NextResponse.redirect(new URL(`/en${pathname}`, request.url))
}

export const config = {
  matcher: ["/((?!_next|api|favicon|.*\\..*).*)"],
}

/*import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "@/lib/i18n/config"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  return NextResponse.redirect(new URL(`/en${pathname}`, request.url))
}

export const config = {
  matcher: ["/((?!_next|api|favicon|.*\\..*).*)"],
}*/
