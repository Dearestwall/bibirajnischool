'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroSlide {
  image: string
  caption: string
}

interface HeroData {
  title: string
  subtitle: string
  description: string
  cta1Text: string
  cta1Link: string
  cta2Text: string
  cta2Link: string
  slides: HeroSlide[]
}

interface Card {
  icon: string
  title: string
  description: string
  color: string
}

interface Highlights {
  cards: Card[]
}

interface StatItem {
  value: number
  suffix: string
  label: string
}

interface Stats {
  items: StatItem[]
}

interface ProgramItem {
  icon: string
  title: string
  desc: string
}

interface Programs {
  title: string
  items: ProgramItem[]
}

interface Principal {
  title: string
  message: string
  name: string
  position: string
  image?: string
}

interface Notification {
  id: string
  text: string
  icon: string
}

interface Event {
  id: string
  title: string
  date: string
  icon: string
}

export default function Home() {
  const [heroData, setHeroData] = useState<HeroData | null>(null)
  const [highlightsData, setHighlightsData] = useState<Highlights | null>(null)
  const [statsData, setStatsData] = useState<Stats | null>(null)
  const [programsData, setProgramsData] = useState<Programs | null>(null)
  const [principalData, setPrincipalData] = useState<Principal | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [stats, setStats] = useState<Record<number, number>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const [hero, highlights, statsJson, programs, principal, notif, evt] = await Promise.all([
        fetch('/content/home/hero.json').then(r => r.ok ? r.json() : null),
        fetch('/content/home/highlights.json').then(r => r.ok ? r.json() : null),
        fetch('/content/home/stats.json').then(r => r.ok ? r.json() : null),
        fetch('/content/home/programs.json').then(r => r.ok ? r.json() : null),
        fetch('/content/home/principal.json').then(r => r.ok ? r.json() : null),
        fetch('/content/home/notifications.json').then(r => r.ok ? r.json() : null),
        fetch('/content/home/events.json').then(r => r.ok ? r.json() : null),
      ])

      setHeroData(hero || getDefaultHero())
      setHighlightsData(highlights || getDefaultHighlights())
      setStatsData(statsJson || getDefaultStats())
      setProgramsData(programs || getDefaultPrograms())
      setPrincipalData(principal || getDefaultPrincipal())
      setNotifications(notif?.items || [])
      setEvents(evt?.items || [])
    } catch (error) {
      console.error('Error loading content:', error)
    }
  }

  useEffect(() => {
    if (!heroData?.slides || heroData.slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroData?.slides])

  useEffect(() => {
    if (!statsData) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          statsData.items.forEach((item, idx) => {
            const increment = Math.ceil(item.value / 50)
            let current = 0
            const timer = setInterval(() => {
              current += increment
              if (current >= item.value) {
                current = item.value
                clearInterval(timer)
              }
              setStats((prev) => ({ ...prev, [idx]: current }))
            }, 30)
          })
        }
      },
      { threshold: 0.1 }
    )

    const statsSection = document.getElementById('stats-section')
    if (statsSection) observer.observe(statsSection)
    return () => observer.disconnect()
  }, [statsData])

  if (!mounted) return <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50" />

  return (
    <>
      {/* NOTIFICATION BANNER */}
      {notifications.length > 0 && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white overflow-hidden shadow-lg">
          <div className="h-12 flex items-center">
            <div className="wrap w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-xl animate-pulse">📢</span>
                <div className="overflow-hidden flex-1">
                  <motion.div
                    animate={{ x: ['0%', '-100%'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="whitespace-nowrap"
                  >
                    {notifications.map((notif) => (
                      <span key={notif.id} className="inline-block px-4">
                        {notif.icon} {notif.text}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
              <Link href="/contact" className="text-sm font-bold hover:underline whitespace-nowrap">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* HERO SLIDER */}
      <section className="relative h-screen overflow-hidden bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {heroData?.slides[currentSlide] && (
              <>
                <img
                  src={heroData.slides[currentSlide].image}
                  alt={heroData.slides[currentSlide].caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl"
          >
            {heroData?.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl mb-8 text-white/95 drop-shadow-lg"
          >
            {heroData?.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl max-w-3xl mb-8 sm:mb-12 text-white/90 drop-shadow-lg"
          >
            {heroData?.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href={heroData?.cta1Link || '/'} className="btn">
              {heroData?.cta1Text}
            </Link>
            <a href={heroData?.cta2Link || '#'} className="btn-secondary bg-white/20 border-white text-white hover:bg-white/30">
              {heroData?.cta2Text} ↓
            </a>
          </motion.div>
        </div>

        {heroData?.slides && heroData.slides.length > 1 && (
          <>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {heroData.slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroData.slides.length) % heroData.slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroData.slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all"
            >
              →
            </button>
          </>
        )}
      </section>

      {/* HIGHLIGHTS */}
      {highlightsData && highlightsData.cards.length > 0 && (
        <section className="section bg-white">
          <div className="wrap">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlightsData.cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className={`card-gradient bg-gradient-to-br ${card.color}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div className="text-6xl mb-4" whileHover={{ rotate: 15, scale: 1.2 }}>
                    {card.icon}
                  </motion.div>
                  <h3 className="font-bold text-xl mb-2">{card.title}</h3>
                  <p className="text-white/90">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRINCIPAL */}
      {principalData && (
        <section className="section bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="wrap">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {principalData.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <div className="relative w-full max-w-sm">
                    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl blur-xl opacity-30" />
                    <img
                      src={principalData.image}
                      alt={principalData.name}
                      className="relative rounded-2xl shadow-2xl w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-bold">{principalData.title}</h2>
                <div className="prose prose-lg text-gray-600">
                  {principalData.message.split('\n').map((para, idx) => (
                    <p key={idx} className="leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                </div>
                <div className="pt-4 border-t-2 border-emerald-200">
                  <p className="font-bold text-xl">{principalData.name}</p>
                  <p className="text-emerald-600 font-semibold">{principalData.position}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* EVENTS */}
      {events.length > 0 && (
        <section className="section bg-white">
          <div className="wrap">
            <h2 className="text-4xl font-bold text-center mb-12">🎯 Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {events.map((event, idx) => (
                <motion.div
                  key={event.id}
                  className="card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-5xl mb-3">{event.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{event.title}</h4>
                  <p className="text-emerald-600 font-semibold text-sm">{event.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STATS */}
      {statsData && statsData.items.length > 0 && (
        <section
          id="stats-section"
          className="section bg-gradient-to-r from-emerald-700 to-teal-800 text-white"
        >
          <div className="wrap">
            <h2 className="text-4xl font-bold text-center mb-12">Our Legacy</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsData.items.map((item, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
                >
                  <div className="text-5xl font-bold mb-2">
                    {stats[idx] || 0}
                    {item.suffix}
                  </div>
                  <p className="text-white/80">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROGRAMS */}
      {programsData && programsData.items.length > 0 && (
        <section id="programs" className="section bg-white">
          <div className="wrap">
            <h2 className="text-4xl font-bold text-center mb-12">{programsData.title}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {programsData.items.map((prog, idx) => (
                <motion.div
                  key={idx}
                  className="card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-6xl mb-4">{prog.icon}</div>
                  <h3 className="font-bold text-xl mb-2">{prog.title}</h3>
                  <p className="text-gray-600">{prog.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MAP & CONTACT */}
      <section className="section bg-gray-50">
        <div className="wrap">
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl h-96"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3436.6789706587556!2d74.8725!3d31.4707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919e5f62e6e5555%3A0x1234567890!2sTarn%20Taran!5e0!3m2!1sen!2sin!4v1234567890123"
                allowFullScreen
                loading="lazy"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                className="card text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">📍</div>
                <h3 className="font-bold text-lg">Address</h3>
                <p className="text-gray-600">Tarn Taran, Punjab, India</p>
              </motion.div>
              <motion.div
                className="card text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">📞</div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="text-gray-600">+91 123 456 7890</p>
              </motion.div>
              <motion.div
                className="card text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-gray-600">info@bibirajnischool.edu</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="section bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="wrap">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-2xl mx-auto">
            <form
              action="https://formspree.io/f/mrbowgyy"
              method="POST"
              className="space-y-6 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <input type="text" name="name" placeholder="Your Name" required className="bg-white/20 border-white/30 text-white placeholder-white/50" />
                <input type="email" name="email" placeholder="Your Email" required className="bg-white/20 border-white/30 text-white placeholder-white/50" />
              </div>
              <input type="text" name="subject" placeholder="Subject" required className="w-full bg-white/20 border-white/30 text-white placeholder-white/50" />
              <textarea name="message" placeholder="Your message..." rows={5} required className="w-full bg-white/20 border-white/30 text-white placeholder-white/50" />
              <button type="submit" className="btn w-full">
                📤 Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

function getDefaultHero(): HeroData {
  return {
    title: 'Welcome to Bibi Rajni School',
    subtitle: 'Excellence in Education Since 1990',
    description: 'Where excellence meets compassion.',
    cta1Text: 'Apply Now',
    cta1Link: '/admissions',
    cta2Text: 'Explore More',
    cta2Link: '#programs',
    slides: [{ image: '/images/school-building.jpg', caption: 'Our Campus' }],
  }
}

function getDefaultHighlights(): Highlights {
  return {
    cards: [
      { icon: '🏆', title: 'Academic Excellence', description: '98% pass rate', color: 'from-blue-500 to-blue-600' },
      { icon: '🎓', title: 'Faculty', description: 'World-class educators', color: 'from-purple-500 to-purple-600' },
    ],
  }
}

function getDefaultStats(): Stats {
  return { items: [{ value: 34, suffix: '+', label: 'Years' }] }
}

function getDefaultPrograms(): Programs {
  return { title: 'Why Choose Bibi Rajni?', items: [{ icon: '📚', title: 'CBSE', desc: 'Standard' }] }
}

function getDefaultPrincipal(): Principal {
  return {
    title: 'From the Principal\'s Desk',
    message: 'Welcome to our school...',
    name: 'Dr. Rajinder Singh',
    position: 'Principal',
  }
}
