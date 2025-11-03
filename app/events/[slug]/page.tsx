// app/events/[slug]/page.tsx
import { readMarkdown, listCollection } from '@/lib/content'
import { marked } from 'marked'

export async function generateStaticParams() {
  const items = listCollection('content/events')
  return items.map((it) => ({ slug: it.slug }))
}

export const dynamicParams = false // 404 for unknown slugs not generated [web:205]

export default function Event({ params }: { params: { slug: string } }) {
  const { data, content } = readMarkdown(`content/events/${params.slug}.md`)
  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <article className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: marked.parse(content) as string }} />
    </section>
  )
}
