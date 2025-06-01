'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/books'); // Or clear search results on current page if on /search
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        placeholder="Search books, authors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-background focus:bg-white"
      />
      <Button type="submit" variant="outline" size="icon" aria-label="Search" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default SearchBar;
