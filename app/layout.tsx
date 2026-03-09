import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Archaeopteris LLC",
  description: "Archaeopteris LLC",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
