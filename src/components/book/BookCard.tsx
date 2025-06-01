import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tag } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden h-full card-animated shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-border">
      <Link href={`/books/${book.id}`} className="flex-grow">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] w-full relative">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={book.aiHint || "book cover"}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-headline leading-tight mb-1 hover:text-primary transition-colors">
            {book.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2">{book.author}</CardDescription>
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <Tag size={14} className="mr-1 text-accent" />
            {book.category}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 border-t border-border mt-auto">
        <div className="flex justify-between items-center w-full">
          <p className="text-xl font-semibold text-primary">
            ${book.price.toFixed(2)}
          </p>
          <Link href={`/books/${book.id}/purchase`} passHref>
            <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 btn-animated">
              Buy Now
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
