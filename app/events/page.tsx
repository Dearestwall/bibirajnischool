// app/events/page.tsx
import { listCollection, type Doc } from '@/lib/content'
import Link from 'next/link'

type EventData = {
  title: string
  start: string
  end?: string
  location?: string
  cover?: string
}

export default function Events() {
  const items: Doc<EventData>[] = listCollection<EventData>('content/events')
  const sorted = [...items].sort(
    (a, b) => new Date(b.data.start).getTime() - new Date(a.data.start).getTime()
  )

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Events</h1>
      {sorted.length === 0 ? (
        <p className="mt-6 text-gray-600">No events scheduled.</p>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {sorted.map((e) => (
            <div
              key={e.slug}
              className="rounded-xl border bg-white overflow-hidden hover:shadow-lg transition"
            >
              {e.data.cover && (
                <img
                  className="w-full h-48 object-cover"
                  src={e.data.cover}
                  alt={e.data.title}
                />
              )}
              <div className="p-6">
                <h3 className="font-semibold text-lg">{e.data.title}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(e.data.start).toLocaleDateString('en-IN')}
                  {e.data.end &&
                    ` - ${new Date(e.data.end).toLocaleDateString('en-IN')}`}
                </p>
                {e.data.location && (
                  <p className="text-sm text-gray-600 mt-1">{e.data.location}</p>
                )}
                <Link
                  href={`/events/${e.slug}`}
                  className="mt-4 inline-block text-sm text-emerald-700 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
