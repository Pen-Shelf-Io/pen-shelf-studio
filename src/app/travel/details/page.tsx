'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageTitle from '@/components/shared/PageTitle';
import ClientDetailsForm from '@/components/travel/ClientDetailsForm';
import { Loader2 } from 'lucide-react';

function DetailsContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as 'flight' | 'hotel' | null;
  const id = searchParams.get('id');

  if (!type || !id) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <PageTitle>Invalid Booking</PageTitle>
        <p className="text-muted-foreground mt-4">We could not find the details for your booking. Please return to the search page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <PageTitle>Almost There!</PageTitle>
        <p className="text-center text-muted-foreground mt-2">
          Please provide your details below to secure your {type === 'flight' ? 'flight ticket' : 'hotel reservation'}.
        </p>
      </div>
      
      <ClientDetailsForm type={type} itemId={id} />
    </div>
  );
}

export default function ClientDetailsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    }>
      <DetailsContent />
    </Suspense>
  );
}
