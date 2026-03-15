'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface VideoCardProps {
  id: string
  title: string
  category: string
  duration?: string
  thumbnailEmoji?: string
  onClick?: (id: string) => void
}

export default function VideoCard({ id, title, category, duration, thumbnailEmoji = '🎬', onClick }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
      onClick={() => onClick?.(id)}
    >
      {/* Thumbnail */}
      <div className="relative flex h-40 items-center justify-center gradient-spiritual">
        <span className="text-5xl opacity-70 transition-transform duration-300 group-hover:scale-110">{thumbnailEmoji}</span>
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg"
          >
            <Play size={20} className="ml-1 text-deep-blue" />
          </motion.div>
        </div>
        {duration && (
          <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white font-medium">
            {duration}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="bg-white p-3">
        <p className="font-semibold text-gray-800 text-sm truncate leading-snug">{title}</p>
        <span className="mt-1 inline-block rounded-full bg-deep-blue/8 px-2 py-0.5 text-xs text-deep-blue font-medium">{category}</span>
      </div>
    </motion.div>
  )
}
