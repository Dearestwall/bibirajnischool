import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Bibi Rajni School - Excellence in Education',
  description: 'Official website of Bibi Rajni School - Quality education with modern facilities in Tarn Taran, Punjab.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://cdn.gtranslate.net/widgets/latest/float.js"
        ></script>
      </head>
      <body className="antialiased bg-white">
        <div className="gtranslate_wrapper fixed top-24 right-4 z-40" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
