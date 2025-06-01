'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const PaginationControls = ({ currentPage, totalPages, totalItems, itemsPerPage }: PaginationControlsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const changePage = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', String(newPage));
    router.push(`${pathname}?${current.toString()}`);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      <p className="text-sm text-muted-foreground">
        Showing {startItem} - {endItem} of {totalItems} results
      </p>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="btn-animated"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="btn-animated"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
