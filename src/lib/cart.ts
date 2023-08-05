import type { Product } from '@/pages/store.astro';
import { atom } from 'nanostores';

export interface CartProduct {
  product: Product;
  quantity: number;
}

export type Cart = Array<CartProduct>;

const storedCart = localStorage.getItem('cart');

export const cart = atom<Cart>(storedCart ? JSON.parse(storedCart) : []);

export function saveToStorage(cart: Cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
