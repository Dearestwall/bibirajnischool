'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Notice {
  id: string
  title: string
  date: string
  description: string
  icon?: string
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function NoticeDetail({ params: paramsPromise }: PageProps) {
  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Await the params promise
    paramsPromise.then((params) => {
      // Load from static data
      const noticeData: Record<string, Notice> = {
        'winter-break-2025': {
          id: '1',
          title: 'Winter Break Announcement',
          date: 'October 2025',
          description: 'School will remain closed from December 20, 2025 to January 5, 2026 for the winter break. Classes will resume on January 6, 2026. Have a wonderful winter break!',
          icon: '❄️',
        },
        'admission-open': {
          id: '2',
          title: 'Admissions Open for 2026-27',
          date: 'November 2025',
          description: 'We are thrilled to announce that admissions for the academic year 2026-27 are now open. Apply now to join our prestigious school.',
          icon: '📢',
        },
        'parent-meeting': {
          id: '3',
          title: 'Parent-Teacher Meeting',
          date: 'November 20, 2025',
          description: 'All parents are invited to attend the parent-teacher meeting to discuss their child\'s academic progress.',
          icon: '👥',
        },
      }

      setNotice(noticeData[params.slug] || null)
      setLoading(false)
    })
  }, [paramsPromise])

  if (loading) return <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50" />
  if (!notice) return <div className="text-center py-20">Notice not found</div>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section">
      <div className="wrap max-w-2xl mx-auto">
        <Link href="/notices" className="text-emerald-600 hover:text-emerald-700 mb-6 inline-block">
          ← Back to Notices
        </Link>
        {notice.icon && <div className="text-6xl mb-4">{notice.icon}</div>}
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{notice.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{notice.date}</p>
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{notice.description}</p>
      </div>
    </motion.div>
  )
}
