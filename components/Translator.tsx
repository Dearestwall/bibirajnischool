'use client'

import { useState, useEffect } from 'react'

export default function Translator() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Show/hide back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Back to Top Button - LEFT SIDE */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed left-6 bottom-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg hover:shadow-2xl transition-all flex items-center justify-center text-xl hover:scale-110 animate-fade-in-up"
          title="Back to top"
        >
          ⬆️
        </button>
      )}

      {/* Translator Button - RIGHT SIDE */}
      <div className="fixed bottom-6 right-6 z-40" id="translator-container">
        <button
          id="translator-btn"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-2xl transition-all flex items-center justify-center text-2xl hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
          title="Click to translate"
        >
          🌐
        </button>

        {/* Panel */}
        {isOpen && (
          <div className="absolute bottom-24 right-0 bg-white rounded-2xl shadow-2xl w-80 border border-gray-200 overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">🌍 Translate</h3>
              <button
                className="text-white hover:text-gray-200 text-2xl font-bold leading-none"
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Google Translator */}
              <div id="google_translate_element"></div>

              {/* Languages */}
              <div className="mt-6 pt-6 border-t">
                <p className="font-bold text-gray-900 text-sm mb-3">Available Languages:</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                  <span>🇬🇧 English</span>
                  <span>🇮🇳 Hindi</span>
                  <span>🇵🇰 Punjabi</span>
                  <span>🇪🇸 Spanish</span>
                  <span>🇫🇷 French</span>
                  <span>🇩🇪 German</span>
                  <span>🇨🇳 Chinese</span>
                  <span>🇸🇦 Arabic</span>
                  <span>🇯🇵 Japanese</span>
                  <span>🇧🇩 Bengali</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
