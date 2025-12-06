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
  const [items, setItems] = useState<ClothingItem[]>(mockClothingItems.filter(item => item.userId === 'user1'));
  
  const handleItemAdded = (newItemData: Omit<ClothingItem, 'id' | 'userId'>) => {
    const newItem: ClothingItem = {
      id: (items.length + 1).toString(),
      userId: 'user1',
      ...newItemData,
    };
    setItems(prevItems => [...prevItems, newItem]);
    setShowAddItemDialog(false);
  };

  const handleItemDeleted = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
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
        
        {items.length === 0 ? (
           <div className="text-center py-12 text-muted-foreground">
             <p>Your wardrobe is empty. Start by adding some items!</p>
           </div>
        ) : (
          <WardrobeGrid items={items} onItemDeleted={handleItemDeleted} />
        )}
      </div>
    </AppLayout>
  );
}
