import { create } from 'zustand';

interface IUser {
    ID: string;
    LOGIN: string;
    EMAIL: string;
    PERSONAL_PHONE: string;
    WORK_COMPANY: string;
    NAME: string;
    LAST_NAME: string;
    SECOND_NAME: string;
    DATE_REGISTER: string;
    UF_UNP: string;
    UF_DEBT: string;
}

interface IUserStore {
    user: IUser | null;
    isAuthenticated: boolean;
    login: (user: IUser) => void;
    logout: () => void;
}

export const useUser = create<IUserStore>(set => ({
    user: null,
    isAuthenticated: false,

    login: user => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
}));
