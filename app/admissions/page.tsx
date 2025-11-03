'use client'

export default function Admissions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
      <div className="wrap">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-8">
          Admissions
        </h1>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-emerald-600">
            Welcome to Bibi Rajni School
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We are now accepting admissions for the 2026-27 academic year. 
            Contact us to learn more about our admission process and requirements.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Required Documents:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Birth Certificate</li>
              <li>Transfer Certificate (if applicable)</li>
              <li>Character Certificate</li>
              <li>Recent photographs</li>
              <li>Vaccination records</li>
            </ul>
          </div>

          <div className="bg-emerald-50 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-emerald-900 mb-2">Contact Admissions</h3>
            <p className="text-emerald-800">Phone: +91 123 456 7890</p>
            <p className="text-emerald-800">Email: admissions@bibirajnischool.edu</p>
          </div>

          <a href="/" className="inline-block px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
