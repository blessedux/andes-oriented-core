import "@/styles/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "700"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>AndesOriCore - Digital Structural Logging, Reinvented</title>
        <meta name="description" content="A web-based platform to analyze core samples with precision, traceability, and full control—no third parties, no delays." />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
