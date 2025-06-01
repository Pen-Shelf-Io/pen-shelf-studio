'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

const CartIcon = () => {
  const { getItemCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const itemCount = getItemCount();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" passHref>
      <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-accent hover:text-accent-foreground">
        <ShoppingCart className="h-5 w-5" />
        {mounted && itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-primary text-primary-foreground"
          >
            {itemCount}
          </Badge>
        )}
        <span className="sr-only">View Cart</span>
      </Button>
    </Link>
  );
};

export default CartIcon;