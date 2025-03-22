import { create } from 'zustand';
import { AuthState, User } from '../../types/auth';

interface AuthStore extends AuthState {
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: (user) => set({ user, isAuthenticated: true }),
    // logout: () => set({ user: null, isAuthenticated: false }),
    logout: () => {
        set({ user: null, isAuthenticated: false });
        window.location.href = '/'; // Redirect to the root of the website
    },
}));