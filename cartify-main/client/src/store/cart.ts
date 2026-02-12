import { create } from 'zustand';
import api from '../api/axios';

type Product = { id: string; title: string; description: string; price: number; category: string; imageUrl?: string };
type CartItem = { itemId: string; quantity: number; product: Product };

type CartState = {
  items: CartItem[];
  total: number;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (itemId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearLocal: () => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  total: 0,
  loading: false,
  async fetchCart() {
    set({ loading: true });
    try {
      const { data } = await api.get('/cart');
      set({ items: data.items, total: data.total });
    } finally {
      set({ loading: false });
    }
  },
  async addToCart(itemId, quantity = 1) {
    await api.post('/cart/add', { itemId, quantity });
    await useCart.getState().fetchCart();
  },
  async updateQuantity(itemId, quantity) {
    await api.post('/cart/update', { itemId, quantity });
    await useCart.getState().fetchCart();
  },
  async removeFromCart(itemId) {
    await api.post('/cart/remove', { itemId });
    await useCart.getState().fetchCart();
  },
  clearLocal() {
    set({ items: [], total: 0 });
  }
}));