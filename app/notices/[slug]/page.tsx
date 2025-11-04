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

export default function NoticeDetail({ params }: { params: { slug: string } }) {
  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load from static data
    const noticeData: Record<string, Notice> = {
      'winter-break-2025': {
        id: '1',
        title: 'Winter Break Announcement',
        date: 'October 2025',
        description: 'School will remain closed from December 20 to January 5 for winter break.',
        icon: '❄️',
      },
      // Add more notices as needed
    }

    setNotice(noticeData[params.slug] || null)
    setLoading(false)
  }, [params.slug])

  if (loading) return <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50" />
  if (!notice) return <div className="text-center py-20">Notice not found</div>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section">
      <div className="wrap max-w-2xl mx-auto">
        <Link href="/notices" className="text-emerald-600 hover:text-emerald-700 mb-6 inline-block">
          ← Back to Notices
        </Link>
        {notice.icon && <div className="text-5xl mb-4">{notice.icon}</div>}
        <h1 className="text-4xl font-bold mb-2">{notice.title}</h1>
        <p className="text-gray-600 mb-6">{notice.date}</p>
        <p className="text-lg text-gray-700 leading-relaxed">{notice.description}</p>
      </div>
    </motion.div>
  )
}
