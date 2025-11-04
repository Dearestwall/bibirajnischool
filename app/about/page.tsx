'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '@/components/PageHeader'

interface AboutData {
  title: string
  subtitle: string
  story: string
  milestones: Array<{ year: string; title: string; desc: string }>
  values: Array<{ icon: string; title: string; desc: string }>
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null)

  useEffect(() => {
    fetch('/content/pages/about.json')
      .then(r => r.ok ? r.json() : getDefaultData())
      .then(d => setData(d))
      .catch(() => setData(getDefaultData()))
  }, [])

  if (!data) return <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50" />

  return (
    <>
      <PageHeader title={data.title} subtitle={data.subtitle} />

      {/* Story Section */}
      <section className="section bg-white">
        <div className="wrap max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
            {data.story.split('\n\n').map((para, idx) => (
              <p key={idx} className="text-gray-600 leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="wrap">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Journey</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {data.milestones?.map((milestone, idx) => (
              <motion.div
                key={idx}
                className="card hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-emerald-600 mb-3">{milestone.year}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{milestone.title}</h3>
                <p className="text-gray-600 text-sm">{milestone.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="wrap">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Values</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {data.values?.map((value, idx) => (
              <motion.div
                key={idx}
                className="card text-center hover:shadow-xl transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function getDefaultData(): AboutData {
  return {
    title: 'About Us',
    subtitle: 'Building Tomorrow\'s Leaders',
    story: 'Bibi Rajni School was established in 1990 with a vision to provide quality education to students in Tarn Taran and surrounding areas.\n\nOver the past three decades, we have grown from a small institution to a premier educational center committed to academic excellence and holistic development.',
    milestones: [
      { year: '1990', title: 'School Founded', desc: 'Established with 50 students' },
      { year: '2000', title: 'New Building', desc: 'Modern infrastructure added' },
      { year: '2010', title: 'CBSE Affiliation', desc: 'Became CBSE affiliated' },
      { year: '2020', title: 'Digital Campus', desc: 'Smart classrooms launched' },
    ],
    values: [
      { icon: '💡', title: 'Innovation', desc: 'Embracing new teaching methods' },
      { icon: '🤝', title: 'Integrity', desc: 'Honesty and transparency' },
      { icon: '🌟', title: 'Excellence', desc: 'Pursuing highest standards' },
      { icon: '❤️', title: 'Compassion', desc: 'Caring for every student' },
    ],
  }
}
