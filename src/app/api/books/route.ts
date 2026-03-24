import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Book from '@/models/Book'

export async function GET() {
  try {
    await dbConnect()
    const books = await Book.find({}).lean()
    
    return NextResponse.json({ 
      books: books.map((b: any) => ({ ...b, id: b._id.toString() })) 
    })
  } catch (error) {
    console.error('Error fetching books from MongoDB:', error)
    return NextResponse.json({ error: 'Failed to fetch books', books: [] }, { status: 500 })
  }
}
