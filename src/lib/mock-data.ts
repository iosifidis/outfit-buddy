
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

export const mockClothingItems: ClothingItem[] = [
  createMockItem('1', 'item1', 'Top', { color: 'White', fabric: 'Silk', occasion: 'Business', formal: 8, warmth: 3, relaxed: 4, lastWorn: '2024-07-15T12:00:00.000Z', isFavorite: true }),
  createMockItem('2', 'item2', 'Bottom', { color: 'Black', fabric: 'Wool', occasion: 'Business', formal: 9, warmth: 6, relaxed: 2, lastWorn: '2024-07-20T12:00:00.000Z' }),
  createMockItem('3', 'item3', 'Shoes', { color: 'Black', fabric: 'Leather', occasion: 'Business', formal: 8, warmth: 2, relaxed: 3 }),
  createMockItem('4', 'item4', 'Top', { color: 'Red', fabric: 'Cotton', season: 'Summer', occasion: 'Casual', warmth: 2, relaxed: 8, isFavorite: true }),
  createMockItem('5', 'item5', 'Bottom', { color: 'Gray', pattern: 'Plaid', occasion: 'Casual', formal: 4, warmth: 5, relaxed: 6, lastWorn: '2024-06-10T12:00:00.000Z' }),
  createMockItem('6', 'item6', 'Shoes', { color: 'Black', fabric: 'Leather', occasion: 'Casual', warmth: 4, relaxed: 5 }),
  createMockItem('7', 'item7', 'Outerwear', { color: 'Beige', fabric: 'Gabardine', season: 'Spring', occasion: 'Business', formal: 7, warmth: 5, relaxed: 4, isFavorite: true }),
  createMockItem('8', 'item8', 'Top', { color: 'Olive Green', fabric: 'Knit', season: 'Autumn', warmth: 7, relaxed: 7 }),
  createMockItem('9', 'item9', 'Bottom', { color: 'Blue', fabric: 'Denim', season: 'Summer', occasion: 'Casual', relaxed: 9, warmth: 2, lastWorn: '2024-07-22T12:00:00.000Z' }),
  createMockItem('10', 'item10', 'Accessory', { color: 'Brown', fabric: 'Leather', occasion: 'Casual' }),
  createMockItem('11', 'item11', 'Outerwear', { color: 'Blue', fabric: 'Denim', season: 'Spring', occasion: 'Casual', warmth: 4, relaxed: 8 }),
  createMockItem('12', 'item12', 'Shoes', { color: 'White', fabric: 'Canvas', season: 'Summer', occasion: 'Casual', warmth: 1, relaxed: 9, isFavorite: false }),
];

export const mockShopItems: ClothingItem[] = [
  createMockItem('s1', 'item13', 'Accessory', { userId: 'shop', color: 'Gold', occasion: 'Party', formal: 7 }),
  createMockItem('s2', 'item14', 'Bottom', { userId: 'shop', color: 'Pink', fabric: 'Satin', season: 'Summer', occasion: 'Party', formal: 6, warmth: 2, relaxed: 5 }),
  createMockItem('s3', 'item15', 'Top', { userId: 'shop', color: 'Black', fabric: 'Cotton', occasion: 'Casual', relaxed: 8 }),
  createMockItem('s4', 'item16', 'Outerwear', { userId: 'shop', color: 'Black', fabric: 'Wool', season: 'Winter', occasion: 'Formal', formal: 9, warmth: 9, relaxed: 3 }),
  createMockItem('s5', 'item5', 'Bottom', { userId: 'shop', color: 'Gray', pattern: 'Plaid', occasion: 'Casual', formal: 4, warmth: 5, relaxed: 6 }),
  createMockItem('s6', 'item8', 'Top', { userId: 'shop', color: 'Olive Green', fabric: 'Knit', season: 'Autumn', warmth: 7, relaxed: 7 }),
];

export const mockOutfitHistory: Omit<OutfitHistory, 'userId'>[] = [
  {
    id: '1',
    date: new Date('2024-07-22T12:00:00.000Z'),
    selectedItems: [mockClothingItems[8], mockClothingItems[3], mockClothingItems[11]],
    notes: 'A bit chilly today, the denim jacket was a good call.'
  },
  {
    id: '2',
    date: new Date('2024-07-20T12:00:00.000Z'),
    selectedItems: [mockClothingItems[1], mockClothingItems[0], mockClothingItems[2]],
    notes: 'Important meeting. Felt confident in the business outfit.'
  },
   {
    id: '3',
    date: new Date('2024-06-10T12:00:00.000Z'),
    selectedItems: [mockClothingItems[4], mockClothingItems[7], mockClothingItems[5]],
    notes: 'Casual Friday, perfect for the plaid skirt.'
  },
];
