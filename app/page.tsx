'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// Interfaces
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

interface TestimonialItem {
  name: string
  role: string
  message: string
  image: string
}

interface Testimonials {
  title: string
  items: TestimonialItem[]
}

interface Section {
  id: string
  title: string
  subtitle: string
  icon: string
  content: string
  image?: string
  link: string
  linkText: string
}

interface GalleryItem {
  id: string
  title: string
  category: string
  image: string
}

export default function Home() {
  // State
  const [heroData, setHeroData] = useState<HeroData | null>(null)
  const [highlightsData, setHighlightsData] = useState<Highlights | null>(null)
  const [statsData, setStatsData] = useState<Stats | null>(null)
  const [programsData, setProgramsData] = useState<Programs | null>(null)
  const [principalData, setPrincipalData] = useState<Principal | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonials | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [homeSections, setHomeSections] = useState<Section[]>([])
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [stats, setStats] = useState<Record<number, number>>({})
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const statsRef = useRef<HTMLDivElement>(null)
  const galleryScrollRef = useRef<HTMLDivElement>(null)

  // Load all CMS content
  useEffect(() => {
    setMounted(true)
    loadContent()
  }, [])

  const loadContent = async () => {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : ''
    
    const [
      hero,
      highlights,
      statsJson,
      programs,
      principal,
      notif,
      evt,
      testimonials,
      sections,
      gallery,
    ] = await Promise.all([
      fetch('/content/home/hero.json').then(r => r.ok ? r.json() : null),
      fetch('/content/home/highlights.json').then(r => r.ok ? r.json() : null),
      fetch('/content/home/stats.json').then(r => r.ok ? r.json() : null),
      fetch('/content/home/programs.json').then(r => r.ok ? r.json() : null),
      fetch('/content/home/principal.json').then(r => r.ok ? r.json() : null),
      fetch('/content/home/notifications.json').then(r => r.ok ? r.json() : null),
      fetch('/content/home/events.json').then(r => r.ok ? r.json() : null),
      fetch('/content/home/testimonials.json').then(r => r.ok ? r.json() : null),
      fetch('/content/home/sections.json').then(r => r.ok ? r.json() : null),
      fetch('/content/gallery.json').then(r => r.ok ? r.json() : null),
    ])

    setHeroData(hero || getDefaultHero())
    setHighlightsData(highlights || getDefaultHighlights())
    setStatsData(statsJson || getDefaultStats())
    setProgramsData(programs || getDefaultPrograms())
    setPrincipalData(principal || getDefaultPrincipal())
    setTestimonials(testimonials || getDefaultTestimonials())
    setHomeSections(sections?.items || getDefaultSections())
    setGalleryItems(gallery?.items || getDefaultGallery())
    setNotifications(notif?.items || [])
    setEvents(evt?.items || [])
  } catch (error) {
    console.error('Error loading content:', error)
  }
}


  // Auto-advance hero slider
  useEffect(() => {
    if (!heroData?.slides || heroData.slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroData?.slides])

  // Auto-advance testimonials
  useEffect(() => {
    if (!testimonials?.items || testimonials.items.length <= 1) return
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.items.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials?.items])

  // Animate stats once on scroll
  useEffect(() => {
    if (!statsData || statsAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true)
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

    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [statsData, statsAnimated])

  if (!mounted) return <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50" />

  return (
    <>
      {/* HERO SLIDER */}
      <section className="relative h-screen overflow-hidden bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {heroData?.slides[currentSlide] && (
              <>
                <img
                  src={heroData.slides[currentSlide].image}
                  alt={heroData.slides[currentSlide].caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* HERO CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 drop-shadow-2xl"
          >
            {heroData?.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-white/95 drop-shadow-lg"
          >
            {heroData?.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg max-w-2xl sm:max-w-3xl mb-6 sm:mb-10 text-white/90 drop-shadow-lg"
          >
            {heroData?.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col xs:flex-row gap-3 sm:gap-4 flex-wrap justify-center"
          >
            <Link href={heroData?.cta1Link || '/'} className="btn text-sm sm:text-base">
              {heroData?.cta1Text}
            </Link>
            <a href={heroData?.cta2Link || '#'} className="btn-secondary bg-white/20 border-white text-white hover:bg-white/30 text-sm sm:text-base">
              {heroData?.cta2Text} ↓
            </a>
          </motion.div>
        </div>

        {/* SLIDER CONTROLS */}
        {heroData?.slides && heroData.slides.length > 1 && (
          <>
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {heroData.slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-white w-6 sm:w-8' : 'bg-white/50 w-1.5 sm:w-2 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroData.slides.length) % heroData.slides.length)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <span className="text-lg sm:text-2xl">←</span>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroData.slides.length)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <span className="text-lg sm:text-2xl">→</span>
            </button>
          </>
        )}
      </section>

      {/* HIGHLIGHTS */}
      {highlightsData?.cards.length && (
        <section className="section bg-white">
          <div className="wrap">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {highlightsData.cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className={`card-gradient bg-gradient-to-br ${card.color} p-4 sm:p-6`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div className="text-4xl sm:text-6xl mb-3 sm:mb-4" whileHover={{ rotate: 15, scale: 1.2 }}>
                    {card.icon}
                  </motion.div>
                  <h3 className="font-bold text-base sm:text-xl mb-2">{card.title}</h3>
                  <p className="text-white/90 text-sm sm:text-base">{card.description}</p>
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
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              {principalData.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex justify-center order-2 md:order-1"
                >
                  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-none">
                    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl blur-xl opacity-30" />
                    <img
                      src={principalData.image}
                      alt={principalData.name}
                      className="relative rounded-2xl shadow-2xl w-full h-auto object-cover aspect-square"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6 order-1 md:order-2"
              >
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">{principalData.title}</h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{principalData.message}</p>
                <div className="pt-4 border-t-2 border-emerald-200">
                  <p className="font-bold text-lg sm:text-xl text-gray-900">{principalData.name}</p>
                  <p className="text-emerald-600 font-semibold text-sm sm:text-base">{principalData.position}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* HOME SECTIONS (CONTACT, FACILITIES, RULES, ETC) */}
      {homeSections.length > 0 && (
        <>
          {homeSections.map((section, idx) => (
            <section key={section.id} className={`section ${idx % 2 === 0 ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
              <div className="wrap">
                <div className={`grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center ${idx % 2 === 1 ? 'md:grid-cols-2-reverse' : ''}`}>
                  {section.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="flex justify-center"
                    >
                      <img
                        src={section.image}
                        alt={section.title}
                        className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-video"
                        loading="lazy"
                      />
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-4xl sm:text-5xl">{section.icon}</span>
                      <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{section.subtitle}</p>
                    <p className="text-gray-700 text-sm sm:text-base">{section.content}</p>
                    <motion.a
                      href={section.link}
                      className="inline-block px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {section.linkText} →
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      {/* HORIZONTAL SCROLLING GALLERY */}
      {galleryItems.length > 0 && (
        <section className="section bg-white">
          <div className="wrap">
            <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">🖼️ Gallery</h2>
            <div
              ref={galleryScrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollBehavior: 'smooth' }}
            >
              {galleryItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0 w-72 sm:w-80 h-48 sm:h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <p className="font-bold text-lg">{item.title}</p>
                      <p className="text-sm text-gray-300">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/gallery" className="btn">
                View All Gallery →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* EVENTS */}
      {events.length > 0 && (
        <section className="section bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="wrap">
            <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">🎯 Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {events.map((event, idx) => (
                <motion.div
                  key={event.id}
                  className="card hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl sm:text-5xl mb-3">{event.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{event.title}</h4>
                  <p className="text-emerald-600 font-semibold text-xs sm:text-sm">{event.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STATS */}
      {statsData?.items && (
        <section
          ref={statsRef}
          id="stats-section"
          className="section bg-gradient-to-r from-emerald-700 to-teal-800 text-white"
        >
          <div className="wrap">
            <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Our Legacy of Excellence</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {statsData.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="text-center p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl sm:text-5xl font-bold mb-2">
                    {stats[idx] || 0}
                    {item.suffix}
                  </div>
                  <p className="text-white/80 text-xs sm:text-base">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROGRAMS */}
      {programsData?.items && (
        <section id="programs" className="section bg-white">
          <div className="wrap">
            <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">{programsData.title}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {programsData.items.map((prog, idx) => (
                <motion.div
                  key={idx}
                  className="card hover:border-emerald-400 hover:bg-emerald-50/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl sm:text-6xl mb-4">{prog.icon}</div>
                  <h3 className="font-bold text-base sm:text-xl mb-2 text-gray-900">{prog.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{prog.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials?.items && testimonials.items.length > 0 && (
        <section className="section bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="wrap">
            <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">💬 What Parents Say</h2>
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="card bg-white text-center"
                >
                  <div className="flex justify-center mb-4">
                    {testimonials.items[currentTestimonial].image && (
                      <img
                        src={testimonials.items[currentTestimonial].image}
                        alt={testimonials.items[currentTestimonial].name}
                        className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-4 border-emerald-600"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 italic">{testimonials.items[currentTestimonial].message}</p>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">{testimonials.items[currentTestimonial].name}</p>
                  <p className="text-emerald-600 font-semibold text-xs sm:text-sm">{testimonials.items[currentTestimonial].role}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2 mt-6">
                {testimonials.items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentTestimonial ? 'bg-emerald-600 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="section bg-white">
        <div className="wrap">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl h-64 sm:h-80 md:h-96"
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
                title="School Location"
              />
            </motion.div>

            <div className="space-y-4 sm:space-y-6">
              {[
                { icon: '📍', title: 'Address', text: 'Tarn Taran, Punjab, India' },
                { icon: '📞', title: 'Phone', text: '+91 123 456 7890' },
                { icon: '✉️', title: 'Email', text: 'info@bibirajnischool.edu' },
              ].map((info, idx) => (
                <motion.div
                  key={idx}
                  className="card text-center hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl sm:text-5xl mb-3">{info.icon}</div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900">{info.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{info.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="section bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="wrap">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Send us a Message</h2>
          <div className="max-w-2xl mx-auto">
            <form
              action="https://formspree.io/f/mrbowgyy"
              method="POST"
              className="space-y-4 sm:space-y-6 p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <input type="text" name="name" placeholder="Your Name" required className="bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-2 text-sm sm:text-base" />
                <input type="email" name="email" placeholder="Your Email" required className="bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-2 text-sm sm:text-base" />
              </div>
              <input type="text" name="subject" placeholder="Subject" required className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-2 text-sm sm:text-base" />
              <textarea name="message" placeholder="Your message..." rows={5} required className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-2 text-sm sm:text-base" />
              <button type="submit" className="btn w-full text-sm sm:text-base">
                📤 Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

// Default Functions
function getDefaultHero(): HeroData {
  return {
    title: 'Welcome to Bibi Rajni School',
    subtitle: 'Excellence in Education Since 1990',
    description: 'Where excellence meets compassion.',
    cta1Text: 'Apply Now',
    cta1Link: '/admissions',
    cta2Text: 'Explore More',
    cta2Link: '#programs',
    slides: [
      { image: '/images/school-building.jpg', caption: 'Our Campus' },
    ],
  }
}

function getDefaultHighlights(): Highlights {
  return {
    cards: [
      { icon: '🏆', title: 'Excellence', description: '98% pass rate', color: 'from-blue-500 to-blue-600' },
      { icon: '🎓', title: 'Faculty', description: 'Experienced educators', color: 'from-purple-500 to-purple-600' },
      { icon: '🌟', title: 'Infrastructure', description: 'Modern facilities', color: 'from-pink-500 to-pink-600' },
      { icon: '🤝', title: 'Development', description: 'Holistic growth', color: 'from-green-500 to-green-600' },
    ],
  }
}

function getDefaultStats(): Stats {
  return {
    items: [
      { value: 34, suffix: '+', label: 'Years' },
      { value: 2000, suffix: '+', label: 'Alumni' },
      { value: 98, suffix: '%', label: 'Pass Rate' },
      { value: 500, suffix: '+', label: 'Students' },
    ],
  }
}

function getDefaultPrograms(): Programs {
  return {
    title: 'Why Choose Bibi Rajni?',
    items: [
      { icon: '📚', title: 'CBSE Curriculum', desc: 'National standards' },
      { icon: '💻', title: 'Digital Learning', desc: 'Smart boards' },
      { icon: '⚽', title: 'Sports', desc: 'Multiple sports' },
      { icon: '🎨', title: 'Arts', desc: 'Music & culture' },
      { icon: '🔬', title: 'Labs', desc: 'Science labs' },
      { icon: '🌍', title: 'Global', desc: 'Exchange programs' },
    ],
  }
}

function getDefaultPrincipal(): Principal {
  return {
    title: 'From the Principal\'s Desk',
    message: 'Dear Parents and Students, Bibi Rajni School has been a beacon of excellence for over three decades.',
    name: 'Dr. Rajinder Singh',
    position: 'Principal',
  }
}

function getDefaultTestimonials(): Testimonials {
  return {
    title: 'What Parents Say',
    items: [
      {
        name: 'Mr. Jatin Kumar',
        role: 'Parent',
        message: 'Outstanding school with excellent faculty and modern facilities.',
        image: '/images/testimonials/parent1.jpg',
      },
    ],
  }
}

function getDefaultSections(): Section[] {
  return [
    {
      id: 'contact',
      title: 'Stay Connected',
      subtitle: 'Multiple Ways to Reach Us',
      icon: '📞',
      content: 'Get in touch with us through multiple channels. We are always available to answer your queries.',
      image: '/images/contact.jpg',
      link: '/contact',
      linkText: 'Contact Us',
    },
    {
      id: 'facilities',
      title: 'World-Class Facilities',
      subtitle: 'State-of-the-art Infrastructure',
      icon: '🏢',
      content: 'Our campus is equipped with modern facilities including smart classrooms, labs, and sports grounds.',
      image: '/images/facilities.jpg',
      link: '/facilities',
      linkText: 'Explore Facilities',
    },
    {
      id: 'rules',
      title: 'School Rules & Regulations',
      subtitle: 'Discipline & Conduct',
      icon: '📖',
      content: 'Guidelines and rules designed to maintain a healthy learning environment for all students.',
      image: '/images/rules.jpg',
      link: '/rules',
      linkText: 'View Rules',
    },
  ]
}

function getDefaultGallery(): GalleryItem[] {
  return [
    { id: '1', title: 'Annual Day', category: 'Events', image: '/images/gallery/1.jpg' },
    { id: '2', title: 'Sports Day', category: 'Sports', image: '/images/gallery/2.jpg' },
    { id: '3', title: 'Campus Tour', category: 'Campus', image: '/images/gallery/3.jpg' },
  ]
}
