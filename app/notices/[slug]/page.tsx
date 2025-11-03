// app/notices/[slug]/page.tsx
import { readMarkdown } from '@/lib/content'
import { marked } from 'marked'
import fs from 'node:fs'
import path from 'node:path'

export const dynamicParams = false

export function generateStaticParams(): { slug: string }[] {
  const dir = path.join(process.cwd(), 'content/notices')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ slug: f.replace(/\.md$/, '') }))
}

export default async function NoticePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data, content } = readMarkdown(`content/notices/${slug}.md`)
  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">{data.title}</h1>
      <p className="text-sm text-gray-500 mt-3">
        {new Date(data.date).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      {data.file && (
        <a href={data.file} target="_blank" rel="noreferrer" className="btn mt-6 inline-flex">
          Download Attachment
        </a>
      )}
      <article
        className="prose max-w-none mt-8"
        dangerouslySetInnerHTML={{ __html: marked.parse(content) as string }}
      />
    </section>
  )
}
