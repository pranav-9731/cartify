import { create } from 'zustand';
import api from '../api/axios';

type User = { id: string; email: string; name: string };

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
};

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('cartify_token'),
  loading: false,
  async login(email, password) {
    set({ loading: true });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('cartify_token', data.token);
      set({ token: data.token, user: data.user });
    } finally {
      set({ loading: false });
    }
  },
  async signup(name, email, password) {
    set({ loading: true });
    try {
      const { data } = await api.post('/auth/signup', { name, email, password });
      localStorage.setItem('cartify_token', data.token);
      set({ token: data.token, user: data.user });
    } finally {
      set({ loading: false });
    }
  },
  logout() {
    localStorage.removeItem('cartify_token');
    set({ token: null, user: null });
  },
  async fetchMe() {
    if (!get().token) return;
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data.user });
    } catch {
      localStorage.removeItem('cartify_token');
      set({ token: null, user: null });
    }
  }
}));