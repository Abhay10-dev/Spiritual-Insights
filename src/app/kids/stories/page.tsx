'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'


function StoriesContent() {
  const searchParams = useSearchParams()
  const deityParam = searchParams.get('deity')
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStories() {
      try {
        const res = await fetch('/api/books')
        const data = await res.json()
        const allBooks = data.books || []
        // Filter for Kids Books
        let filtered = allBooks.filter((b: any) => b.category === 'Kids Books')
        
        // Filter by deity if param exists
        if (deityParam) {
          filtered = filtered.filter((s: any) => s.deity?.toLowerCase() === deityParam.toLowerCase())
        }
        setStories(filtered)
      } catch (err) {
        console.error('Error loading kids stories:', err)
      } finally {
        setLoading(false)
      }
    }
    loadStories()
  }, [deityParam])

  const deityName = deityParam ? deityParam.charAt(0).toUpperCase() + deityParam.slice(1) : 'Divine'

  return (
    <div className="min-h-screen bg-violet-50 pb-16">
      <div className="bg-white border-b border-violet-100 px-4 py-4 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link href="/kids" className="flex items-center text-violet-600 hover:text-violet-800 font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Kids Zone
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">✨ {deityName} Stories</h1>
        <p className="text-gray-500 mb-8">Tap on a story card to start reading!</p>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-violet-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        ) : stories.length === 0 ? (
          <p className="text-gray-500 text-center py-10">More stories coming soon!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {stories.map((story, i) => (
              <motion.a
                href={story.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={story._id || story.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-violet-100 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer block"
              >
                <div className="text-4xl mb-3">{story.coverImage || '📖'}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
                <p className="text-gray-600 text-sm">{story.description || story.desc}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-violet-600 text-sm font-bold">Read Story →</span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function KidsStoriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-violet-50 flex items-center justify-center">Loading...</div>}>
      <StoriesContent />
    </Suspense>
  )
}
