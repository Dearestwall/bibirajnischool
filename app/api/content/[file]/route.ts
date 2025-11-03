import fs from 'fs'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: { file: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'home', `${params.file}.json`)
    const data = fs.readFileSync(filePath, 'utf-8')
    return Response.json(JSON.parse(data))
  } catch (error) {
    return Response.json({ error: 'File not found' }, { status: 404 })
  }
}

export const dynamic = 'force-static'
