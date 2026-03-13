import { create } from 'zustand'

// ── Types ────────────────────────────────────────
interface Track {
  id: string
  title: string
  artist: string
  category: string
  fileUrl: string
  duration?: number
  albumImage?: string
}

interface AudioState {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number        // 0–100 percentage
  volume: number          // 0–1
  playlist: Track[]

  // Actions
  setTrack: (track: Track) => void
  play: () => void
  pause: () => void
  togglePlay: () => void
  setProgress: (progress: number) => void
  setVolume: (volume: number) => void
  setPlaylist: (tracks: Track[]) => void
  playNext: () => void
  playPrev: () => void
}

// ── Store ─────────────────────────────────────────
export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  volume: 0.8,
  playlist: [],

  setTrack: (track) => set({ currentTrack: track, progress: 0, isPlaying: true }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setProgress: (progress) => set({ progress }),
  setVolume: (volume) => set({ volume }),
  setPlaylist: (tracks) => set({ playlist: tracks }),

  playNext: () => {
    const { currentTrack, playlist } = get()
    if (!currentTrack || playlist.length === 0) return
    const idx = playlist.findIndex((t) => t.id === currentTrack.id)
    const next = playlist[(idx + 1) % playlist.length]
    set({ currentTrack: next, progress: 0, isPlaying: true })
  },

  playPrev: () => {
    const { currentTrack, playlist } = get()
    if (!currentTrack || playlist.length === 0) return
    const idx = playlist.findIndex((t) => t.id === currentTrack.id)
    const prev = playlist[(idx - 1 + playlist.length) % playlist.length]
    set({ currentTrack: prev, progress: 0, isPlaying: true })
  },
}))
