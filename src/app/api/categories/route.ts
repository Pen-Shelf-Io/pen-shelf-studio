import { NextResponse } from 'next/server';
import { allBooks } from '@/lib/data/books';

export async function GET() {
  const categories = [...new Set(allBooks.map(book => book.category))].sort();
  return NextResponse.json<string[]>(categories);
}
