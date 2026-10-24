
import {create} from "zustand"
interface InteractiveState {
    isInteractive: boolean
    setIsInteractive: (value: boolean) => void
}

export const useInteractiveStore = create<InteractiveState>()(set => ({
    isInteractive: true,
    setIsInteractive: (value) => set({ isInteractive: value})
}))