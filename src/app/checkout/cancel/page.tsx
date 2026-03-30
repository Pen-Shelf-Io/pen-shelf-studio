'use client';
import Link from 'next/link';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function CheckoutCancelPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <XCircle size={80} className="text-destructive" />
      <PageTitle>Payment Cancelled</PageTitle>
      <p className="text-lg text-muted-foreground max-w-md">
        Your checkout session was cancelled or interrupted. No charges were made to your account.
      </p>
      <div className="flex gap-4 mt-8">
        <Link href="/cart">
          <Button size="lg" className="btn-animated">Return to Cart</Button>
        </Link>
      </div>
    </div>
  );
}
