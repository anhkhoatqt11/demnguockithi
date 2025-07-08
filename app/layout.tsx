import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Đếm ngược thi THPT 2026 | Countdown to National Exam 2026",
  description: "Trang web đếm ngược ngày thi tốt nghiệp THPT 2026",
  keywords: "THPT 2026, thi tốt nghiệp, đếm ngược, học tập, thi cử, Việt Nam",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-9GWDFFRMRS" />
    </html>
  )
}
