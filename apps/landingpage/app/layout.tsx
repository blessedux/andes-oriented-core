import { Poppins } from "next/font/google"
import "@/styles/globals.css"
import ClientLayout from "@/components/ClientLayout"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: 'AndesOriCore - Digital Structural Logging, Reinvented',
  description: 'A web-based platform to analyze core samples with precision, traceability, and full control—no third parties, no delays.',
  generator: 'Next.js',
  applicationName: 'AndesOriCore',
  keywords: ['geology', 'structural logging', 'core analysis', 'digital geology', 'mining technology'],
  authors: [{ name: 'AndesOriCore Team' }],
  creator: 'AndesOriCore',
  publisher: 'AndesOriCore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
