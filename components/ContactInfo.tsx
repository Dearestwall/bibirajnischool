'use client'
import { motion } from 'framer-motion'

const contactDetails = [
  { icon: '📍', title: 'Address', text: 'Tarn Taran, Punjab, India' },
  { icon: '📞', title: 'Phone', text: '+91 123 456 7890' },
  { icon: '✉️', title: 'Email', text: 'info@bibirajnischool.edu' },
]

export default function ContactInfo() {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {contactDetails.map((info, idx) => (
        <motion.div
          key={idx}
          className="card text-center hover:shadow-xl transition-all"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="text-5xl mb-4">{info.icon}</div>
          <h3 className="font-bold text-lg mb-2">{info.title}</h3>
          <p className="text-gray-600">{info.text}</p>
        </motion.div>
      ))}
    </div>
  )
}
