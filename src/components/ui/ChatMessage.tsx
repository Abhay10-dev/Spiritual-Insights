interface ChatMessageProps {
  role: 'user' | 'ai'
  content: string
  timestamp?: string
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-2 items-end`}>
      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full gradient-spiritual text-white text-sm shadow">
          🕉️
        </div>
      )}

      <div
        className={`group relative max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-shadow hover:shadow-md ${
          isUser
            ? 'gradient-spiritual text-white rounded-br-sm'
            : 'glass-card text-gray-800 rounded-bl-sm border border-white/60'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        {timestamp && (
          <span className={`mt-1 block text-right text-[10px] ${isUser ? 'text-white/70' : 'text-gray-400'}`}>
            {timestamp}
          </span>
        )}
      </div>

      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm shadow">
          🙋
        </div>
      )}
    </div>
  )
}
