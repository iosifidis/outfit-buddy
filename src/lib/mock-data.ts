import type { ClothingItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const mockClothingItems: ClothingItem[] = [
  { id: '1', userId: 'user1', imageUrl: getImage('item1'), color: 'Blue', fabric: 'Cotton', pattern: 'Solid', season: 'Spring', length: 'Mini', category: 'Top', occasion: 'Casual', description: 'Blue cotton t-shirt', lastWorn: null },
  { id: '2', userId: 'user1', imageUrl: getImage('item2'), color: 'Black', fabric: 'Denim', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Bottom', occasion: 'Casual', description: 'Black denim jeans', lastWorn: '2023-10-15' },
  { id: '3', userId: 'user1', imageUrl: getImage('item3'), color: 'White', fabric: 'Leather', pattern: 'Solid', season: 'Summer', length: 'Mini', category: 'Shoes', occasion: 'Casual', description: 'White leather sneakers', lastWorn: '2023-10-20' },
  { id: '4', userId: 'user1', imageUrl: getImage('item4'), color: 'Red', fabric: 'Silk', pattern: 'Floral', season: 'Summer', length: 'Mini', category: 'Top', occasion: 'Party', description: 'Red silk blouse', lastWorn: null },
  { id: '5', userId: 'user1', imageUrl: getImage('item5'), color: 'Gray', fabric: 'Wool', pattern: 'Solid', season: 'Winter', length: 'Long', category: 'Bottom', occasion: 'Business', description: 'Gray wool trousers', lastWorn: '2023-09-01' },
  { id: '6', userId: 'user1', imageUrl: getImage('item6'), color: 'Black', fabric: 'Leather', pattern: 'Solid', season: 'Winter', length: 'Mini', category: 'Shoes', occasion: 'Business', description: 'Black leather heels', lastWorn: null },
  { id: '7', userId: 'user1', imageUrl: getImage('item7'), color: 'Beige', fabric: 'Cotton', pattern: 'Solid', season: 'Autumn', length: 'Maxi', category: 'Outerwear', occasion: 'Everyday', description: 'Classic beige trench coat', lastWorn: '2023-10-22' },
  { id: '8', userId: 'user1', imageUrl: getImage('item8'), color: 'Green', fabric: 'Fleece', pattern: 'Solid', season: 'Winter', length: 'Long', category: 'Top', occasion: 'Casual', description: 'Cozy green hoodie', lastWorn: '2023-10-28' },
  { id: '9', userId: 'user1', imageUrl: getImage('item9'), color: 'Blue', fabric: 'Denim', pattern: 'Distressed', season: 'Summer', length: 'Mini', category: 'Bottom', occasion: 'Casual', description: 'Light-wash denim shorts', lastWorn: '2023-08-15' },
  { id: '10', userId: 'user1', imageUrl: getImage('item10'), color: 'Brown', fabric: 'Leather', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Shoes', occasion: 'Everyday', description: 'Stylish brown leather boots', lastWorn: null },
];
