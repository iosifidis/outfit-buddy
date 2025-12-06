
import type { ClothingItem } from './types';
import { OutfitHistory } from './types';
import { PlaceHolderImages } from './placeholder-images';

function createMockItem(
  id: string,
  placeholderId: string,
  category: ClothingItem['category'],
  overrides: Partial<ClothingItem> = {}
): ClothingItem {
  const placeholder = PlaceHolderImages.find(p => p.id === placeholderId);
  if (!placeholder) {
    throw new Error(`Placeholder image with id "${placeholderId}" not found.`);
  }

  const defaults: Omit<ClothingItem, 'id' | 'imageUrl' | 'description' | 'category'> = {
    userId: 'user1',
    color: 'Mixed',
    fabric: 'Cotton',
    pattern: 'Solid',
    season: 'Autumn',
    length: 'Long',
    occasion: 'Casual',
    lastWorn: null,
    formal: Math.floor(Math.random() * 2) + 4, // 4-5
    warmth: Math.floor(Math.random() * 3) + 2, // 2-4
    relaxed: Math.floor(Math.random() * 3) + 6, // 6-8
    isFavorite: false,
  };

  return {
    id,
    imageUrl: placeholder.imageUrl,
    description: placeholder.description,
    category,
    ...defaults,
    ...overrides,
  };
}

export const mockClothingItems: ClothingItem[] = [];

export const mockShopItems: ClothingItem[] = [];

export const mockOutfitHistory: Omit<OutfitHistory, 'userId'>[] = [];
