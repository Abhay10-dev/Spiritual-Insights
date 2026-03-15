'use client'

import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

interface BookCardProps {
  id: string
  title: string
  category: string
  coverEmoji?: string
  author?: string
  onClick?: (id: string) => void
}

export default function BookCard({ id, title, category, coverEmoji = '📖', author, onClick }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
      onClick={() => onClick?.(id)}
    >
      {/* Book cover */}
      <div className="relative flex h-44 items-center justify-center gradient-gold">
        <span className="text-6xl transition-transform duration-300 group-hover:scale-110">{coverEmoji}</span>
      </div>

      {/* Info */}
      <div className="bg-white p-4">
        <p className="font-semibold text-gray-800 text-sm leading-snug truncate">{title}</p>
        {author && <p className="text-xs text-gray-400 mt-0.5 truncate">{author}</p>}
        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs text-yellow-700 font-medium">{category}</span>
          <button className="flex items-center gap-1 text-xs font-medium text-saffron hover:text-saffron-600 transition-colors">
            <BookOpen size={12} />
            Read
          </button>
        </div>
      </div>
    </motion.div>
  )
}
