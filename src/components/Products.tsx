import { productsStore } from '@/lib/store';
import { useStore } from '@nanostores/react';

import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard.tsx';

interface Rating {
  rate: number;
  count: number;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export default function Products() {
  const products: Product[] = useStore(productsStore);

  return (
    <>
      <h1 className="text-5xl text-gradient">The Store</h1>
      <FilterSidebar />
      <div className="grid grid-cols-3 gap-4 m-12">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}
