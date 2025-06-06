import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Construction className="w-24 h-24 text-accent mb-6" />
      <PageTitle>Checkout Coming Soon!</PageTitle>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        We're working hard to bring you a seamless purchasing experience. This feature is currently under construction.
      </p>
      <p className="text-muted-foreground mb-8">
        Thank you for your patience!
      </p>
      <div className="flex gap-4">
        <Link href="/cart" passHref>
          <Button variant="outline" className="btn-animated">
            Back to Cart
          </Button>
        </Link>
        <Link href="/books" passHref>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 btn-animated">
            Continue Browsing
          </Button>
        </Link>
      </div>
    </div>
  );
}
