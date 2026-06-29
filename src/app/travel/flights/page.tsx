'use client';

import { useState } from 'react';
import { FlightSearchForm } from '@/components/travel/FlightSearchForm';
import { FlightCard } from '@/components/travel/FlightCard';
import { Flight } from '@/lib/types';
import { searchFlights } from '@/lib/services/flightService';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSearch = async (values: { origin: string; destination: string; date: string }) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const results = await searchFlights(values.origin, values.destination, values.date);
      setFlights(results);
      if (results.length === 0) {
        toast({
          title: 'No flights found',
          description: 'Try adjusting your search criteria.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to search flights. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBook = (flightId: string) => {
    // Navigate to details collection page
    router.push(`/travel/details?type=flight&id=${flightId}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">Search Flights</h1>
        <p className="text-muted-foreground">Find the best deals for your next trip.</p>
      </div>

      <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />

      <div className="mt-12 space-y-6">
        {flights.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold font-headline">Available Flights</h2>
            <div className="grid grid-cols-1 gap-6">
              {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} onBook={handleBook} />
              ))}
            </div>
          </>
        ) : (
          hasSearched && !isLoading && (
            <div className="text-center p-12 bg-muted rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground">No flights found matching your criteria.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
