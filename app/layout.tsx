import type React from "react"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from '@next/third-parties/google'

const font = Plus_Jakarta_Sans({ subsets: ["latin", "vietnamese"] })

export const metadata: Metadata = {
  title: "Đếm ngược kỳ thi tốt nghiệp THPT 2027 | Countdown to High School Graduation Exam 2027",
  description: "Trang web đếm ngược ngày thi THPT và các kì thi khác. Theo dõi lịch thi, ôn tập hiệu quả và chuẩn bị tốt nhất cho kì thi quan trọng.",
  keywords: "THPT 2027, thi tốt nghiệp, đếm ngược, học tập, thi cử, Việt Nam",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-9GWDFFRMRS" />
    </html>
  )
}
