import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Artist Content Platform',
    template: '%s | Artist Content Platform'
  },
  description: 'Plateforme complète de gestion de contenu pour artistes - Publication automatisée Instagram & Pinterest avec planification intelligente',
  keywords: ['artist', 'content', 'social media', 'instagram', 'pinterest', 'automation'],
  authors: [{ name: 'Artist Content Platform' }],
  creator: 'Artist Content Platform',
  publisher: 'Artist Content Platform',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Artist Content Platform',
    description: 'Plateforme complète de gestion de contenu pour artistes',
    siteName: 'Artist Content Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artist Content Platform',
    description: 'Plateforme complète de gestion de contenu pour artistes',
    creator: '@artistplatform',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-artist-purple-50/30">
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}