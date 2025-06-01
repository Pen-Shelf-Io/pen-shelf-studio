import Image from 'next/image';
import Link from 'next/link';
import BookCard from '@/components/book/BookCard';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Book } from '@/lib/types';
import { RANDOM_BOOKS_COUNT_HOME, FEATURED_BOOKS_COUNT_HOME } from '@/lib/constants';

async function getFeaturedBooks(): Promise<Book[]> {
  // In a real app, this would fetch from /api/books/featured or similar
  // For now, fetch from /api/books/random with a specific count for featured.
  // Or, filter from allBooks directly for simplicity in this example.
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/books/random?count=${FEATURED_BOOKS_COUNT_HOME}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getRandomBooks(): Promise<Book[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/books/random?count=${RANDOM_BOOKS_COUNT_HOME}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const featuredBooks = await getFeaturedBooks();
  const randomBooks = await getRandomBooks();

  return (
    <div className="space-y-16">
      {/* Hero Section - Featured Books */}
      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">
          Welcome to PenShelf
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover your next favorite book from our curated collection on PenShelf. Dive into worlds of adventure, knowledge, and imagination.
        </p>
        {featuredBooks.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold font-headline text-primary mb-6">Featured Reads</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        )}
         <Link href="/books" passHref className="mt-8 inline-block">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 btn-animated">
            Explore Full Catalogue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Random Books Section */}
      {randomBooks.length > 0 && (
        <section>
          <PageTitle>Discover New Adventures</PageTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {randomBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/books" passHref>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground btn-animated">
                View All Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
