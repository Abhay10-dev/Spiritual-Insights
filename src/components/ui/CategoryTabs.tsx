'use client'

import { motion } from 'framer-motion'

interface CategoryTabsProps {
  tabs: string[]
  active: string
  onChange: (tab: string) => void
}

export default function CategoryTabs({ tabs, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
            active === tab ? 'text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {active === tab && (
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 rounded-full gradient-spiritual"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative">{tab}</span>
        </button>
      ))}
    </div>
  )
}
