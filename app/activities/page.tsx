export default function Activities() {
  const activities = [
    { name: 'Annual Sports Day', category: 'Sports', icon: '🏆' },
    { name: 'Science Exhibition', category: 'Academic', icon: '🔬' },
    { name: 'Cultural Fest', category: 'Arts', icon: '🎨' },
    { name: 'Debate Competition', category: 'Literary', icon: '🗣️' },
    { name: 'Music & Dance', category: 'Arts', icon: '🎵' },
    { name: 'Robotics Club', category: 'Technology', icon: '🤖' },
    { name: 'Nature Club', category: 'Environment', icon: '🌱' },
    { name: 'Community Service', category: 'Social', icon: '🤝' },
  ]

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Activities</h1>
      <p className="mt-4 text-lg text-gray-600">
        Beyond academics: nurturing talents and interests
      </p>
      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {activities.map((activity) => (
          <div
            key={activity.name}
            className="p-6 rounded-xl border bg-white hover:shadow-lg transition text-center"
          >
            <div className="text-5xl mb-3">{activity.icon}</div>
            <h3 className="font-semibold mb-1">{activity.name}</h3>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
              {activity.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
