import { create } from 'zustand';

interface SearchState {
    query: string,
    isSearching: boolean,
    setQuery: (payload: string) => void
    reset: () => void
}

export const useSearch = create<SearchState>(set => ({
    query: '',
    isSearching: false,
    
    setQuery: (payload) => {
        const isSearching = payload.length > 0;
        set({ isSearching, query: payload });
    },
    
    reset: () => set({ isSearching: false, query: '' }),
}));
