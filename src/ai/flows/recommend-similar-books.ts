'use server';

/**
 * @fileOverview A flow for recommending similar books based on a given book's description.
 *
 * - recommendSimilarBooks - A function that takes a book description and returns a list of similar book recommendations.
 * - RecommendSimilarBooksInput - The input type for the recommendSimilarBooks function.
 * - RecommendSimilarBooksOutput - The return type for the recommendSimilarBooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSimilarBooksInputSchema = z.object({
  description: z.string().describe('The description of the book to find similar books for.'),
});
export type RecommendSimilarBooksInput = z.infer<typeof RecommendSimilarBooksInputSchema>;

const RecommendSimilarBooksOutputSchema = z.array(
  z.string().describe('A recommended similar book.')
).describe('A list of recommended similar books.');
export type RecommendSimilarBooksOutput = z.infer<typeof RecommendSimilarBooksOutputSchema>;

export async function recommendSimilarBooks(input: RecommendSimilarBooksInput): Promise<RecommendSimilarBooksOutput> {
  return recommendSimilarBooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSimilarBooksPrompt',
  input: {schema: RecommendSimilarBooksInputSchema},
  output: {schema: RecommendSimilarBooksOutputSchema},
  prompt: `You are a book recommendation expert. Given the description of a book, you will provide a list of 3 similar book recommendations.

Book Description: {{{description}}}

Similar Book Recommendations:`,
});

const recommendSimilarBooksFlow = ai.defineFlow(
  {
    name: 'recommendSimilarBooksFlow',
    inputSchema: RecommendSimilarBooksInputSchema,
    outputSchema: RecommendSimilarBooksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
