import { NextResponse, type NextRequest } from 'next/server';
import { allBooks } from '@/lib/data/books';
import { RANDOM_BOOKS_COUNT_HOME } from '@/lib/constants';
import type { Book } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const countParam = searchParams.get('count');
  let count = RANDOM_BOOKS_COUNT_HOME;

  if (countParam) {
    const parsedCount = parseInt(countParam, 10);
    if (!isNaN(parsedCount) && parsedCount > 0) {
      count = parsedCount;
    } else {
      return NextResponse.json({ error: 'Invalid count parameter' }, { status: 400 });
    }
  }

  const shuffled = [...allBooks].sort(() => 0.5 - Math.random());
  const randomBooks = shuffled.slice(0, count);

  return NextResponse.json<Book[]>(randomBooks);
}
