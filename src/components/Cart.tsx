import { cart } from '@/lib/cart';
import { useStore } from '@nanostores/react';

import { CartElement } from './CartButton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function Cart() {
  const $cart = useStore(cart);

  return (
    <Card className="px-4 py-3">
      <CardHeader>
        <CardTitle>Your cart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {$cart.map((item) => {
          return <CartElement item={item} />;
        })}
      </CardContent>
    </Card>
  );
}
