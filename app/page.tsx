'use client'

import { useEffect, useState } from 'react'

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
  const [isLoading, setIsLoading] = useState(true)
  const [notificationIndex, setNotificationIndex] = useState(0)

  // Load all CMS content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const [hero, highlights, statsJson, programs, principal, notif, evt] = await Promise.all([
          fetch('/hero.json').then(r => r.json()).catch(() => null),
          fetch('/highlights.json').then(r => r.json()).catch(() => null),
          fetch('/stats.json').then(r => r.json()).catch(() => null),
          fetch('/programs.json').then(r => r.json()).catch(() => null),
          fetch('/principal.json').then(r => r.json()).catch(() => null),
          fetch('/notifications.json').then(r => r.json()).catch(() => null),
          fetch('/events.json').then(r => r.json()).catch(() => null),
        ])

        setHeroData(hero || getDefaultHero())
        setHighlightsData(highlights || getDefaultHighlights())
        setStatsData(statsJson || getDefaultStats())
        setProgramsData(programs || getDefaultPrograms())
        setPrincipalData(principal || getDefaultPrincipal())
        setNotifications(notif?.items || getDefaultNotifications())
        setEvents(evt?.items || getDefaultEvents())
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading content:', error)
        setIsLoading(false)
      }
    }

    loadContent()
  }, [])

  // Hero slider auto-advance
  useEffect(() => {
    if (!heroData?.slides || heroData.slides.length === 0) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [heroData?.slides])

  // Notification carousel
  useEffect(() => {
    if (notifications.length === 0) return
    const timer = setInterval(() => {
      setNotificationIndex((prev) => (prev + 1) % notifications.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [notifications])

  // Animate stats on scroll (fixed: removed 'once' property)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && statsData) {
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
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => observer.disconnect()
  }, [statsData])

  if (isLoading) {
    return <div className="h-screen bg-white" />
  }

  return (
    <>
      {/* NOTIFICATION BANNER */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white overflow-hidden">
        <div className="h-12 flex items-center">
          <div className="wrap w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-xl animate-pulse">📢</span>
              <div className="overflow-hidden flex-1">
                <div className="animate-scroll whitespace-nowrap">
                  {notifications.map((notif, idx) => (
                    <span key={notif.id} className="inline-block px-4">
                      {notif.icon} {notif.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <a href="/contact" className="text-sm font-bold hover:underline whitespace-nowrap">
              Learn More →
            </a>
          </div>
        </div>
      </div>

      {/* HERO SLIDER */}
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Slides */}
        {heroData?.slides && heroData.slides.length > 0 ? (
          heroData.slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600" />
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
            {heroData?.title || 'Welcome'}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 text-white/95 drop-shadow-md">
            {heroData?.subtitle || 'Excellence in Education'}
          </p>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-12 text-white/90 drop-shadow-md">
            {heroData?.description || 'Nurturing tomorrow\'s leaders'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={heroData?.cta1Link || '/admissions'}
              className="btn hover:scale-105 transition-transform"
            >
              {heroData?.cta1Text || 'Apply Now'}
            </a>
            <a
              href={heroData?.cta2Link || '#programs'}
              className="btn-secondary bg-white/20 border-white text-white hover:bg-white/30 hover:scale-105 transition-transform"
            >
              {heroData?.cta2Text || 'Explore More'} ↓
            </a>
          </div>
        </div>

        {/* Slider Controls */}
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
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + heroData.slides.length) % heroData.slides.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % heroData.slides.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all hover:scale-110"
              aria-label="Next slide"
            >
              →
            </button>
          </>
        )}
      </section>

      {/* HIGHLIGHTS */}
      {highlightsData && highlightsData.cards.length > 0 && (
        <section id="highlights" className="section bg-white">
          <div className="wrap">
            <div className="grid-responsive">
              {highlightsData.cards.map((card, idx) => (
                <div
                  key={idx}
                  className={`card-gradient bg-gradient-to-br ${card.color} hover:scale-105 hover:shadow-2xl cursor-pointer transition-all duration-300 transform`}
                  style={{
                    animation: `slideUp 0.6s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="text-5xl sm:text-6xl mb-4 transform hover:scale-125 transition-transform">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">{card.title}</h3>
                  <p className="text-sm sm:text-base text-white/90">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRINCIPAL */}
      {principalData && (
        <section className="section bg-gradient-to-br from-gray-50 to-gray-100 py-20">
          <div className="wrap">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {principalData.image && (
                <div className="flex justify-center order-2 md:order-1 perspective">
                  <div className="relative w-full max-w-sm md:max-w-none">
                    {/* 3D Frame Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl blur-xl opacity-20" />
                    <img
                      src={principalData.image}
                      alt={principalData.name}
                      className="relative rounded-2xl shadow-2xl w-full h-auto object-cover aspect-square hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                    />
                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-200 rounded-full opacity-30 blur-xl" />
                    <div className="absolute -top-4 -left-4 w-32 h-32 bg-teal-200 rounded-full opacity-30 blur-xl" />
                  </div>
                </div>
              )}
              <div className="space-y-6 order-1 md:order-2 animate-slide-in-left">
                <div>
                  <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">
                    Leadership
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                    {principalData.title}
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {principalData.message}
                </p>
                <div className="pt-4 border-t-2 border-emerald-200">
                  <p className="font-bold text-lg text-gray-900">{principalData.name}</p>
                  <p className="text-emerald-600 font-semibold">{principalData.position}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EVENTS */}
      {events.length > 0 && (
        <section className="section bg-white py-20">
          <div className="wrap">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
              🎯 Upcoming Events
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto pb-4">
              {events.map((event, idx) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 card hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-xl transition-all duration-300 min-w-full sm:min-w-auto"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="text-4xl mb-3">{event.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{event.title}</h4>
                  <p className="text-emerald-600 font-semibold text-sm">{event.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STATS */}
      {statsData && statsData.items.length > 0 && (
        <section
          id="stats-section"
          className="section bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white py-20"
        >
          <div className="wrap">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Our Legacy of Excellence
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {statsData.items.map((item, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-4xl sm:text-5xl font-bold mb-2">
                    {stats[idx] || 0}
                    {item.suffix}
                  </div>
                  <p className="text-sm sm:text-base text-white/90">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROGRAMS */}
      {programsData && programsData.items.length > 0 && (
        <section id="programs" className="section bg-white py-20">
          <div className="wrap">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
              {programsData.title}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {programsData.items.map((prog, idx) => (
                <div
                  key={idx}
                  className="card hover:border-emerald-400 hover:bg-emerald-50/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="text-5xl sm:text-6xl mb-4 transform hover:rotate-12 transition-transform">
                    {prog.icon}
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">{prog.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{prog.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MAP & CONTACT INFO */}
      <section className="section bg-gray-50 py-20">
        <div className="wrap">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Visit Us & Contact
          </h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div className="rounded-2xl overflow-hidden shadow-xl h-96">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3436.6789706587556!2d74.8725!3d31.4707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919e5f62e6e5555%3A0x1234567890!2sTarn%20Taran!5e0!3m2!1sen!2sin!4v1234567890123"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="space-y-6">
              <div className="card text-center hover:shadow-xl transition-all">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="font-bold text-lg mb-2">Address</h3>
                <p className="text-gray-600">Tarn Taran, Punjab, India</p>
              </div>
              <div className="card text-center hover:shadow-xl transition-all">
                <div className="text-5xl mb-4">📞</div>
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <p className="text-gray-600">+91 123 456 7890</p>
              </div>
              <div className="card text-center hover:shadow-xl transition-all">
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-gray-600">info@bibirajnischool.edu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="section bg-gradient-to-br from-emerald-600 to-teal-600 text-white py-20">
        <div className="wrap">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <form
              action="https://formspree.io/f/mrbowgyy"
              method="POST"
              className="space-y-6 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder-white/50 focus:ring-white"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="bg-white/20 border-white/30 text-white placeholder-white/50 focus:ring-white"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="bg-white/20 border-white/30 text-white placeholder-white/50 focus:ring-white"
              />

              <textarea
                name="message"
                placeholder="Your message..."
                rows={5}
                required
                className="bg-white/20 border-white/30 text-white placeholder-white/50 focus:ring-white"
              />

              <button
                type="submit"
                className="w-full py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                📤 Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

// Default fallback data
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
      { image: '/images/classroom.jpg', caption: 'Classroom' },
      { image: '/images/sports.jpg', caption: 'Sports' },
      { image: '/images/students.jpg', caption: 'Students' },
    ],
  }
}

function getDefaultHighlights(): Highlights {
  return {
    cards: [
      { icon: '🏆', title: 'Academic Excellence', description: '98% pass rate', color: 'from-blue-500 to-blue-600' },
      { icon: '🎓', title: 'Faculty', description: 'World-class educators', color: 'from-purple-500 to-purple-600' },
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
    message: 'Dear Parents and Students, Bibi Rajni School has been a beacon of excellence for over three decades. Our commitment to holistic education ensures every student realizes their full potential.',
    name: 'Dr. Rajinder Singh',
    position: 'Principal',
  }
}

function getDefaultNotifications(): Notification[] {
  return [
    { id: '1', text: 'Admissions Open for 2026-27', icon: '📢' },
    { id: '2', text: 'Annual Sports Day - Nov 15', icon: '🏆' },
    { id: '3', text: 'Parent-Teacher Meeting - Nov 20', icon: '👥' },
  ]
}

function getDefaultEvents(): Event[] {
  return [
    { id: '1', title: 'Annual Sports Day', date: 'Nov 15, 2025', icon: '🏆' },
    { id: '2', title: 'Science Exhibition', date: 'Nov 22, 2025', icon: '🔬' },
    { id: '3', title: 'Cultural Fest', date: 'Dec 5, 2025', icon: '🎭' },
    { id: '4', title: 'Founder\'s Day', date: 'Dec 20, 2025', icon: '🎉' },
  ]
}
