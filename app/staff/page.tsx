import { readYaml } from '@/lib/content'

type Member = {
  name: string
  role: string
  dept?: string
  photo?: string
  email?: string
}

type Directory = {
  members: Member[]
}

export default function Staff() {
  const data = readYaml<Directory>('content/staff/directory.yml')

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Staff Directory</h1>
      {(!data.members || data.members.length === 0) ? (
        <p className="mt-6 text-gray-600">No staff members listed.</p>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.members.map((m) => (
            <div
              key={m.name}
              className="p-6 rounded-xl border bg-white hover:shadow-lg transition"
            >
              {m.photo && (
                <img
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  src={m.photo}
                  alt={m.name}
                />
              )}
              <div className="font-semibold text-lg">{m.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                {m.role}
                {m.dept && ` · ${m.dept}`}
              </div>
              {m.email && (
                <a
                  className="text-sm text-emerald-700 underline mt-2 inline-block"
                  href={`mailto:${m.email}`}
                >
                  {m.email}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
