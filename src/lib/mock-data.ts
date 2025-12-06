import type { ClothingItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const mockClothingItems: ClothingItem[] = [
  { id: '1', userId: 'user1', imageUrl: getImage('item1'), color: 'Blue', fabric: 'Cotton', pattern: 'Floral', season: 'Spring', length: 'Mini', category: 'Top', occasion: 'Casual', description: 'Blue Floral Blouse', lastWorn: null },
  { id: '2', userId: 'user1', imageUrl: getImage('item2'), color: 'Black', fabric: 'Denim', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Bottom', occasion: 'Casual', description: 'Black Skinny Jeans', lastWorn: '2023-10-15' },
  { id: '3', userId: 'user1', imageUrl: getImage('item3'), color: 'White', fabric: 'Canvas', pattern: 'Solid', season: 'Summer', length: 'Mini', category: 'Shoes', occasion: 'Casual', description: 'White Canvas Sneakers', lastWorn: '2023-10-20' },
  { id: '4', userId: 'user1', imageUrl: getImage('item4'), color: 'Red', fabric: 'Cotton', pattern: 'Solid', season: 'Summer', length: 'Midi', category: 'Top', occasion: 'Party', description: 'Red Summer Dress', lastWorn: null },
  { id: '5', userId: 'user1', imageUrl: getImage('item5'), color: 'Gray', fabric: 'Wool', pattern: 'Plaid', season: 'Winter', length: 'Mini', category: 'Bottom', occasion: 'Business', description: 'Gray Plaid Skirt', lastWorn: '2023-09-01' },
  { id: '6', userId: 'user1', imageUrl: getImage('item6'), color: 'Black', fabric: 'Leather', pattern: 'Solid', season: 'Winter', length: 'Mini', category: 'Shoes', occasion: 'Business', description: 'Black Ankle Boots', lastWorn: null },
  { id: '7', userId: 'user1', imageUrl: getImage('item7'), color: 'Beige', fabric: 'Cotton', pattern: 'Solid', season: 'Autumn', length: 'Maxi', category: 'Outerwear', occasion: 'Everyday', description: 'Classic Beige Trench Coat', lastWorn: '2023-10-22' },
  { id: '8', userId: 'user1', imageUrl: getImage('item8'), color: 'Olive', fabric: 'Knit', pattern: 'Solid', season: 'Winter', length: 'Long', category: 'Top', occasion: 'Casual', description: 'Olive Green Knit Sweater', lastWorn: '2023-10-28' },
  { id: '9', userId: 'user1', imageUrl: getImage('item9'), color: 'Blue', fabric: 'Denim', pattern: 'Solid', season: 'Summer', length: 'Mini', category: 'Bottom', occasion: 'Casual', description: 'High-waisted Denim Shorts', lastWorn: '2023-08-15' },
  { id: '10', userId: 'user1', imageUrl: getImage('item10'), color: 'Brown', fabric: 'Leather', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Accessory', occasion: 'Everyday', description: 'Brown Leather Crossbody Bag', lastWorn: null },
];
