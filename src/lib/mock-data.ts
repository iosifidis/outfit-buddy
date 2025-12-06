
import type { ClothingItem } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { OutfitHistory } from './types';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const mockClothingItems: ClothingItem[] = [
  { id: '1', userId: 'user1', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-2998395971-59cfc.appspot.com/o/defaults%2Fclassic-white-tee.png?alt=media', color: 'White', fabric: 'Cotton', pattern: 'Solid', season: 'Summer', length: 'Long', category: 'Top', occasion: 'Casual', description: 'Classic White Tee', lastWorn: '2023-10-15', formal: 2, warmth: 1, relaxed: 10, isFavorite: true },
  { id: '2', userId: 'user1', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-2998395971-59cfc.appspot.com/o/defaults%2Fcozy-black-hoodie.png?alt=media', color: 'Black', fabric: 'Fleece', pattern: 'Solid', season: 'Winter', length: 'Long', category: 'Outerwear', occasion: 'Casual', description: 'Cozy Black Hoodie', lastWorn: '2023-10-20', formal: 1, warmth: 7, relaxed: 9, isFavorite: false },
  { id: '3', userId: 'user1', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-2998395971-59cfc.appspot.com/o/defaults%2Fstandard-blue-jeans.png?alt=media', color: 'Blue', fabric: 'Denim', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Bottom', occasion: 'Casual', description: 'Standard Blue Jeans', lastWorn: null, formal: 4, warmth: 5, relaxed: 6, isFavorite: true },
  { id: '4', userId: 'user1', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-2998395971-59cfc.appspot.com/o/defaults%2Foffice-chinos.png?alt=media', color: 'Beige', fabric: 'Cotton Twill', pattern: 'Solid', season: 'Spring', length: 'Long', category: 'Bottom', occasion: 'Business', description: 'Office Chinos', lastWorn: '2023-09-01', formal: 8, warmth: 3, relaxed: 5, isFavorite: false },
  { id: '5', userId: 'user1', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-2998395971-59cfc.appspot.com/o/defaults%2Fstreet-sneakers.png?alt=media', color: 'White', fabric: 'Leather', pattern: 'Solid', season: 'Spring', length: 'Long', category: 'Shoes', occasion: 'Casual', description: 'Street Sneakers', lastWorn: null, formal: 3, warmth: 4, relaxed: 9, isFavorite: false },
  { id: '6', userId: 'user1', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-2998395971-59cfc.appspot.com/o/defaults%2Fwinter-boots.png?alt=media', color: 'Brown', fabric: 'Leather', pattern: 'Solid', season: 'Winter', length: 'Long', category: 'Shoes', occasion: 'Everyday', description: 'Winter Boots', lastWorn: '2023-10-22', formal: 5, warmth: 9, relaxed: 4, isFavorite: true },
  { id: '7', userId: 'user1', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-2998395971-59cfc.appspot.com/o/defaults%2Fvintage-jacket.png?alt=media', color: 'Brown', fabric: 'Denim', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Outerwear', occasion: 'Casual', description: 'Vintage Jacket', lastWorn: '2023-10-28', formal: 2, warmth: 6, relaxed: 8, isFavorite: false },
  { id: '8', userId: 'user1', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-2998395971-59cfc.appspot.com/o/defaults%2Foxford-shirt.png?alt=media', color: 'Blue', fabric: 'Cotton', pattern: 'Solid', season: 'Spring', length: 'Long', category: 'Top', occasion: 'Business', description: 'Oxford Shirt', lastWorn: '2023-08-15', formal: 9, warmth: 2, relaxed: 3, isFavorite: false },
  { id: '9', userId: 'user1', imageUrl: getImage('item10'), color: 'Brown', fabric: 'Leather', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Accessory', occasion: 'Everyday', description: 'Brown Leather Crossbody Bag', lastWorn: null, formal: 4, warmth: 3, relaxed: 7, isFavorite: false },
  { id: '10', userId: 'user1', imageUrl: getImage('item11'), color: 'Blue', fabric: 'Denim', pattern: 'Solid', season: 'Spring', length: 'Long', category: 'Outerwear', occasion: 'Casual', description: 'Classic Denim Jacket', lastWorn: '2023-10-18', formal: 2, warmth: 4, relaxed: 8, isFavorite: true },
  { id: '11', userId: 'user1', imageUrl: getImage('item13'), color: 'Gold', fabric: 'Metal', pattern: 'Solid', season: 'Spring', length: 'Long', category: 'Accessory', occasion: 'Party', description: 'Gold Statement Necklace', lastWorn: null, formal: 7, warmth: 0, relaxed: 2, isFavorite: false },
  { id: '12', userId: 'user1', imageUrl: getImage('item14'), color: 'Pink', fabric: 'Satin', pattern: 'Solid', season: 'Summer', length: 'Midi', category: 'Bottom', occasion: 'Party', description: 'Pink Satin Midi Skirt', lastWorn: '2023-07-20', formal: 8, warmth: 2, relaxed: 4, isFavorite: true },
];

export const mockShopItems: ClothingItem[] = [
    { id: 'shop1', userId: 'shop', imageUrl: getImage('item1'), color: 'Cream', fabric: 'Silk', pattern: 'Solid', season: 'Spring', length: 'Long', category: 'Top', occasion: 'Evening', description: 'Elegant Silk Blouse', lastWorn: null, formal: 9, warmth: 2, relaxed: 3, isFavorite: false },
    { id: 'shop2', userId: 'shop', imageUrl: getImage('item4'), color: 'Red', fabric: 'Cotton', pattern: 'Floral', season: 'Summer', length: 'Maxi', category: 'Outerwear', occasion: 'Beach', description: 'Flowy Red Dress', lastWorn: null, formal: 3, warmth: 1, relaxed: 9, isFavorite: false },
    { id: 'shop3', userId: 'shop', imageUrl: getImage('item5'), color: 'Grey', fabric: 'Wool', pattern: 'Plaid', season: 'Autumn', length: 'Mini', category: 'Bottom', occasion: 'School', description: 'Plaid Mini Skirt', lastWorn: null, formal: 5, warmth: 5, relaxed: 6, isFavorite: false },
    { id: 'shop4', userId: 'shop', imageUrl: getImage('item7'), color: 'Khaki', fabric: 'Cotton', pattern: 'Solid', season: 'Autumn', length: 'Long', category: 'Outerwear', occasion: 'Everyday', description: 'Classic Trench Coat', lastWorn: null, formal: 7, warmth: 6, relaxed: 4, isFavorite: false },
    { id: 'shop5', userId: 'shop', imageUrl: getImage('item8'), color: 'Green', fabric: 'Knit', pattern: 'Solid', season: 'Winter', length: 'Long', category: 'Top', occasion: 'Casual', description: 'Chunky Knit Sweater', lastWorn: null, formal: 2, warmth: 8, relaxed: 8, isFavorite: false },
    { id: 'shop6', userId: 'shop', imageUrl: getImage('item9'), color: 'Light Blue', fabric: 'Denim', pattern: 'Solid', season: 'Summer', length: 'Mini', category: 'Bottom', occasion: 'Casual', description: 'Denim Cutoff Shorts', lastWorn: null, formal: 1, warmth: 1, relaxed: 10, isFavorite: false },
    { id: 'shop7', userId: 'shop', imageUrl: getImage('item12'), color: 'White', fabric: 'Canvas', pattern: 'Solid', season: 'Spring', length: 'Long', category: 'Shoes', occasion: 'Casual', description: 'White Canvas Sneakers', lastWorn: null, formal: 2, warmth: 3, relaxed: 9, isFavorite: false },
    { id: 'shop8', userId: 'shop', imageUrl: getImage('item15'), color: 'Black', fabric: 'Cotton', pattern: 'Graphic', season: 'Summer', length: 'Long', category: 'Top', occasion: 'Casual', description: 'Graphic Band Tee', lastWorn: null, formal: 1, warmth: 2, relaxed: 10, isFavorite: false },
    { id: 'shop9', userId: 'shop', imageUrl: getImage('item16'), color: 'Navy', fabric: 'Wool', pattern: 'Solid', season: 'Winter', length: 'Long', category: 'Outerwear', occasion: 'Business', description: 'Wool Peacoat', lastWorn: null, formal: 8, warmth: 9, relaxed: 3, isFavorite: false },
];


export const mockOutfitHistory: Omit<OutfitHistory, 'userId'>[] = [
  {
    id: 'hist1',
    date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
    selectedItems: [mockClothingItems[7], mockClothingItems[3], mockClothingItems[4]],
    notes: 'Important business review. Wanted to look sharp but comfortable.'
  },
  {
    id: 'hist2',
    date: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
    selectedItems: [mockClothingItems[0], mockClothingItems[2], mockClothingItems[9]],
    notes: 'Casual Friday, grabbing coffee with the team.'
  },
    {
    id: 'hist3',
    date: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
    selectedItems: [mockClothingItems[1], mockClothingItems[6], mockClothingItems[5]],
    notes: 'A bit chilly today, went with a cozy and warm outfit for running errands.'
  },
];
