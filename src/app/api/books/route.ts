import { NextResponse, type NextRequest } from 'next/server';
import { allBooks, getPaginatedBooks } from '@/lib/data/books';
import { BOOKS_PER_PAGE } from '@/lib/constants';
import type { Book, PaginatedResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || String(BOOKS_PER_PAGE), 10);

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
  }

  const paginatedResult = getPaginatedBooks(page, limit, allBooks);
  
  return NextResponse.json<PaginatedResponse<Book>>(paginatedResult);
}
