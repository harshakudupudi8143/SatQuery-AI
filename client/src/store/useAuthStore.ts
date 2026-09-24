import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'student' | 'parent' | 'teacher'

interface User {
  id: string
  name: string
  role: Role
  xp?: number
  streak?: number
  level?: number
  dob?: string
  standard?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  login: (name: string, role: Role) => Promise<boolean>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: async (name, role) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, role })
          });
          
          if (response.ok) {
            const data = await response.json();
            set({ 
              user: data.user, 
              token: data.token,
              isAuthenticated: true 
            });
            return true;
          }
          console.error('API responded with:', response.status);
          return false;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (data) => set((state) => ({ 
        user: state.user ? { ...state.user, ...data } : null 
      })),
    }),
    {
      name: 'auth-storage-v2', // Changed name to bust corrupted cache
    }
  )
);
