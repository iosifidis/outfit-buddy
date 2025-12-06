'use client';

import {z} from 'zod';

export const ClothingItemSchema = z.object({
  id: z.string().describe('The UUID of the clothing item'),
  userId: z.string().describe('Foreign Key referencing the user'),
  imageUrl: z.string().describe('URL of the clothing item image'),
  color: z.string().describe('Color of the clothing item'),
  fabric: z.string().describe('Fabric of the clothing item'),
  pattern: z.string().describe('Pattern of the clothing item'),
  season: z.enum(['Spring', 'Summer', 'Autumn', 'Winter']).describe('Season for which the clothing item is suitable'),
  length: z.enum(['Mini', 'Midi', 'Maxi', 'Long']).describe('Length of the clothing item'),
  category: z.enum(['Top', 'Bottom', 'Shoes', 'Outerwear', 'Accessory']).describe('Category of the clothing item (e.g., Top, Bottom, Shoes, Outerwear)'),
  occasion: z.string().describe('Occasion for which the clothing item is suitable'),
  description: z.string().describe('Description of the clothing item'),
  lastWorn: z.string().nullable().describe('Date the item was last worn'),
  formal: z.number().optional(),
  warmth: z.number().optional(),
  relaxed: z.number().optional(),
  isFavorite: z.boolean().optional(),
});

export type User = {
  uid: string;
  name?: string | null;
  email?: string | null;
  stylePreferences?: string[];
};

export type ClothingItem = z.infer<typeof ClothingItemSchema>;

export const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'] as const;
export type Season = (typeof SEASONS)[number];

export const LENGTHS = ['Mini', 'Midi', 'Maxi', 'Long'] as const;
export type Length = (typeof LENGTHS)[number];

export const CATEGORIES = ['Top', 'Bottom', 'Shoes', 'Outerwear', 'Accessory'] as const;
export type Category = (typeof CATEGORIES)[number];

export type OutfitHistory = {
  id: string;
  userId: string;
  date: Date;
  selectedItems: ClothingItem[];
  notes?: string;
};
