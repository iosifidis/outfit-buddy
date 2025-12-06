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
      favoritesOnly: z.boolean().optional().describe('If true, returns only the items the user has marked as favorite.'),
    }),
    outputSchema: z.array(ClothingItemSchema),
  },
  async ({ userId, favoritesOnly }) => {
    // In a real app, you would fetch this from a database
    let items = mockClothingItems.filter(item => item.userId === userId);
    if (favoritesOnly) {
      items = items.filter(item => item.isFavorite);
    }
    return items;
  }
);
