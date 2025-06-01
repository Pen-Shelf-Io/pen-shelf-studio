import Image from 'next/image';
import Link from 'next/link';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import type { Book } from '@/lib/types';
import AISimilarBooks from '@/components/book/AISimilarBooks';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, BookText, Tag, CircleDollarSign, Layers } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

async function getBook(bookId: string): Promise<Book | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/books/${bookId}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return null;
  }
}

export default async function BookDetailPage({ params }: { params: { bookId: string } }) {
  const book = await getBook(params.bookId);

  if (!book) {
    return (
      <div className="text-center py-10">
        <PageTitle>Book Not Found</PageTitle>
        <p className="text-muted-foreground">Sorry, the book you are looking for does not exist or could not be loaded.</p>
        <Link href="/books" className="mt-4 inline-block">
          <Button variant="outline" className="btn-animated">Back to Catalogue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
        <div className="md:col-span-1">
          <div className="aspect-[2/3] w-full relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              data-ai-hint={book.aiHint || "book cover detail"}
              priority
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <PageTitle className="mb-2 !text-4xl lg:!text-5xl">{book.title}</PageTitle>
          <p className="text-xl text-muted-foreground font-medium">by {book.author}</p>
          
          <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
            <Badge variant="secondary" className="py-1 px-3 text-md bg-primary/10 text-primary">
              <Tag size={16} className="mr-2" /> {book.category}
            </Badge>
            <span className="flex items-center">
              <Layers size={16} className="mr-2 text-accent" /> {book.pages} pages
            </span>
            <span className="flex items-center">
              <CalendarDays size={16} className="mr-2 text-accent" /> Published: {new Date(book.publishedDate).toLocaleDateString()}
            </span>
          </div>

          <Separator className="my-6" />

          <div className="space-y-3 prose prose-lg max-w-none text-foreground">
            <h2 className="text-2xl font-headline font-semibold text-primary">Description</h2>
            <p>{book.description}</p>
          </div>
          
          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-card rounded-lg shadow-md border border-border">
            <p className="text-4xl font-bold text-primary flex items-center">
              <CircleDollarSign size={36} className="mr-3 text-accent" />
              ${book.price.toFixed(2)}
            </p>
            <Link href={`/books/${book.id}/purchase`} passHref>
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 btn-animated text-lg py-3 px-8">
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <AISimilarBooks bookDescription={book.description} currentBookTitle={book.title} />
    </div>
  );
}
