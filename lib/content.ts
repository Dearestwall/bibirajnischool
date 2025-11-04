import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

const root = process.cwd()

export type Doc<T = any> = {
  slug: string
  data: T
  content: string
}

export function readMarkdown(filePath: string) {
  const full = path.join(root, filePath)
  if (!fs.existsSync(full)) {
    return { data: {}, content: '' }
  }
  const raw = fs.readFileSync(full, 'utf8')
  const { data, content } = matter(raw)
  return { data, content }
}

export function listCollection<T = any>(dir: string): Doc<T>[] {
  const full = path.join(root, dir)
  if (!fs.existsSync(full)) return []
  const files = fs.readdirSync(full).filter((f: string) => f.endsWith('.md'))
  return files
    .map((f: string) => {
      const { data, content } = readMarkdown(path.join(dir, f))
      return {
        slug: f.replace(/\.md$/, ''),
        data: data as T,
        content,
      }
    })
    .sort((a, b) => {
      const dateA = new Date((a.data as any).date || 0).getTime()
      const dateB = new Date((b.data as any).date || 0).getTime()
      return dateB - dateA
    })
}

export function readYaml<T = any>(filePath: string): T {
  const full = path.join(root, filePath)
  if (!fs.existsSync(full)) return {} as T
  const raw = fs.readFileSync(full, 'utf8')
  return (yaml.load(raw) as T) || ({} as T)
}

export function getCollection<T = any>(dir: string): Doc<T>[] {
  return listCollection<T>(dir)
}
