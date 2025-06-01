import BookCard from '@/components/book/BookCard';
import PaginationControls from '@/components/shared/PaginationControls';
import PageTitle from '@/components/shared/PageTitle';
import type { Book, PaginatedResponse } from '@/lib/types';
import { BOOKS_PER_PAGE } from '@/lib/constants';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SearchX } from 'lucide-react';

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
    limit?: string;
  };
}

async function searchBooks(
  query: string,
  page: number,
  limit: number = BOOKS_PER_PAGE
): Promise<PaginatedResponse<Book>> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/books/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
     if (!res.ok) {
      console.error("Failed to fetch search results:", res.status, await res.text());
      return { data: [], currentPage: page, totalPages: 0, totalItems: 0, itemsPerPage: limit };
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching search results:", error);
    return { data: [], currentPage: page, totalPages: 0, totalItems: 0, itemsPerPage: limit };
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const currentPage = parseInt(searchParams.page || '1', 10);
  const limit = parseInt(searchParams.limit || String(BOOKS_PER_PAGE), 10);

  if (!query) {
    return (
      <div className="space-y-8 text-center">
        <PageTitle>Search for Books</PageTitle>
        <p className="text-lg text-muted-foreground">
          Please enter a search term in the bar above to find books by title, author, or description.
        </p>
      </div>
    );
  }
  
  const { data: books, totalPages, totalItems, itemsPerPage } = await searchBooks(query, currentPage, limit);

  return (
    <div className="space-y-8">
      <PageTitle>Search Results for &quot;{query}&quot;</PageTitle>
      
      {books.length > 0 ? (
        <>
          <p className="text-muted-foreground">{totalItems} book(s) found.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </>
      ) : (
        <Alert variant="default" className="mt-8">
          <SearchX className="h-5 w-5" />
          <AlertTitle>No Results Found</AlertTitle>
          <AlertDescription>
            We couldn&apos;t find any books matching your search for &quot;{query}&quot;.
            Try searching with different keywords or check your spelling.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

