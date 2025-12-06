'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ClothingItem } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, addDoc, writeBatch } from 'firebase/firestore';
import { 
  addDocumentNonBlocking,
  deleteDocumentNonBlocking,
  updateDocumentNonBlocking
} from '@/firebase/non-blocking-updates';
import { mockClothingItems } from '@/lib/mock-data';


export function useWardrobe() {
  const { user } = useUser();
  const firestore = useFirestore();

  const clothingCollectionRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, `users/${user.uid}/clothingItems`);
  }, [firestore, user]);

  const { data: allItems, isLoading } = useCollection<ClothingItem>(clothingCollectionRef);
  
  const handleItemAdded = useCallback((newItemData: Omit<ClothingItem, 'id' | 'userId'>) => {
    if (!clothingCollectionRef || !user) return;
    const newItem = {
        userId: user!.uid,
        ...newItemData
    };
    addDocumentNonBlocking(clothingCollectionRef, newItem);
    toast({
      title: 'Item Added!',
      description: `${newItem.description} has been added to your wardrobe.`,
    });
  }, [clothingCollectionRef, user]);

  const handleItemDeleted = useCallback((itemId: string) => {
    if (!firestore || !user) return;
    const itemToDelete = allItems?.find(item => item.id === itemId);
    if (itemToDelete) {
        const docRef = doc(firestore, `users/${user.uid}/clothingItems`, itemId);
        deleteDocumentNonBlocking(docRef);
        toast({
            title: 'Item Deleted',
            description: `${itemToDelete.description} has been removed.`,
            variant: 'destructive',
        });
    }
  }, [firestore, user, allItems]);

  const handleToggleFavorite = useCallback((itemId: string) => {
    if (!firestore || !user || !allItems) return;
    
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;

    const docRef = doc(firestore, `users/${user.uid}/clothingItems`, itemId);
    const newIsFavorite = !item.isFavorite;
    updateDocumentNonBlocking(docRef, { isFavorite: newIsFavorite });
    
    toast({
      title: newIsFavorite ? 'Added to Favorites' : 'Removed from Favorites',
      description: `${item.description} has been ${newIsFavorite ? 'added to' : 'removed from'} your favorites.`,
    });

  }, [firestore, user, allItems]);

  const handleSeedDatabase = useCallback(async () => {
    if (!firestore || !user || !clothingCollectionRef) return;
    
    const batch = writeBatch(firestore);
    mockClothingItems.forEach(item => {
        // We use the mock item's ID for the new document ID to maintain consistency
        const docRef = doc(clothingCollectionRef, item.id);
        const itemWithUserId = { ...item, userId: user.uid };
        batch.set(docRef, itemWithUserId);
    });

    try {
        await batch.commit();
        toast({
            title: "Wardrobe Seeded!",
            description: "Your sample wardrobe has been added to the database.",
        });
    } catch (error) {
        console.error("Error seeding database:", error);
        toast({
            variant: "destructive",
            title: "Seeding Failed",
            description: "Could not add sample items to the database.",
        });
    }
}, [firestore, user, clothingCollectionRef]);

  const favoriteItems = useMemo(() => (allItems || []).filter(item => item.isFavorite), [allItems]);

  return {
    allItems: allItems || [],
    isLoading,
    favoriteItems,
    handleItemAdded,
    handleItemDeleted,
    handleToggleFavorite,
    handleSeedDatabase,
  };
}
