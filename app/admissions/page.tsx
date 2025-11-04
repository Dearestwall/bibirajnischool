'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '@/components/PageHeader'
import Link from 'next/link'

interface AdmissionsData {
  title: string
  subtitle: string
  content: string
  process: Array<{ step: string; title: string; desc: string; icon: string }>
  documents: string[]
}

export default function AdmissionsPage() {
  const [data, setData] = useState<AdmissionsData | null>(null)

  useEffect(() => {
    fetch('/content/pages/admissions.json')
      .then(r => r.ok ? r.json() : getDefaultData())
      .then(d => setData(d))
      .catch(() => setData(getDefaultData()))
  }, [])

  if (!data) return <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50" />

  return (
    <>
      <PageHeader 
        title={data.title} 
        subtitle={data.subtitle}
        backgroundImage="/images/admission-bg.jpg"
      />

      <section className="section bg-white">
        <div className="wrap">
          {/* Main Content */}
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Admissions Open for 2026-27</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              {data.content.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Admission Process */}
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">Admission Process</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {data.process.map((item, idx) => (
              <motion.div
                key={idx}
                className="card text-center relative hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-3">{item.icon}</div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">Step {item.step}</div>
                <h4 className="font-bold mb-1 text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Documents Required */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="card bg-emerald-50 border-emerald-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Required Documents</h3>
              <ul className="space-y-2">
                {data.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/contact" className="btn">
                Apply Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

function getDefaultData(): AdmissionsData {
  return {
    title: 'Admissions',
    subtitle: 'Join Our Community of Excellence',
    content: 'We are accepting applications for all grades. Limited seats available.\n\nContact us to learn more about our admission process and requirements.',
    process: [
      { step: '1', title: 'Inquiry', desc: 'Visit or call for details', icon: '📞' },
      { step: '2', title: 'Form', desc: 'Fill admission form', icon: '📝' },
      { step: '3', title: 'Documents', desc: 'Submit required docs', icon: '📄' },
      { step: '4', title: 'Interview', desc: 'Meet with principal', icon: '👥' },
      { step: '5', title: 'Fee Payment', desc: 'Complete registration', icon: '💳' },
    ],
    documents: [
      'Birth Certificate',
      'Transfer Certificate (if applicable)',
      'Character Certificate',
      'Previous Year Report Card',
      'Aadhar Card Copy',
      'Recent Photographs',
      'Vaccination Records',
    ],
  }
}
