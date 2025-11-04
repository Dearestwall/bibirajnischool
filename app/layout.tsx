import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Translator from '@/components/Translator'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Bibi Rajni School - Excellence in Education',
  description: 'Official website of Bibi Rajni School - Quality education with modern facilities in Tarn Taran.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <script async src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                if (window.google && window.google.translate) {
                  new window.google.translate.TranslateElement(
                    { pageLanguage: 'en', includedLanguages: 'en,hi,pa,es,fr,de,zh-CN,ar,ja,bn', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
                    'google_translate_element'
                  );
                }
              }
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white" suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Translator />
        <Footer />
      </body>
    </html>
  )
}
