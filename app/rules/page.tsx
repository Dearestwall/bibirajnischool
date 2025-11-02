export default function Rules() {
  const rules = [
    {
      category: 'Attendance',
      items: [
        'Minimum 75% attendance is mandatory',
        'Late arrivals will be marked absent after 15 minutes',
        'Medical certificates required for sick leave',
      ],
    },
    {
      category: 'Discipline',
      items: [
        'Respectful behavior towards teachers and peers',
        'No bullying or harassment of any kind',
        'Mobile phones not allowed during school hours',
      ],
    },
    {
      category: 'Uniform',
      items: [
        'School uniform must be worn daily',
        'PE uniform on sports days',
        'ID card to be worn at all times',
      ],
    },
    {
      category: 'Academics',
      items: [
        'Complete homework on time',
        'No cheating during exams',
        'Regular parent-teacher meetings attendance',
      ],
    },
  ]

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">School Rules</h1>
      <p className="mt-4 text-lg text-gray-600">
        Guidelines for a safe and productive learning environment
      </p>
      <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl">
        {rules.map((section) => (
          <div
            key={section.category}
            className="p-6 rounded-xl border bg-white shadow-sm"
          >
            <h3 className="font-semibold text-lg mb-4 text-emerald-700">
              {section.category}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
