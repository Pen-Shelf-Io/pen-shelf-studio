'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HotelCard } from '@/components/travel/HotelCard';
import { MOCK_HOTELS } from '@/lib/services/mockTravelData';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FEATURED_LOCATIONS = [
  {
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'The city of light, romance, and culture.',
  },
  {
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Experience the harmony of ancient traditions and modern life.',
  },
  {
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Breathtaking sunsets over the Aegean Sea.',
  }
];

export default function FeaturedTravel() {
  const router = useRouter();
  
  const handleBookHotel = (id: string) => {
    router.push(`/travel/details?type=hotel&id=${id}`);
  };

  return (
    <div className="space-y-16 mt-16">
      {/* Featured Beautiful Locations */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-semibold font-headline text-primary">Beautiful Locations</h2>
            <p className="text-muted-foreground mt-1">Get inspired for your next getaway.</p>
          </div>
          <Link href="/travel/flights" className="hidden sm:flex text-primary hover:underline items-center text-sm font-medium">
            Search Flights <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_LOCATIONS.map((location, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl shadow-md h-64 md:h-80 border border-muted cursor-pointer" onClick={() => router.push('/travel/flights')}>
              <img 
                src={location.image} 
                alt={location.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white font-bold text-2xl mb-1">{location.name}</h3>
                <p className="text-gray-200 text-sm line-clamp-2">{location.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="bg-muted/30 p-8 rounded-xl border border-muted">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-semibold font-headline text-primary">Featured Hotels</h2>
            <p className="text-muted-foreground mt-1">Luxurious stays handpicked just for you.</p>
          </div>
          <Link href="/travel/hotels" className="hidden sm:flex text-primary hover:underline items-center text-sm font-medium">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {MOCK_HOTELS.slice(0, 2).map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} onBook={handleBookHotel} />
          ))}
        </div>
        
        <div className="sm:hidden mt-6 text-center">
          <Link href="/travel/hotels">
            <button className="w-full border border-primary text-primary py-2 rounded-md hover:bg-primary/10">
              View All Hotels
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
