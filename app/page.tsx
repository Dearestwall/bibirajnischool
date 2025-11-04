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
  const [loading, setLoading] = useState(true)

  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      console.log('Loading content from /public/content/...')
      
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
        fetch('/content/home/hero.json', { cache: 'no-store' })
          .then(r => {
            console.log('hero.json:', r.status)
            return r.ok ? r.json() : null
          })
          .catch(e => {
            console.error('Error loading hero.json:', e)
            return null
          }),
        fetch('/content/home/highlights.json', { cache: 'no-store' })
          .then(r => {
            console.log('highlights.json:', r.status)
            return r.ok ? r.json() : null
          })
          .catch(e => {
            console.error('Error loading highlights.json:', e)
            return null
          }),
        fetch('/content/home/stats.json', { cache: 'no-store' })
          .then(r => {
            console.log('stats.json:', r.status)
            return r.ok ? r.json() : null
          })
          .catch(e => {
            console.error('Error loading stats.json:', e)
            return null
          }),
        fetch('/content/home/programs.json', { cache: 'no-store' })
          .then(r => {
            console.log('programs.json:', r.status)
            return r.ok ? r.json() : null
          })
          .catch(e => {
            console.error('Error loading programs.json:', e)
            return null
          }),
        fetch('/content/home/principal.json', { cache: 'no-store' })
          .then(r => {
            console.log('principal.json:', r.status)
            return r.ok ? r.json() : null
          })
          .catch(e => {
            console.error('Error loading principal.json:', e)
            return null
          }),
        fetch('/content/home/notifications.json', { cache: 'no-store' })
          .then(r => {
            console.log('notifications.json:', r.status)
            return r.ok ? r.json() : null
          })
          .catch(e => {
            console.error('Error loading notifications.json:', e)
            return null
          }),
        fetch('/content/home/events.json', { cache: 'no-store' })
          .then(r => {
            console.log('events.json:', r.status)
            return r.ok ? r.json() : null
          })
          .catch(e => {
            console.error('Error loading events.json:', e)
            return null
          }),
        fetch('/content/home/testimonials.json', { cache: 'no-store' })
          .then(r => {
            console.log('testimonials.json:', r.status)
            return r.ok ? r.json() : null
          })
          .catch(e => {
            console.error('Error loading testimonials.json:', e)
            return null
          }),
        fetch('/content/home/sections.json', { cache: 'no-store' })
          .then(r => {
            console.log('sections.json:', r.status)
            return r.ok ? r.json() : null
          })
          .catch(e => {
            console.error('Error loading sections.json:', e)
            return null
          }),
        fetch('/content/gallery.json', { cache: 'no-store' })
          .then(r => {
            console.log('gallery.json:', r.status)
            return r.ok ? r.json() : null
          })
          .catch(e => {
            console.error('Error loading gallery.json:', e)
            return null
          }),
      ])

      console.log('All content loaded:', { hero, highlights, statsJson, programs, principal, notif, evt, testimonials, sections, gallery })

      setHeroData(hero)
      setHighlightsData(highlights)
      setStatsData(statsJson)
      setProgramsData(programs)
      setPrincipalData(principal)
      setTestimonials(testimonials)
      setHomeSections(sections?.items || [])
      setGalleryItems(gallery?.items || [])
      setNotifications(notif?.items || [])
      setEvents(evt?.items || [])
      setLoading(false)
    } catch (error) {
      console.error('Error loading CMS content:', error)
      setLoading(false)
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

  // Animate stats on scroll
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

  if (!mounted || loading) return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
        </div>
        <p className="mt-4 text-emerald-700 font-semibold">Loading content...</p>
      </div>
    </div>
  )

  // Show message if no CMS content
  if (!heroData) return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <p className="text-xl font-bold text-gray-900 mb-2">📝 No Content Yet</p>
        <p className="text-gray-600">Please add content from the CMS admin panel.</p>
        <p className="text-sm text-gray-500 mt-2">
          Visit: <a href="/admin" className="text-emerald-600 hover:underline">/admin</a>
        </p>
      </div>
    </div>
  )

  return (
    <>
      {/* HERO SLIDER */}
      {heroData?.slides && heroData.slides.length > 0 && (
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
              <img
                src={heroData.slides[currentSlide].image}
                alt={heroData.slides[currentSlide].caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
            </motion.div>
          </AnimatePresence>

          {/* HERO CONTENT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 drop-shadow-2xl"
            >
              {heroData.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-white/95 drop-shadow-lg"
            >
              {heroData.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg max-w-2xl sm:max-w-3xl mb-6 sm:mb-10 text-white/90 drop-shadow-lg"
            >
              {heroData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 flex-wrap justify-center"
            >
              <Link href={heroData.cta1Link} className="btn text-sm sm:text-base">
                {heroData.cta1Text}
              </Link>
              <a href={heroData.cta2Link} className="btn-secondary bg-white/20 border-white text-white hover:bg-white/30 text-sm sm:text-base">
                {heroData.cta2Text} ↓
              </a>
            </motion.div>
          </div>

          {/* SLIDER CONTROLS */}
          {heroData.slides.length > 1 && (
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
                ←
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroData.slides.length)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full transition-all hover:scale-110"
                aria-label="Next slide"
              >
                →
              </button>
            </>
          )}
        </section>
      )}

      {/* HIGHLIGHTS */}
      {highlightsData?.cards && highlightsData.cards.length > 0 && (
        <section className="section bg-white">
          <div className="wrap">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {highlightsData.cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className={`bg-gradient-to-br ${card.color} text-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
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
                  <div className="relative w-full max-w-xs sm:max-w-sm">
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
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{principalData.message}</p>
                <div className="pt-4 border-t-2 border-emerald-200">
                  <p className="font-bold text-lg sm:text-xl text-gray-900">{principalData.name}</p>
                  <p className="text-emerald-600 font-semibold text-sm sm:text-base">{principalData.position}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* HOME SECTIONS */}
      {homeSections && homeSections.length > 0 && (
        <>
          {homeSections.map((section, idx) => (
            <section key={section.id} className={`section ${idx % 2 === 0 ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
              <div className="wrap">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  {section.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
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
                    <p className="text-gray-700 text-sm sm:text-base whitespace-pre-wrap">{section.content}</p>
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

      {/* GALLERY */}
      {galleryItems && galleryItems.length > 0 && (
        <section className="section bg-white">
          <div className="wrap">
            <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">🖼️ Gallery</h2>
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth">
              {galleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0 w-72 sm:w-80 h-48 sm:h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group relative"
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
          </div>
        </section>
      )}

      {/* EVENTS */}
      {events && events.length > 0 && (
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
      {statsData?.items && statsData.items.length > 0 && (
        <section
          ref={statsRef}
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
      {programsData?.items && programsData.items.length > 0 && (
        <section className="section bg-white">
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
                  {testimonials.items[currentTestimonial].image && (
                    <div className="flex justify-center mb-4">
                      <img
                        src={testimonials.items[currentTestimonial].image}
                        alt={testimonials.items[currentTestimonial].name}
                        className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-4 border-emerald-600"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <p className="text-gray-600 text-sm sm:text-base mb-4 italic whitespace-pre-wrap">{testimonials.items[currentTestimonial].message}</p>
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
                <input type="text" name="name" placeholder="Your Name" required className="bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-2 text-sm sm:text-base focus:bg-white/30 focus:outline-none transition" />
                <input type="email" name="email" placeholder="Your Email" required className="bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-2 text-sm sm:text-base focus:bg-white/30 focus:outline-none transition" />
              </div>
              <input type="text" name="subject" placeholder="Subject" required className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-2 text-sm sm:text-base focus:bg-white/30 focus:outline-none transition" />
              <textarea name="message" placeholder="Your message..." rows={5} required className="w-full bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-2 text-sm sm:text-base focus:bg-white/30 focus:outline-none transition" />
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
