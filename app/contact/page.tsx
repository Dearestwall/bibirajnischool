'use client'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
      <div className="wrap">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">
                Tarn Taran, Punjab, India
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">
                +91 123 456 7890
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="text-4xl mb-3">✉️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">
                info@bibirajnischool.edu
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form
              action="https://formspree.io/f/mrbowgyy"
              method="POST"
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <textarea
                name="message"
                placeholder="Your message..."
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="/" className="inline-block px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
