import { readMarkdown, listCollection } from '@/lib/content'
import { marked } from 'marked'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-static'

export function generateStaticParams() {
  try {
    const items = listCollection('content/events')
    return items.map((item) => ({
      slug: item.slug,
    }))
  } catch {
    return []
  }
}

export default async function Event({ params }: Props) {
  const { slug } = await params
  
  try {
    const { data, content } = readMarkdown(`content/events/${slug}.md`)

    return (
      <section className="wrap section">
        {data.cover && (
          <img
            className="w-full h-64 md:h-96 object-cover rounded-2xl"
            src={data.cover}
            alt={data.title}
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900 mt-8">{data.title}</h1>
        <div className="mt-4 text-gray-600">
          <p>
            {new Date(data.start).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {data.end &&
              ` - ${new Date(data.end).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}`}
          </p>
          {data.location && <p className="mt-1">📍 {data.location}</p>}
        </div>
        <article
          className="prose max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: marked.parse(content) as string }}
        />
      </section>
    )
  } catch {
    return (
      <section className="wrap section">
        <h1 className="text-4xl font-bold text-gray-900">Event not found</h1>
      </section>
    )
  }
}
