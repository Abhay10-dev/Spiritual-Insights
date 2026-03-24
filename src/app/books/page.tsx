'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BookCard from '@/components/ui/BookCard'
import SearchBar from '@/components/ui/SearchBar'
import CategoryTabs from '@/components/ui/CategoryTabs'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Bookmark, X } from 'lucide-react'
import { useToast } from '@/store/toastStore'

const CATEGORIES = ['All', 'Spiritual Books', 'Kids Books', 'Coloring Books']

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [openBook, setOpenBook] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const { success, info, error: toastError } = useToast()

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/books')
        const data = await res.json()
        if (data.books) {
          setBooks(data.books)
        }
      } catch (err) {
        console.error('Failed to fetch books:', err)
        toastError('Failed to load books. Please refresh.')
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  const filtered = books.filter((b) => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      (b.author?.toLowerCase().includes(search.toLowerCase()) ?? false)
    return matchCat && matchSearch
  })

  const currentBook = books.find((b) => b.id === openBook)

  const handleOpenBook = (id: string) => {
    setOpenBook(id)
    setZoom(1)
  }

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5))

  const toggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      setBookmarks((bm) => bm.filter((b) => b !== id))
      info('Bookmark removed')
    } else {
      setBookmarks((bm) => [...bm, id])
      success('Page bookmarked! 🔖')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-gold px-4 pt-10 pb-14">
        <div className="mx-auto max-w-5xl">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-white mb-1">
            📚 Books &amp; PDFs
          </motion.h1>
          <p className="text-white/80 text-sm">Spiritual Books · Kids Books · Coloring Books</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 -mt-6 space-y-6 pb-10">
        {/* Search + Tabs */}
        <div className="glass-card rounded-2xl p-4 shadow-md border border-white/60">
          <SearchBar value={search} onChange={setSearch} placeholder="Search books…" />
          <div className="mt-3">
            <CategoryTabs tabs={CATEGORIES} active={activeCategory} onChange={setActiveCategory} />
          </div>
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
              {/* Toolbar */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentBook.coverEmoji || currentBook.coverImage}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{currentBook.title}</p>
                    <p className="text-xs text-gray-500">{currentBook.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {/* Zoom controls */}
                  <button
                    onClick={handleZoomOut}
                    className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-xs text-gray-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
                  <button
                    onClick={handleZoomIn}
                    className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={14} />
                  </button>

                  {/* Bookmark */}
                  <button
                    onClick={() => toggleBookmark(currentBook.id)}
                    className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      bookmarks.includes(currentBook.id)
                        ? 'border-saffron bg-saffron/10 text-saffron'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-label={bookmarks.includes(currentBook.id) ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    <Bookmark size={12} />
                    {bookmarks.includes(currentBook.id) ? 'Saved' : 'Bookmark'}
                  </button>

                  {/* Download */}
                  <a
                    href={currentBook.pdfUrl}
                    download
                    className="rounded-lg bg-saffron/10 px-3 py-1.5 text-xs font-medium text-saffron hover:bg-saffron/20 transition-colors"
                  >
                    Download
                  </a>

                  {/* Close */}
                  <button
                    onClick={() => setOpenBook(null)}
                    className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                    aria-label="Close PDF viewer"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Iframe PDF viewer */}
              <div className="relative overflow-auto bg-gray-100" style={{ height: '520px' }}>
                <div
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease',
                    width: '100%',
                    height: `${520 / zoom}px`,
                  }}
                >
                  <iframe
                    src={`${currentBook.pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                    title={`PDF: ${currentBook.title}`}
                    className="w-full h-full border-none"
                    aria-label={`PDF viewer for ${currentBook.title}`}
                  />
                </div>
              </div>

              {/* Navigation footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
                <button
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-white transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={14} /> Prev Page
                </button>
                <span className="text-xs text-gray-400">Use PDF toolbar to navigate</span>
                <button
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-white transition-colors"
                  aria-label="Next page"
                >
                  Next Page <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-saffron"></div>
            <p className="text-gray-400 animate-pulse">Fetching divine books...</p>
          </div>
        )}

        {/* Book grid */}
        {!loading && (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            <AnimatePresence>
              {filtered.length === 0 ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center text-gray-400 py-10">
                  No books found.
                </motion.p>
              ) : (
                filtered.map((b) => (
                  <motion.div key={b.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <BookCard {...b} coverEmoji={b.coverEmoji || b.coverImage} onClick={handleOpenBook} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
