import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Building } from 'lucide-react';

export const metadata = {
  title: 'Travel | GlobeLynk',
  description: 'Book flights and hotels for your next adventure.',
};

export default function TravelHubPage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto py-8 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">
          Plan Your Next Adventure
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the world with GlobeLynk. Book flights to your favorite destinations and find the perfect place to stay.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="hover:shadow-xl transition-shadow border-muted">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
              <Plane className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Book Flights</CardTitle>
            <CardDescription className="text-base">
              Find the best deals on flights worldwide. Compare airlines and book your journey seamlessly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/travel/flights">Search Flights</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow border-muted">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
              <Building className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Book Hotels</CardTitle>
            <CardDescription className="text-base">
              Discover comfortable and luxurious stays. From cozy inns to 5-star resorts, we have it all.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/travel/hotels">Search Hotels</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
