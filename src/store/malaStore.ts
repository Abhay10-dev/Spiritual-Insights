import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ── Types ────────────────────────────────────────
interface MalaState {
  // Current session
  count: number
  completedMalas: number
  isRunning: boolean
  selectedMantra: string

  // Lifetime stats
  totalLifetimeCount: number

  // Actions
  increment: () => void
  reset: () => void
  pause: () => void
  resume: () => void
  setMantra: (mantra: string) => void
  addToLifetime: (count: number) => void
}

// ── Store ─────────────────────────────────────────
export const useMalaStore = create<MalaState>()(
  persist(
    (set, get) => ({
      count: 0,
      completedMalas: 0,
      isRunning: false,
      selectedMantra: 'Om Namah Shivaya',
      totalLifetimeCount: 0,

      increment: () => {
        const { count, completedMalas, totalLifetimeCount } = get()
        const newCount = count + 1
        const newCompleted = newCount >= 108 ? completedMalas + 1 : completedMalas
        set({
          count: newCount >= 108 ? 0 : newCount,
          completedMalas: newCompleted,
          totalLifetimeCount: totalLifetimeCount + 1,
          isRunning: true,
        })
      },

      reset: () =>
        set({
          count: 0,
          completedMalas: 0,
          isRunning: false,
        }),

      pause: () => set({ isRunning: false }),
      resume: () => set({ isRunning: true }),

      setMantra: (mantra: string) => set({ selectedMantra: mantra }),

      addToLifetime: (count: number) =>
        set((state) => ({ totalLifetimeCount: state.totalLifetimeCount + count })),
    }),
    {
      name: 'mala-store',
    }
  )
)
