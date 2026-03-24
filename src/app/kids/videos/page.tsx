'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Play } from 'lucide-react'

const VIDEOS = [
  { id: '1', title: 'The Story of Diwali', desc: 'Learn why we celebrate the festival of lights!', emoji: '🪔', color: 'bg-rose-100', videoUrl: 'https://www.youtube.com/embed/tdndYtihdW4?si=EdSIqYMqPirQDdqH' },
  { id: '2', title: 'Prahlad and Holika', desc: 'The brave little devotee of Vishnu.', emoji: '🔥', color: 'bg-orange-100', videoUrl: 'https://www.youtube.com/embed/U6eylMFG-s8?si=LQRNFyEBAWVmMcxo' },
  { id: '3', title: 'Krishna defeats Kaliya', desc: 'Krishna dances on the multi-headed serpent.', emoji: '🐍', color: 'bg-emerald-100', videoUrl: 'https://www.youtube.com/embed/oYh_FeZ67pM?si=iC1RP6y2eD3uSLZB' },
  { id: '4', title: 'Ganesha Stories', desc: 'Stories of Lord Ganesha.', emoji: '🐘', color: 'bg-yellow-100', videoUrl: 'https://www.youtube.com/embed/8Dlnw2FuqA4?si=ik9a-GjA5xVRNFZr' },
]

export default function KidsVideosPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch('/api/video-library')
        const data = await res.json()
        const allVideos = data.videos || []
        // Filter for Kids Stories
        setVideos(allVideos.filter((v: any) => v.category === 'Kids Stories'))
      } catch (err) {
        console.error('Error loading kids videos:', err)
      } finally {
        setLoading(false)
      }
    }
    loadVideos()
  }, [])

  const currentVideo = videos.find(v => (v._id || v.id) === activeVideo)

  return (
    <div className="min-h-screen bg-rose-50 pb-16">
      <div className="bg-white border-b border-rose-100 px-4 py-4 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link href="/kids" className="flex items-center text-rose-600 hover:text-rose-800 font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Kids Zone
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎬 Animated Videos</h1>
        <p className="text-gray-500 mb-8">Fun, colorful, and educational videos for kids.</p>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-rose-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        ) : videos.length === 0 ? (
          <p className="text-gray-500 text-center py-10">More videos coming soon!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video._id || video.id}
                onClick={() => setActiveVideo(video._id || video.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-rose-100 transition-all cursor-pointer group"
              >
                <div className={`aspect-video bg-rose-100 relative flex items-center justify-center`}>
                  <span className="text-6xl">{video.thumbnailUrl || '🎬'}</span>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-rose-500 shadow-md">
                      <Play size={28} className="ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.description || video.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeVideo && currentVideo && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl overflow-hidden w-full max-w-3xl shadow-xl">
              <div className="relative w-full aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`${currentVideo.videoUrl}${currentVideo.videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
                  title={currentVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{currentVideo.title}</h3>
                  <p className="text-sm text-gray-500">{currentVideo.description || currentVideo.desc}</p>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
