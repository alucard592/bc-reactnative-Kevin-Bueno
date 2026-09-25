import { create } from 'zustand';

interface SavedState {
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  clear: () => void;
}

export const useSavedStore = create<SavedState>((set, get) => ({
  savedIds: [],
  toggleSaved: (id) =>
    set((state) => ({
      savedIds: state.savedIds.includes(id)
        ? state.savedIds.filter((i) => i !== id)
        : [...state.savedIds, id],
    })),
  isSaved: (id) => get().savedIds.includes(id),
  clear: () => set({ savedIds: [] }),
}));