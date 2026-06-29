'use client';

import { useState } from 'react';
import { HotelSearchForm } from '@/components/travel/HotelSearchForm';
import { HotelCard } from '@/components/travel/HotelCard';
import { Hotel } from '@/lib/types';
import { searchHotels } from '@/lib/services/hotelService';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSearch = async (values: { location: string; checkIn: string; checkOut: string; guests: string }) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const results = await searchHotels(values.location, values.checkIn, values.checkOut);
      setHotels(results);
      if (results.length === 0) {
        toast({
          title: 'No hotels found',
          description: 'Try a different location or dates.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to search hotels. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBook = (hotelId: string) => {
    // Navigate to details collection page
    router.push(`/travel/details?type=hotel&id=${hotelId}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">Find a Place to Stay</h1>
        <p className="text-muted-foreground">Book comfortable accommodations for your journey.</p>
      </div>

      <HotelSearchForm onSearch={handleSearch} isLoading={isLoading} />

      <div className="mt-12 space-y-6">
        {hotels.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold font-headline">Available Hotels</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} onBook={handleBook} />
              ))}
            </div>
          </>
        ) : (
          hasSearched && !isLoading && (
            <div className="text-center p-12 bg-muted rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground">No hotels found matching your criteria.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
