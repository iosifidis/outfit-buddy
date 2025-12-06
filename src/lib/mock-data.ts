
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
  createMockItem('1', 'item1', 'Top', {
    color: 'White',
    fabric: 'Silk',
    occasion: 'Business',
    formal: 8,
    isFavorite: true,
  }),
  createMockItem('2', 'item2', 'Bottom', {
    color: 'Black',
    fabric: 'Wool',
    occasion: 'Business',
    formal: 9,
    lastWorn: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  }),
  createMockItem('3', 'item3', 'Shoes', { color: 'Black', fabric: 'Leather', occasion: 'Business', formal: 8 }),
  createMockItem('4', 'item4', 'Bottom', {
    color: 'Red',
    fabric: 'Cotton',
    season: 'Summer',
    occasion: 'Party',
    isFavorite: true,
    lastWorn: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  }),
  createMockItem('5', 'item5', 'Bottom', { color: 'Gray', pattern: 'Plaid', season: 'Autumn', isFavorite: true }),
  createMockItem('6', 'item6', 'Shoes', {
    color: 'Black',
    fabric: 'Leather',
    season: 'Winter',
    lastWorn: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
  }),
  createMockItem('7', 'item7', 'Outerwear', { color: 'Beige', fabric: 'Gabardine', season: 'Spring' }),
  createMockItem('8', 'item8', 'Top', { color: 'Olive', fabric: 'Wool', season: 'Winter', isFavorite: true }),
  createMockItem('9', 'item9', 'Bottom', { color: 'Blue', fabric: 'Denim', season: 'Summer' }),
  createMockItem('10', 'item10', 'Accessory', { color: 'Brown', fabric: 'Leather' }),
  createMockItem('11', 'item11', 'Outerwear', { color: 'Blue', fabric: 'Denim', isFavorite: false }),
  createMockItem('12', 'item12', 'Shoes', { color: 'White', fabric: 'Canvas', occasion: 'Casual' }),
  createMockItem('13', 'item13', 'Accessory', { color: 'Gold', fabric: 'Metal', occasion: 'Party' }),
  createMockItem('14', 'item14', 'Bottom', {
    color: 'Pink',
    fabric: 'Satin',
    occasion: 'Party',
    season: 'Spring',
    isFavorite: false,
  }),
  createMockItem('15', 'item15', 'Top', { color: 'Black', fabric: 'Cotton', pattern: 'Graphic' }),
  createMockItem('16', 'item16', 'Outerwear', {
    color: 'Black',
    fabric: 'Wool',
    season: 'Winter',
    formal: 9,
    isFavorite: true,
  }),
];

// For the shop, we can create a few items that don't exist in the user's wardrobe
export const mockShopItems: ClothingItem[] = [
  { ...createMockItem('shop1', 'item11', 'Outerwear'), userId: 'shop' },
  { ...createMockItem('shop2', 'item12', 'Shoes'), userId: 'shop' },
  { ...createMockItem('shop3', 'item13', 'Accessory'), userId: 'shop' },
  { ...createMockItem('shop4', 'item14', 'Bottom'), userId: 'shop' },
  { ...createMockItem('shop5', 'item15', 'Top'), userId: 'shop' },
  { ...createMockItem('shop6', 'item16', 'Outerwear'), userId: 'shop' },
];

export const mockOutfitHistory: Omit<OutfitHistory, 'userId'>[] = [
  {
    id: 'hist1',
    date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
    selectedItems: [mockClothingItems[0], mockClothingItems[1], mockClothingItems[2]],
    notes: 'Important business review. Wanted to look sharp but comfortable.'
  },
  {
    id: 'hist2',
    date: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
    selectedItems: [mockClothingItems[3], mockClothingItems[4], mockClothingItems[5]],
    notes: 'Casual Friday, grabbing coffee with the team.'
  },
];
