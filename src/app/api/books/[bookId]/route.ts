import { NextResponse, type NextRequest } from 'next/server';
import { getBookById } from '@/lib/data/books';
import type { Book } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const bookId = params.bookId;
  const book = getBookById(bookId);

  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
  }

  return NextResponse.json<Book>(book);
}
