'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '@/components/PageHeader'
import ContactInfo from '@/components/ContactInfo'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('https://formspree.io/f/mrbowgyy', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        e.currentTarget.reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!mounted) return <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50" />

  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd Love to Hear From You" />

      <section className="section bg-white">
        <div className="wrap">
          <ContactInfo />

          {/* Map */}
          <motion.div
            className="mt-12 rounded-2xl overflow-hidden shadow-xl h-96"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3436.6789706587556!2d74.8725!3d31.4707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919e5f62e6e5555%3A0x1234567890!2sTarn%20Taran!5e0!3m2!1sen!2sin!4v1234567890123"
              allowFullScreen
              loading="lazy"
              title="School Location"
            />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="card space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <input type="text" name="subject" placeholder="Subject" required />
              <textarea name="message" placeholder="Your message..." rows={5} required />

              {status === 'success' && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg font-semibold">
                  ✓ Message sent successfully!
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg font-semibold">
                  ✗ Error sending message. Please try again.
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} className="btn w-full">
                {status === 'loading' ? 'Sending...' : '📤 Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}
