'use client';

import { useState, useCallback } from 'react';
import { mockClothingItems } from '@/lib/mock-data';
import type { ClothingItem } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

// This is a simple in-memory store. In a real app, you'd use React Context,
// Zustand, or fetch/mutate data from a server.
let wardrobeItems: ClothingItem[] = mockClothingItems.filter(item => item.userId === 'user1');

// Listeners to update components when data changes.
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach(listener => listener());
}

export function useWardrobe() {
  const [items, setItems] = useState<ClothingItem[]>(wardrobeItems);

  useState(() => {
    const onStoreChange = () => {
      setItems([...wardrobeItems]); // Create a new array to trigger re-render
    };
    listeners.add(onStoreChange);
    return () => {
      listeners.delete(onStoreChange);
    };
  });

  const handleItemAdded = useCallback((newItemData: Omit<ClothingItem, 'id' | 'userId'>) => {
    const newItem: ClothingItem = {
      id: (wardrobeItems.length + 1).toString(),
      userId: 'user1',
      ...newItemData,
    };
    wardrobeItems = [...wardrobeItems, newItem];
    toast({
      title: 'Item Added!',
      description: `${newItem.description} has been added to your wardrobe.`,
    });
    notifyListeners();
  }, []);

  const handleItemDeleted = useCallback((itemId: string) => {
    const itemToDelete = wardrobeItems.find(item => item.id === itemId);
    if (itemToDelete) {
        wardrobeItems = wardrobeItems.filter(item => item.id !== itemId);
        toast({
            title: 'Item Deleted',
            description: `${itemToDelete.description} has been removed.`,
            variant: 'destructive',
        });
        notifyListeners();
    }
  }, []);

  const handleToggleFavorite = useCallback((itemId: string) => {
    let itemTitle = '';
    let isNowFavorite: boolean | undefined = false;
    
    wardrobeItems = wardrobeItems.map(item => {
      if (item.id === itemId) {
        itemTitle = item.description;
        isNowFavorite = !item.isFavorite;
        return { ...item, isFavorite: isNowFavorite };
      }
      return item;
    });

    toast({
      title: isNowFavorite ? 'Added to Favorites' : 'Removed from Favorites',
      description: `${itemTitle} has been ${isNowFavorite ? 'added to' : 'removed from'} your favorites.`,
    });

    notifyListeners();
  }, []);

  const favoriteItems = items.filter(item => item.isFavorite);

  return {
    allItems: items,
    favoriteItems,
    handleItemAdded,
    handleItemDeleted,
    handleToggleFavorite,
  };
}
