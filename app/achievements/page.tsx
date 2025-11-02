export default function Achievements() {
  const achievements = [
    {
      year: '2025',
      title: 'State Science Olympiad Winners',
      description: '3 students won gold medals',
    },
    {
      year: '2025',
      title: 'Best School Award',
      description: 'Awarded by Education Department',
    },
    {
      year: '2024',
      title: 'National Sports Championship',
      description: 'Basketball team secured 2nd position',
    },
    {
      year: '2024',
      title: '100% Board Results',
      description: 'All students passed with distinction',
    },
  ]

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Achievements</h1>
      <p className="mt-4 text-lg text-gray-600">
        Celebrating excellence and success stories
      </p>
      <div className="mt-8 max-w-3xl space-y-6">
        {achievements.map((ach, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl border-l-4 border-emerald-600 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-700 font-bold">{ach.year}</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{ach.title}</h3>
                <p className="mt-2 text-gray-600">{ach.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
