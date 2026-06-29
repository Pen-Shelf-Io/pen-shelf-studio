'use client';

import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TravelCheckoutFormProps {
  price: number;
  itemName: string;
}

export default function TravelCheckoutForm({ price, itemName }: TravelCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/travel/checkout/success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An error occurred with your payment method.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment succeeded! Redirecting...');
      
      // Trigger telegram notification
      try {
        await fetch('/api/notifications/telegram-manual', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: price, itemName: itemName, id: paymentIntent.id }),
        });
      } catch (err) {
        console.error('Failed to trigger notification', err);
      }

      // Redirect to success page
      window.location.href = `${window.location.origin}/travel/checkout/success`;
    }

    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Order Summary */}
      <div className="lg:col-span-2 space-y-6 order-2 lg:order-1 bg-card p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-headline font-bold border-b pb-4">Booking Summary</h2>
        <div className="py-4">
          <p className="font-semibold text-lg">{itemName}</p>
        </div>
        <div className="border-t pt-4 text-xl font-bold flex justify-between">
          <span>Total</span>
          <span className="text-primary">${price.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Information */}
      <div className="lg:col-span-3 order-1 lg:order-2 bg-card p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-headline font-bold border-b pb-4 mb-6">Payment Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
          
          <Button disabled={isLoading || !stripe || !elements} className="w-full btn-animated bg-accent hover:bg-accent/90" size="lg">
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
            <span id="button-text">
              {isLoading ? "Processing..." : `Complete Payment ($${price.toFixed(2)})`}
            </span>
          </Button>
          
          {message && <div id="payment-message" className="text-destructive mt-4 text-center font-medium">{message}</div>}
        </form>
      </div>
    </div>
  );
}
