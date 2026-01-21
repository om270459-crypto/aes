import React from "react"
import type { Metadata } from 'next'
import { Outfit, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Background3D } from '@/components/Background3D'
import { Toaster } from '@/components/ui/toaster'

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-sans'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-display'
})

export const metadata: Metadata = {
  title: 'Digital Neon Valentine',
  description: 'A futuristic sanctuary for eternal love letters written in code and light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Background3D />
        <Navigation />
        <main>{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
