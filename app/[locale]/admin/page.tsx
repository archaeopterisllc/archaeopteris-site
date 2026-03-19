import type { Locale } from '@/lib/i18n/config'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getDictionary } from '@/lib/i18n/dictionaries'
import AdminPanel from '@/components/admin-panel'

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <main className="min-h-screen bg-background">
      <Navbar locale={locale} langDict={dict.language} navDict={dict.nav} />
      <AdminPanel />
      <Footer dict={dict.common} navDict={dict.nav} locale={locale} />
    </main>
  )
}
