'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BookCard from '@/components/ui/BookCard'
import SearchBar from '@/components/ui/SearchBar'
import CategoryTabs from '@/components/ui/CategoryTabs'

const CATEGORIES = ['All', 'Spiritual Books', 'Kids Books', 'Coloring Books']

const BOOKS = [
  { id: '1', title: 'Bhagavad Gita As It Is', author: 'A.C. Bhaktivedanta', category: 'Spiritual Books', coverEmoji: '📘', pdfUrl: '#' },
  { id: '2', title: 'The Ramayana', author: 'Valmiki', category: 'Spiritual Books', coverEmoji: '📗', pdfUrl: '#' },
  { id: '3', title: 'Stories of Krishna for Kids', author: 'Illustrated Series', category: 'Kids Books', coverEmoji: '🦚', pdfUrl: '#' },
  { id: '4', title: 'Panchatantra Tales', author: 'Vishnu Sharma', category: 'Kids Books', coverEmoji: '🐒', pdfUrl: '#' },
  { id: '5', title: 'Hindu Gods Coloring Book', author: 'Art Collections', category: 'Coloring Books', coverEmoji: '🖍️', pdfUrl: '#' },
  { id: '6', title: 'Ganesha Coloring Pages', author: 'Creative Series', category: 'Coloring Books', coverEmoji: '🐘', pdfUrl: '#' },
  { id: '7', title: 'Autobiography of a Yogi', author: 'Paramahansa Yogananda', category: 'Spiritual Books', coverEmoji: '📙', pdfUrl: '#' },
  { id: '8', title: 'Hanuman Stories for Children', author: 'Kids Spiritual Series', category: 'Kids Books', coverEmoji: '🐒', pdfUrl: '#' },
]

export default function BooksPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [openBook, setOpenBook] = useState<string | null>(null)

  const filtered = BOOKS.filter((b) => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || (b.author?.toLowerCase().includes(search.toLowerCase()) ?? false)
    return matchCat && matchSearch
  })

  const currentBook = BOOKS.find((b) => b.id === openBook)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-gold px-4 pt-10 pb-14">
        <div className="mx-auto max-w-5xl">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-white mb-1">📚 Books &amp; PDFs</motion.h1>
          <p className="text-white/80 text-sm">Spiritual Books · Kids Books · Coloring Books</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 -mt-6 space-y-6 pb-10">
        {/* Search + Tabs */}
        <div className="glass-card rounded-2xl p-4 shadow-md border border-white/60">
          <SearchBar value={search} onChange={setSearch} placeholder="Search books…" />
          <div className="mt-3"><CategoryTabs tabs={CATEGORIES} active={activeCategory} onChange={setActiveCategory} /></div>
        </div>

        {/* PDF Viewer */}
        <AnimatePresence>
          {openBook && currentBook && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="glass-card rounded-2xl border border-white/60 overflow-hidden shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentBook.coverEmoji}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{currentBook.title}</p>
                    <p className="text-xs text-gray-500">{currentBook.author}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={currentBook.pdfUrl} download className="rounded-lg bg-saffron/10 px-3 py-1.5 text-xs font-medium text-saffron hover:bg-saffron/20 transition-colors">Download</a>
                  <button onClick={() => setOpenBook(null)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 transition-colors">Close</button>
                </div>
              </div>
              <div className="flex h-80 items-center justify-center bg-gray-50">
                <div className="text-center">
                  <span className="text-6xl">{currentBook.coverEmoji}</span>
                  <p className="mt-3 text-sm text-gray-500">PDF reader coming soon. Use Download to read offline.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Book grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center text-gray-400 py-10">No books found.</motion.p>
            ) : (
              filtered.map((b) => (
                <motion.div key={b.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <BookCard {...b} onClick={(id) => setOpenBook(id)} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
