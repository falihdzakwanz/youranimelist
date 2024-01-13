import { Gabarito } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'

const gabarito = Gabarito({ subsets: ['latin'] })

export const metadata = {
  title: 'MyAnimeList',
  description: 'Indonesian Anime Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gabarito.className} bg-color-dark`} suppressHydrationWarning={true}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
