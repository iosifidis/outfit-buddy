import type { ClothingItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const mockClothingItems: ClothingItem[] = [
  { id: '1', userId: 'user1', imageUrl: getImage('item1'), color: 'White', fabric: 'Silk', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Top', occasion: 'Business', description: 'White Silk Blouse', lastWorn: null, formal: 8, warmth: 3, relaxed: 2 },
  { id: '2', userId: 'user1', imageUrl: getImage('item2'), color: 'Black', fabric: 'Wool', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Bottom', occasion: 'Business', description: 'Black Wool Trousers', lastWorn: '2023-10-15', formal: 9, warmth: 6, relaxed: 2 },
  { id: '3', userId: 'user1', imageUrl: getImage('item3'), color: 'Black', fabric: 'Leather', pattern: 'Solid', season: 'Autumn', length: 'Mini', category: 'Shoes', occasion: 'Business', description: 'Black Leather Loafers', lastWorn: '2023-10-20', formal: 8, warmth: 4, relaxed: 3 },
  { id: '4', userId: 'user1', imageUrl: getImage('item4'), color: 'Red', fabric: 'Cotton', pattern: 'Solid', season: 'Summer', length: 'Midi', category: 'Top', occasion: 'Party', description: 'Red Summer Dress', lastWorn: null, formal: 6, warmth: 2, relaxed: 6 },
  { id: '5', userId: 'user1', imageUrl: getImage('item5'), color: 'Gray', fabric: 'Wool', pattern: 'Plaid', season: 'Winter', length: 'Mini', category: 'Bottom', occasion: 'Business', description: 'Gray Plaid Skirt', lastWorn: '2023-09-01', formal: 7, warmth: 7, relaxed: 3 },
  { id: '6', userId: 'user1', imageUrl: getImage('item6'), color: 'Black', fabric: 'Leather', pattern: 'Solid', season: 'Winter', length: 'Mini', category: 'Shoes', occasion: 'Business', description: 'Black Ankle Boots', lastWorn: null, formal: 7, warmth: 6, relaxed: 4 },
  { id: '7', userId: 'user1', imageUrl: getImage('item7'), color: 'Beige', fabric: 'Cotton', pattern: 'Solid', season: 'Autumn', length: 'Maxi', category: 'Outerwear', occasion: 'Everyday', description: 'Classic Beige Trench Coat', lastWorn: '2023-10-22', formal: 6, warmth: 5, relaxed: 5 },
  { id: '8', userId: 'user1', imageUrl: getImage('item8'), color: 'Olive', fabric: 'Knit', pattern: 'Solid', season: 'Winter', length: 'Long', category: 'Top', occasion: 'Casual', description: 'Olive Green Knit Sweater', lastWorn: '2023-10-28', formal: 3, warmth: 8, relaxed: 8 },
  { id: '9', userId: 'user1', imageUrl: getImage('item9'), color: 'Blue', fabric: 'Denim', pattern: 'Solid', season: 'Summer', length: 'Mini', category: 'Bottom', occasion: 'Casual', description: 'High-waisted Denim Shorts', lastWorn: '203-08-15', formal: 1, warmth: 1, relaxed: 9 },
  { id: '10', userId: 'user1', imageUrl: getImage('item10'), color: 'Brown', fabric: 'Leather', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Accessory', occasion: 'Everyday', description: 'Brown Leather Crossbody Bag', lastWorn: null, formal: 4, warmth: 3, relaxed: 7 },
];
