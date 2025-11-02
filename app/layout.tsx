import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Bibi Rajni School',
  description: 'Official website of Bibi Rajni School',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
          <div className="wrap flex items-center justify-between h-16">
            <Link href="/" className="font-bold text-lg">
              Bibi Rajni School
            </Link>
            <nav className="hidden md:flex gap-6 text-sm">
              <Link href="/about" className="hover:text-emerald-600">About</Link>
              <Link href="/admissions" className="hover:text-emerald-600">Admissions</Link>
              <Link href="/academics" className="hover:text-emerald-600">Academics</Link>
              <Link href="/notices" className="hover:text-emerald-600">Notices</Link>
              <Link href="/events" className="hover:text-emerald-600">Events</Link>
              <Link href="/gallery" className="hover:text-emerald-600">Gallery</Link>
              <Link href="/downloads" className="hover:text-emerald-600">Downloads</Link>
              <Link href="/staff" className="hover:text-emerald-600">Staff</Link>
              <Link href="/contact" className="hover:text-emerald-600">Contact</Link>
            </nav>
            <Link href="/admissions" className="btn text-sm">
              Apply Now
            </Link>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t bg-gray-50">
          <div className="wrap py-8 text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Bibi Rajni School. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
