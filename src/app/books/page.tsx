import BookCard from '@/components/book/BookCard';
import CategoryChips from '@/components/book/CategoryChips';
import PaginationControls from '@/components/shared/PaginationControls';
import PageTitle from '@/components/shared/PageTitle';
import type { Book, PaginatedResponse } from '@/lib/types';
import { BOOKS_PER_PAGE } from '@/lib/constants';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookIcon } from 'lucide-react';

interface BooksPageProps {
  searchParams: {
    page?: string;
    category?: string;
    limit?: string;
  };
}

async function getBooks(
  page: number,
  category?: string,
  limit: number = BOOKS_PER_PAGE
): Promise<PaginatedResponse<Book>> {
  let url = `${process.env.NEXT_PUBLIC_APP_URL}/api/books?page=${page}&limit=${limit}`;
  if (category && category.toLowerCase() !== 'all') {
    url = `${process.env.NEXT_PUBLIC_APP_URL}/api/books/category/${encodeURIComponent(category)}?page=${page}&limit=${limit}`;
  }
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error("Failed to fetch books:", res.status, await res.text());
      // Return a default empty paginated response on error
      return { data: [], currentPage: page, totalPages: 0, totalItems: 0, itemsPerPage: limit };
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return { data: [], currentPage: page, totalPages: 0, totalItems: 0, itemsPerPage: limit };
  }
}


export default async function BooksPage({ searchParams }: BooksPageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const currentCategory = searchParams.category;
  const limit = parseInt(searchParams.limit || String(BOOKS_PER_PAGE), 10);

  const { data: books, totalPages, totalItems, itemsPerPage } = await getBooks(currentPage, currentCategory, limit);

  const pageTitle = currentCategory && currentCategory.toLowerCase() !== 'all' 
    ? `Books in ${currentCategory}` 
    : "Our Entire Collection";

  return (
    <div className="space-y-8">
      <PageTitle>{pageTitle}</PageTitle>
      <CategoryChips />

      {books.length > 0 ? (
        <>
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
        <Alert>
          <BookIcon className="h-4 w-4" />
          <AlertTitle>No Books Found</AlertTitle>
          <AlertDescription>
            {currentCategory && currentCategory.toLowerCase() !== 'all'
              ? `Sorry, there are no books currently available in the "${currentCategory}" category. Try selecting another category or viewing all books.`
              : "Sorry, there are no books currently available. Please check back later."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
