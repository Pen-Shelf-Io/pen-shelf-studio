import { NextResponse, type NextRequest } from 'next/server';
import { allBooks, getPaginatedBooks } from '@/lib/data/books';
import { BOOKS_PER_PAGE } from '@/lib/constants';
import type { Book, PaginatedResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || String(BOOKS_PER_PAGE), 10);

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
  }

  if (!query) {
    // return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    // Or return all books if query is empty, or an empty list. For now, empty list.
     const emptyResult = getPaginatedBooks(1, limit, []);
     return NextResponse.json<PaginatedResponse<Book>>(emptyResult);
  }

  const filteredBooks = allBooks.filter(
    book =>
      book.title.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
  );

  const paginatedResult = getPaginatedBooks(page, limit, filteredBooks);

  return NextResponse.json<PaginatedResponse<Book>>(paginatedResult);
}
