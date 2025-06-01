'use client';

import { useState, useEffect } from 'react';
import { recommendSimilarBooks } from '@/ai/flows/recommend-similar-books';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Wand2 } from 'lucide-react';

interface AISimilarBooksProps {
  bookDescription: string;
  currentBookTitle: string;
}

const AISimilarBooks = ({ bookDescription, currentBookTitle }: AISimilarBooksProps) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!bookDescription) {
        setIsLoading(false);
        setError("Book description is not available to generate recommendations.");
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const result = await recommendSimilarBooks({ description: bookDescription });
        // Filter out the current book title if it appears in recommendations
        setRecommendations(result.filter(title => title.toLowerCase() !== currentBookTitle.toLowerCase()));
      } catch (err) {
        console.error("Failed to fetch AI recommendations:", err);
        setError("Could not load recommendations at this time.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [bookDescription, currentBookTitle]);

  return (
    <Card className="mt-12 bg-secondary/50 border-accent shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-accent flex items-center">
          <Wand2 className="mr-2 h-6 w-6" />
          You Might Also Like... (AI Picks)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-3/4 rounded" />
            ))}
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {!isLoading && !error && recommendations.length === 0 && (
          <p className="text-muted-foreground">No specific recommendations found at this moment.</p>
        )}
        {!isLoading && !error && recommendations.length > 0 && (
          <ul className="list-disc list-inside space-y-2 text-foreground">
            {recommendations.map((title, index) => (
              <li key={index} className="text-md">{title}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default AISimilarBooks;
