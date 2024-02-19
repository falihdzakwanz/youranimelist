"use client"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { SessionProvider } from 'next-auth/react'
import { Gabarito, Roboto } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'
import { useRouter } from "next/navigation"

const gabarito = Gabarito({ subsets: ['latin'] })
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
})

const disableNavbar = ["/login", "register"]

export default function RootLayout({ children }) {
  const router = useRouter()
  const pathName = router.pathname
  return (
    <html lang="en">
      <body className={`${gabarito.className || roboto.className} bg-color-dark`} suppressHydrationWarning={true}>
        <SessionProvider>
          {disableNavbar.includes(pathName) && <Navbar />}
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
