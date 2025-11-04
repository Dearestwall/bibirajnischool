'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface EventDetail {
  id: string
  title: string
  date: string
  description: string
  icon: string
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function EventDetail({ params: paramsPromise }: PageProps) {
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    // Await the params promise
    paramsPromise.then((params) => {
      setSlug(params.slug)

      // Load from static data
      const eventData: Record<string, EventDetail> = {
        'sports-day-2025': {
          id: '1',
          title: 'Annual Sports Day',
          date: 'November 15, 2025',
          description: 'Join us for our annual sports day celebration with various sporting events!',
          icon: '🏆',
        },
        'science-exhibition': {
          id: '2',
          title: 'Science Exhibition',
          date: 'November 22, 2025',
          description: 'Students showcase their science projects and innovations.',
          icon: '🔬',
        },
        'cultural-fest': {
          id: '3',
          title: 'Cultural Fest',
          date: 'December 5, 2025',
          description: 'Celebrating diversity through music, dance, and cultural performances.',
          icon: '🎭',
        },
      }

      setEvent(eventData[params.slug] || null)
      setLoading(false)
    })
  }, [paramsPromise])

  if (loading) return <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50" />
  if (!event) return <div className="text-center py-20">Event not found</div>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section">
      <div className="wrap max-w-2xl mx-auto">
        <Link href="/events" className="text-emerald-600 hover:text-emerald-700 mb-6 inline-block">
          ← Back to Events
        </Link>
        <div className="text-6xl mb-4">{event.icon}</div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{event.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{event.date}</p>
        <p className="text-lg text-gray-700 leading-relaxed">{event.description}</p>
      </div>
    </motion.div>
  )
}
