'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface StaffMember {
  id: string
  name: string
  position: string
  department: string
  bio: string
  image?: string
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function StaffDetail({ params: paramsPromise }: PageProps) {
  const [staff, setStaff] = useState<StaffMember | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    paramsPromise.then((params) => {
      const staffData: Record<string, StaffMember> = {
        'rajinder-singh': {
          id: '1',
          name: 'Dr. Rajinder Singh',
          position: 'Principal',
          department: 'Administration',
          bio: 'With over 30 years of experience in education, Dr. Singh leads our institution with vision and dedication.',
          image: 'https://via.placeholder.com/300',
        },
      }

      setStaff(staffData[params.slug] || null)
      setLoading(false)
    })
  }, [paramsPromise])

  if (loading) return <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50" />
  if (!staff) return <div className="text-center py-20">Staff member not found</div>

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section">
      <div className="wrap max-w-2xl mx-auto">
        <Link href="/staff" className="text-emerald-600 hover:text-emerald-700 mb-6 inline-block">
          ← Back to Staff
        </Link>
        {staff.image && <img src={staff.image} alt={staff.name} className="w-48 h-48 rounded-full object-cover mb-6" />}
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{staff.name}</h1>
        <p className="text-xl text-emerald-600 font-semibold mb-1">{staff.position}</p>
        <p className="text-lg text-gray-600 mb-6">{staff.department}</p>
        <p className="text-lg text-gray-700 leading-relaxed">{staff.bio}</p>
      </div>
    </motion.div>
  )
}
