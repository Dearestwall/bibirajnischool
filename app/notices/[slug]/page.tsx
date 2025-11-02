import { readMarkdown, listCollection } from '@/lib/content'
import { marked } from 'marked'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  const items = listCollection('content/notices')
  return items.map((item) => ({
    slug: item.slug,
  }))
}

export default function Notice({ params }: Props) {
  const { data, content } = readMarkdown(`content/notices/${params.slug}.md`)
  
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
}
