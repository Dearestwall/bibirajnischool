'use client'
import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export default function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
  return (
    <div className={`relative h-64 md:h-80 flex items-center justify-center overflow-hidden ${backgroundImage ? '' : 'bg-gradient-to-r from-emerald-600 to-teal-600'}`}>
      {backgroundImage && (
        <>
          <img src={backgroundImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl drop-shadow-md"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
