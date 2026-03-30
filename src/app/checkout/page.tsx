'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart } from '@/contexts/CartContext';
import PageTitle from '@/components/shared/PageTitle';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Explicitly calling Stripe from client side context safely
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { cartItems } = useCart();

  useEffect(() => {
    if (cartItems.length > 0) {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error('Failed to get client secret', data);
            setError(data.error || 'Failed to initialize payment intent');
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Network error: unable to reach checkout service');
        });
    }
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <PageTitle>Oops! Your Cart is Empty</PageTitle>
        <Link href="/books">
          <Button size="lg" className="mt-4 btn-animated">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const appearance = {
    theme: 'stripe' as const,
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8">
         <PageTitle>Secure Checkout</PageTitle>
      </div>
      
      {error && (
        <div className="text-center text-destructive p-8 border rounded-lg max-w-lg mx-auto bg-destructive/10 mb-8">
           <p className="font-semibold text-lg">{error}</p>
           <p className="text-muted-foreground mt-2">Please check your configuration or API keys.</p>
        </div>
      )}

      {clientSecret && !error ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : !error && (
        <div className="flex flex-col items-center justify-center p-20 text-muted-foreground">
          <Loader2 className="animate-spin h-10 w-10 mb-4" />
          <p>Setting up your secure payment session...</p>
        </div>
      )}
    </div>
  );
}
