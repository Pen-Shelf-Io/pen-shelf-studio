import { Hotel } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Check } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
  onBook: (hotelId: string) => void;
}

export function HotelCard({ hotel, onBook }: HotelCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-muted bg-card flex flex-col md:flex-row">
      {/* Image */}
      <div className="w-full md:w-1/3 h-48 md:h-auto relative">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-6 flex flex-1 flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="font-semibold text-2xl mb-1">{hotel.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground gap-1 mb-2">
              <MapPin className="w-4 h-4" /> {hotel.location}
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex bg-primary/10 text-primary px-2 py-1 rounded-sm items-center gap-1 font-bold text-sm">
                <Star className="w-4 h-4 fill-primary" />
                {hotel.rating}
              </div>
              <span className="text-sm text-muted-foreground">({hotel.reviews} reviews)</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map(amenity => (
                <div key={amenity} className="flex items-center text-xs bg-muted px-2 py-1 rounded-full gap-1">
                  <Check className="w-3 h-3 text-green-500" /> {amenity}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-end mt-4 md:mt-0">
            <div className="text-sm text-muted-foreground mb-1">Price per night</div>
            <div className="text-3xl font-bold text-primary mb-4">${hotel.pricePerNight}</div>
            <Button onClick={() => onBook(hotel.id)} className="w-full md:w-auto">
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
