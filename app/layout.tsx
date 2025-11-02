import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'Bibi Rajni School',
  description: 'Official website of Bibi Rajni School - Excellence in Education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t bg-gray-50">
          <div className="wrap py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="font-bold text-lg mb-3">Bibi Rajni School</div>
                <p className="text-sm text-gray-600">
                  Excellence in Education since 1990
                </p>
              </div>
              <div>
                <div className="font-semibold mb-3">Quick Links</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/about" className="hover:text-emerald-600">About</a></li>
                  <li><a href="/admissions" className="hover:text-emerald-600">Admissions</a></li>
                  <li><a href="/academics" className="hover:text-emerald-600">Academics</a></li>
                  <li><a href="/contact" className="hover:text-emerald-600">Contact</a></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-3">Contact</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>+91 123 456 7890</li>
                  <li>info@bibirajnischool.edu</li>
                  <li>Punjab, India</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-3">Follow Us</div>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition">
                    <span className="sr-only">Facebook</span>
                    f
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition">
                    <span className="sr-only">Instagram</span>
                    i
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
              © {new Date().getFullYear()} Bibi Rajni School. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
