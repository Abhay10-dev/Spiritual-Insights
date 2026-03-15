'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react'
import AudioCard from '@/components/ui/AudioCard'
import SearchBar from '@/components/ui/SearchBar'
import CategoryTabs from '@/components/ui/CategoryTabs'
import { useAudioStore } from '@/store/audioStore'

const CATEGORIES = ['All', 'Bhajans', 'Mantras', 'Aarti', 'Meditation']

interface TrackItem {
  id: string
  title: string
  artist: string
  category: string
  duration: string
  coverEmoji: string
}

const TRACKS: TrackItem[] = [
  { id: '1', title: 'Om Namah Shivaya', artist: 'Pandit Ravi Shankar', category: 'Mantras', duration: '8:24', coverEmoji: '🕉️' },
  { id: '2', title: 'Jai Ganesh Jai Ganesh', artist: 'Anuradha Paudwal', category: 'Bhajans', duration: '5:12', coverEmoji: '🐘' },
  { id: '3', title: 'Hanuman Chalisa', artist: 'Hariharan', category: 'Bhajans', duration: '11:03', coverEmoji: '🐒' },
  { id: '4', title: 'Sukhkarta Dukhharta', artist: 'Lata Mangeshkar', category: 'Aarti', duration: '4:35', coverEmoji: '🪔' },
  { id: '5', title: 'Morning Meditation', artist: 'Sri M', category: 'Meditation', duration: '20:00', coverEmoji: '🧘' },
  { id: '6', title: 'Gayatri Mantra', artist: 'Vikram Hazra', category: 'Mantras', duration: '6:47', coverEmoji: '☀️' },
  { id: '7', title: 'Raghupati Raghav Raja Ram', artist: 'Classical Ensemble', category: 'Bhajans', duration: '7:15', coverEmoji: '🏹' },
  { id: '8', title: 'Shri Krishna Aarti', artist: 'Deva Premal', category: 'Aarti', duration: '5:00', coverEmoji: '🦚' },
  { id: '9', title: 'Deep Sleep Meditation', artist: 'Ananda More', category: 'Meditation', duration: '30:00', coverEmoji: '🌙' },
  { id: '10', title: 'Mahamrityunjaya Mantra', artist: 'Shankar Sahney', category: 'Mantras', duration: '9:18', coverEmoji: '🌺' },
]

export default function AudioPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const { currentTrack, isPlaying, setTrack, togglePlay } = useAudioStore()

  const filtered = TRACKS.filter((t) => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.artist.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handlePlay = (id: string) => {
    const track = TRACKS.find((t) => t.id === id)
    if (!track) return
    if (currentTrack?.id === id) {
      togglePlay()
    } else {
      setTrack({ id: track.id, title: track.title, artist: track.artist, category: track.category, fileUrl: '', albumImage: track.coverEmoji })
    }
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="gradient-spiritual px-4 pt-10 pb-14">
        <div className="mx-auto max-w-4xl">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-white mb-1">🎵 Audio Library</motion.h1>
          <p className="text-white/70 text-sm">Bhajans, Mantras, Aarti &amp; Meditation</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 -mt-6 space-y-5">
        {/* Search */}
        <div className="glass-card rounded-2xl p-4 shadow-md border border-white/60">
          <SearchBar value={search} onChange={setSearch} placeholder="Search tracks or artists…" />
          <div className="mt-3">
            <CategoryTabs tabs={CATEGORIES} active={activeCategory} onChange={setActiveCategory} />
          </div>
        </div>

        {/* Track list */}
        <motion.div layout className="space-y-3">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 py-10">
                No tracks found. Try a different search.
              </motion.p>
            ) : (
              filtered.map((track) => (
                <motion.div key={track.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AudioCard
                    id={track.id}
                    title={track.title}
                    artist={track.artist}
                    category={track.category}
                    duration={track.duration}
                    coverEmoji={track.coverEmoji}
                    isPlaying={currentTrack?.id === track.id && isPlaying}
                    onPlay={handlePlay}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Sticky Audio Player */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-white/40 px-4 py-3 shadow-2xl"
          >
            <div className="mx-auto max-w-4xl flex items-center gap-4">
              {/* Cover */}
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-saffron/10 text-2xl">
                {currentTrack.albumImage ?? '🎵'}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">{currentTrack.title}</p>
                <p className="text-xs text-gray-500 truncate">{currentTrack.artist}</p>
              </div>
              {/* Controls */}
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-saffron transition-colors" aria-label="Previous"><SkipBack size={18} /></button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => togglePlay()}
                  className="flex h-10 w-10 items-center justify-center rounded-full gradient-spiritual text-white shadow"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </motion.button>
                <button className="text-gray-400 hover:text-saffron transition-colors" aria-label="Next"><SkipForward size={18} /></button>
                <Volume2 size={16} className="text-gray-400 hidden sm:block" />
              </div>
            </div>
            {/* Progress bar */}
            <div className="mx-auto max-w-4xl mt-2">
              <div className="h-1 w-full rounded-full bg-gray-200">
                <div className="h-full gradient-gold rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
