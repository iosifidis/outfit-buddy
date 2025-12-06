'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { WardrobeGrid } from '@/components/wardrobe/WardrobeGrid';
import type { ClothingItem } from '@/lib/types';
import { mockClothingItems } from '@/lib/mock-data';

export default function FavoritesPage() {
  // NOTE: In a real app, this state would be managed globally (e.g., via Context or Zustand)
  // to ensure consistency between the wardrobe and favorites pages.
  // For now, we'll manage it locally on each page.
  const [items, setItems] = useState<ClothingItem[]>(mockClothingItems.filter(item => item.userId === 'user1'));
  
  const handleItemDeleted = (itemId: string) => {
    // This is a simplified delete for the mock data.
    // In a real app, you would also update the source of truth (database).
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleToggleFavorite = (itemId: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const favoriteItems = items.filter(item => item.isFavorite);

  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
        </div>
        
        {favoriteItems.length === 0 ? (
           <div className="text-center py-12 text-muted-foreground">
             <p>You haven't favorited any items yet.</p>
             <p className="text-sm">Click the heart on an item in your wardrobe to add it here.</p>
           </div>
        ) : (
          <WardrobeGrid items={favoriteItems} onItemDeleted={handleItemDeleted} onToggleFavorite={handleToggleFavorite} />
        )}
      </div>
    </AppLayout>
  );
}
