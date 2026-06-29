import { Flight } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaneTakeoff, PlaneLanding, Clock } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
  onBook: (flightId: string) => void;
}

export function FlightCard({ flight, onBook }: FlightCardProps) {
  const depDate = new Date(flight.departureTime);
  const arrDate = new Date(flight.arrivalTime);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-muted bg-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Airline Info */}
          <div className="flex items-center gap-4 w-full md:w-1/4">
            <div className="w-16 h-12 flex-shrink-0 flex items-center justify-center p-2 rounded-md bg-white border border-border shadow-sm">
              <img src={flight.airlineLogo} alt={flight.airline} className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{flight.airline}</h3>
              <p className="text-sm text-muted-foreground">{flight.id}</p>
            </div>
          </div>

          {/* Time & Duration */}
          <div className="flex flex-1 items-center justify-between w-full">
            <div className="text-center">
              <p className="text-2xl font-bold">{depDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-sm text-muted-foreground">{flight.departureCity}</p>
            </div>
            
            <div className="flex flex-col items-center px-4 w-full max-w-[200px]">
              <div className="flex items-center text-xs text-muted-foreground mb-1 gap-1">
                <Clock className="w-3 h-3" /> {flight.duration}
              </div>
              <div className="relative w-full h-[2px] bg-border rounded">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-background p-1 text-primary">
                  <PlaneTakeoff className="w-4 h-4" />
                </div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-background p-1 text-primary">
                  <PlaneLanding className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Non-stop</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold">{arrDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-sm text-muted-foreground">{flight.arrivalCity}</p>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex flex-col items-end w-full md:w-1/5 gap-2 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
            <p className="text-3xl font-bold text-primary">${flight.price}</p>
            <Button onClick={() => onBook(flight.id)} className="w-full">
              Select
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
