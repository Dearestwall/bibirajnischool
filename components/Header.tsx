'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [notifications, setNotifications] = useState<Array<{ id: string; text: string; icon: string }>>([])
  const [currentNotification, setCurrentNotification] = useState(0)

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load notifications from CMS
  useEffect(() => {
    fetch('/content/home/notifications.json')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.items) setNotifications(data.items)
      })
      .catch(() => {
        setNotifications([
          { id: '1', text: 'Admissions Open for 2026-27', icon: '📢' },
          { id: '2', text: 'Annual Sports Day - Nov 15', icon: '🏆' },
        ])
      })
  }, [])

  // Rotate notifications
  useEffect(() => {
    if (notifications.length === 0) return
    const timer = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [notifications])

  // Toggle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: '/#highlights', label: 'Highlights', icon: '⭐' },
    { href: '/#programs', label: 'Programs', icon: '📚' },
    { href: '/about', label: 'About', icon: 'ℹ️' },
    { href: '/admissions', label: 'Admissions', icon: '📝' },
    { href: '/contact', label: 'Contact', icon: '📧' },
  ]

  const socialLinks = [
    { icon: '📘', href: '#', label: 'Facebook' },
    { icon: '🐦', href: '#', label: 'Twitter' },
    { icon: '📷', href: '#', label: 'Instagram' },
    { icon: '▶️', href: '#', label: 'YouTube' },
  ]

  return (
    <>
      {/* TOP NOTIFICATION BAR */}
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white overflow-hidden shadow-lg"
          >
            <div className="wrap h-10 flex items-center justify-between gap-4">
              <motion.div
                className="flex items-center gap-2 min-w-0 flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-lg font-bold animate-bounce">📢</span>
                <div className="overflow-hidden flex-1">
                  <motion.div
                    key={currentNotification}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="whitespace-nowrap text-sm font-medium"
                  >
                    {notifications[currentNotification]?.icon}{' '}
                    {notifications[currentNotification]?.text}
                  </motion.div>
                </div>
              </motion.div>
              <div className="flex gap-1 text-xs">
                {notifications.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentNotification(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentNotification ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                    aria-label={`Go to notification ${idx + 1}`}
                  />
                ))}
              </div>
              <Link
                href="/contact"
                className="text-xs font-bold hover:underline whitespace-nowrap hidden sm:inline"
              >
                Learn More →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 shadow-xl backdrop-blur-lg border-b border-gray-100'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="wrap">
          {/* Header Content */}
          <div className="flex items-center justify-between h-20">
            {/* LOGO SECTION */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                {/* 3D Rotating Logo */}
                <motion.div
                  whileHover={{ rotateY: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  style={{ perspective: 1000 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                >
                  BR
                </motion.div>

                {/* Logo Text */}
                <div className="hidden sm:block">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-extrabold text-lg sm:text-xl text-gray-900 leading-tight"
                  >
                    Bibi Rajni
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs sm:text-sm text-emerald-600 font-semibold"
                  >
                    Excellence in Education
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center gap-2"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </nav>

            {/* RIGHT SECTION: CTA + MOBILE MENU */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* SOCIAL LINKS - DESKTOP */}
              <div className="hidden md:flex items-center gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    title={social.label}
                    className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </motion.a>
                ))}
              </div>

              {/* CTA BUTTON - DESKTOP */}
              <motion.a
                href="/admissions"
                className="hidden sm:inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📝</span>
                <span>Apply Now</span>
              </motion.a>

              {/* MOBILE MENU BUTTON */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={isMenuOpen ? 'open' : 'closed'}
                  className="w-6 h-6 relative flex flex-col items-center justify-center"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 10 },
                    }}
                    className="w-6 h-0.5 bg-gray-800 absolute"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    className="w-6 h-0.5 bg-gray-800"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -10 },
                    }}
                    className="w-6 h-0.5 bg-gray-800 absolute"
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* TABLET NAVIGATION - visible on md but not lg */}
          <nav className="hidden md:flex lg:hidden justify-center gap-2 pb-4 flex-wrap">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-gray-700 font-medium rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center gap-1"
                whileHover={{ y: -2 }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </motion.a>
            ))}
          </nav>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-screen w-4/5 max-w-xs bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">Menu</h3>
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-2">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-gray-900 font-semibold rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Divider */}
              <div className="h-px bg-gray-200 mx-4" />

              {/* Mobile CTA */}
              <div className="p-4">
                <motion.a
                  href="/admissions"
                  className="block w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-lg text-center hover:shadow-lg transition-shadow"
                  onClick={() => setIsMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  📝 Apply Now
                </motion.a>
              </div>

              {/* Social Links - Mobile */}
              <div className="p-4 border-t">
                <p className="text-sm font-semibold text-gray-600 mb-3">Follow Us</p>
                <div className="flex gap-2 flex-wrap">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      title={social.label}
                      className="flex-1 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg text-center hover:bg-emerald-100 hover:text-emerald-600 transition-colors text-sm"
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Footer Info - Mobile */}
              <div className="p-4 border-t text-xs text-gray-600 space-y-2">
                <p>
                  <span className="font-semibold">📞 Phone:</span> +91 123 456 7890
                </p>
                <p>
                  <span className="font-semibold">✉️ Email:</span> info@bibirajnischool.edu
                </p>
                <p>
                  <span className="font-semibold">📍 Address:</span> Tarn Taran, Punjab
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTopButton />
    </>
  )
}

// Scroll to Top Button Component
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Scroll to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
