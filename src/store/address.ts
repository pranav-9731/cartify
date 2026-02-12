import { create } from 'zustand';

export type Address = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type AddressState = {
  address: Address | null;
  save: (addr: Address) => void;
  clear: () => void;
};

export const useAddress = create<AddressState>((set) => ({
  address: (() => {
    const raw = localStorage.getItem('cartify_address');
    return raw ? JSON.parse(raw) as Address : null;
  })(),
  save(addr) {
    localStorage.setItem('cartify_address', JSON.stringify(addr));
    set({ address: addr });
  },
  clear() {
    localStorage.removeItem('cartify_address');
    set({ address: null });
  }
}));



