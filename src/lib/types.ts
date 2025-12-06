import type { ClothingItem as AIClothingItem } from '@/ai/flows/suggest-outfit-flow';

export type User = {
  uid: string;
  name?: string | null;
  email?: string | null;
  stylePreferences?: string[];
};

export type ClothingItem = AIClothingItem;

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
};
