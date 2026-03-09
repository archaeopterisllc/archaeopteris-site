import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n/config"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Archaeopteris LLC",
  description: "Archaeopteris LLC",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
