import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  try {
    const { file } = await params
    const filePath = path.join(process.cwd(), 'content', 'home', `${file}.json`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
    
    const data = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error('Error reading file:', error)
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}

export const dynamic = 'force-static'
