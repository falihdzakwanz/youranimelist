import { Gabarito, Roboto } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'

const gabarito = Gabarito({ subsets: ['latin'] })
const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ['latin'] 
})

export const metadata = {
  title: 'YourAnimeList',
  description: 'Your Beloved Indonesian Anime Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gabarito.className || roboto.className} bg-color-dark`} suppressHydrationWarning={true}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
