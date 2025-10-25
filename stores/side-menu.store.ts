import { create } from 'zustand';

interface ISideMenuState {
    isActive: boolean,
    
    showMenu: () => void
    hideMenu: () => void
}

export const useSideMenu = create<ISideMenuState>(set => ({
    isActive: false,
    
    showMenu: () => set({ isActive: true }),
    hideMenu: () => set({ isActive: false }),
}));
