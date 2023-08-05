import { cart, type Cart, saveToStorage } from '@/lib/cart';
import type { Product } from '@/pages/store.astro';
import { useStore } from '@nanostores/react';
import { useState } from 'react';

import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface AddToCartButtonProps {
  canChangeQuantity?: boolean;
  product: Product;
}

export default function AddToCartButton({
  product,
  canChangeQuantity = false,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const $cart: Cart = useStore(cart);
  const { toast } = useToast();

  function addToCart(product: Product) {
    const alreadyInCart = $cart.find((item) => item.product.id === product.id);
    if (alreadyInCart) {
      cart.set(
        $cart.map((item) =>
          item.product.id === alreadyInCart.product.id
            ? { ...item, quantity: (alreadyInCart.quantity += quantity) }
            : item,
        ),
      );
    } else {
      cart.set([...$cart, { product, quantity }]);
    }
    saveToStorage(cart.get());
    toast({
      title: `${product.title} added to cart!`,
      description: 'Keep shopping!',
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {canChangeQuantity ? (
        <>
          <div className="font-mono">
            <p>Quantity: {quantity}</p>
          </div>
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              -
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
        </>
      ) : null}
      <Button onClick={() => addToCart(product)} variant="default" size="lg">
        Add to cart
      </Button>
    </div>
  );
}
