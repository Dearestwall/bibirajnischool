export default function Academics() {
  const items = [
    { title: 'Curriculum', desc: 'CBSE/State board aligned curriculum' },
    { title: 'Labs', desc: 'Modern science and computer labs' },
    { title: 'Library', desc: 'Well-stocked library with digital resources' },
    { title: 'Sports', desc: 'Indoor and outdoor sports facilities' },
    { title: 'Clubs', desc: 'Debate, arts, music, and robotics clubs' },
    { title: 'Activities', desc: 'Field trips and cultural programs' },
  ]

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Academics</h1>
      <p className="mt-4 text-lg text-gray-600">
        Comprehensive education with focus on holistic development.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((x) => (
          <div
            key={x.title}
            className="p-6 rounded-xl border bg-white hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{x.title}</h3>
            <p className="mt-2 text-gray-600 text-sm">{x.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
