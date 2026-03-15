export default function LoadingSpinner({ size = 'md', fullScreen = false }: { size?: 'sm' | 'md' | 'lg'; fullScreen?: boolean }) {
  const sizeMap = { sm: 'h-5 w-5 border-2', md: 'h-10 w-10 border-2', lg: 'h-16 w-16 border-3' }

  const spinner = (
    <div className={`animate-spin rounded-full border-saffron border-t-transparent ${sizeMap[size]}`} />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm gap-4">
        {spinner}
        <p className="text-sm text-gray-500 animate-pulse">Loading…</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex gap-4 items-center">
        <div className="h-14 w-14 rounded-xl bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}
