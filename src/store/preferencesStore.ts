import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ── Types ────────────────────────────────────────
type Language = 'en' | 'hi' | 'mr'

interface PreferencesState {
  language: Language
  favouriteAudioIds: string[]
  favouriteVideoIds: string[]

  // Actions
  setLanguage: (lang: Language) => void
  addFavouriteAudio: (id: string) => void
  removeFavouriteAudio: (id: string) => void
  addFavouriteVideo: (id: string) => void
  removeFavouriteVideo: (id: string) => void
  isFavouriteAudio: (id: string) => boolean
  isFavouriteVideo: (id: string) => boolean
}

// ── Store ─────────────────────────────────────────
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      language: 'en',
      favouriteAudioIds: [],
      favouriteVideoIds: [],

      setLanguage: (lang) => set({ language: lang }),

      addFavouriteAudio: (id) =>
        set((state) => ({
          favouriteAudioIds: [...new Set([...state.favouriteAudioIds, id])],
        })),

      removeFavouriteAudio: (id) =>
        set((state) => ({
          favouriteAudioIds: state.favouriteAudioIds.filter((fid) => fid !== id),
        })),

      addFavouriteVideo: (id) =>
        set((state) => ({
          favouriteVideoIds: [...new Set([...state.favouriteVideoIds, id])],
        })),

      removeFavouriteVideo: (id) =>
        set((state) => ({
          favouriteVideoIds: state.favouriteVideoIds.filter((fid) => fid !== id),
        })),

      isFavouriteAudio: (id) => get().favouriteAudioIds.includes(id),
      isFavouriteVideo: (id) => get().favouriteVideoIds.includes(id),
    }),
    {
      name: 'preferences-store',
    }
  )
)
