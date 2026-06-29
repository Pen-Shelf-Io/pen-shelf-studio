import Image from 'next/image';
import Link from 'next/link';
import BookCard from '@/components/book/BookCard';
import PageTitle from '@/components/shared/PageTitle';
import FeaturedTravel from '@/components/home/FeaturedTravel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Plane, Building, BookOpen } from 'lucide-react';
import type { Book } from '@/lib/types';
import { RANDOM_BOOKS_COUNT_HOME, FEATURED_BOOKS_COUNT_HOME } from '@/lib/constants';
import { getBaseUrl } from '@/lib/utils';

async function getFeaturedBooks(): Promise<Book[]> {
  const res = await fetch(`${getBaseUrl()}/api/books/random?count=${FEATURED_BOOKS_COUNT_HOME}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getRandomBooks(): Promise<Book[]> {
  const res = await fetch(`${getBaseUrl()}/api/books/random?count=${RANDOM_BOOKS_COUNT_HOME}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const featuredBooks = await getFeaturedBooks();
  const randomBooks = await getRandomBooks();

  return (
    <div className="space-y-16 max-w-6xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <section className="text-center bg-card p-8 md:p-16 rounded-xl shadow-lg border border-muted relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary mb-4">
            Welcome to GlobeLynk
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your ultimate portal for imagination and exploration. Read your next favorite book, book a flight to your dream destination, and find the perfect place to stay.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {/* Books Service */}
        <Card className="hover:shadow-xl transition-all border-muted hover:-translate-y-1 duration-300">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl">Buy a Book</CardTitle>
            <CardDescription className="text-base mt-2">
              Dive into realms of adventure and knowledge. Explore our curated collection of amazing reads.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pt-4">
            <Link href="/books" passHref>
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Shop Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Flights Service */}
        <Card className="hover:shadow-xl transition-all border-muted hover:-translate-y-1 duration-300">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Plane className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <CardTitle className="text-2xl">Book a Flight</CardTitle>
            <CardDescription className="text-base mt-2">
              Ready for an adventure? Find the best deals on flights worldwide and start your journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pt-4">
            <Link href="/travel/flights" passHref>
              <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                Search Flights
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Hotels Service */}
        <Card className="hover:shadow-xl transition-all border-muted hover:-translate-y-1 duration-300">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Building className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-2xl">Book a Hotel</CardTitle>
            <CardDescription className="text-base mt-2">
              Discover comfortable and luxurious stays. From cozy inns to 5-star resorts, we have it all.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pt-4">
            <Link href="/travel/hotels" passHref>
              <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Find Hotels
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Featured Travel (Hotels & Locations) */}
      <FeaturedTravel />

      {/* Featured Books Section */}
      {featuredBooks.length > 0 && (
        <section className="bg-muted/30 p-8 rounded-xl border border-muted mt-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-semibold font-headline text-primary">Featured Reads</h2>
              <p className="text-muted-foreground mt-1">Handpicked books just for you.</p>
            </div>
            <Link href="/books" className="hidden sm:flex text-primary hover:underline items-center text-sm font-medium">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link href="/books">
              <Button variant="outline" className="w-full">View All Books</Button>
            </Link>
          </div>
        </section>
      )}

      {/* Random Books Section */}
      {randomBooks.length > 0 && (
        <section className="mt-16">
          <PageTitle>Discover New Adventures</PageTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {randomBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
