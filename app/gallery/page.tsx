import { listCollection } from '@/lib/content'

type Photo = {
  image: string
  caption?: string
}

export default function Gallery() {
  const items = listCollection<Photo>('content/gallery')

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Gallery</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-gray-600">No gallery items available.</p>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((p) => (
            <figure
              key={p.slug}
              className="overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-lg transition"
            >
              <img
                className="w-full h-56 object-cover"
                src={p.data.image}
                alt={p.data.caption || p.slug}
              />
              {p.data.caption && (
                <figcaption className="p-4 text-sm text-gray-600">
                  {p.data.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}
