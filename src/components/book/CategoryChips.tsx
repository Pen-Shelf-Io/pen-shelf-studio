'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const CategoryChips = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(['All', ...data]);
      } catch (error) {
        console.error(error);
        setCategories(['All']); // Fallback
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (category === 'All') {
      current.delete('category');
    } else {
      current.set('category', category);
    }
    current.set('page', '1'); // Reset to first page on category change
    router.push(`${pathname}?${current.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex space-x-2 mb-8 overflow-x-auto py-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={currentCategory === category || (category === 'All' && !currentCategory) ? 'default' : 'secondary'}
          onClick={() => handleCategoryChange(category)}
          className="cursor-pointer py-2 px-4 text-sm whitespace-nowrap transition-all hover:opacity-80 shadow-sm hover:shadow-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          data-state={(currentCategory === category || (category === 'All' && !currentCategory)) ? 'active' : 'inactive'}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};

export default CategoryChips;
