'use client';
import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart immediately upon successful payment landing
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <CheckCircle size={80} className="text-green-500" />
      <PageTitle>Payment Successful!</PageTitle>
      <p className="text-lg text-muted-foreground max-w-md">
        Thank you for your purchase. Your payment was successfully processed and your order is complete.
      </p>
      <div className="flex gap-4 mt-8">
        <Link href="/books">
          <Button size="lg" className="btn-animated">Continue Shopping</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="lg" className="btn-animated">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
