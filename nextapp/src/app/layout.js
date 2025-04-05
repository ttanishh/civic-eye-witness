
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'KAVACH - Decentralized Crime Reporting',
  description: 'A secure and decentralized crime reporting platform',
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
