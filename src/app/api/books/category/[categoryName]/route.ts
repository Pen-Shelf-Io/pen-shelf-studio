import { NextResponse, type NextRequest } from 'next/server';
import { allBooks, getPaginatedBooks } from '@/lib/data/books';
import { BOOKS_PER_PAGE } from '@/lib/constants';
import type { Book, PaginatedResponse } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryName: string } }
) {
  const categoryName = decodeURIComponent(params.categoryName);
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || String(BOOKS_PER_PAGE), 10);

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
  }

  const filteredBooks = allBooks.filter(
    book => book.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (filteredBooks.length === 0 && categoryName.toLowerCase() !== 'all') {
    // Return empty if category not found, unless it's 'all' (handled by /api/books)
    // Or handle 'all' here to show all books, consistent with chip behavior
  }
  
  const paginatedResult = getPaginatedBooks(page, limit, filteredBooks);

  return NextResponse.json<PaginatedResponse<Book>>(paginatedResult);
}
