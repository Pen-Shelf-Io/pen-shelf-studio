'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import TravelCheckoutForm from '@/components/travel/TravelCheckoutForm';
import PageTitle from '@/components/shared/PageTitle';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function CheckoutContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const duration = searchParams.get('duration');

  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState(0);
  const [itemName, setItemName] = useState('');
  const isFetching = React.useRef(false);

  useEffect(() => {
    if (type && id) {
      if (isFetching.current) return;
      isFetching.current = true;
      
      fetch('/api/checkout/travel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, ...(duration ? { duration } : {}) }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
            setPrice(data.price || 0);
            setItemName(data.itemName || '');
          } else {
            console.error('Failed to get client secret', data);
            setError(data.error || 'Failed to initialize payment intent');
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Network error: unable to reach checkout service');
        });
    } else {
      setError('Invalid booking details.');
    }
  }, [type, id]);

  const appearance = {
    theme: 'stripe' as const,
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
         <PageTitle>Secure Booking Checkout</PageTitle>
      </div>
      
      {error && (
        <div className="text-center text-destructive p-8 border rounded-lg max-w-lg mx-auto bg-destructive/10 mb-8">
           <p className="font-semibold text-lg">{error}</p>
           <p className="text-muted-foreground mt-2">Please check your configuration or API keys.</p>
        </div>
      )}

      {clientSecret && !error ? (
        <Elements options={options} stripe={stripePromise}>
          <TravelCheckoutForm price={price} itemName={itemName} />
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

export default function TravelCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
