import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cart, CartProduct } from '@/lib/cart';
import { useStore } from '@nanostores/react';
import { TrashIcon } from 'lucide-react';

import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export function CartButton() {
  const $cart = useStore(cart);
  const overallTotal = $cart.reduce((acc, val) => {
    return val.product.price * val.quantity + acc;
  }, 0);

  function removeFromCart({ product }: CartProduct) {
    cart.set($cart.filter((item) => item.product.id !== product.id));
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="link">Cart</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>In your cart</SheetTitle>
          <SheetDescription className="gap-4">
            {$cart.length ? (
              $cart.map((item) => {
                return (
                  <CartElement item={item} removeFromCart={removeFromCart} />
                );
              })
            ) : (
              <p>Nothing in your cart yet!</p>
            )}
            <p className="text-lg">
              Your total: ${' '}
              <span className="font-semibold">{overallTotal.toFixed(2)}</span>
            </p>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

interface CartProductProps {
  item: CartProduct;
  removeFromCart: (item: CartProduct) => void;
}

function CartElement({ item, removeFromCart }: CartProductProps) {
  const { product, quantity } = item;
  const displayedTitle =
    product.title.length > 25
      ? `${product.title.slice(0, 25)}...`
      : product.title;

  const subtotal = quantity * product.price;
  const { toast } = useToast();

  function handleRemoveFromCart() {
    removeFromCart(item);
    toast({
      variant: 'destructive',
      title: `${displayedTitle} removed from cart!`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <span className="text-lg font-bold">{displayedTitle}</span>
      </CardHeader>
      <CardContent className="p-4 flex flex-row justify-between">
        <img src={product.image} className="w-1/6 mb-2 mr-2" />
        <div className="flex flex-row justify-end gap-4">
          <div className="flex flex-col justify-start">
            <p>
              {quantity} x $ {product.price}
            </p>
            <hr />
            <p>Subtotal: $ {subtotal.toFixed(2)}</p>
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleRemoveFromCart}
          >
            <TrashIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}