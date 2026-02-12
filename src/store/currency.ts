import { create } from 'zustand';

type CurrencyCode = 'USD' | 'EUR' | 'INR' | 'GBP' | 'JPY' | 'CNY';

const defaultRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  INR: 83,
  GBP: 0.78,
  JPY: 155,
  CNY: 7.1
};

type CurrencyState = {
  currency: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  setCurrency: (c: CurrencyCode) => void;
  convert: (usd: number) => number;
  format: (usd: number) => string;
};

const symbols: Record<CurrencyCode, string> = {
  USD: '$', EUR: '€', INR: '₹', GBP: '£', JPY: '¥', CNY: '¥'
};

export const useCurrency = create<CurrencyState>((set, get) => ({
  currency: (localStorage.getItem('cartify_currency') as CurrencyCode) || 'USD',
  rates: defaultRates,
  setCurrency: (c) => { localStorage.setItem('cartify_currency', c); set({ currency: c }); },
  convert: (usd) => {
    const { currency, rates } = get();
    return usd * (rates[currency] || 1);
  },
  format: (usd) => {
    const { currency } = get();
    const value = get().convert(usd);
    return `${symbols[currency]}${value.toFixed(2)}`;
  }
}));



