import { create } from 'zustand';
import api from '../api/axios';

type Product = { 
  id: string; 
  title: string; 
  description: string; 
  price: number; 
  category: string; 
  imageUrl?: string;
};

type CartItem = { 
  itemId: string; 
  quantity: number; 
  product: Product;
};

type CartState = {
  items: CartItem[];
  total: number;
  loading: boolean;

  fetchCart: () => Promise<void>;
  addToCart: (itemId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  loading: false,

  async fetchCart() {
    set({ loading: true });
    try {
      const { data } = await api.get('/cart');
      set({
        items: data.items || [],
        total: data.total || 0,
      });
    } catch (error) {
      console.error('Store: fetchCart failed', error);
    } finally {
      set({ loading: false });
    }
  },

  async addToCart(itemId, quantity = 1) {
    try {
      await api.post('/cart/add', { itemId, quantity });
      await get().fetchCart();
    } catch (error) {
      console.error('Store: addToCart failed', error);
    }
  },

  async updateQuantity(itemId, quantity) {
    try {
      await api.post('/cart/update', { itemId, quantity });
      await get().fetchCart();
    } catch (error) {
      console.error('Store: updateQuantity failed', error);
    }
  },

  async removeFromCart(itemId) {
    try {
      await api.post('/cart/remove', { itemId });
      await get().fetchCart();
    } catch (error) {
      console.error('Store: removeFromCart failed', error);
    }
  },

  async clearCart() {
    try {
      await api.post('/cart/clear');
      set({ items: [], total: 0 });
    } catch (error) {
      console.error('Store: clearCart failed', error);
    }
  },
}));
