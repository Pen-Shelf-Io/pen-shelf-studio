'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import PageTitle from '@/components/shared/PageTitle';

export default function TravelCheckoutSuccessPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-4 text-center space-y-8">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-6 inline-block">
          <CheckCircle2 className="w-20 h-20 text-green-600" />
        </div>
      </div>
      
      <PageTitle>Booking Confirmed!</PageTitle>
      
      <p className="text-xl text-muted-foreground max-w-lg mx-auto">
        Thank you for your booking. Your payment has been successfully processed and your itinerary is ready.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Link href="/travel">
          <Button size="lg" className="w-full sm:w-auto btn-animated">
            Back to Travel Hub
          </Button>
        </Link>
        <Link href="/">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
