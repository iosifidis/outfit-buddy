'use client';

import { AppLayout } from '@/components/AppLayout';
import { WardrobeGrid } from '@/components/wardrobe/WardrobeGrid';
import { useWardrobe } from '@/hooks/use-wardrobe';

export default function FavoritesPage() {
  const { favoriteItems, handleItemDeleted, handleToggleFavorite } = useWardrobe();

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
