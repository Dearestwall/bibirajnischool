export default function About() {
  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
      <div className="mt-8 prose max-w-none">
        <p className="text-lg text-gray-600">
          Our vision is to inspire lifelong learning, integrity, and excellence in every student.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <h3 className="font-semibold text-xl">Mission</h3>
            <p className="mt-3 text-gray-600">
              Empowering students with knowledge, skills, and values.
            </p>
          </div>
          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <h3 className="font-semibold text-xl">Vision</h3>
            <p className="mt-3 text-gray-600">
              Creating future leaders through quality education.
            </p>
          </div>
          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <h3 className="font-semibold text-xl">Values</h3>
            <p className="mt-3 text-gray-600">
              Integrity, respect, excellence, and compassion.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
