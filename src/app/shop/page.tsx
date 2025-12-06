
'use client';

import { useMemo } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { WardrobeGrid } from '@/components/wardrobe/WardrobeGrid';
import { useWardrobe } from '@/hooks/use-wardrobe';
import { mockShopItems } from '@/lib/mock-data';
import type { ClothingItem } from '@/lib/types';

export default function ShopPage() {
  const { favoriteItems, allItems } = useWardrobe();

  const recommendedItems = useMemo(() => {
    if (favoriteItems.length === 0) {
      // If no favorites, recommend a few popular items from the shop
      return mockShopItems.slice(0, 6);
    }

    const favoriteCategories = new Set(favoriteItems.map(item => item.category));
    const userItemIds = new Set(allItems.map(item => item.id));

    const recommendations = mockShopItems.filter(shopItem => {
      // Don't recommend items the user already has
      if (userItemIds.has(shopItem.id)) {
        return false;
      }
      // Recommend items from the user's favorite categories
      return favoriteCategories.has(shopItem.category);
    });

    // Fallback to popular items if no recommendations found
    if (recommendations.length === 0) {
      return mockShopItems.slice(0, 6).filter(item => !userItemIds.has(item.id));
    }
    
    return recommendations;
  }, [favoriteItems, allItems]);
  
  // Dummy functions for the WardrobeGrid, as these actions don't apply in the shop
  const handleDummyAction = (itemId: string) => {};

  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Shop Recommendations</h1>
            <p className="text-muted-foreground">
              Based on your favorites, here are some items you might like.
            </p>
          </div>
        </div>
        
        {recommendedItems.length === 0 ? (
           <div className="text-center py-12 text-muted-foreground">
             <p>No recommendations for you at the moment.</p>
             <p className="text-sm">Explore and favorite more items to get better recommendations.</p>
           </div>
        ) : (
          <WardrobeGrid items={recommendedItems} onItemDeleted={handleDummyAction} onToggleFavorite={handleDummyAction} />
        )}
      </div>
    </AppLayout>
  );
}
