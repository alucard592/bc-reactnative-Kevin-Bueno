import { create } from 'zustand';

export interface AuthUser {
  username: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Credenciales mock aceptadas
const MOCK_USERS: { username: string; password: string; email: string }[] = [
  { username: 'admin', password: '123456', email: 'admin@bancosangre.com' },
  { username: 'enfermero', password: '123456', email: 'enfermero@bancosangre.com' },
];

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: async (username: string, password: string) => {
    // Simula latencia de red
    await new Promise((resolve) => setTimeout(resolve, 600));

    const match = MOCK_USERS.find(
      (u) => u.username === username.trim() && u.password === password
    );

    if (match) {
      set({
        isAuthenticated: true,
        user: { username: match.username, email: match.email },
      });
      return { success: true };
    }

    return { success: false, error: 'Usuario o contraseña incorrectos' };
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
