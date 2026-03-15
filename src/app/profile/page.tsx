'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Settings, Heart, Clock } from 'lucide-react'

interface Session {
  id: string
  mantraName: string
  count: number
  completedMalas: number
  createdAt: string
}

const MOCK_SESSIONS: Session[] = [
  { id: '1', mantraName: 'Om Namah Shivaya', count: 108, completedMalas: 1, createdAt: '2026-03-14T08:30:00Z' },
  { id: '2', mantraName: 'Gayatri Mantra', count: 54, completedMalas: 0, createdAt: '2026-03-13T07:15:00Z' },
  { id: '3', mantraName: 'Om Namah Shivaya', count: 216, completedMalas: 2, createdAt: '2026-03-12T06:00:00Z' },
]

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export default function ProfilePage() {
  const [sessions] = useState<Session[]>(MOCK_SESSIONS)

  const totalMalas = sessions.reduce((acc, s) => acc + s.completedMalas, 0)
  const totalBeads = sessions.reduce((acc, s) => acc + s.count, 0)

  return (
    <div className="min-h-screen gradient-calm pb-12">
      {/* Hero */}
      <div className="gradient-spiritual px-4 pt-12 pb-20 text-center text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-5xl mb-4 shadow-lg"
        >
          🙏
        </motion.div>
        <motion.h1 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-2xl font-bold mb-1">
          My Spiritual Journey
        </motion.h1>
        <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/70 text-sm">
          Track your progress and preferences
        </motion.p>
      </div>

      <div className="mx-auto max-w-2xl px-4 -mt-10 space-y-5">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: 'Total Malas', value: totalMalas, emoji: '📿' },
            { label: 'Total Beads', value: totalBeads, emoji: '🔢' },
            { label: 'Sessions', value: sessions.length, emoji: '📅' },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-4 text-center border border-white/60 shadow">
              <p className="text-xl mb-1">{s.emoji}</p>
              <p className="text-2xl font-bold text-deep-blue">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Jap Mala History */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl border border-white/60 p-5 shadow"
        >
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={16} className="text-saffron" /> Jap Mala History
          </h2>
          {sessions.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-4">No sessions yet. Start your first Jap Mala!</p>
          ) : (
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-xl bg-saffron/5 px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{s.mantraName}</p>
                    <p className="text-xs text-gray-400">{formatDate(s.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-saffron">{s.count} beads</p>
                    <p className="text-xs text-gray-500">{s.completedMalas} mala{s.completedMalas !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Favourite Audio */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-2xl border border-white/60 p-5 shadow"
        >
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Heart size={16} className="text-rose-400" /> Favourite Audio
          </h2>
          <p className="text-sm text-gray-400">Save tracks from the Audio Library to see them here.</p>
        </motion.section>

        {/* Settings */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl border border-white/60 p-5 shadow"
        >
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Settings size={16} className="text-gray-500" /> Preferences
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Language</span>
              <select className="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-700 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron/20">
                <option>English</option>
                <option>हिंदी (Hindi)</option>
                <option>मराठी (Marathi)</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Theme</span>
              <select className="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-700 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron/20">
                <option>Light</option>
                <option>Dark (coming soon)</option>
              </select>
            </div>
          </div>
        </motion.section>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          whileTap={{ scale: 0.97 }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3 text-sm font-medium text-red-500 hover:bg-red-100 transition-all shadow"
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>
      </div>
    </div>
  )
}
