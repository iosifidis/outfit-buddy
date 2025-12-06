'use server';
/**
 * @fileOverview Defines a Genkit tool for retrieving a user's available clothing items.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { ClothingItemSchema } from '@/lib/types';

export const getAvailableClothing = ai.defineTool(
  {
    name: 'getAvailableClothing',
    description: "Returns a list of available clothing items for the user from the provided list. These are women's clothes.",
    inputSchema: z.object({
      wardrobeItems: z.array(ClothingItemSchema),
      favoritesOnly: z.boolean().optional().describe('If true, returns only the items the user has marked as favorite.'),
    }),
    outputSchema: z.array(ClothingItemSchema),
  },
  async ({ wardrobeItems, favoritesOnly }) => {
    let items = wardrobeItems;
    if (favoritesOnly) {
      items = items.filter(item => item.isFavorite);
    }
    return items;
  }
);
