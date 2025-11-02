import { readMarkdown, listCollection } from '@/lib/content'
import { marked } from 'marked'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-static'

export function generateStaticParams() {
  try {
    const items = listCollection('content/notices')
    return items.map((item) => ({
      slug: item.slug,
    }))
  } catch {
    return []
  }
}

export default async function Notice({ params }: Props) {
  const { slug } = await params

  try {
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
          <a
            href={data.file}
            target="_blank"
            rel="noreferrer"
            className="btn mt-6 inline-flex"
          >
            Download Attachment
          </a>
        )}
        <article
          className="prose max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: marked.parse(content) as string }}
        />
      </section>
    )
  } catch (error) {
    return (
      <section className="wrap section">
        <h1 className="text-4xl font-bold text-gray-900">Notice not found</h1>
      </section>
    )
  }
}
