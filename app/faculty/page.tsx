import { readYaml } from '@/lib/content'

type Member = {
  name: string
  role: string
  dept?: string
  photo?: string
  email?: string
  qualification?: string
}

type Directory = {
  members: Member[]
}

export default function Faculty() {
  const data = readYaml<Directory>('content/faculty/directory.yml')

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Our Faculty</h1>
      <p className="mt-4 text-lg text-gray-600">
        Dedicated educators committed to excellence
      </p>
      {!data.members || data.members.length === 0 ? (
        <p className="mt-6 text-gray-600">No faculty members listed.</p>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.members.map((m) => (
            <div
              key={m.name}
              className="p-6 rounded-xl border bg-white hover:shadow-lg transition"
            >
              {m.photo ? (
                <img
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  src={m.photo}
                  alt={m.name}
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg mb-4 flex items-center justify-center text-4xl font-bold text-emerald-700">
                  {m.name.charAt(0)}
                </div>
              )}
              <div className="font-semibold text-lg">{m.name}</div>
              <div className="text-sm text-emerald-600 mt-1">{m.role}</div>
              {m.dept && (
                <div className="text-xs text-gray-500 mt-1">{m.dept}</div>
              )}
              {m.qualification && (
                <div className="text-xs text-gray-500 mt-1">
                  {m.qualification}
                </div>
              )}
              {m.email && (
                <a
                  className="text-sm text-emerald-700 underline mt-3 inline-block"
                  href={`mailto:${m.email}`}
                >
                  Contact
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
