import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Đếm ngược thi THPT 2025 | Countdown to National Exam 2025",
  description: "Trang web đếm ngược ngày thi tốt nghiệp THPT 2025",
  keywords: "THPT 2025, thi tốt nghiệp, đếm ngược, học tập, thi cử, Việt Nam",
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
    </html>
  )
}
