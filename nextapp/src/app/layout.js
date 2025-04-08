
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tanish | Portfolio',
  description: 'Full-Stack Developer specializing in Web Development, Blockchain, and AI',
  manifest: '/manifest.json',
  themeColor: '#0a0a12',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
