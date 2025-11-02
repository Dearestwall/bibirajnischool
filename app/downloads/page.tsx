import { listCollection } from '@/lib/content'

type Download = {
  label: string
  file: string
  category?: string
}

export default function Downloads() {
  const items = listCollection<Download>('content/downloads')

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Downloads</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-gray-600">No downloads available.</p>
      ) : (
        <div className="mt-8 space-y-3 max-w-2xl">
          {items.map((x) => (
            <div
              key={x.slug}
              className="p-5 rounded-xl border bg-white flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <div className="font-medium">{x.data.label}</div>
                {x.data.category && (
                  <div className="text-sm text-gray-500 mt-1">
                    {x.data.category}
                  </div>
                )}
              </div>
              <a
                href={x.data.file}
                target="_blank"
                rel="noreferrer"
                className="btn text-sm"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
