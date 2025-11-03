'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white border-t border-gray-700">
      <div className="wrap py-16">
        <motion.div
          className="grid md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* About */}
          <motion.div variants={itemVariants}>
            <div className="font-bold text-xl mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Bibi Rajni School
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Excellence in Education since 1990. Nurturing confident, compassionate learners for a brighter future.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <div className="font-semibold mb-4">Quick Links</div>
            <ul className="space-y-2 text-sm">
              {['About', 'Admissions', 'Academics', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-emerald-400 transition group flex items-center gap-2"
                  >
                    <span className="group-hover:translate-x-1 transition">→</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <div className="font-semibold mb-4">Contact</div>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-emerald-400 mt-1">📍</span>
                <span>Tarn Taran, Punjab, India</span>
              </li>
              <li>
                <a
                  href="tel:+911234567890"
                  className="text-gray-400 hover:text-emerald-400 transition flex items-center gap-2"
                >
                  <span>📞</span>
                  +91 123 456 7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@bibirajnischool.edu"
                  className="text-gray-400 hover:text-emerald-400 transition flex items-center gap-2"
                >
                  <span>✉️</span>
                  info@bibirajnischool.edu
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <div className="font-semibold mb-4">Follow Us</div>
            <div className="flex gap-3">
              {[
                { icon: '📘', link: '#', label: 'Facebook' },
                { icon: '📷', link: '#', label: 'Instagram' },
                { icon: '🐦', link: '#', label: 'Twitter' },
                { icon: '▶️', link: '#', label: 'YouTube' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  className="w-10 h-10 bg-emerald-600/20 rounded-full flex items-center justify-center hover:bg-emerald-600 transition text-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-700 pt-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Bibi Rajni School. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="#" className="hover:text-emerald-400 transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-emerald-400 transition">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-emerald-400 transition">
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
