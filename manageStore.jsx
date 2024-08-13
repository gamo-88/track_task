import { create } from 'zustand'
import { persist, createJSONStorage  } from 'zustand/middleware'

export const userStore = create(
  persist(
    (set) => ({
      USER: null,
      updateUser: (newUser) => set({ USER: newUser }),
    }),
    {
      name: 'userSession', 
      storage: createJSONStorage(() => sessionStorage), 
    },
  )
)