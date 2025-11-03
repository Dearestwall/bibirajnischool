import { readMarkdown } from '@/lib/content'
import { marked } from 'marked'
import fs from 'node:fs'
import path from 'node:path'

export const dynamicParams = false

export function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/events')
  if (!fs.existsSync(dir)) return []
  
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  return files.map((f) => ({
    slug: f.replace(/\.md$/, ''),
  }))
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
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
}
