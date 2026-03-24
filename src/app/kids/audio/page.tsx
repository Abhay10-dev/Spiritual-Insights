'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, PlayCircle, PauseCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function KidsAudioStoriesPage() {
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeStory, setActiveStory] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    async function loadAudio() {
      try {
        const res = await fetch('/api/audio-library')
        const data = await res.json()
        const allAudio = data.tracks || []
        // Filter for Kids Audio
        setStories(allAudio.filter((a: any) => a.category === 'Kids Audio'))
      } catch (err) {
        console.error('Error loading kids audio:', err)
      } finally {
        setLoading(false)
      }
    }
    loadAudio()
  }, [])

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }
    const audio = audioRef.current

    const onEnded = () => {
      setIsPlaying(false)
      setActiveStory(null)
    }

    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = (story: any) => {
    const audio = audioRef.current
    if (!audio) return

    const storyId = story._id || story.id

    if (activeStory === storyId) {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play().catch(() => {})
        setIsPlaying(true)
      }
    } else {
      setActiveStory(storyId)
      audio.src = story.fileUrl
      audio.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 pb-16">
      <div className="bg-white border-b border-blue-100 px-4 py-4 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link href="/kids" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Kids Zone
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎙️ Audio Stories</h1>
        <p className="text-gray-500 mb-8">Close your eyes and listen to beautiful mythological tales.</p>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        ) : stories.length === 0 ? (
          <p className="text-gray-500 text-center py-10">More audio stories coming soon!</p>
        ) : (
          <div className="space-y-4">
            {stories.map((story, i) => {
              const storyId = story._id || story.id
              const isActive = activeStory === storyId

              return (
              <motion.div
                key={storyId}
                onClick={() => togglePlay(story)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className={`flex items-center gap-4 rounded-full border p-3 pr-6 shadow-sm transition-all cursor-pointer bg-white border-blue-200 text-blue-800 ${isActive ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
              >
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-3xl shadow-sm">
                  {story.albumImage || '🎙️'}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{story.title}</h3>
                  <p className="text-sm opacity-80 text-gray-500">{Math.floor(story.duration / 60)}:{(story.duration % 60).toString().padStart(2, '0')} • Listen Now</p>
                </div>
                <button className="h-10 w-10 text-blue-500 flex-shrink-0 transition-transform flex items-center justify-center">
                  {isActive && isPlaying ? (
                    <PauseCircle size={40} className="fill-blue-100" />
                  ) : (
                    <PlayCircle size={40} className="fill-blue-100" />
                  )}
                </button>
              </motion.div>
            )})}
          </div>
        )}
      </div>
    </div>
  )
}
