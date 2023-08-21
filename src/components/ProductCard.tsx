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
              className="max-h-[180px]"
            />
          </a>
        </div>
        <CardTitle className="text-xl p-1 md:text-2xl">
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
