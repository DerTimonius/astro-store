import { atom } from 'nanostores';

const response = await fetch('https://fakestoreapi.com/products');
const products = await response.json();
export const productsStore = atom(products);
const catResponse = await fetch('https://fakestoreapi.com/products/categories');
const categories = await catResponse.json();
export const categoriesStore = atom(categories);
