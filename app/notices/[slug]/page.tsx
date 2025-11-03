// app/notices/[slug]/page.tsx
import { readMarkdown, listCollection } from '@/lib/content'
import { marked } from 'marked'

export async function generateStaticParams() {
  const items = listCollection('content/notices')
  return items.map((it) => ({ slug: it.slug }))
}

export const dynamicParams = false // 404 for unknown slugs [web:205]

export default function Notice({ params }: { params: { slug: string } }) {
  const { data, content } = readMarkdown(`content/notices/${params.slug}.md`)
  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <article className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: marked.parse(content) as string }} />
    </section>
  )
}
