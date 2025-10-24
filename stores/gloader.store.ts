import { create } from 'zustand';

interface IGloaderState {
    isLoading: boolean,
    message: string,
    
    showLoader: (message: string) => void
    hideLoader: () => void
}

export const useGloader = create<IGloaderState>(set => ({
    isLoading: false,
    message: '',
    
    showLoader: (message = 'Загрузка') => set({ message, isLoading: true }),
    hideLoader: () => set({ isLoading: false }),
}));
