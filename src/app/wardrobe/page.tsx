'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { WardrobeGrid } from '@/components/wardrobe/WardrobeGrid';
import { AddItemForm } from '@/components/wardrobe/AddItemForm';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { ClothingItem } from '@/lib/types';
import { mockClothingItems } from '@/lib/mock-data';

export default function WardrobePage() {
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [items, setItems] = useState<ClothingItem[]>(mockClothingItems.filter(i => i.userId === 'user1'));
  const isLoading = false; // Will be implemented with real data fetching
  const error = null; // Will be implemented with real data fetching

  const handleItemAdded = (newItemData: Omit<ClothingItem, 'id' | 'userId'>) => {
    const newItem: ClothingItem = {
      ...newItemData,
      id: `new-${Date.now()}`, // temp id
      userId: 'user1',
    };
    setItems(prevItems => [newItem, ...prevItems]);
    setShowAddItemDialog(false);
  };


  return (
    <AppLayout>
      <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Wardrobe</h1>
          <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0">
               <DialogHeader className="p-6 pb-0">
                  <DialogTitle>Add a New Item to Your Wardrobe</DialogTitle>
               </DialogHeader>
               <div className="p-6">
                <AddItemForm onItemAdded={handleItemAdded} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
            <span>Loading your wardrobe...</span>
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center py-12 text-destructive">
            <p>Could not load your wardrobe. Please try again later.</p>
          </div>
        )}
        
        {!isLoading && !error && items && items.length === 0 && (
           <div className="text-center py-12 text-muted-foreground">
             <p>Your wardrobe is empty. Start by adding some items!</p>
           </div>
        )}

        {!isLoading && !error && items && items.length > 0 && (
          <WardrobeGrid items={items} />
        )}
      </div>
    </AppLayout>
  );
}
