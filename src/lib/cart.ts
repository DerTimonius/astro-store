import type { Product } from '@/pages/store.astro';
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';

export interface CartProduct {
  product: Product;
  quantity: number;
}

export type Cart = Array<CartProduct>;

export const cart = atom<Cart>([]);
