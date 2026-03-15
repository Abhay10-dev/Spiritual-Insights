import type { Metadata } from 'next'
import './globals.css'
import AppLayout from '@/components/layout/AppLayout'

export const metadata: Metadata = {
  title: {
    default: 'Spiritual Insights',
    template: '%s | Spiritual Insights',
  },
  description:
    'A calm, modern spiritual platform for devotional content, guided meditation, AI spiritual guidance, and a safe Kids Zone.',
  keywords: ['spiritual', 'meditation', 'mantra', 'bhajan', 'jap mala', 'kids zone', 'devotional'],
  authors: [{ name: 'Spiritual Insights' }],
  openGraph: {
    title: 'Spiritual Insights',
    description: 'Your daily spiritual companion — mantras, stories, meditation, and more.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FEFCF8] font-sans antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}
