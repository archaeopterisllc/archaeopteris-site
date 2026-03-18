/*import type { Metadata } from "next"
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
*/
import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { Analytics } from "@vercel/analytics/react";
import { AIChat } from "@/components/AIChat"; // Import component của anh vào

export const metadata: Metadata = {
  title: "Archaeopteris LLC",
  description: "Archaeopteris LLC",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        {children}
        <AIChat /> {/* Nhúng nó vào đây là "bất tử" trên mọi page */}
        <Analytics />
      </body>
    </html>
  );
}
