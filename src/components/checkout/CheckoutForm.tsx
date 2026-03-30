'use client';

import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, getCartTotal } = useCart();

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

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'An error occurred with your payment method.');
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Order Summary */}
      <div className="lg:col-span-2 space-y-6 order-2 lg:order-1 bg-card p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-headline font-bold border-b pb-4">Order Summary</h2>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <div className="relative w-16 h-24 flex-shrink-0">
                <Image src={item.coverImage} fill alt={item.title} className="object-cover rounded" />
              </div>
              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                <p className="font-semibold text-accent">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 text-xl font-bold flex justify-between">
          <span>Total</span>
          <span className="text-primary">${getCartTotal().toFixed(2)}</span>
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
              {isLoading ? "Processing..." : `Complete Payment ($${getCartTotal().toFixed(2)})`}
            </span>
          </Button>
          
          {message && <div id="payment-message" className="text-destructive mt-4 text-center font-medium">{message}</div>}
        </form>
      </div>
    </div>
  );
}
