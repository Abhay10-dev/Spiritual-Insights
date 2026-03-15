import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white/60 backdrop-blur-sm mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🕉️</span>
            <span className="font-bold text-gradient-spiritual text-lg">Spiritual Insights</span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-gray-500 text-center">
            Your daily spiritual companion — mantras, stories, meditation, and more.
          </p>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
            <Link href="/jap-mala" className="hover:text-saffron transition-colors">Jap Mala</Link>
            <Link href="/ai-guide" className="hover:text-saffron transition-colors">AI Guide</Link>
            <Link href="/kids" className="hover:text-saffron transition-colors">Kids Zone</Link>
            <Link href="/audio" className="hover:text-saffron transition-colors">Audio</Link>
            <Link href="/books" className="hover:text-saffron transition-colors">Books</Link>
          </nav>

          {/* Divider */}
          <div className="w-full border-t border-gray-100 pt-4">
            <p className="text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Spiritual Insights. Made with 🙏 and ❤️. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
