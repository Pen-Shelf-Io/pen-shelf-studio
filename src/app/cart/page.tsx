'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShoppingCart, Trash2, MinusSquare, PlusSquare, Info } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const handleQuantityChange = (bookId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(bookId, newQuantity);
    } else {
      removeFromCart(bookId); // Or set to 1 if you don't want to remove on 0
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <ShoppingCart size={64} className="mx-auto mb-6 text-muted-foreground" />
        <PageTitle>Your Cart is Empty</PageTitle>
        <p className="text-lg text-muted-foreground mb-8">
          Looks like you haven't added any books to your cart yet.
        </p>
        <Link href="/books" passHref>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 btn-animated">
            Start Browsing
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageTitle>Your Shopping Cart</PageTitle>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow-sm bg-card">
              <div className="relative w-24 h-36 sm:w-28 sm:h-40 flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  sizes="150px"
                  className="object-cover"
                  data-ai-hint={item.aiHint || "book cover"}
                />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-lg font-semibold font-headline text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.author}</p>
                <p className="text-md font-semibold text-accent">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-0">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity, -1)} aria-label="Decrease quantity">
                  <MinusSquare size={18} />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0) updateQuantity(item.id, val);
                    else if (e.target.value === '' || val <=0) updateQuantity(item.id, 1); // or handle as desired
                  }}
                  className="w-16 h-10 text-center"
                  aria-label={`Quantity for ${item.title}`}
                />
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity, 1)} aria-label="Increase quantity">
                  <PlusSquare size={18} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:bg-destructive/10" aria-label="Remove item">
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6 p-6 border rounded-lg shadow-lg bg-card">
            <h2 className="text-2xl font-headline font-semibold text-primary">Order Summary</h2>
            <Separator />
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>
                Shipping and taxes will be calculated at checkout.
              </AlertDescription>
            </Alert>
            <Link href="/checkout/coming-soon" passHref className="block">
              <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 btn-animated text-lg">
                Proceed to Checkout
              </Button>
            </Link>
            <Button variant="outline" onClick={clearCart} className="w-full btn-animated">
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
