import { listCollection, type Doc } from '@/lib/content'
import Link from 'next/link'

type NoticeData = {
  title: string
  date: string
  file?: string
}

export default function Notices() {
  const items: Doc<NoticeData>[] = listCollection<NoticeData>('content/notices')
  const sorted = [...items].sort(
    (a: Doc<NoticeData>, b: Doc<NoticeData>) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Notices</h1>
      {sorted.length === 0 ? (
        <p className="mt-6 text-gray-600">No notices available.</p>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {sorted.map((n: Doc<NoticeData>) => (
            <div
              key={n.slug}
              className="p-6 rounded-xl border bg-white hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{n.data.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(n.data.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  href={`/notices/${n.slug}`}
                  className="text-sm text-emerald-700 hover:underline"
                >
                  Read More
                </Link>
                {n.data.file && (
                  <a
                    href={n.data.file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-emerald-700 hover:underline"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
