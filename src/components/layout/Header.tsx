'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, Sparkles } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', emoji: '🏠' },
  { href: '/jap-mala', label: 'Jap Mala', emoji: '📿' },
  { href: '/ai-guide', label: 'AI Guide', emoji: '🤖' },
  { href: '/kids', label: 'Kids Zone', emoji: '🎨' },
  { href: '/audio', label: 'Audio', emoji: '🎵' },
  { href: '/videos', label: 'Videos', emoji: '📹' },
  { href: '/books', label: 'Books', emoji: '📚' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-white/30 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">🕉️</span>
          <span className="font-bold text-lg text-gradient-spiritual hidden sm:block">Spiritual Insights</span>
          <span className="font-bold text-lg text-gradient-spiritual sm:hidden">Spiritual</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-saffron bg-saffron/10'
                    : 'text-gray-600 hover:text-saffron hover:bg-saffron/5'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-saffron/10 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-saffron hover:bg-saffron/5 transition-all duration-200"
          >
            <User size={16} />
            <span className="hidden md:block">Profile</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-saffron/10 hover:text-saffron transition-all duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-white/30 bg-white/90 backdrop-blur-md"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-saffron/10 text-saffron'
                          : 'text-gray-700 hover:bg-saffron/5 hover:text-saffron'
                      }`}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: navItems.length * 0.05 }}>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-saffron/5 hover:text-saffron transition-all duration-200"
                >
                  <User size={20} />
                  Profile
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
