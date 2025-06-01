import React, { Suspense } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import SearchBar from '@/components/shared/SearchBar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import CartIcon from './CartIcon'; // We'll create this component

// Fallback component for SearchBar
const SearchBarFallback = () => (
  <div className="flex w-full max-w-sm items-center space-x-2">
    <Skeleton className="h-10 flex-grow rounded-md" />
    <Skeleton className="h-10 w-10 rounded-md" />
  </div>
);

const CartIconFallback = () => (
  <Skeleton className="h-10 w-10 rounded-md" />
)

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden md:block">
            <Suspense fallback={<SearchBarFallback />}>
              <SearchBar />
            </Suspense>
          </div>
          <Link href="/books" passHref>
            <Button variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground px-2 sm:px-3">
              All Books
            </Button>
          </Link>
          <Suspense fallback={<CartIconFallback />}>
            <CartIcon />
          </Suspense>
        </nav>
      </div>
      <div className="md:hidden p-4 border-t border-border">
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
