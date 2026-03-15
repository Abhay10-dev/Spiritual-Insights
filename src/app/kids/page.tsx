'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const deityCards = [
  { deity: 'Krishna', emoji: '🦚', color: 'from-blue-400 to-indigo-500', href: '/kids/stories?deity=krishna' },
  { deity: 'Rama', emoji: '🏹', color: 'from-emerald-400 to-teal-500', href: '/kids/stories?deity=rama' },
  { deity: 'Hanuman', emoji: '🐒', color: 'from-orange-400 to-red-500', href: '/kids/stories?deity=hanuman' },
  { deity: 'Ganesha', emoji: '🐘', color: 'from-yellow-400 to-orange-500', href: '/kids/stories?deity=ganesha' },
]

const sections = [
  { emoji: '📖', label: 'Divine Stories', desc: 'Illustrated mythological stories', href: '/kids/stories', bg: 'bg-violet-50 border-violet-200' },
  { emoji: '🎙️', label: 'Audio Stories', desc: 'Narrated tales to listen along', href: '/kids/audio', bg: 'bg-blue-50 border-blue-200' },
  { emoji: '🎬', label: 'Animated Videos', desc: 'Fun mythological animations', href: '/kids/videos', bg: 'bg-rose-50 border-rose-200' },
  { emoji: '🖍️', label: 'Coloring Pages', desc: 'Downloadable colouring PDFs', href: '/kids/coloring', bg: 'bg-green-50 border-green-200' },
]

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export default function KidsPage() {
  return (
    <div className="min-h-screen">
      {/* Colorful hero */}
      <section className="relative overflow-hidden py-16 px-4 text-center bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }} className="text-7xl mb-4">🌈</motion.div>
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-4xl font-bold text-white mb-2">
          Kids Zone
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/80 text-lg">
          Safe · Fun · Ad-Free · For Little Devotees
        </motion.p>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 space-y-10">
        {/* Divine Story Characters */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-5">✨ Choose Your Favourite Story</h2>
          <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {deityCards.map((d) => (
              <motion.div key={d.deity} variants={item} whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href={d.href} className={`flex flex-col items-center justify-center gap-3 rounded-3xl bg-gradient-to-br ${d.color} p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <span className="text-5xl">{d.emoji}</span>
                  <span className="font-bold text-lg">{d.deity}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Sections */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-5">🎉 Explore More</h2>
          <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map((s) => (
              <motion.div key={s.label} variants={item} whileHover={{ y: -3 }}>
                <Link href={s.href} className={`flex items-center gap-4 rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 ${s.bg}`}>
                  <span className="text-4xl">{s.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-800">{s.label}</p>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Safe badge */}
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-5 py-2 text-sm text-green-700 font-medium">
            🛡️ 100% Safe · No Ads · No Login Required
          </div>
        </div>
      </div>
    </div>
  )
}
