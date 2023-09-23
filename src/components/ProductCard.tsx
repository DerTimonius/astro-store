import AddToCartButton from '@/components/AddToCartButton';
import type { Product } from '@/components/Products';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from './ui/badge';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const isGreatProduct = product.rating.rate > 4;
  const isSoldOften = product.rating.count > 200;

  return (
    <Card className="flex flex-col justify-between group max-h-[640px] max-w-xs group">
      <CardHeader className="flex flex-col justify-center items-center  max-h-[480px]">
        <div className="flex flex-col justify-center items-center w-full max-h-[240px]">
          <a href={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[180px] group-hover:scale-105 transition-all duration-250 delay-150 ease-out"
            />
          </a>
        </div>
        <CardTitle className="text-xl p-1 md:text-2xl bg-left-bottom bg-gradient-to-r from-slate-600 to-slate-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
          {product.title}
        </CardTitle>
        <CardDescription>{product.category}</CardDescription>
        {isGreatProduct && <Badge>Editor's Choice</Badge>}
        {isSoldOften && <Badge variant="outline">Bestseller</Badge>}
      </CardHeader>
      <CardFooter className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-2 mb-2">
          <a href={`/products/${product.id}`}>
            <Button variant="link">Go to product page</Button>
          </a>
          <AddToCartButton product={product} />
        </div>
        <p className="font-bold">$ {product.price}</p>
      </CardFooter>
    </Card>
  );
}
