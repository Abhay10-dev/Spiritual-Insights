import { NextResponse } from 'next/server'

const BOOKS_DATA = [
  { id: '1', title: 'Bhagavad Gita As It Is', author: 'A.C. Bhaktivedanta', category: 'Spiritual Books', pdfUrl: '', coverImage: '📘' },
  { id: '2', title: 'The Ramayana', author: 'Valmiki', category: 'Spiritual Books', pdfUrl: '', coverImage: '📗' },
  { id: '3', title: 'Stories of Krishna for Kids', author: 'Illustrated Series', category: 'Kids Books', pdfUrl: '', coverImage: '🦚' },
  { id: '4', title: 'Panchatantra Tales', author: 'Vishnu Sharma', category: 'Kids Books', pdfUrl: '', coverImage: '🐒' },
  { id: '5', title: 'Hindu Gods Coloring Book', author: 'Art Collections', category: 'Coloring Books', pdfUrl: '', coverImage: '🖍️' },
  { id: '6', title: 'Ganesha Coloring Pages', author: 'Creative Series', category: 'Coloring Books', pdfUrl: '', coverImage: '🐘' },
  { id: '7', title: 'Autobiography of a Yogi', author: 'Paramahansa Yogananda', category: 'Spiritual Books', pdfUrl: '', coverImage: '📙' },
  { id: '8', title: 'Hanuman Stories for Children', author: 'Kids Spiritual Series', category: 'Kids Books', pdfUrl: '', coverImage: '🐒' },
]

export async function GET() {
  return NextResponse.json({ books: BOOKS_DATA })
}
