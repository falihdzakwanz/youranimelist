"use client"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { SessionProvider } from 'next-auth/react'
import { Roboto } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'
import { usePathname } from "next/navigation"

const roboto = Roboto({
  weight: ['500', '700'],
  subsets: ['latin']
})

export default function RootLayout({ children }) {
  const disableNavbar = ["/login", "/register"]
  const pathName = usePathname()

  return (
    <html lang="en">
      <body className={`${roboto.className} bg-color-dark`} suppressHydrationWarning={true}>
        <SessionProvider>
          {!disableNavbar.includes(pathName) && <Navbar />}
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
