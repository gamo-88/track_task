import { create } from 'zustand'

export const userStore = create((set) => ({
  USER: null,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateUser: (newUser) => set({ USER: newUser }),
}))