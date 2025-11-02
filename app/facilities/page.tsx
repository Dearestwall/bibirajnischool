export default function Facilities() {
  const facilities = [
    {
      title: 'Smart Classrooms',
      description: 'Interactive digital boards and modern learning tools',
      icon: '🖥️',
    },
    {
      title: 'Science Labs',
      description: 'Well-equipped Physics, Chemistry, and Biology labs',
      icon: '🔬',
    },
    {
      title: 'Computer Lab',
      description: 'Latest computers with high-speed internet',
      icon: '💻',
    },
    {
      title: 'Library',
      description: '10,000+ books and digital resources',
      icon: '📚',
    },
    {
      title: 'Sports Complex',
      description: 'Basketball, volleyball, cricket, and indoor games',
      icon: '⚽',
    },
    {
      title: 'Auditorium',
      description: 'Capacity: 500 seats with modern sound system',
      icon: '🎭',
    },
    {
      title: 'Cafeteria',
      description: 'Hygienic food with nutritious menu',
      icon: '🍽️',
    },
    {
      title: 'Medical Room',
      description: '24/7 medical assistance with trained staff',
      icon: '⚕️',
    },
  ]

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Our Facilities</h1>
      <p className="mt-4 text-lg text-gray-600">
        State-of-the-art infrastructure for holistic development
      </p>
      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {facilities.map((facility) => (
          <div
            key={facility.title}
            className="p-6 rounded-xl border bg-white hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">{facility.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{facility.title}</h3>
            <p className="text-sm text-gray-600">{facility.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
