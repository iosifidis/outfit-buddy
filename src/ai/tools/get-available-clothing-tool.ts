'use server';
/**
 * @fileOverview Defines a Genkit tool for retrieving a user's available clothing items.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { mockClothingItems } from '@/lib/mock-data';
import { ClothingItemSchema } from '@/lib/types';

export const getAvailableClothing = ai.defineTool(
  {
    name: 'getAvailableClothing',
    description: "Returns a list of available clothing items for the user. These are women's clothes.",
    inputSchema: z.object({
      userId: z.string(),
    }),
    outputSchema: z.array(ClothingItemSchema),
  },
  async ({ userId }) => {
    // In a real app, you would fetch this from a database
    // For now, we'll just filter the mock data.
    return mockClothingItems.filter(item => item.userId === userId);
  }
);
