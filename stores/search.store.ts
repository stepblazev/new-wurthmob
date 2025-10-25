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
    
    setQuery: (payload) =>  set({ isSearching: true, query: payload }),
    reset: () => set({ isSearching: false, query: '' }),
}));
